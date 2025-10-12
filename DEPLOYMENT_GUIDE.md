# Guide de Déploiement LDK - ldconcep.fun

## 🌐 Configuration pour le Domaine de Production

### Informations du Site
- **Domaine :** ldconcep.fun
- **URL Admin :** https://ldconcep.fun/admin.html
- **Identifiants Admin :** `admin` / `ldk2024`

## 🔧 Configuration Google Cloud pour ldconcep.fun

### 1. Configuration OAuth 2.0

Dans Google Cloud Console, pour votre Client ID OAuth 2.0 :

#### URIs de redirection autorisées :
```
https://ldconcep.fun
https://ldconcep.fun/admin.html
```

#### Domaines autorisés :
```
ldconcep.fun
www.ldconcep.fun
```

### 2. Restrictions de Clé API

Dans les restrictions de votre clé API, ajoutez :
```
ldconcep.fun/*
www.ldconcep.fun/*
```

## 📁 Fichiers de Configuration

### Production
Utilisez `google-config-production.js` pour la production :
```bash
cp google-config-production.js google-config.js
```

### Fichiers Essentiels
Assurez-vous que ces fichiers sont présents sur le serveur :
- ✅ `admin.html` - Interface d'administration
- ✅ `google-config.js` - Configuration Google API
- ✅ `index.html` - Page principale
- ✅ `derives.html` - Page des dérivés
- ✅ `about.html` - Page Cœur LDK
- ✅ `script.js` - Scripts JavaScript
- ✅ `styles.css` - Styles CSS
- ✅ `photoabout/photo NXT.jpg` - Logo NXT

## 🔐 Sécurité en Production

### 1. Authentification
- ✅ Identifiants admin mis à jour : `admin` / `ldk2024`
- ✅ Session sécurisée avec sessionStorage
- ✅ Protection contre l'accès non autorisé

### 2. Configuration Google
- ✅ Clés API configurées pour ldconcep.fun
- ✅ Domaines autorisés configurés
- ✅ URIs de redirection sécurisées

### 3. Recommandations
- 🔒 Utilisez HTTPS uniquement
- 🔒 Configurez un certificat SSL
- 🔒 Sauvegardez régulièrement les données
- 🔒 Surveillez les accès admin

## 🚀 Déploiement

### 1. Upload des Fichiers
```bash
# Uploader tous les fichiers vers le serveur ldconcep.fun
# Assurez-vous que la structure des dossiers est préservée
```

### 2. Test de Fonctionnement
1. Visitez https://ldconcep.fun
2. Testez la navigation vers toutes les pages
3. Accédez à https://ldconcep.fun/admin.html
4. Connectez-vous avec `admin` / `ldk2024`
5. Testez l'intégration Google Sheets

### 3. Vérification
- ✅ Site principal accessible
- ✅ Page des dérivés avec logo NXT
- ✅ Interface admin fonctionnelle
- ✅ Authentification opérationnelle
- ✅ Google Sheets connecté

## 📊 Fonctionnalités Disponibles

### Interface Admin
- **URL :** https://ldconcep.fun/admin.html
- **Authentification :** `admin` / `ldk2024`
- **Fonctionnalités :**
  - Gestion des réservations
  - Gestion des partenariats
  - Gestion des contacts
  - Gestion des newsletters
  - Synchronisation Google Sheets
  - Export/Import de données
  - Statistiques en temps réel

### Site Principal
- **URL :** https://ldconcep.fun
- **Pages :**
  - Accueil avec boutons corrigés
  - Page des dérivés avec NXT
  - Page Cœur LDK
  - Formulaire de contact
  - Système de réservation

## 🆘 Support

En cas de problème :
1. Vérifiez la console du navigateur (F12)
2. Testez l'accès aux URLs principales
3. Vérifiez la configuration Google OAuth
4. Contactez l'équipe technique

---

**LDK - Legendary Dream of Kermess**  
Site déployé sur ldconcep.fun
