#!/usr/bin/env python3
"""
AI/ML Engineer Portfolio Backend Server & Database Manager
Author: Mahesh Babu | AI/ML Engineer
Features:
  - Secure Authentication for Admin Messages Dashboard (User: Mahesh Babu)
  - Permanent SQLite storage for recruiter inquiries
  - Token-protected REST API endpoints for messages management
  - Public contact form submission API
  - Robust multi-port fallback & Static file hosting for portfolio and admin dashboard
"""

import os
import sys
import json
import sqlite3
import re
import time
import hmac
import hashlib
import base64
import socket
from datetime import datetime
from urllib.parse import urlparse, parse_qs
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

# Set stdout encoding to UTF-8 on Windows
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# ----------------------------------------------------------------------
# 1. Environment Configuration Loader (.env)
# ----------------------------------------------------------------------
def load_env(env_path=".env"):
    """Load key-value pairs from .env file into os.environ if present."""
    if not os.path.exists(env_path):
        return
    try:
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip("'\"")
                    if key and key not in os.environ:
                        os.environ[key] = val
    except Exception as e:
        print(f"[!] Warning: Could not parse .env file: {e}")

load_env()

DEFAULT_PORT = int(os.environ.get("PORT", 5000))
HOST = os.environ.get("HOST", "0.0.0.0")
DB_PATH = os.environ.get("DB_PATH", "data/messages.db")
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "Mahesh Babu")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Mahesh@2004")
ADMIN_SECRET_KEY = os.environ.get("ADMIN_SECRET_KEY", "aiml_portfolio_jwt_secret_mahesh_2026").encode("utf-8")

# ----------------------------------------------------------------------
# 2. Token Generation & Verification (HMAC-SHA256)
# ----------------------------------------------------------------------
def generate_auth_token(username, valid_days=7):
    """Generate a signed HMAC-SHA256 session token valid for valid_days."""
    exp = int(time.time()) + (valid_days * 86400)
    payload = json.dumps({"u": username, "exp": exp})
    b64_payload = base64.urlsafe_b64encode(payload.encode("utf-8")).decode("utf-8")
    sig = hmac.new(ADMIN_SECRET_KEY, b64_payload.encode("utf-8"), hashlib.sha256).hexdigest()
    return f"{b64_payload}.{sig}"

def verify_auth_token(token):
    """Verify signed token authenticity and expiration."""
    if not token or "." not in token:
        return False, None
    try:
        b64_payload, sig = token.split(".", 1)
        expected_sig = hmac.new(ADMIN_SECRET_KEY, b64_payload.encode("utf-8"), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, expected_sig):
            return False, None

        payload_bytes = base64.urlsafe_b64decode(b64_payload.encode("utf-8"))
        data = json.loads(payload_bytes.decode("utf-8"))
        if data.get("exp", 0) < time.time():
            return False, None  # Token expired

        return True, data.get("u")
    except Exception:
        return False, None

# ----------------------------------------------------------------------
# 3. Database Initialization & Helper Functions
# ----------------------------------------------------------------------
def get_db_connection():
    """Create and return a database connection with Row factory."""
    db_dir = os.path.dirname(DB_PATH)
    if db_dir and not os.path.exists(db_dir):
        os.makedirs(db_dir, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database tables with schema migrations."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company TEXT,
                subject TEXT,
                message TEXT NOT NULL,
                status TEXT DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        conn.commit()
    print(f"[OK] Database initialized at: {os.path.abspath(DB_PATH)}")

init_db()

# Simple email validation regex
EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# ----------------------------------------------------------------------
# 4. HTTP Request Handler
# ----------------------------------------------------------------------
class PortfolioAPIHandler(SimpleHTTPRequestHandler):
    """Handles REST API calls and serves portfolio static files."""

    def _set_cors_headers(self):
        """Set standard CORS headers to allow cross-origin requests."""
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Token")

    def _send_json(self, status_code, data):
        """Helper to send JSON responses."""
        payload = json.dumps(data, default=str).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._set_cors_headers()
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def _authenticate_admin(self, query_params=None):
        """Check if request contains a valid admin token."""
        token = None
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:].strip()
        elif self.headers.get("X-Admin-Token"):
            token = self.headers.get("X-Admin-Token").strip()
        elif query_params and "token" in query_params:
            token = query_params["token"][0]

        is_valid, user = verify_auth_token(token)
        return is_valid, user

    def do_OPTIONS(self):
        """Handle CORS pre-flight requests."""
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    # ------------------------------------------------------------------
    # POST Handlers
    # ------------------------------------------------------------------
    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path == "/api/contact":
            self.handle_contact_submit()
        elif path == "/api/auth/login":
            self.handle_auth_login()
        elif path == "/api/auth/verify":
            self.handle_auth_verify()
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    def handle_auth_login(self):
        """Authenticate admin user and return session token."""
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            self._send_json(400, {"error": "Request body cannot be empty."})
            return

        try:
            body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(body)
        except Exception:
            self._send_json(400, {"error": "Invalid JSON format."})
            return

        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        # Case-insensitive username check
        if username.lower() == ADMIN_USERNAME.lower() and password == ADMIN_PASSWORD:
            token = generate_auth_token(ADMIN_USERNAME)
            print(f"[AUTH] Successful admin login for '{ADMIN_USERNAME}'")
            self._send_json(200, {
                "success": True,
                "message": "Login successful.",
                "token": token,
                "user": ADMIN_USERNAME
            })
        else:
            print(f"[AUTH] Failed login attempt with User ID: '{username}'")
            self._send_json(401, {
                "success": False,
                "error": "Invalid User ID or Password. Please try again."
            })

    def handle_auth_verify(self):
        """Verify an existing session token."""
        is_valid, user = self._authenticate_admin()
        if is_valid:
            self._send_json(200, {"valid": True, "user": user})
        else:
            self._send_json(401, {"valid": False, "error": "Invalid or expired session token."})

    def handle_contact_submit(self):
        """Handle new contact form submission from recruiters (Public)."""
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            self._send_json(400, {"error": "Request body cannot be empty."})
            return

        try:
            body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(body)
        except Exception:
            self._send_json(400, {"error": "Invalid JSON format."})
            return

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        company = data.get("company", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        # Validation
        if not name:
            self._send_json(400, {"error": "Please provide your name."})
            return
        if not email or not EMAIL_REGEX.match(email):
            self._send_json(400, {"error": "Please provide a valid email address."})
            return
        if not message:
            self._send_json(400, {"error": "Please enter your message."})
            return

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO messages (name, email, company, subject, message, status, created_at)
                    VALUES (?, ?, ?, ?, ?, 'new', datetime('now', 'localtime'))
                """, (name, email, company, subject, message))
                conn.commit()
                message_id = cursor.lastrowid

            print(f"[+] New message received from: {name} <{email}> (ID: {message_id})")

            self._send_json(201, {
                "success": True,
                "message": "Thank you! Your message has been sent successfully.",
                "id": message_id
            })
        except Exception as e:
            print(f"[!] Database error on contact submission: {e}")
            self._send_json(500, {"error": "Database error while saving message. Please try again."})

    # ------------------------------------------------------------------
    # GET Handlers
    # ------------------------------------------------------------------
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        query_params = parse_qs(parsed.query)

        if path == "/api/messages":
            is_valid, _ = self._authenticate_admin(query_params)
            if not is_valid:
                self._send_json(401, {"error": "Unauthorized. Please log in as admin to view messages."})
                return
            self.handle_get_messages(query_params)
        elif path == "/api/stats":
            is_valid, _ = self._authenticate_admin(query_params)
            if not is_valid:
                self._send_json(401, {"error": "Unauthorized. Please log in as admin."})
                return
            self.handle_get_stats()
        elif path == "/api/export":
            is_valid, _ = self._authenticate_admin(query_params)
            if not is_valid:
                self._send_json(401, {"error": "Unauthorized. Please log in as admin."})
                return
            self.handle_export_csv()
        elif path in ["/admin", "/admin/"]:
            self.path = "/admin.html"
            super().do_GET()
        else:
            # Fall back to serving static files (index.html, admin.html, profile.jpg, etc.)
            super().do_GET()

    def handle_get_messages(self, query_params):
        """Retrieve all stored messages, optionally filtered by status (Admin Only)."""
        status_filter = query_params.get("status", [None])[0]
        search_query = query_params.get("search", [None])[0]

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                sql = "SELECT id, name, email, company, subject, message, status, created_at FROM messages WHERE 1=1"
                params = []

                if status_filter in ["new", "read"]:
                    sql += " AND status = ?"
                    params.append(status_filter)

                if search_query:
                    sql += " AND (name LIKE ? OR email LIKE ? OR message LIKE ? OR company LIKE ? OR subject LIKE ?)"
                    wildcard = f"%{search_query}%"
                    params.extend([wildcard, wildcard, wildcard, wildcard, wildcard])

                sql += " ORDER BY id DESC"
                cursor.execute(sql, params)
                rows = cursor.fetchall()

                messages = [dict(row) for row in rows]

            self._send_json(200, {
                "success": True,
                "count": len(messages),
                "messages": messages
            })
        except Exception as e:
            print(f"[!] Database error on fetching messages: {e}")
            self._send_json(500, {"error": "Failed to retrieve messages from database."})

    def handle_get_stats(self):
        """Return message statistics (total, new, read) (Admin Only)."""
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT COUNT(*) FROM messages")
                total = cursor.fetchone()[0]

                cursor.execute("SELECT COUNT(*) FROM messages WHERE status = 'new'")
                new_count = cursor.fetchone()[0]

                cursor.execute("SELECT COUNT(*) FROM messages WHERE status = 'read'")
                read_count = cursor.fetchone()[0]

            self._send_json(200, {
                "success": True,
                "stats": {
                    "total": total,
                    "new": new_count,
                    "read": read_count
                }
            })
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_export_csv(self):
        """Export all messages as a downloadable CSV file (Admin Only)."""
        import csv
        import io

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT id, name, email, company, subject, message, status, created_at FROM messages ORDER BY id DESC")
                rows = cursor.fetchall()

            output = io.StringIO()
            writer = csv.writer(output)
            writer.writerow(["ID", "Name", "Email", "Company", "Subject", "Message", "Status", "Date Received"])
            for row in rows:
                writer.writerow([row["id"], row["name"], row["email"], row["company"] or "", row["subject"] or "", row["message"], row["status"], row["created_at"]])

            csv_data = output.getvalue().encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/csv; charset=utf-8")
            self.send_header("Content-Disposition", 'attachment; filename="recruiter_messages.csv"')
            self._set_cors_headers()
            self.send_header("Content-Length", str(len(csv_data)))
            self.end_headers()
            self.wfile.write(csv_data)
        except Exception as e:
            self._send_json(500, {"error": f"Failed to export CSV: {e}"})

    # ------------------------------------------------------------------
    # PATCH Handlers (Admin Only)
    # ------------------------------------------------------------------
    def do_PATCH(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        is_valid, _ = self._authenticate_admin()
        if not is_valid:
            self._send_json(401, {"error": "Unauthorized. Please log in as admin."})
            return

        match = re.match(r"^/api/messages/(\d+)$", path)
        if match:
            msg_id = int(match.group(1))
            self.handle_update_status(msg_id)
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    def handle_update_status(self, msg_id):
        """Toggle message status between 'read' and 'new'."""
        content_length = int(self.headers.get("Content-Length", 0))
        status = "read"
        if content_length > 0:
            try:
                body = self.rfile.read(content_length).decode("utf-8")
                data = json.loads(body)
                if "status" in data and data["status"] in ["new", "read"]:
                    status = data["status"]
            except Exception:
                pass

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("UPDATE messages SET status = ? WHERE id = ?", (status, msg_id))
                conn.commit()
                if cursor.rowcount == 0:
                    self._send_json(404, {"error": "Message ID not found."})
                    return

            self._send_json(200, {
                "success": True,
                "message": f"Message #{msg_id} marked as {status}.",
                "id": msg_id,
                "status": status
            })
        except Exception as e:
            self._send_json(500, {"error": f"Database error: {e}"})

    # ------------------------------------------------------------------
    # DELETE Handlers (Admin Only)
    # ------------------------------------------------------------------
    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        is_valid, _ = self._authenticate_admin()
        if not is_valid:
            self._send_json(401, {"error": "Unauthorized. Please log in as admin."})
            return

        match = re.match(r"^/api/messages/(\d+)$", path)
        if match:
            msg_id = int(match.group(1))
            self.handle_delete_message(msg_id)
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    def handle_delete_message(self, msg_id):
        """Permanently delete a message by ID."""
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM messages WHERE id = ?", (msg_id,))
                conn.commit()
                if cursor.rowcount == 0:
                    self._send_json(404, {"error": "Message not found or already deleted."})
                    return

            print(f"[-] Deleted message #{msg_id}")
            self._send_json(200, {
                "success": True,
                "message": f"Message #{msg_id} deleted successfully.",
                "id": msg_id
            })
        except Exception as e:
            self._send_json(500, {"error": f"Database error: {e}"})

# ----------------------------------------------------------------------
# 5. Server Runner with Graceful Port Binding
# ----------------------------------------------------------------------
def find_available_port(start_port=5000, host="0.0.0.0"):
    """Find an available port if start_port is currently busy."""
    candidate_ports = [start_port, 5000, 3000, 8000, 8080, 5050]
    for port in candidate_ports:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind((host, port))
                return port
            except OSError:
                continue
    return start_port

def run_server():
    port = find_available_port(DEFAULT_PORT, HOST)
    server_address = (HOST, port)
    
    try:
        httpd = ThreadingHTTPServer(server_address, PortfolioAPIHandler)
    except Exception as e:
        # If binding to 0.0.0.0 fails on Windows, fallback to 127.0.0.1
        print(f"[!] Falling back to localhost: {e}")
        server_address = ("127.0.0.1", port)
        httpd = ThreadingHTTPServer(server_address, PortfolioAPIHandler)

    print("=" * 65)
    print(f"[*] AI/ML Engineer Portfolio Server is ACTIVE & LISTENING")
    print(f"   ► Portfolio Web App:  http://localhost:{port}")
    print(f"   ► Admin Messages:     http://localhost:{port}/admin.html")
    print(f"   ► Admin User ID:      {ADMIN_USERNAME}")
    print(f"   ► Contact REST API:   http://localhost:{port}/api/contact")
    print(f"   ► Database Path:      {os.path.abspath(DB_PATH)}")
    print("=" * 65)
    print("[*] Press Ctrl+C in this terminal to stop the server anytime.\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Shutting down server gracefully...")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
