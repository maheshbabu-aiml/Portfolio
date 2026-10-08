import urllib.request
import json
import sqlite3
import os

BASE_URL = 'http://localhost:5000'

def test_full_secured_system():
    print("==========================================================")
    print("Testing AI/ML Portfolio Profile Photo, Contact & Admin Flow")
    print("==========================================================")

    # 1. Test Static Delivery of Profile Photo and Verified PDF Certificate
    for static_path in ['/profile.jpg', '/pic.jpg', '/oracle_sql_certificate.pdf']:
        with urllib.request.urlopen(f'{BASE_URL}{static_path}') as resp:
            data = resp.read()
            assert resp.status == 200
            print(f"[+] 1. GET {static_path} SUCCESS: Delivered {len(data)} bytes (Status 200, Content-Type: {resp.headers.get('Content-Type')}).")

    # 2. Test Public Contact Submission (No Token Needed)
    inquiry = {
        'name': 'Priya Sharma (Tech Talent Lead)',
        'email': 'priya.sharma@deepmatrix.ai',
        'company': 'DeepMatrix Research Labs',
        'subject': 'AI/ML Engineer Interview Invitation',
        'message': 'Hi Mahesh Babu, We reviewed your profile and projects from RGUKT Basar and want to invite you for an AI/ML Engineer technical discussion.'
    }

    req = urllib.request.Request(
        f'{BASE_URL}/api/contact',
        data=json.dumps(inquiry).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 201
        res = json.loads(resp.read().decode('utf-8'))
        print(f"[+] 2. Public POST /api/contact SUCCESS: ID={res.get('id')}")
        msg_id = res['id']

    # 3. Test Security Rejection on Unauthenticated Admin Access
    unauthorized_passed = False
    try:
        urllib.request.urlopen(f'{BASE_URL}/api/messages')
    except urllib.error.HTTPError as e:
        if e.code == 401:
            unauthorized_passed = True
            print(f"[+] 3. Security Check SUCCESS: Unauthenticated GET /api/messages correctly rejected (HTTP 401).")
    assert unauthorized_passed

    # 4. Test Valid Admin Login (User: Mahesh Babu, Pass: Mahesh@2004)
    login_req = urllib.request.Request(
        f'{BASE_URL}/api/auth/login',
        data=json.dumps({'username': 'Mahesh Babu', 'password': 'Mahesh@2004'}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(login_req) as resp:
        assert resp.status == 200
        auth_data = json.loads(resp.read().decode('utf-8'))
        token = auth_data['token']
        print(f"[+] 4. Admin Login SUCCESS: Authenticated user '{auth_data['user']}'. Generated secure token.")

    # 5. Test Authenticated GET /api/messages with Token
    auth_req = urllib.request.Request(
        f'{BASE_URL}/api/messages',
        headers={'Authorization': f'Bearer {token}'}
    )
    with urllib.request.urlopen(auth_req) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode('utf-8'))
        print(f"[+] 5. Authenticated GET /api/messages SUCCESS: Retrieved {data['count']} messages.")

    # 6. Test Portfolio Homepage Loading
    with urllib.request.urlopen(f'{BASE_URL}/') as resp:
        assert resp.status == 200
        content = resp.read().decode('utf-8')
        assert 'Mahesh Babu' in content
        assert 'alt="Mahesh Babu - AI/ML Engineer"' in content
        print(f"[+] 6. Homepage Verification SUCCESS: Profile photo and markup verified.")

    print("\n[ALL PROFILE PHOTO, SECURITY & API TESTS PASSED SUCCESSFULLY!]")

if __name__ == '__main__':
    test_full_secured_system()
