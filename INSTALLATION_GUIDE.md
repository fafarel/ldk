# 🚀 Guide d'installation pour le déploiement automatique

## ❌ Problème actuel
Git n'est pas installé sur votre système, c'est pourquoi les modifications ne se synchronisent pas avec GitHub.

## ✅ Solutions disponibles

### Option 1 : GitHub Desktop (RECOMMANDÉE - Plus simple)
1. Téléchargez : https://desktop.github.com/
2. Installez GitHub Desktop
3. Connectez-vous à votre compte GitHub
4. Clonez le dépôt : https://github.com/fafarel/ldk.git
5. Copiez vos fichiers dans le dossier cloné
6. Commit et push via l'interface graphique

### Option 2 : Git en ligne de commande
1. Téléchargez Git : https://git-scm.com/download/win
2. Installez avec les options par défaut
3. Redémarrez votre terminal
4. Exécutez les commandes de configuration

## 🔄 Workflow de déploiement automatique

### Avec GitHub Desktop :
1. Modifiez vos fichiers dans Cursor
2. Ouvrez GitHub Desktop
3. Voir les changements dans l'onglet "Changes"
4. Écrivez un message de commit
5. Cliquez "Commit to main"
6. Cliquez "Push origin"
7. Votre site se met à jour automatiquement sur GitHub Pages

### Avec Git en ligne de commande :
```bash
# Configuration initiale (une seule fois)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/fafarel/ldk.git
git push -u origin main

# Pour chaque modification
git add .
git commit -m "Update"
git push origin main
```

## 🌐 Vérification du déploiement

Votre site sera disponible à :
- **URL principale** : https://fafarel.github.io/ldk
- **Dépôt GitHub** : https://github.com/fafarel/ldk

## ⚡ Activation de GitHub Pages

1. Allez sur https://github.com/fafarel/ldk
2. Cliquez sur "Settings"
3. Scroll vers "Pages"
4. Source : "Deploy from a branch"
5. Branch : "main" / "/ (root)"
6. Cliquez "Save"

## 🔍 Dépannage

### Si le site ne se met pas à jour :
1. Vérifiez que les fichiers sont bien poussés sur GitHub
2. Attendez 1-2 minutes (GitHub Pages a un délai)
3. Videz le cache de votre navigateur (Ctrl+F5)
4. Vérifiez l'URL exacte : https://fafarel.github.io/ldk

### Si vous voyez une erreur 404 :
- Le fichier index.html doit être à la racine du dépôt
- Vérifiez que GitHub Pages est activé dans les Settings
