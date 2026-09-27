$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path "$Root\.env")) {
    Copy-Item "$Root\.env.example" "$Root\.env"
}

if (-not (Test-Path "$Root\backend\.venv")) {
    py -m venv "$Root\backend\.venv"
}

& "$Root\backend\.venv\Scripts\python.exe" -m pip install -r "$Root\backend\requirements.txt"
Push-Location "$Root\frontend"
npm install
Pop-Location
Write-Host "ProofCoach setup complete. Run .\scripts\start.ps1"

