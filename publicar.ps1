# Publicar memorias en GitHub Pages (gratis + HTTPS)
# Requisito: haber hecho "gh auth login" una sola vez

$ErrorActionPreference = "Stop"
$env:Path += ";C:\Program Files\GitHub CLI"

$RepoName = "memorias-clerch"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Set-Location $Root

gh auth status | Out-Null

if (-not (Test-Path ".git")) {
  git init -b main
  git add -A
  git commit -m "Memorias Esteban Clerch Casals — sitio estático"
}

$remotes = git remote 2>$null
if ($remotes -notcontains "origin") {
  gh repo create $RepoName --public --source=. --remote=origin --push --description "Memorias y ascendencia Clerch — Esteban Clerch Casals"
} else {
  git push -u origin main
}

Write-Host ""
Write-Host "Activando GitHub Pages..."
gh api repos/{owner}/$RepoName/pages -X POST -f build_type=workflow -f source[branch]=main -f source[path]=/ 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Si Pages ya existia, ignora el error anterior."
}

$owner = gh api user --jq .login
Write-Host ""
Write-Host "Listo. En 1-2 minutos estara en:"
Write-Host "  https://$owner.github.io/$RepoName/"
Write-Host ""
Write-Host "Repo: https://github.com/$owner/$RepoName"
