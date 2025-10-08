# Script PowerShell pour surveiller les changements et auto-commit
param(
    [string]$Path = ".",
    [int]$IntervalSeconds = 30
)

Write-Host "🔍 Surveillance des changements dans: $Path" -ForegroundColor Green
Write-Host "⏱️  Intervalle: $IntervalSeconds secondes" -ForegroundColor Yellow
Write-Host "📤 Auto-commit activé" -ForegroundColor Cyan
Write-Host ""

$lastCommit = Get-Date

while ($true) {
    try {
        # Vérifier s'il y a des changements
        $status = git status --porcelain
        
        if ($status) {
            $now = Get-Date
            $timeSinceLastCommit = ($now - $lastCommit).TotalSeconds
            
            # Attendre au moins 10 secondes entre les commits
            if ($timeSinceLastCommit -ge 10) {
                Write-Host "📝 Changements détectés - Auto-commit..." -ForegroundColor Yellow
                
                # Ajouter tous les fichiers
                git add .
                
                # Commit avec timestamp
                $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
                git commit -m "Auto-save: $timestamp"
                
                # Push vers GitHub
                git push origin main
                
                $lastCommit = $now
                Write-Host "✅ Sauvegardé et poussé vers GitHub" -ForegroundColor Green
            }
        }
        
        Start-Sleep -Seconds $IntervalSeconds
    }
    catch {
        Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
        Start-Sleep -Seconds $IntervalSeconds
    }
}
