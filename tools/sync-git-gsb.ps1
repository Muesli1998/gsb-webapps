#Requires -Version 5.1
<#
  sync-git-gsb.ps1
  -----------------
  Lille "commit alt og push"-script til de to GSB-repos, til brug EFTER setup-git-gsb.ps1
  er kørt én gang. Kør denne når jeg (Claude) har skrevet en opdateret fil til en af de to
  mapper og siger til at der er noget at synkronisere - eller når som helst du selv vil.

  Kør: powershell -ExecutionPolicy Bypass -File .\sync-git-gsb.ps1
#>

$ErrorActionPreference = "Continue"

function Sync-Repo {
    param(
        [string]$Path,
        [string]$Label
    )

    if (-not (Test-Path (Join-Path $Path ".git"))) {
        Write-Host "$Label ($Path) er ikke et git-repo endnu - kør setup-git-gsb.ps1 først." -ForegroundColor Red
        return
    }

    Push-Location $Path
    Write-Host ""
    Write-Host "=== $Label ===" -ForegroundColor Cyan

    git add -A
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "Ingen ændringer at committe." -ForegroundColor Yellow
    } else {
        $stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        git commit -m "Sync $stamp"
        git push
        Write-Host "Committet og pushet." -ForegroundColor Green
    }

    Pop-Location
}

Sync-Repo -Path "D:\Dropbox\gsb-claude-preview-kilde" -Label "Kode-filer (gsb-kampsystem-kilde)"
Sync-Repo -Path "D:\Dropbox\gsb-claude-projekt-docs-backup" -Label "Projekt-docs-backup (gsb-projekt-docs-backup)"

Write-Host ""
Write-Host "Færdig." -ForegroundColor Cyan
