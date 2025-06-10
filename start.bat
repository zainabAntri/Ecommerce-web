@echo off
echo Starting E-commerce Web Application...
echo.

echo Killing existing Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && node index.js"
timeout /t 3 /nobreak >nul

echo Starting Frontend Client...
start "Frontend Client" cmd /k "cd client && npm run dev:open"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000 (will open automatically)
echo.
echo Browser should open automatically in a few seconds...
timeout /t 5 /nobreak >nul
start http://localhost:3000
pause 