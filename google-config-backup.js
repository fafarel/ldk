// Configuration de secours pour LDK Admin - ldconcep.fun
// Utilisez cette configuration si l'autre ne fonctionne pas

const GOOGLE_API_CONFIG = {
    // Clé API Google (obtenue depuis Google Cloud Console)
    API_KEY: 'AIzaSyAkHUmN3I-65XBcc_DhTl0Evb9Wfvj5ERM',
    
    // Client ID OAuth 2.0 - NOUVEAU À CRÉER
    // Créez un nouveau Client OAuth dans Google Cloud Console avec ces URIs :
    // - https://ldconcep.fun
    // - https://ldconcep.fun/admin.html
    CLIENT_ID: 'REMPLACEZ_PAR_VOTRE_NOUVEAU_CLIENT_ID',
    
    // Scopes nécessaires pour l'API Google Sheets
    SCOPES: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file'
    ],
    
    // Configuration par défaut des feuilles
    DEFAULT_SHEET_CONFIG: {
        title: 'LDK Données',
        sheets: [
            { properties: { title: 'reservations' } },
            { properties: { title: 'partenariats' } },
            { properties: { title: 'contacts' } },
            { properties: { title: 'newsletters' } }
        ]
    }
};

// INSTRUCTIONS DÉTAILLÉES POUR CRÉER UN NOUVEAU CLIENT OAUTH :

/*
1. ALLEZ DANS GOOGLE CLOUD CONSOLE :
   https://console.cloud.google.com/apis/credentials

2. CRÉEZ UN NOUVEAU CLIENT OAUTH :
   - Cliquez sur "+ CRÉER DES IDENTIFIANTS"
   - Sélectionnez "ID client OAuth 2.0"
   - Type d'application : "Application Web"
   - Nom : "LDK Admin ldconcep.fun - Nouveau"

3. CONFIGUREZ LES URIs DE REDIRECTION :
   Ajoutez EXACTEMENT ces URIs (une par ligne) :
   https://ldconcep.fun
   https://ldconcep.fun/admin.html

4. CONFIGUREZ LES DOMAINES AUTORISÉS :
   Ajoutez ces domaines :
   ldconcep.fun
   www.ldconcep.fun

5. CRÉEZ LE CLIENT ET COPIEZ L'ID :
   - Cliquez sur "CRÉER"
   - Copiez le Client ID généré
   - Remplacez "REMPLACEZ_PAR_VOTRE_NOUVEAU_CLIENT_ID" ci-dessus

6. REMPLACEZ LE FICHIER :
   - Renommez ce fichier en "google-config.js"
   - Ou remplacez le contenu du fichier google-config.js existant

7. TESTEZ :
   - Attendez 5-10 minutes
   - Videz le cache du navigateur (Ctrl+F5)
   - Testez la connexion Google Sheets
*/

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_API_CONFIG;
}

