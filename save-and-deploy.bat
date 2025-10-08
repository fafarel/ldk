@echo off
echo 🚀 Sauvegarde et déploiement automatique LDK...
echo.

REM Ajouter tous les fichiers modifiés
git add .

REM Commit avec horodatage
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

git commit -m "Auto-deploy: %timestamp%"

REM Pousser vers GitHub
git push origin main

echo.
echo ✅ Déploiement terminé!
echo 🌐 Votre site sera mis à jour dans quelques secondes sur:
echo    https://fafarel.github.io/ldk
echo.
pause
