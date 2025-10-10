# Configuration de l'Interface Admin LDK

## 🔐 Accès à l'Interface Admin

### Identifiants de connexion
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `ldk2024`

### Accès
1. Ouvrez le fichier `admin.html` dans votre navigateur
2. Entrez les identifiants ci-dessus
3. Cliquez sur "Se connecter"

## 📊 Fonctionnalités de l'Interface

### Gestion des Données
- **Réservations** : Visualisation et export des réservations de billets
- **Partenariats** : Gestion des demandes de partenariat
- **Contacts** : Messages reçus via le formulaire de contact
- **Newsletters** : Liste des abonnés à la newsletter

### Fonctionnalités
- ✅ Affichage en temps réel des statistiques
- ✅ Recherche et filtrage des données
- ✅ Export des données en JSON
- ✅ Interface responsive et moderne

## 🔗 Intégration Google Sheets

### Configuration Requise

1. **Créer un projet Google Cloud**
   - Allez sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créez un nouveau projet ou sélectionnez un existant

2. **Activer les APIs**
   - Activez l'API Google Sheets
   - Activez l'API Google Drive

3. **Créer les identifiants**
   - **Clé API** : Créez une clé API dans "Identifiants"
   - **Client ID OAuth** : Créez un ID client OAuth 2.0

4. **Configurer le fichier**
   - Ouvrez `google-config.js`
   - Remplacez `YOUR_API_KEY_HERE` par votre clé API
   - Remplacez `YOUR_CLIENT_ID_HERE` par votre Client ID

### Utilisation de Google Sheets

1. **Se connecter**
   - Allez dans l'onglet "Google Sheets"
   - Entrez l'ID de votre feuille Google Sheets
   - Cliquez sur "Se connecter à Google Sheets"

2. **Synchroniser les données**
   - **Exporter** : Envoie les données locales vers Google Sheets
   - **Importer** : Récupère les données depuis Google Sheets
   - **Créer une feuille** : Génère automatiquement une nouvelle feuille

### Structure des Feuilles
Les données sont organisées en 4 feuilles :
- `reservations` : Réservations de billets
- `partenariats` : Demandes de partenariat
- `contacts` : Messages de contact
- `newsletters` : Abonnés newsletter

## 🚀 Nouvelles Fonctionnalités

### Page des Dérivés
- **URL :** `derives.html`
- **Contenu :** Présentation des différentes initiatives LDK
- **Focus NXT :** Section dédiée à "New Xperience for Tomorrow"

### Navigation Mise à Jour
- Nouveau lien "Dérivés" dans la navigation
- Bouton "Découvrir les dérivés" sur la page d'accueil
- Liens mis à jour dans tous les footers

## 🔧 Maintenance

### Sauvegarde des Données
- Les données sont stockées dans le localStorage du navigateur
- Utilisez l'export Google Sheets pour une sauvegarde cloud
- L'export JSON permet une sauvegarde locale

### Mise à Jour
- Pour modifier les identifiants admin, éditez `admin.html` ligne 389-390
- Pour changer les clés Google API, modifiez `google-config.js`

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Responsive design pour mobile et tablette
- ✅ Fonctionne hors ligne (sauf Google Sheets)

## 🆘 Support

En cas de problème :
1. Vérifiez la console du navigateur (F12)
2. Assurez-vous que les clés API sont correctement configurées
3. Vérifiez que les APIs Google sont activées dans votre projet

---

**LDK - Legendary Dream of Kermess**  
Interface d'administration développée pour la gestion de l'événement culturel jeunesse.

