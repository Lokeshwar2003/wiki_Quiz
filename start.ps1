$backend = Start-Process -FilePath "python" -ArgumentList "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000" -WorkingDirectory ".\backend" -PassThru
Write-Host "Started backend server on http://127.0.0.1:8000"

$frontend = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory ".\frontend" -PassThru
Write-Host "Started frontend server on http://127.0.0.1:5173"

Write-Host "Press Ctrl+C to stop both servers..."
try {
    Wait-Process -Id $backend.Id, $frontend.Id
} finally {
    if (!$backend.HasExited) { Stop-Process -Id $backend.Id }
    if (!$frontend.HasExited) { Stop-Process -Id $frontend.Id }
}