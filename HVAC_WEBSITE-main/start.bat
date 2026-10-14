@echo off
setlocal
cd /d "%~dp0"
title Atlas HVAC Website

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed. Install Node.js 22.12 or newer from https://nodejs.org
    pause
    exit /b 1
)

if not exist node_modules (
    echo Installing packages...
    call npm ci
    if errorlevel 1 (
        echo Install failed.
        pause
        exit /b 1
    )
)

echo Starting dev server...
start "" http://127.0.0.1:4321/cz/
call npm run dev

pause
