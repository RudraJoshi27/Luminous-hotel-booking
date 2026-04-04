@echo off
echo Starting StayFinder (Backend + Frontend)...

:: Start backend in new window
start "StayFinder Backend (port 5000)" cmd /k "cd /d c:\AWT-Lab\WEB-PROJECT\luminous-hotel-booking\backend && node server.js"

:: Wait 2 seconds then start frontend
timeout /t 2 /nobreak >nul

:: Start frontend in new window  
start "StayFinder Frontend (port 5173)" cmd /k "cd /d c:\AWT-Lab\WEB-PROJECT\luminous-hotel-booking\frontend && npm run dev"

echo.
echo Both servers launched in separate windows.
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo Close those two windows to stop the servers.
pause
