// Script de géolocalisation pour LDK - ldconcep.fun
// Track les visiteurs et enregistre leur localisation

(function() {
    'use strict';

    // Configuration
    const TRACKING_CONFIG = {
        enabled: true,
        apiEndpoint: 'https://ipapi.co/json/', // Service gratuit de géolocalisation
        storageKey: 'ldk_visitors',
        maxVisitors: 1000, // Limiter le nombre de visiteurs stockés
        trackingInterval: 30000 // 30 secondes entre les vérifications
    };

    // Vérifier si le tracking est déjà en cours
    if (sessionStorage.getItem('ldk_tracking_active')) {
        return;
    }

    // Marquer le tracking comme actif
    sessionStorage.setItem('ldk_tracking_active', 'true');

    // Fonction principale de tracking
    async function trackVisitor() {
        try {
            // Obtenir les informations de géolocalisation
            const geoData = await getGeolocationData();
            
            if (geoData) {
                // Créer l'objet visiteur
                const visitor = {
                    id: generateVisitorId(),
                    timestamp: new Date().toISOString(),
                    country: geoData.country_name || 'Inconnu',
                    city: geoData.city || 'Inconnu',
                    region: geoData.region || 'Inconnu',
                    latitude: geoData.latitude,
                    longitude: geoData.longitude,
                    timezone: geoData.timezone,
                    browser: getBrowserInfo(),
                    os: getOSInfo(),
                    screen: getScreenInfo(),
                    language: navigator.language,
                    referrer: document.referrer || 'Direct',
                    url: window.location.href
                };

                // Enregistrer le visiteur
                saveVisitor(visitor);
                
                console.log('Visiteur tracké:', visitor);
            }
        } catch (error) {
            console.error('Erreur lors du tracking:', error);
        }
    }

    // Obtenir les données de géolocalisation
    async function getGeolocationData() {
        try {
            // Essayer d'abord avec l'API du navigateur (plus précise)
            if (navigator.geolocation) {
                const position = await getCurrentPosition();
                if (position) {
                    // Utiliser les coordonnées pour obtenir les informations de pays/ville
                    const reverseGeo = await reverseGeocode(position.coords.latitude, position.coords.longitude);
                    return reverseGeo;
                }
            }
        } catch (error) {
            console.log('Géolocalisation du navigateur non disponible:', error);
        }

        // Fallback vers l'API IP
        try {
            const response = await fetch(TRACKING_CONFIG.apiEndpoint);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Erreur API IP:', error);
        }

        // Fallback avec des données par défaut
        return {
            country_name: 'Côte d\'Ivoire', // Pays par défaut
            city: 'Abidjan',
            region: 'Lagunes',
            latitude: 5.316667,
            longitude: -4.033333,
            timezone: 'Africa/Abidjan'
        };
    }

    // Obtenir la position géographique du navigateur
    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error),
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }

    // Reverse geocoding pour obtenir pays/ville à partir des coordonnées
    async function reverseGeocode(lat, lon) {
        try {
            // Utiliser un service de reverse geocoding gratuit
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=fr`);
            if (response.ok) {
                const data = await response.json();
                return {
                    country_name: data.countryName,
                    city: data.city,
                    region: data.principalSubdivision,
                    latitude: lat,
                    longitude: lon,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                };
            }
        } catch (error) {
            console.error('Erreur reverse geocoding:', error);
        }
        return null;
    }

    // Générer un ID unique pour le visiteur
    function generateVisitorId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `visitor_${timestamp}_${random}`;
    }

    // Obtenir les informations du navigateur
    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browser = 'Inconnu';
        
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        else if (userAgent.includes('Opera')) browser = 'Opera';
        
        return browser;
    }

    // Obtenir les informations du système d'exploitation
    function getOSInfo() {
        const userAgent = navigator.userAgent;
        let os = 'Inconnu';
        
        if (userAgent.includes('Windows')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iOS')) os = 'iOS';
        
        return os;
    }

    // Obtenir les informations d'écran
    function getScreenInfo() {
        return {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio || 1
        };
    }

    // Sauvegarder le visiteur
    function saveVisitor(visitor) {
        try {
            // Récupérer les visiteurs existants
            let visitors = JSON.parse(localStorage.getItem(TRACKING_CONFIG.storageKey) || '[]');
            
            // Vérifier si ce visiteur existe déjà (même pays/ville dans les 5 dernières minutes)
            const now = new Date();
            const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
            
            const isDuplicate = visitors.some(existingVisitor => {
                const visitorTime = new Date(existingVisitor.timestamp);
                return existingVisitor.country === visitor.country &&
                       existingVisitor.city === visitor.city &&
                       visitorTime > fiveMinutesAgo;
            });
            
            // Si ce n'est pas un doublon, ajouter le visiteur
            if (!isDuplicate) {
                visitors.push(visitor);
                
                // Limiter le nombre de visiteurs stockés
                if (visitors.length > TRACKING_CONFIG.maxVisitors) {
                    visitors = visitors.slice(-TRACKING_CONFIG.maxVisitors);
                }
                
                // Sauvegarder
                localStorage.setItem(TRACKING_CONFIG.storageKey, JSON.stringify(visitors));
                
                // Déclencher un événement personnalisé pour notifier l'ajout
                window.dispatchEvent(new CustomEvent('ldkVisitorTracked', {
                    detail: { visitor: visitor, totalVisitors: visitors.length }
                }));
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du visiteur:', error);
        }
    }

    // Fonction pour obtenir les statistiques des visiteurs
    function getVisitorStats() {
        try {
            const visitors = JSON.parse(localStorage.getItem(TRACKING_CONFIG.storageKey) || '[]');
            
            const stats = {
                total: visitors.length,
                countries: {},
                cities: {},
                browsers: {},
                recent: visitors.slice(-10).reverse()
            };
            
            visitors.forEach(visitor => {
                // Compter par pays
                stats.countries[visitor.country] = (stats.countries[visitor.country] || 0) + 1;
                
                // Compter par ville
                stats.cities[visitor.city] = (stats.cities[visitor.city] || 0) + 1;
                
                // Compter par navigateur
                stats.browsers[visitor.browser] = (stats.browsers[visitor.browser] || 0) + 1;
            });
            
            return stats;
        } catch (error) {
            console.error('Erreur lors du calcul des statistiques:', error);
            return { total: 0, countries: {}, cities: {}, browsers: {}, recent: [] };
        }
    }

    // Exposer les fonctions utiles globalement
    window.LDKGeoTracker = {
        track: trackVisitor,
        getStats: getVisitorStats,
        config: TRACKING_CONFIG
    };

    // Démarrer le tracking immédiatement
    if (TRACKING_CONFIG.enabled) {
        // Tracking immédiat
        setTimeout(trackVisitor, 1000);
        
        // Tracking périodique (toutes les 30 secondes)
        setInterval(trackVisitor, TRACKING_CONFIG.trackingInterval);
        
        // Tracking lors des changements de page
        window.addEventListener('beforeunload', () => {
            trackVisitor();
        });
        
        // Tracking lors de la navigation SPA
        window.addEventListener('popstate', () => {
            setTimeout(trackVisitor, 1000);
        });
    }

    // Log de démarrage
    console.log('🌍 LDK GeoTracker activé pour ldconcep.fun');
    
})();
