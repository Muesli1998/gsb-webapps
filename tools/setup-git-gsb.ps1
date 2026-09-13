#Requires -Version 5.1
<#
  setup-git-gsb.ps1
  ------------------
  Sætter git op til to formål i GSB Webapps-projektet:
    1) Kode-filerne i D:\Dropbox\gsb-claude-preview-kilde\   -> GitHub-repo "gsb-kampsystem-kilde"
    2) Projekt-docs-backup i D:\Dropbox\gsb-claude-projekt-docs-backup\ -> GitHub-repo "gsb-projekt-docs-backup"

  Kør denne fil i PowerShell (ikke i "cmd"). Højreklik -> "Run with PowerShell", eller åbn
  PowerShell og kør:  powershell -ExecutionPolicy Bypass -File .\setup-git-gsb.ps1

  Scriptet er skrevet til at være sikkert at køre flere gange (tjekker om ting allerede
  findes, før det opretter noget nyt) - men lav evt. en Dropbox-eksport/kopi af de to mapper
  først, hvis du vil være ekstra forsigtig.
#>

$ErrorActionPreference = "Stop"

function Test-CommandExists($name) {
    return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

Write-Host "=== Trin 1: Tjekker om git er installeret ===" -ForegroundColor Cyan
if (-not (Test-CommandExists git)) {
    Write-Host "git blev ikke fundet. Installerer via winget..." -ForegroundColor Yellow
    winget install --id Git.Git -e --source winget
    Write-Host "Git installeret. Luk og genåbn PowerShell, kør derefter dette script igen." -ForegroundColor Yellow
    exit 0
} else {
    git --version
}

Write-Host ""
Write-Host "=== Trin 2: Tjekker om GitHub CLI (gh) er installeret ===" -ForegroundColor Cyan
if (-not (Test-CommandExists gh)) {
    Write-Host "gh blev ikke fundet. Installerer via winget..." -ForegroundColor Yellow
    winget install --id GitHub.cli -e --source winget
    Write-Host "GitHub CLI installeret. Luk og genåbn PowerShell, kør derefter dette script igen." -ForegroundColor Yellow
    exit 0
} else {
    gh --version
}

Write-Host ""
Write-Host "=== Trin 3: GitHub-login ===" -ForegroundColor Cyan
$ghStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Du er ikke logget ind på GitHub CLI endnu." -ForegroundColor Yellow
    Write-Host "Der åbnes nu en browser hvor du logger ind (helt normalt GitHub-login, ingen" -ForegroundColor Yellow
    Write-Host "token du selv skal taste ind - gh klarer det for dig)." -ForegroundColor Yellow
    Read-Host "Tryk Enter for at fortsætte"
    gh auth login --web --git-protocol https
} else {
    Write-Host "Allerede logget ind:" -ForegroundColor Green
    Write-Host $ghStatus
}

# Bekræft git-identitet (navn/email til commits) er sat op
$gitName = git config --global user.name
$gitEmail = git config --global user.email
if (-not $gitName) {
    $gitName = Read-Host "Git mangler et navn til commits - skriv dit navn (fx 'Chris')"
    git config --global user.name "$gitName"
}
if (-not $gitEmail) {
    $gitEmail = Read-Host "Git mangler en email til commits - skriv din email"
    git config --global user.email "$gitEmail"
}

function Initialize-GitRepo {
    param(
        [string]$Path,
        [string]$RepoName,
        [string]$GitignoreContent
    )

    Write-Host ""
    Write-Host "=== Sætter '$RepoName' op i $Path ===" -ForegroundColor Cyan

    if (-not (Test-Path $Path)) {
        Write-Host "ADVARSEL: Mappen $Path findes ikke - springer over." -ForegroundColor Red
        return
    }

    Push-Location $Path

    if (-not (Test-Path ".git")) {
        git init
        git branch -M main
    } else {
        Write-Host "Allerede et git-repo her - springer 'git init' over." -ForegroundColor Yellow
    }

    if (-not (Test-Path ".gitignore")) {
        $GitignoreContent | Out-File -FilePath ".gitignore" -Encoding utf8
        Write-Host "Oprettede .gitignore" -ForegroundColor Green
    } else {
        Write-Host ".gitignore findes allerede - rører den ikke." -ForegroundColor Yellow
    }

    git add -A
    $status = git status --porcelain
    if ($status) {
        git commit -m "Initial commit - $RepoName"
        Write-Host "Første commit oprettet." -ForegroundColor Green
    } else {
        Write-Host "Intet at committe (enten tomt, eller allerede committet)." -ForegroundColor Yellow
    }

    $remoteExists = git remote 2>&1 | Select-String -Pattern "^origin$"
    if (-not $remoteExists) {
        Write-Host "Opretter privat GitHub-repo '$RepoName' og forbinder som 'origin'..." -ForegroundColor Cyan
        gh repo create $RepoName --private --source=. --remote=origin
    } else {
        Write-Host "'origin' findes allerede som remote - springer 'gh repo create' over." -ForegroundColor Yellow
    }

    git push -u origin main

    Pop-Location
    Write-Host "Færdig med '$RepoName'." -ForegroundColor Green
}

# --- Repo 1: kode-filerne ---
$codeGitignore = @"
# OS-støj
Thumbs.db
desktop.ini
.DS_Store

# Midlertidige/låste Office-filer
~`$*

# De gamle manuelle tidsstemplede backup-filer bliver overflødige nu git tager historik -
# de er IKKE ignoreret her, så den eksisterende historik af dem kommer med i første commit.
# Fra nu af kan nye ændringer committes i stedet for at oprette endnu en _BACKUP_<dato>-kopi.
"@

Initialize-GitRepo -Path "D:\Dropbox\gsb-claude-preview-kilde" -RepoName "gsb-kampsystem-kilde" -GitignoreContent $codeGitignore

# --- Repo 2: projekt-docs-backup ---
$docsGitignore = @"
# OS-støj
Thumbs.db
desktop.ini
.DS_Store
"@

Initialize-GitRepo -Path "D:\Dropbox\gsb-claude-projekt-docs-backup" -RepoName "gsb-projekt-docs-backup" -GitignoreContent $docsGitignore

Write-Host ""
Write-Host "=== Alt sat op ===" -ForegroundColor Cyan
Write-Host "Begge mapper er nu git-repos, forbundet til private GitHub-repos under din konto." -ForegroundColor Green
Write-Host "Fra nu af: efter jeg skriver en opdateret fil til en af de to mapper, kan enten du" -ForegroundColor Green
Write-Host "eller jeg (når jeg har adgang) køre 'git add -A; git commit -m \"...\"; git push' i den" -ForegroundColor Green
Write-Host "mappe i stedet for at oprette en ny tidsstemplet kopi." -ForegroundColor Green
