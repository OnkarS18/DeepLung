@echo off
setlocal
title DeepLung Launcher

echo ==================================================
echo         Starting DeepLung Application
echo ==================================================
echo.

set "ROOT=%~dp0"
set "FRONTEND_DIR=%ROOT%frontend"
set "PYTHON_CMD="

cd /d "%ROOT%"

echo [1/2] Starting Flask Backend on http://localhost:5000 ...

if exist "%ROOT%.venv\Scripts\python.exe" (
    "%ROOT%.venv\Scripts\python.exe" --version >nul 2>&1
    if not errorlevel 1 (
        set "PYTHON_CMD="%ROOT%.venv\Scripts\python.exe""
        echo [INFO] Using project virtual environment.
    ) else (
        echo [WARNING] Project virtual environment exists but its Python is not working.
    )
)

if not defined PYTHON_CMD (
    python --version >nul 2>&1
    if not errorlevel 1 (
        set "PYTHON_CMD=python"
        echo [INFO] Using global python.
    )
)

if not defined PYTHON_CMD (
    py -3 --version >nul 2>&1
    if not errorlevel 1 (
        set "PYTHON_CMD=py -3"
        echo [INFO] Using Python launcher.
    )
)

if not defined PYTHON_CMD (
    echo [ERROR] Python was not found.
    echo Install Python or fix the project virtual environment, then run this file again.
    pause
    exit /b 1
)

start "DeepLung Backend" cmd /k "cd /d "%ROOT%" && %PYTHON_CMD% app.py"

echo.
echo [2/2] Starting React Frontend on http://localhost:5173 ...

if not exist "%FRONTEND_DIR%\package.json" (
    echo [ERROR] Frontend package.json was not found.
    pause
    exit /b 1
)

npm.cmd --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js/npm was not found.
    echo Install Node.js, then run this file again.
    pause
    exit /b 1
)

if not exist "%FRONTEND_DIR%\node_modules" (
    echo [INFO] Installing frontend dependencies...
    cd /d "%FRONTEND_DIR%"
    call npm.cmd install
    if errorlevel 1 (
        echo [ERROR] Frontend dependency installation failed.
        pause
        exit /b 1
    )
)

start "DeepLung Frontend" cmd /k "cd /d "%FRONTEND_DIR%" && npm.cmd run dev"

echo.
echo ==================================================
echo  Servers are starting in separate windows.
echo.
echo  Backend API:  http://localhost:5000
echo  Frontend App: http://localhost:5173
echo.
echo  If the browser opens before Vite is ready, refresh after a few seconds.
echo ==================================================

start "" "http://localhost:5173"

endlocal
exit /b 0
