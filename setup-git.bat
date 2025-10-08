@echo off
echo Configuration du depot Git pour LDK...
echo.

REM Initialiser le depot Git
git init

REM Ajouter tous les fichiers
git add .

REM Premier commit
git commit -m "Initial commit - LDK Festival Website"

REM Ajouter le remote GitHub
git remote add origin https://github.com/fafarel/ldk.git

REM Pousser vers GitHub
git branch -M main
git push -u origin main

echo.
echo Configuration terminee!
echo Votre site est maintenant connecte a GitHub.
echo.
pause
