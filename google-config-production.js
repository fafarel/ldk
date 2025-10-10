// Configuration Google API pour LDK Admin - Production
// Domaine : ldconcep.fun

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
    },

    // Configuration spécifique pour le domaine de production
    PRODUCTION_CONFIG: {
        domain: 'ldconcep.fun',
        redirectUris: [
            'https://ldconcep.fun',
            'https://ldconcep.fun/admin.html'
        ],
        allowedOrigins: [
            'https://ldconcep.fun',
            'https://www.ldconcep.fun'
        ]
    }
};

// Instructions pour la configuration OAuth sur ldconcep.fun :
/*
1. Dans Google Cloud Console, allez dans "APIs & Services" > "Identifiants"
2. Cliquez sur votre Client ID OAuth 2.0
3. Dans "URIs de redirection autorisées", ajoutez :
   - https://ldconcep.fun
   - https://ldconcep.fun/admin.html
4. Dans "Domaines autorisés", ajoutez :
   - ldconcep.fun
   - www.ldconcep.fun
5. Sauvegardez les modifications
*/

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_API_CONFIG;
}
