$Root = Split-Path -Parent $PSScriptRoot
$Backend = "Set-Location '$Root\backend'; & '.\.venv\Scripts\Activate.ps1'; uvicorn app.main:app --reload --port 8000"
$Frontend = "Set-Location '$Root\frontend'; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", $Frontend
Write-Host "Starting API on http://localhost:8000 and UI on http://localhost:5173"

