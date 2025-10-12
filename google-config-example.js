// EXEMPLE de Configuration Google API pour LDK Admin
// Copiez ce fichier vers google-config.js et remplacez les valeurs

const GOOGLE_API_CONFIG = {
    // Clé API Google (obtenue depuis Google Cloud Console)
    // Format: AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    API_KEY: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    
    // Client ID OAuth 2.0 (obtenu depuis Google Cloud Console)
    // Format: 123456789-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
    CLIENT_ID: '123456789-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    
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

// Instructions pour obtenir vos clés API :
/*
1. Allez sur Google Cloud Console (https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google Sheets et Google Drive
4. Créez des identifiants :
   - Pour API_KEY : Créez une clé API dans "Identifiants"
   - Pour CLIENT_ID : Créez un ID client OAuth 2.0
5. Configurez les domaines autorisés dans la configuration OAuth
6. Remplacez les valeurs ci-dessus par vos vraies clés
*/

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_API_CONFIG;
}

