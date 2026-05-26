$ErrorActionPreference = "SilentlyContinue"

$ProjectDir = Join-Path $PSScriptRoot "..\prototype"
$Port = 3101
$LogDir = Join-Path $PSScriptRoot "..\prototype\.dev-logs"
$ServerLog = Join-Path $LogDir "recordare-dev-3101.log"
$WatchLog = Join-Path $LogDir "recordare-watchdog-3101.log"

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Write-WatchLog {
  param([string]$Message)
  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  Add-Content -Path $WatchLog -Value "[$timestamp] $Message"
}

function Test-PortListening {
  param([int]$PortToCheck)
  $conn = Get-NetTCPConnection -LocalPort $PortToCheck -State Listen -ErrorAction SilentlyContinue
  return $null -ne $conn
}

function Start-RecordareDevServer {
  Write-WatchLog "Starting Recordare prototype dev server on port $Port."
  $command = "npm run dev -- -p $Port >> `"$ServerLog`" 2>&1"
  Start-Process -FilePath "cmd.exe" -ArgumentList "/c", $command -WorkingDirectory $ProjectDir -WindowStyle Hidden | Out-Null
  Start-Sleep -Seconds 8
}

Write-WatchLog "Watchdog started. ProjectDir=$ProjectDir Port=$Port"

while ($true) {
  if (-not (Test-PortListening -PortToCheck $Port)) {
    Start-RecordareDevServer
  }
  Start-Sleep -Seconds 10
}
