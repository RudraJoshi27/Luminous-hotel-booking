# Auto-sync script for GitHub
# Usage: .\auto-sync.ps1 -Message "Your commit message"

param (
    [string]$Message = "Dev Sync: Automatic commit of changes"
)

Write-Host "--- Starting Auto-Sync ---" -ForegroundColor Cyan

# Check for changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit
}

# Add all changes
Write-Host "Staging changes..."
git add .

# Commit
Write-Host "Committing changes..."
git commit -m $Message

# Push to main
Write-Host "Pushing to GitHub (branch: main)..."
git push origin main

Write-Host "--- Sync Complete! ---" -ForegroundColor Green
