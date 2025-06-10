Write-Host "Starting E-commerce Web Application..." -ForegroundColor Green
Write-Host ""

Write-Host "Cleaning up existing Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep 2

Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; node index.js"
Start-Sleep 3

Write-Host "Starting Frontend Client..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; npm run dev"
Start-Sleep 5

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor White
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""

Write-Host "Opening browser automatically..." -ForegroundColor Magenta
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "✅ Application started successfully!" -ForegroundColor Green
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 