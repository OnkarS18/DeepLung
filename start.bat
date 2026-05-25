@echo off
echo =========================================
echo    Starting DeepLung Application
echo =========================================

echo Starting Flask Backend (Port 5000)...
start "DeepLung Backend" cmd /k "python app.py"

echo Starting React Frontend...
cd frontend
start "DeepLung Frontend" cmd /k "npm run dev"

echo Both servers are starting up in separate windows!
echo You can safely close this launcher window now.
exit
