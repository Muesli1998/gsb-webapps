[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string[]]$Kort,
    [switch]$Commit,
    [switch]$TillavNetvaerk,
    [ValidateRange(1, 1440)]
    [int]$TimeoutMin = 90,
    [switch]$Toer
)

$ErrorActionPreference = 'Stop'
$script:RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path

function Stop-Kort([string]$Message) {
    throw ("KOER-KORT: " + $Message)
}

function Invoke-GitText([string[]]$Arguments) {
    $global:LASTEXITCODE = 0
    $output = @(& git -C $script:RepoRoot @Arguments 2>&1)
    $code = $LASTEXITCODE
    if ($code -ne 0) {
        Stop-Kort ("git " + ($Arguments -join ' ') + " fejlede (exit " + $code + "): " + ($output -join [Environment]::NewLine))
    }
    return ($output -join [Environment]::NewLine).TrimEnd()
}

function Get-CardFile([string]$Number) {
    $matches = @(Get-ChildItem -LiteralPath (Join-Path $script:RepoRoot 'work/aabne') -File -Filter ($Number + '-*.md'))
    if ($matches.Count -ne 1) {
        Stop-Kort ("Kort " + $Number + " findes ikke entydigt i work/aabne/.")
    }
    return $matches[0]
}

function Get-BranchFromCard([string]$Text, [string]$Number) {
    $section = [regex]::Match($Text, '(?ms)^## Gren\s*(.*?)(?=^##\s|\z)')
    if (-not $section.Success) {
        Stop-Kort ("Kort " + $Number + " mangler afsnittet ## Gren.")
    }
    $branch = [regex]::Match($section.Groups[1].Value, '\x60([^\x60]+)\x60')
    if (-not $branch.Success -or $branch.Groups[1].Value -notmatch '^[A-Za-z0-9._/-]+$') {
        Stop-Kort ("Kort " + $Number + (" har ikke et gyldigt f" + [char]0xF8 + "rste kodeformateret branchnavn under ## Gren."))
    }
    return $branch.Groups[1].Value.Trim()
}

function Get-NetworkLine([string]$Text) {
    $match = [regex]::Match($Text, ('(?im)^.*?Netv' + [char]0xE6 + 'rk:(?:\*\*)?\s*(?<value>[^\r\n' + [char]0xB7 + ']+)'))
    if (-not $match.Success) { return ('ukendt (ingen Netv' + [char]0xE6 + 'rk-linje)') }
    return $match.Groups['value'].Value.Trim().TrimEnd('.', ' ')
}

function Get-CodexExe {
    $binRoot = Join-Path $env:LOCALAPPDATA 'OpenAI/Codex/bin'
    if (-not (Test-Path -LiteralPath $binRoot -PathType Container)) {
        Stop-Kort ("Codex-mappen findes ikke: " + $binRoot)
    }
    $candidate = Get-ChildItem -LiteralPath $binRoot -Recurse -File -Filter 'codex.exe' |
        Sort-Object LastWriteTimeUtc -Descending |
        Select-Object -First 1
    if (-not $candidate) { Stop-Kort ("Fandt ingen codex.exe under " + $binRoot) }
    return $candidate.FullName
}

function Get-CardPrompt([string]$Text, [string]$Branch) {
    $intro = @(
        ('Du k' + [char]0xF8 + 'rer via codex exec, uden dialog og uden sandbox. Ingen kan godkende noget undervejs, s' + [char]0xE5 + ' sp' + [char]0xF8 + 'rg ikke og vent ikke; stop ikke p' + [char]0xE5 + ' sandboxfejl.'),
        (('Du st' + [char]0xE5 + 'r allerede p' + [char]0xE5 + ' grenen ') + $Branch + '. Skift ikke gren.'),
        ('F' + [char]0xF8 + 'lg kortet nedenfor ordret og reglerne i AGENTS.md.'),
        ('Brug kun l' + [char]0xE6 + 'sende git-kommandoer (status, diff, log, show). Ingen add, commit, push, switch, checkout, ingen sub-agents.'),
        ('R' + [char]0xF8 + 'r kun filer inden for kortets Afgr' + [char]0xE6 + 'nsning. Skriv i kortets Sp' + [char]0xF8 + 'rgsm' + [char]0xE5 + 'l og Resultat.'),
        ('Efterpr' + [char]0xF8 + 'v dine egne tal ved at gen' + [char]0xE5 + 'bne filerne, f' + [char]0xF8 + 'r du rapporterer. G' + [char]0xE6 + 't ikke; skriv "ukendt".'),
        ('Stop, n' + [char]0xE5 + 'r du er f' + [char]0xE6 + 'rdig, og afslut med en kort slutrapport.')
    ) -join [Environment]::NewLine
    return $intro + [Environment]::NewLine + [Environment]::NewLine + $Text
}

function Test-Preflight([string]$Number, [switch]$DryRun) {
    $card = Get-CardFile $Number
    $text = [System.IO.File]::ReadAllText($card.FullName, [System.Text.Encoding]::UTF8)
    $branch = Get-BranchFromCard $text $Number
    $network = Get-NetworkLine $text

    $status = Invoke-GitText @('status', '--short')
    if (-not [string]::IsNullOrWhiteSpace($status)) {
        Stop-Kort (("Arbejdstr" + [char]0xE6 + "et er ikke rent. git status --short:") + [Environment]::NewLine + $status)
    }
    $current = Invoke-GitText @('branch', '--show-current')
    if ($current -ne 'main') {
        Stop-Kort (("Forkert gren: st" + [char]0xE5 + "r p" + [char]0xE5 + " '") + $current + "', forventede 'main'.")
    }
    if (-not $DryRun) {
        [void](Invoke-GitText @('pull', '--ff-only'))
    }
    $existing = Invoke-GitText @('branch', '--list', $branch)
    if (-not [string]::IsNullOrWhiteSpace($existing)) {
        Stop-Kort (("M" + [char]0xE5 + "lgrenen findes allerede: ") + $branch)
    }
    if ($network -notmatch '^(?i:ingen|nej|no)(?:\s|$)' -and -not $TillavNetvaerk) {
        Stop-Kort (("Kortet kr" + [char]0xE6 + "ver/angiver netv" + [char]0xE6 + "rk ('") + $network + ("'). Brug kun -TillavNetvaerk efter s" + [char]0xE6 + "rskilt godkendelse."))
    }

    $codex = Get-CodexExe
    $node = Get-Command node -ErrorAction SilentlyContinue
    if (-not $node) { Stop-Kort 'node kan ikke findes i PATH.' }
    $global:LASTEXITCODE = 0
    $nodeVersion = @(& node --version 2>&1)
    if ($LASTEXITCODE -ne 0) { Stop-Kort (("node kan ikke k" + [char]0xF8 + "res: ") + ($nodeVersion -join ' ')) }

    return [pscustomobject]@{
        Number = $Number
        CardPath = $card.FullName
        CardText = $text
        Branch = $branch
        Network = $network
        Codex = $codex
        Node = ($nodeVersion -join ' ').Trim()
        Prompt = (Get-CardPrompt $text $branch)
    }
}

function Show-DryRun($Plan) {
    Write-Output ("Kort: " + $Plan.Number + " (" + $Plan.CardPath + ")")
    Write-Output ("Aktuel gren: " + (Invoke-GitText @('branch', '--show-current')))
    Write-Output (("M" + [char]0xE5 + "lgren: ") + $Plan.Branch)
    Write-Output (("Netv" + [char]0xE6 + "rk: ") + $Plan.Network)
    Write-Output ("Codex: " + $Plan.Codex)
    Write-Output ("Node: " + $Plan.Node)
    Write-Output ('Ville k' + [char]0xF8 + 're: git pull --ff-only')
    Write-Output ("Ville oprette gren: git switch -c " + $Plan.Branch)
    Write-Output (("Ville k" + [char]0xF8 + "re: codex exec --sandbox danger-full-access -o work/koersler/") + $Plan.Number + "/slutsvar.md -")
    Write-Output ('Prompt ' + [char]0x2014 + ' f' + [char]0xF8 + 'rste 20 linjer:')
    $lines = $Plan.Prompt -split "\r?\n"
    $limit = [Math]::Min(20, $lines.Count)
    for ($i = 0; $i -lt $limit; $i++) { Write-Output $lines[$i] }
}

function Get-AllowedPaths([string]$Text, [string]$CardPath) {
    $allowed = New-Object System.Collections.Generic.List[string]
    $allowed.Add('work/koersler/')
    $allowed.Add(('work/aabne/' + [System.IO.Path]::GetFileName($CardPath)))
    $section = [regex]::Match($Text, ('(?ms)^## Afgr' + [char]0xE6 + 'nsning\s*(.*?)(?=^##\s|\z)'))
    if ($section.Success) {
        $mayTouch = [regex]::Match($section.Groups[1].Value, ('(?ms)M' + [char]0xE5 + ' r' + [char]0xF8 + 'res(?::\*\*|\*\*\s*:|:)\s*(.*?)(?=M' + [char]0xE5 + ' ikke r' + [char]0xF8 + 'res|\z)'))
        if ($mayTouch.Success) {
            foreach ($item in [regex]::Matches($mayTouch.Groups[1].Value, '\x60([^\x60]+)\x60')) {
                $path = $item.Groups[1].Value.Replace('\', '/').Trim()
                if ($path -match '[*?]') {
                    $wildcard = $path.IndexOfAny([char[]]@('*', '?'))
                    $prefix = $path.Substring(0, $wildcard)
                    $slash = $prefix.LastIndexOf('/')
                    if ($slash -ge 0) { $allowed.Add($prefix.Substring(0, $slash + 1)) }
                } else {
                    $allowed.Add($path)
                }
            }
        }
    }
    return ,$allowed.ToArray()
}

function Test-AllowedPath([string]$Path, [string[]]$Allowed) {
    $normalized = $Path.Replace('\', '/').TrimStart('/')
    foreach ($entry in $Allowed) {
        if ($entry.EndsWith('/')) {
            if ($normalized.StartsWith($entry, [StringComparison]::OrdinalIgnoreCase)) { return $true }
        } elseif ($normalized.Equals($entry, [StringComparison]::OrdinalIgnoreCase)) {
            return $true
        }
    }
    return $false
}

function Invoke-Codex($Plan) {
    $number = $Plan.Number
    $outDir = Join-Path $script:RepoRoot ("work/koersler/" + $number)
    [void](New-Item -ItemType Directory -Path $outDir -Force)
    [void](Invoke-GitText @('switch', '-c', $Plan.Branch))

    $answerPath = Join-Path $outDir 'slutsvar.md'
    $logPath = Join-Path $outDir 'log.txt'
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $Plan.Codex
    $psi.Arguments = 'exec --sandbox danger-full-access -o "' + $answerPath + '" -'
    $psi.WorkingDirectory = $script:RepoRoot
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true
    $psi.RedirectStandardInput = $true
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.StandardOutputEncoding = [System.Text.Encoding]::UTF8
    $psi.StandardErrorEncoding = [System.Text.Encoding]::UTF8
    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $psi
    [void]$process.Start()
    $stdoutTask = $process.StandardOutput.ReadToEndAsync()
    $stderrTask = $process.StandardError.ReadToEndAsync()
    # Prompten sendes som UTF-8-bytes; StandardInput.Write ville bruge konsollens kodesider og ?del?gge ?, ? og ?.
    $promptBytes = (New-Object System.Text.UTF8Encoding($false)).GetBytes($Plan.Prompt)
    $process.StandardInput.BaseStream.Write($promptBytes, 0, $promptBytes.Length)
    $process.StandardInput.BaseStream.Flush()
    $process.StandardInput.Close()
    $finished = $process.WaitForExit($TimeoutMin * 60 * 1000)
    if (-not $finished) {
        try { $process.Kill() } catch {}
        $process.WaitForExit()
    }
    $log = 'STDOUT' + [Environment]::NewLine + $stdoutTask.Result + [Environment]::NewLine + 'STDERR' + [Environment]::NewLine + $stderrTask.Result
    [System.IO.File]::WriteAllText($logPath, $log, (New-Object System.Text.UTF8Encoding($false)))
    if (-not $finished) { Stop-Kort (("Codex blev stoppet efter timeout p" + [char]0xE5 + " ") + $TimeoutMin + " minutter. Log: " + $logPath) }
    if ($process.ExitCode -ne 0) { Stop-Kort ("codex exec afsluttede med exit " + $process.ExitCode + ". Log: " + $logPath) }

    $status = Invoke-GitText @('status', '--short')
    $changed = @()
    if (-not [string]::IsNullOrWhiteSpace($status)) {
        foreach ($line in ($status -split "\r?\n")) {
            if ($line.Length -gt 3) { $changed += $line.Substring(3).Trim() }
        }
    }
    $allowed = Get-AllowedPaths $Plan.CardText $Plan.CardPath
    $outside = @($changed | Where-Object { -not (Test-AllowedPath $_ $allowed) })
    $hashScript = Join-Path $script:RepoRoot 'tools/tjek/db-hashes.mjs'
    $hashResult = 'ikke tjekket: kort 162 mangler'
    if (Test-Path -LiteralPath $hashScript -PathType Leaf) {
        $global:LASTEXITCODE = 0
        $hashOutput = @(& node $hashScript 2>&1)
        $hashResult = ($hashOutput -join [Environment]::NewLine)
        if ($LASTEXITCODE -ne 0) { $hashResult = 'FEJLEDE: ' + $hashResult }
    }
    $global:LASTEXITCODE = 0
    $diffCheck = @(& git -C $script:RepoRoot diff --check 2>&1)
    $diffCode = $LASTEXITCODE
    $report = @(
        ("Gren: " + $Plan.Branch)
        (("" + [char]0xC6 + "ndrede filer: ") + $changed.Count)
        ("Filer: " + ($changed -join ', '))
        (("Uden for afgr" + [char]0xE6 + "nsning: ") + $(if ($outside.Count) { $outside -join ', ' } else { 'ingen' }))
        ("Databasehashes: " + $hashResult)
        ("git diff --check: " + $(if ($diffCode -eq 0) { 'bestod' } else { 'FEJLEDE: ' + ($diffCheck -join ' ') }))
        ("Slutsvar: " + $answerPath)
    )
    Write-Output ($report -join [Environment]::NewLine)
    if ($outside.Count -gt 0 -or $diffCode -ne 0) { Stop-Kort 'Efterkontrollen fandt afvigelser; commit er blokeret.' }
    if ($Commit) {
        if ($changed.Count -eq 0) { Stop-Kort ('Ingen ' + [char]0xE6 + 'ndrede filer at committe.') }
        [void](Invoke-GitText (@('add') + $changed))
        [void](Invoke-GitText @('commit', '-m', ("Kort " + $number + (': k' + [char]0xF8 + 'rt med koer-kort'))))
        return $true
    }
    return $false
}

if ($Kort.Count -gt 1 -and -not $Commit) {
    Stop-Kort ('Uden -Commit m' + [char]0xE5 + ' listen kun indeholde ' + [char]0xE9 + 't kort.')
}

foreach ($raw in $Kort) {
    $number = ([string]$raw).Trim()
    if ($number -notmatch '^\d{1,3}$') { Stop-Kort ("Ugyldigt kortnummer: " + $number) }
    $plan = Test-Preflight $number -DryRun:$Toer
    if ($Toer) {
        Show-DryRun $plan
        continue
    }
    Invoke-Codex $plan | Out-Host
    if ($Kort.Count -gt 1) {
        [void](Invoke-GitText @('switch', 'main'))
    }
}
