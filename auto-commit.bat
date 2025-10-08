@echo off
echo Sauvegarde automatique des modifications...
echo.

REM Ajouter tous les fichiers modifiés
git add .

REM Commit avec horodatage
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

git commit -m "Auto-save: %timestamp%"

REM Pousser vers GitHub
git push origin main

echo.
echo Sauvegarde terminee!
echo Les modifications ont ete poussees vers GitHub.
echo.
