// Configuration Google API pour LDK Admin
// Généré automatiquement le 10/10/2025 18:01:50

const GOOGLE_API_CONFIG = {
    // Clé API Google (obtenue depuis Google Cloud Console)
    API_KEY: 'AIzaSyAkHUmN3I-65XBcc_DhTl0Evb9Wfvj5ERM',
    
    // Client ID OAuth 2.0 (obtenu depuis Google Cloud Console)
    CLIENT_ID: '294945403393-a6bm34sbokns85ak9rrh5ql7qnj0sslt.apps.googleusercontent.com',
    
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

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_API_CONFIG;
}