// Configuration Google API pour LDK Admin - ldconcep.fun
// Configuration spécifique pour résoudre l'erreur redirect_uri_mismatch

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

// INSTRUCTIONS IMPORTANTES POUR RÉSOUDRE L'ERREUR :
/*
1. Allez dans Google Cloud Console > APIs & Services > Identifiants
2. Cliquez sur votre Client ID OAuth 2.0
3. Dans "URIs de redirection autorisées", ajoutez EXACTEMENT :
   - https://ldconcep.fun
   - https://ldconcep.fun/admin.html
4. Supprimez toutes les autres URIs de redirection
5. Dans "Domaines autorisés", ajoutez :
   - ldconcep.fun
   - www.ldconcep.fun
6. Cliquez sur "ENREGISTRER"
7. Attendez 5-10 minutes pour que les changements prennent effet
8. Testez à nouveau la connexion
*/

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_API_CONFIG;
}
