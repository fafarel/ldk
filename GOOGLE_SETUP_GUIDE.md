# Guide de Configuration Google Sheets pour LDK

## 📋 Étapes de Configuration

### 1. Créer un Projet Google Cloud

1. **Allez sur Google Cloud Console**
   - Ouvrez [console.cloud.google.com](https://console.cloud.google.com/)
   - Connectez-vous avec votre compte Google

2. **Créer un nouveau projet**
   - Cliquez sur le sélecteur de projet en haut
   - Cliquez sur "NOUVEAU PROJET"
   - Nom : `LDK-Admin-Sheets`
   - Cliquez sur "CRÉER"

### 2. Activer les APIs Nécessaires

1. **Aller à la page APIs & Services**
   - Dans le menu latéral, cliquez sur "APIs & Services" > "Bibliothèque"

2. **Activer Google Sheets API**
   - Recherchez "Google Sheets API"
   - Cliquez dessus et cliquez sur "ACTIVER"

3. **Activer Google Drive API**
   - Recherchez "Google Drive API"
   - Cliquez dessus et cliquez sur "ACTIVER"

### 3. Créer les Identifiants

#### A. Créer une Clé API

1. **Aller aux identifiants**
   - Dans le menu, cliquez sur "APIs & Services" > "Identifiants"

2. **Créer une clé API**
   - Cliquez sur "CRÉER DES IDENTIFIANTS" > "Clé API"
   - Copiez la clé générée (gardez-la secrète !)

#### B. Créer un Client ID OAuth 2.0

1. **Configurer l'écran de consentement OAuth**
   - Cliquez sur "APIs & Services" > "Écran de consentement OAuth"
   - Choisissez "Externe" (sauf si vous avez un compte Google Workspace)
   - Remplissez les champs obligatoires :
     - Nom de l'application : `LDK Admin Interface`
     - Email de support : votre email
     - Email de contact développeur : votre email
   - Cliquez sur "ENREGISTRER ET CONTINUER"

2. **Créer le Client ID**
   - Retournez aux "Identifiants"
   - Cliquez sur "CRÉER DES IDENTIFIANTS" > "ID client OAuth 2.0"
   - Type d'application : "Application Web"
   - Nom : `LDK Admin Sheets Client`
   - URIs de redirection autorisées :
     - `http://localhost` (pour test local)
     - `https://ldconcep.fun` (domaine de production)
     - `https://ldconcep.fun/admin.html` (URL admin)
   - Domaines autorisés :
     - `ldconcep.fun`
     - `www.ldconcep.fun`
   - Cliquez sur "CRÉER"
   - Copiez le Client ID généré

### 4. Configurer le Fichier de Configuration

1. **Ouvrir le fichier de configuration**
   - Ouvrez `google-config.js` dans votre éditeur

2. **Remplacer les valeurs**
   ```javascript
   const GOOGLE_API_CONFIG = {
       API_KEY: 'VOTRE_CLÉ_API_ICI',
       CLIENT_ID: 'VOTRE_CLIENT_ID_ICI',
       // ... reste du fichier
   };
   ```

3. **Sauvegarder le fichier**

### 5. Tester la Configuration

1. **Ouvrir l'interface admin**
   - Ouvrez `admin.html` dans votre navigateur
   - Connectez-vous avec : `ldk_admin` / `ldk2024_admin`

2. **Tester Google Sheets**
   - Allez dans l'onglet "Google Sheets"
   - Cliquez sur "Créer une nouvelle feuille"
   - Autorisez l'accès quand demandé
   - Testez l'export/import de données

## 🔒 Sécurité

### Bonnes Pratiques

1. **Ne jamais commiter les clés**
   - Ajoutez `google-config.js` à votre `.gitignore`
   - Utilisez des variables d'environnement en production

2. **Restreindre les clés API**
   - Dans Google Cloud Console, allez aux "Identifiants"
   - Cliquez sur votre clé API
   - Sous "Restrictions d'application", choisissez "HTTP referrers"
   - Ajoutez votre domaine : `https://votre-domaine.com/*`

3. **Configurer les domaines OAuth**
   - Dans votre Client ID OAuth, ajoutez vos domaines autorisés
   - Limitez les URIs de redirection à vos domaines

## 🚨 Dépannage

### Erreurs Communes

1. **"API key not valid"**
   - Vérifiez que la clé API est correctement copiée
   - Assurez-vous que les APIs sont activées

2. **"Client ID not found"**
   - Vérifiez le Client ID dans `google-config.js`
   - Assurez-vous que l'écran de consentement est configuré

3. **"Access blocked"**
   - L'application n'est pas encore vérifiée par Google
   - Cliquez sur "Avancé" puis "Aller à [nom de l'app] (non sécurisé)"
   - Ou ajoutez des utilisateurs de test dans l'écran de consentement

4. **"Redirect URI mismatch"**
   - Vérifiez les URIs de redirection dans votre Client ID OAuth
   - Ajoutez l'URL exacte de votre site

### Logs de Débogage

Ouvrez la console du navigateur (F12) pour voir les messages d'erreur détaillés.

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur
2. Consultez la documentation Google Sheets API
3. Vérifiez que tous les prérequis sont remplis

---

**Note :** Gardez vos clés API secrètes et ne les partagez jamais publiquement !

