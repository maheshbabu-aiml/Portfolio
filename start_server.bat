@echo off
title Mahesh Babu - AI/ML Engineer Portfolio Server
color 0A
cls
echo ===================================================================
echo   MAHESH BABU - AI/ML ENGINEER PORTFOLIO SERVER & BACKEND
echo ===================================================================
echo.
cd /d "%~dp0"

echo [*] Checking Python runtime...
py --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Launching server with 'py server.py'...
    echo.
    py server.py
    goto end
)

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Launching server with 'python server.py'...
    echo.
    python server.py
    goto end
)

echo [!] Python was not detected in PATH.
echo     Please install Python 3.10+ or run with UV:
echo     uv run python server.py
echo.

:end
pause
