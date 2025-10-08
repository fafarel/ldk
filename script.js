// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Changement de couleur de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Système d'onglets pour le programme (adapté pour LDK)
const tabBtns = document.querySelectorAll('.tab-btn');
const timeSchedules = document.querySelectorAll('.time-schedule');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons et contenus
        tabBtns.forEach(b => b.classList.remove('active'));
        timeSchedules.forEach(schedule => schedule.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        btn.classList.add('active');
        
        // Afficher le contenu correspondant
        const targetTime = btn.getAttribute('data-time');
        const targetSchedule = document.getElementById(targetTime);
        if (targetSchedule) {
            targetSchedule.classList.add('active');
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer (adapté pour LDK)
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.activite-card, .partenaire-card, .billet-card, .event, .stat, .impact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Compteur animé pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Animation des compteurs quand ils sont visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const text = statNumber.textContent;
            const number = parseInt(text.replace('+', ''));
            
            if (!entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validation basique
        if (!name || !email || !subject || !message) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        // Simulation d'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Message envoyé avec succès ! L\'équipe LDK vous répondra dans les plus brefs délais.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Boutons de réservation (adapté pour LDK)
document.querySelectorAll('.billet-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const card = btn.closest('.billet-card');
        const type = card.querySelector('h3').textContent;
        const prix = card.querySelector('.prix').textContent;
        
        // Vérification pour les billets gratuits
        if (prix === 'Gratuit') {
            const confirmed = confirm(`Confirmer la réservation pour ${type} (Gratuit pour les élèves partenaires) ?`);
            
            if (confirmed) {
                alert('Réservation confirmée ! Vous recevrez un email de confirmation avec les détails d\'accès.');
            }
        } else {
            // Simulation de réservation payante
        const confirmed = confirm(`Confirmer la réservation pour ${type} (${prix}) ?`);
        
        if (confirmed) {
                alert('Réservation confirmée ! Vous serez redirigé vers la page de paiement.');
            }
        }
    });
});

// Effet parallaxe pour les éléments flottants
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.element');
    
    elements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Préchargement des images
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Appeler la fonction de préchargement
preloadImages();

// Gestion des erreurs d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
    });
});

// Ajout d'un effet de loading
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Gestion du mode sombre (persistant avec icône dynamique)
function setDarkModeEnabled(enabled) {
    const shouldEnable = Boolean(enabled);
    document.body.classList.toggle('dark-mode', shouldEnable);
    try { localStorage.setItem('darkMode', shouldEnable); } catch (e) {}
}

function updateDarkModeButtonIcon(button) {
    const isDark = document.body.classList.contains('dark-mode');
    button.innerHTML = isDark ? '☀️' : '🌙';
    button.setAttribute('aria-label', isDark ? 'Basculer en mode clair' : 'Basculer en mode sombre');
    button.setAttribute('title', isDark ? 'Mode clair' : 'Mode sombre');
}

function toggleDarkMode() {
    const newState = !document.body.classList.contains('dark-mode');
    setDarkModeEnabled(newState);
    updateDarkModeButtonIcon(darkModeBtn);
}

// État initial depuis localStorage
try {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
} catch (e) {}

// Ajouter un bouton pour le mode sombre
const darkModeBtn = document.createElement('button');
darkModeBtn.className = 'dark-mode-btn';
darkModeBtn.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
    background: rgba(255,255,255,0.9);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
`;
updateDarkModeButtonIcon(darkModeBtn);
darkModeBtn.addEventListener('click', toggleDarkMode);
document.body.appendChild(darkModeBtn);

// Effet de particules en arrière-plan (optionnel)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight}px)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Créer des particules périodiquement
setInterval(createParticle, 3000);

// Gestion de la taille de l'écran
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Appel initial

// Animation spéciale pour les statistiques du hero
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text.replace('+', ''));
                    animateCounter(stat, number, 1500);
                } else if (text.includes('-')) {
                    // Pour les plages d'âge comme "14-25"
                    stat.style.color = '#f39c12';
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(stats => {
    heroStatsObserver.observe(stats);
});

// Gestion des modales
function openReservationModal(type) {
    const modal = document.getElementById('reservationModal');
    const billetSelect = document.getElementById('billetType');
    
    if (modal && billetSelect) {
        // Pré-sélectionner le type de billet
        billetSelect.value = type;
        // Déclencher la mise à jour de l'UI paiement
        try {
            billetSelect.dispatchEvent(new Event('change'));
        } catch (e) {}
        
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Réinitialiser le formulaire
        const form = document.getElementById('reservationForm');
        if (form) {
            form.reset();
        }
    }
}

function openPartenariatModal() {
    const modal = document.getElementById('partenariatModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closePartenariatModal() {
    const modal = document.getElementById('partenariatModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Réinitialiser le formulaire
        const form = document.getElementById('partenariatForm');
        if (form) {
            form.reset();
        }
    }
}

function closeNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    if (popup) {
        popup.style.display = 'none';
        
        // Sauvegarder dans localStorage pour ne plus l'afficher
        try {
            localStorage.setItem('newsletterShown', 'true');
        } catch (e) {
            console.warn('Impossible de sauvegarder dans localStorage:', e);
        }
    }
}

// Gestion des formulaires
document.addEventListener('DOMContentLoaded', function() {
    
    // Formulaire de réservation
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReservationForm(this);
        });
    }
    
    // Formulaire de partenariat
    const partenariatForm = document.getElementById('partenariatForm');
    if (partenariatForm) {
        partenariatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePartenariatForm(this);
        });
    }
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Formulaire de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
    
    // Afficher le popup newsletter après 30 secondes
    setTimeout(function() {
        try {
            if (!localStorage.getItem('newsletterShown')) {
                const popup = document.getElementById('newsletterPopup');
                if (popup) {
                    popup.style.display = 'block';
                }
            }
        } catch (e) {
            console.warn('Impossible d\'accéder au localStorage:', e);
        }
    }, 30000);
    
    // Fermer les modales en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        const reservationModal = document.getElementById('reservationModal');
        const partenariatModal = document.getElementById('partenariatModal');
        const applyModal = document.getElementById('applyModal');
        const newsletterPopup = document.getElementById('newsletterPopup');
        
        if (e.target === reservationModal) {
            closeReservationModal();
        }
        if (e.target === partenariatModal) {
            closePartenariatModal();
        }
        if (e.target === applyModal) {
            closeApplyModal();
        }
        if (e.target === newsletterPopup) {
            closeNewsletterPopup();
        }
    });
});

// Système de géolocalisation et horodatage
let userLocation = null;
let timezone = null;

// Fonction pour obtenir la géolocalisation
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            console.warn('Géolocalisation non supportée par ce navigateur');
            resolve(null);
            return;
        }

        // Essayer d'abord la géolocalisation rapide
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                    source: 'geolocation'
                };
                console.log('Localisation obtenue:', location);
                
                // Sauvegarder la localisation pour réutilisation
                try {
                    localStorage.setItem('ldk_user_location', JSON.stringify(location));
                } catch (e) {
                    console.warn('Impossible de sauvegarder la localisation:', e);
                }
                
                resolve(location);
            },
            (error) => {
                console.warn('Erreur de géolocalisation:', error.message);
                
                // Essayer de récupérer une localisation précédemment sauvegardée
                try {
                    const savedLocation = localStorage.getItem('ldk_user_location');
                    if (savedLocation) {
                        const parsedLocation = JSON.parse(savedLocation);
                        const now = Date.now();
                        const locationAge = now - parsedLocation.timestamp;
                        
                        // Si la localisation a moins de 1 heure, l'utiliser
                        if (locationAge < 3600000) {
                            console.log('Utilisation de la localisation sauvegardée:', parsedLocation);
                            resolve(parsedLocation);
                            return;
                        }
                    }
                } catch (e) {
                    console.warn('Erreur lors de la récupération de la localisation sauvegardée:', e);
                }
                
                resolve(null);
            },
            {
                enableHighAccuracy: false, // Plus rapide
                timeout: 5000, // Timeout plus court
                maximumAge: 300000 // 5 minutes
            }
        );
    });
}

// Fonction pour obtenir le fuseau horaire
function getTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
        console.warn('Impossible d\'obtenir le fuseau horaire:', error);
        return 'UTC';
    }
}

// Fonction pour créer un horodatage enrichi
function createEnrichedTimestamp() {
    const now = new Date();
    return {
        iso: now.toISOString(),
        local: now.toLocaleString('fr-FR', {
            timeZone: timezone || 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        timestamp: now.getTime(),
        timezone: timezone || 'UTC',
        dayOfWeek: now.toLocaleDateString('fr-FR', { weekday: 'long' }),
        month: now.toLocaleDateString('fr-FR', { month: 'long' }),
        year: now.getFullYear()
    };
}

// Fonction pour obtenir les informations du navigateur
function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    };
}

// Fonction pour obtenir l'URL de référence
function getReferrerInfo() {
    return {
        referrer: document.referrer,
        currentUrl: window.location.href,
        hostname: window.location.hostname,
        pathname: window.location.pathname
    };
}

// Initialisation du système de localisation
async function initializeLocationSystem() {
    try {
        // Obtenir le fuseau horaire
        timezone = getTimezone();
        
        // Vérifier d'abord si on a une localisation récente sauvegardée
        try {
            const savedLocation = localStorage.getItem('ldk_user_location');
            if (savedLocation) {
                const parsedLocation = JSON.parse(savedLocation);
                const now = Date.now();
                const locationAge = now - parsedLocation.timestamp;
                
                // Si la localisation a moins de 30 minutes, l'utiliser immédiatement
                if (locationAge < 1800000) {
                    userLocation = parsedLocation;
                    console.log('Localisation récupérée depuis le cache:', userLocation);
                }
            }
        } catch (e) {
            console.warn('Erreur lors de la récupération de la localisation sauvegardée:', e);
        }
        
        // Demander une nouvelle géolocalisation en arrière-plan
        const newLocation = await getUserLocation();
        if (newLocation) {
            userLocation = newLocation;
        }
        
        console.log('Système de localisation initialisé:', {
            timezone: timezone,
            location: userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : 'Non disponible',
            accuracy: userLocation ? `${Math.round(userLocation.accuracy)}m` : 'N/A'
        });
        
        // Créer un indicateur visuel pour la géolocalisation
        createLocationIndicator();
        
    } catch (error) {
        console.warn('Erreur lors de l\'initialisation de la localisation:', error);
    }
}

// Fonction pour créer un indicateur de géolocalisation
function createLocationIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'location-indicator';
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    if (userLocation) {
        indicator.innerHTML = `📍 ${Math.round(userLocation.latitude * 10000) / 10000}, ${Math.round(userLocation.longitude * 10000) / 10000}`;
        indicator.style.opacity = '1';
    } else {
        indicator.innerHTML = '📍 Géolocalisation non disponible';
        indicator.style.opacity = '0.6';
    }
    
    document.body.appendChild(indicator);
    
    // Masquer l'indicateur après 5 secondes
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 300);
    }, 5000);
}

// Fonction enrichie pour sauvegarder les données
function saveEnrichedData(data, type) {
    try {
        const enrichedData = {
            ...data,
            metadata: {
                timestamp: createEnrichedTimestamp(),
                location: userLocation,
                browser: getBrowserInfo(),
                referrer: getReferrerInfo(),
                sessionId: getSessionId()
            },
            type: type
        };

        const storageKey = `ldk_${type}s`;
        const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
        existingData.push(enrichedData);
        localStorage.setItem(storageKey, JSON.stringify(existingData));

        console.log(`${type} sauvegardé avec métadonnées enrichies`);
        return enrichedData;
    } catch (error) {
        console.warn(`Impossible de sauvegarder les données de ${type}:`, error);
        return null;
    }
}

// Fonction pour générer un ID de session unique
function getSessionId() {
    let sessionId = sessionStorage.getItem('ldk_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('ldk_session_id', sessionId);
    }
    return sessionId;
}

// Fonction pour tracer les interactions utilisateur
function trackUserInteraction(action, details = {}) {
    try {
        const interaction = {
            action: action,
            details: details,
            metadata: {
                timestamp: createEnrichedTimestamp(),
                location: userLocation,
                browser: getBrowserInfo(),
                referrer: getReferrerInfo(),
                sessionId: getSessionId()
            }
        };

        const interactions = JSON.parse(localStorage.getItem('ldk_interactions') || '[]');
        interactions.push(interaction);
        localStorage.setItem('ldk_interactions', JSON.stringify(interactions));

        console.log('Interaction tracée:', action);
    } catch (error) {
        console.warn('Impossible de tracer l\'interaction:', error);
    }
}

// Initialiser le système au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeLocationSystem();
    
    // Tracer le chargement de la page
    trackUserInteraction('page_load', {
        page: 'ldk_homepage',
        loadTime: performance.now()
    });
});

// Fonctions de sauvegarde mises à jour
function saveReservationData(data) {
    return saveEnrichedData(data, 'reservation');
}

function savePartenariatData(data) {
    return saveEnrichedData(data, 'partenariat');
}

function saveContactData(data) {
    return saveEnrichedData(data, 'contact');
}

function saveNewsletterData(data) {
    return saveEnrichedData(data, 'newsletter');
}

// Fonction pour analyser les données de géolocalisation
function analyzeLocationData(allData) {
    const locationStats = {
        totalEntries: allData.length,
        entriesWithLocation: 0,
        entriesWithoutLocation: 0,
        locationAccuracy: {
            high: 0, // < 100m
            medium: 0, // 100m - 1km
            low: 0 // > 1km
        },
        uniqueLocations: new Set(),
        timezoneDistribution: {},
        recentLocations: []
    };
    
    allData.forEach(entry => {
        if (entry.metadata && entry.metadata.location) {
            locationStats.entriesWithLocation++;
            
            const location = entry.metadata.location;
            const accuracy = location.accuracy || 0;
            
            // Classer par précision
            if (accuracy < 100) {
                locationStats.locationAccuracy.high++;
            } else if (accuracy < 1000) {
                locationStats.locationAccuracy.medium++;
            } else {
                locationStats.locationAccuracy.low++;
            }
            
            // Collecter les localisations uniques
            const locationKey = `${Math.round(location.latitude * 1000) / 1000},${Math.round(location.longitude * 1000) / 1000}`;
            locationStats.uniqueLocations.add(locationKey);
            
            // Collecter les localisations récentes (moins de 24h)
            const entryTime = new Date(entry.metadata.timestamp || entry.timestamp);
            const now = new Date();
            if (now - entryTime < 24 * 60 * 60 * 1000) {
                locationStats.recentLocations.push({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    timestamp: entry.metadata.timestamp || entry.timestamp,
                    type: entry.type
                });
            }
        } else {
            locationStats.entriesWithoutLocation++;
        }
    });
    
    locationStats.uniqueLocationCount = locationStats.uniqueLocations.size;
    delete locationStats.uniqueLocations; // Pas besoin de garder le Set dans l'export
    
    return locationStats;
}

// Fonction d'export enrichie
function exportCollectedData() {
    try {
        const reservations = JSON.parse(localStorage.getItem('ldk_reservations') || '[]');
        const partenariats = JSON.parse(localStorage.getItem('ldk_partenariats') || '[]');
        const contacts = JSON.parse(localStorage.getItem('ldk_contacts') || '[]');
        const newsletters = JSON.parse(localStorage.getItem('ldk_newsletters') || '[]');
        const interactions = JSON.parse(localStorage.getItem('ldk_interactions') || '[]');
        
        // Analyser les données de géolocalisation
        const locationStats = analyzeLocationData([...reservations, ...partenariats, ...contacts, ...newsletters]);
        
        const data = {
            reservations: reservations,
            partenariats: partenariats,
            contacts: contacts,
            newsletters: newsletters,
            interactions: interactions,
            exportDate: createEnrichedTimestamp(),
            currentLocation: userLocation,
            summary: {
                totalReservations: reservations.length,
                totalPartenariats: partenariats.length,
                totalContacts: contacts.length,
                totalNewsletters: newsletters.length,
                totalInteractions: interactions.length,
                locationStats: locationStats
            }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ldk_data_enriched_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('Données enrichies exportées avec succès !');
        trackUserInteraction('data_export', { dataType: 'enriched' });
    } catch (error) {
        console.error('Erreur lors de l\'export des données:', error);
        alert('Erreur lors de l\'export des données. Veuillez réessayer.');
    }
}

// Fonction pour obtenir des statistiques en temps réel
function getLDKStats() {
    try {
        const stats = {
            reservations: JSON.parse(localStorage.getItem('ldk_reservations') || '[]').length,
            partenariats: JSON.parse(localStorage.getItem('ldk_partenariats') || '[]').length,
            contacts: JSON.parse(localStorage.getItem('ldk_contacts') || '[]').length,
            newsletters: JSON.parse(localStorage.getItem('ldk_newsletters') || '[]').length,
            interactions: JSON.parse(localStorage.getItem('ldk_interactions') || '[]').length,
            lastUpdate: createEnrichedTimestamp()
        };
        
        console.log('Statistiques LDK:', stats);
        return stats;
    } catch (error) {
        console.error('Erreur lors du calcul des statistiques:', error);
        return null;
    }
}

// Tracer les interactions importantes
function trackFormSubmission(formType) {
    trackUserInteraction('form_submission', {
        formType: formType,
        timestamp: createEnrichedTimestamp()
    });
}

function trackModalOpen(modalType) {
    trackUserInteraction('modal_open', {
        modalType: modalType,
        timestamp: createEnrichedTimestamp()
    });
}

// Mettre à jour les fonctions existantes pour inclure le tracking
function openReservationModal(type) {
    const modal = document.getElementById('reservationModal');
    const billetSelect = document.getElementById('billetType');
    
    if (modal && billetSelect) {
        billetSelect.value = type;
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        trackModalOpen('reservation');
        trackUserInteraction('billet_selection', { billetType: type });
        // Déclencher la mise à jour de l'UI paiement
        try {
            billetSelect.dispatchEvent(new Event('change'));
        } catch (e) {}
    }
}

function openPartenariatModal() {
    const modal = document.getElementById('partenariatModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        trackModalOpen('partenariat');
    }
}

// Mettre à jour les fonctions de traitement des formulaires
function handleReservationForm(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        // Calcul du montant en fonction du type de billet
        const type = data.billetType;
        const nombre = parseInt(data.nombre || '1', 10);
        const prixParType = {
            standard: 5000,
            privilegie: 0,
            vip: 15000
        };
        const prixUnitaire = prixParType[type] ?? 0;
        const total = prixUnitaire * nombre;
        data.prixUnitaire = prixUnitaire;
        data.total = total;
        data.devise = 'FCFA';
        
        if (!validateReservationData(data)) {
            return;
        }
        
        // Si billet gratuit, pas de paiement
        if (prixUnitaire === 0) {
            showLoading(form);
            setTimeout(() => {
                hideLoading(form);
                showSuccessMessage(form, 'Réservation enregistrée avec succès ! Aucune somme due pour ce billet.');
                saveReservationData({ ...data, statutPaiement: 'gratuit' });
                trackFormSubmission('reservation');
                setTimeout(() => closeReservationModal(), 2000);
            }, 1200);
            return;
        }

        // Validation des champs de paiement
        const method = form.querySelector('input[name="paymentMethod"]:checked');
        const walletPhone = (form.querySelector('#walletPhone')?.value || '').trim();
        if (!method) {
            showErrorMessage('Veuillez choisir un moyen de paiement (MTN ou Wave).');
            return;
        }
        if (!walletPhone || walletPhone.length < 8) {
            showErrorMessage('Veuillez saisir un numéro Mobile Money valide.');
            return;
        }

        data.paymentMethod = method.value;
        data.walletPhone = walletPhone;

        showLoading(form);

        if (method.value === 'mtn') {
            // MTN: déclenche un debit USSD/Push et on poll le statut
            fetch('/api/payments/mtn/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total, currency: 'XOF', phone: walletPhone, payerMessage: 'LDK Billets', payeeNote: 'Paiement LDK' })
            })
            .then(r => r.json())
            .then(async resp => {
                if (!resp.referenceId) throw new Error(resp.error || 'Erreur d’initiation MTN');
                trackUserInteraction('payment_initiated', { provider: 'mtn', amount: total, currency: 'FCFA' });
                // Polling statut
                const referenceId = resp.referenceId;
                const maxAttempts = 10;
                let attempt = 0;
                const poll = () => new Promise(resolve => setTimeout(resolve, 2000));
                let lastStatus = 'PENDING';
                while (attempt < maxAttempts) {
                    attempt++;
                    try {
                        const statusResp = await fetch(`/api/payments/mtn/status/${referenceId}`).then(r => r.json());
                        lastStatus = (statusResp.status || statusResp?.financialTransactionId) ? statusResp.status : lastStatus;
                        if (statusResp.status === 'SUCCESSFUL') {
                            hideLoading(form);
                            showSuccessMessage(form, `Paiement MTN réussi ! Total: ${total.toLocaleString('fr-FR')} FCFA`);
                            saveReservationData({ ...data, statutPaiement: 'payé', provider: 'mtn', referenceId });
                            trackFormSubmission('reservation');
                            setTimeout(() => closeReservationModal(), 2000);
                            return;
                        }
                        if (statusResp.status === 'FAILED' || statusResp.status === 'REJECTED') {
                            throw new Error('Paiement MTN refusé/échoué');
                        }
                    } catch (err) {
                        hideLoading(form);
                        showErrorMessage('Paiement MTN échoué. Veuillez réessayer.');
                        return;
                    }
                    await poll();
                }
                hideLoading(form);
                showErrorMessage('Temps dépassé pour la confirmation MTN. Vérifiez votre téléphone.');
            })
            .catch(err => {
                hideLoading(form);
                showErrorMessage('Erreur lors de l’initiation du paiement MTN.');
            });
        } else if (method.value === 'wave') {
            // Wave: ouvrir une page de paiement externe, puis revenir via success_url/cancel_url
            // Conserver la réservation en attente pour la finaliser au retour
            try {
                sessionStorage.setItem('ldk_pending_reservation', JSON.stringify({ ...data, statutPaiement: 'en_attente', provider: 'wave' }));
            } catch (e) {}
            fetch('/api/payments/wave/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total, currency: 'XOF', clientReference: `LDK-${Date.now()}` })
            })
            .then(r => r.json())
            .then(resp => {
                hideLoading(form);
                const redirectUrl = resp.checkout_url || resp.payment_url || resp.url || resp.link || resp.data?.checkout_url;
                if (!redirectUrl) {
                    showErrorMessage('Impossible d’ouvrir le paiement Wave.');
                    return;
                }
                trackUserInteraction('payment_initiated', { provider: 'wave', amount: total, currency: 'FCFA' });
                window.location.href = redirectUrl;
            })
            .catch(err => {
                hideLoading(form);
                showErrorMessage('Erreur lors de l’initiation du paiement Wave.');
            });
        } else {
            hideLoading(form);
            showErrorMessage('Méthode de paiement inconnue.');
        }
    } catch (error) {
        console.error('Erreur lors du traitement de la réservation:', error);
        hideLoading(form);
        showErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
}

function handlePartenariatForm(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (!validatePartenariatData(data)) {
            return;
        }
        
        showLoading(form);
        
        setTimeout(() => {
            hideLoading(form);
            showSuccessMessage(form, 'Demande de partenariat envoyée ! Notre équipe vous recontactera dans les plus brefs délais.');
            
            const savedData = savePartenariatData(data);
            trackFormSubmission('partenariat');
            
            setTimeout(() => {
                closePartenariatModal();
            }, 3000);
        }, 2000);
    } catch (error) {
        console.error('Erreur lors du traitement du partenariat:', error);
        hideLoading(form);
        showErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
}

function handleContactForm(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (!validateContactData(data)) {
            return;
        }
        
        showLoading(form);
        
        setTimeout(() => {
            hideLoading(form);
            showSuccessMessage(form, 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
            
            const savedData = saveContactData(data);
            trackFormSubmission('contact');
            
            form.reset();
        }, 2000);
    } catch (error) {
        console.error('Erreur lors du traitement du contact:', error);
        hideLoading(form);
        showErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
}

function handleNewsletterForm(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (!validateNewsletterData(data)) {
            return;
        }
        
        showLoading(form);
        
        setTimeout(() => {
            hideLoading(form);
            showSuccessMessage(form, 'Inscription réussie ! Vous recevrez bientôt nos actualités.');
            
            const savedData = saveNewsletterData(data);
            trackFormSubmission('newsletter');
            
            closeNewsletterPopup();
        }, 2000);
    } catch (error) {
        console.error('Erreur lors du traitement de la newsletter:', error);
        hideLoading(form);
        showErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
}

// Fonctions de validation
function validateReservationData(data) {
    if (!data.nom || !data.email || !data.telephone || !data.age || !data.billetType) {
        showErrorMessage('Veuillez remplir tous les champs obligatoires.');
        return false;
    }
    
    if (data.age < 14 || data.age > 25) {
        showErrorMessage('L\'âge doit être compris entre 14 et 25 ans.');
        return false;
    }
    
    if (data.nombre < 1 || data.nombre > 5) {
        showErrorMessage('Le nombre de billets doit être compris entre 1 et 5.');
        return false;
    }
    
    return true;
}

// Gestion dynamique de l'affichage et du calcul paiement dans la modale de réservation
document.addEventListener('DOMContentLoaded', () => {
    // Post-retour Wave: inspecter le paramètre de query "payment"
    try {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('payment');
        if (status && (status === 'success' || status === 'cancel')) {
            const pending = JSON.parse(sessionStorage.getItem('ldk_pending_reservation') || 'null');
            if (pending) {
                if (status === 'success') {
                    saveReservationData({ ...pending, statutPaiement: 'payé' });
                    showSuccessMessage(document.body, 'Paiement Wave confirmé !');
                } else {
                    showErrorMessage('Paiement Wave annulé.');
                }
                sessionStorage.removeItem('ldk_pending_reservation');
            }
        }
    } catch (e) {}

    const billetSelect = document.getElementById('billetType');
    const nombreInput = document.getElementById('reservationNombre');
    const paymentSection = document.getElementById('paymentSection');
    const unitPriceEl = document.getElementById('unitPrice');
    const quantityEl = document.getElementById('quantity');
    const totalEl = document.getElementById('totalAmount');

    const prixParType = {
        standard: 5000,
        privilegie: 0,
        vip: 15000
    };

    function updatePaymentUI() {
        if (!billetSelect || !nombreInput || !paymentSection) return;
        const type = billetSelect.value;
        const nombre = parseInt(nombreInput.value || '1', 10);
        const prixUnitaire = prixParType[type] ?? 0;
        const total = prixUnitaire * (isNaN(nombre) ? 1 : nombre);

        if (prixUnitaire === 0) {
            paymentSection.style.display = 'none';
        } else {
            paymentSection.style.display = 'block';
            if (unitPriceEl) unitPriceEl.textContent = `${prixUnitaire.toLocaleString('fr-FR')} FCFA`;
            if (quantityEl) quantityEl.textContent = `${nombre}`;
            if (totalEl) totalEl.textContent = `${total.toLocaleString('fr-FR')} FCFA`;
        }
    }

    if (billetSelect) billetSelect.addEventListener('change', updatePaymentUI);
    if (nombreInput) nombreInput.addEventListener('input', updatePaymentUI);
    updatePaymentUI();

    // Lecture/pause vidéos influenceurs au survol (sur index.html aussi)
    try {
        document.querySelectorAll('.influenceur-card').forEach(card => {
            const video = card.querySelector('video');
            if (!video) return;
            card.addEventListener('mouseenter', () => { try { video.play(); } catch(e){} });
            card.addEventListener('mouseleave', () => { try { video.pause(); video.currentTime = 0; } catch(e){} });
        });
    } catch (e) {}

    // Injecter un aperçu sur survol des cartes partenaires
    try {
        document.querySelectorAll('.partenaire-card').forEach(card => {
            const url = card.getAttribute('data-url');
            const desc = card.getAttribute('data-description') || '';
            if (!card.querySelector('.partner-preview')) {
                const title = card.querySelector('h4')?.textContent || 'Partenaire';
                const preview = document.createElement('div');
                preview.className = 'partner-preview';
                preview.innerHTML = `
                    <div class="partner-title">${title}</div>
                    <div class="partner-desc">${desc}</div>
                    ${url ? `<a class="partner-link" href="${url}" target="_blank" rel="noopener">Visiter la page</a>` : ''}
                `;
                card.appendChild(preview);
            }
        });
    } catch (e) { /* noop */ }
});

function validatePartenariatData(data) {
    if (!data.nomOrganisation || !data.nomContact || !data.email || !data.telephone || !data.secteur || !data.typePartenariat || !data.message) {
        showErrorMessage('Veuillez remplir tous les champs obligatoires.');
        return false;
    }
    
    return true;
}

function validateContactData(data) {
    if (!data.nom || !data.email || !data.telephone || !data.sujet || !data.message) {
        showErrorMessage('Veuillez remplir tous les champs obligatoires.');
        return false;
    }
    
    return true;
}

function validateNewsletterData(data) {
    if (!data.nom || !data.email) {
        showErrorMessage('Veuillez remplir tous les champs.');
        return false;
    }
    
    return true;
}

// Fonctions utilitaires
function showLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    }
}

function hideLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        const originalText = submitBtn.getAttribute('data-original-text');
        if (originalText) {
            submitBtn.innerHTML = originalText;
        }
    }
}

function showSuccessMessage(form, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message success';
    messageDiv.textContent = message;
    form.insertBefore(messageDiv, form.firstChild);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message error';
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '10000';
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Ajouter les nouvelles fonctions à la console
// Fonction pour forcer la mise à jour de la géolocalisation
async function updateUserLocation() {
    try {
        console.log('Mise à jour de la géolocalisation...');
        const newLocation = await getUserLocation();
        if (newLocation) {
            userLocation = newLocation;
            createLocationIndicator();
            console.log('Géolocalisation mise à jour:', userLocation);
            return userLocation;
        } else {
            console.warn('Impossible de mettre à jour la géolocalisation');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la géolocalisation:', error);
        return null;
    }
}

// Fonction pour afficher les informations de géolocalisation
function showLocationInfo() {
    const info = {
        currentLocation: userLocation,
        timezone: timezone,
        lastUpdate: userLocation ? new Date(userLocation.timestamp).toLocaleString() : 'Jamais',
        accuracy: userLocation ? `${Math.round(userLocation.accuracy)}m` : 'N/A'
    };
    
    console.log('=== Informations de Géolocalisation ===');
    console.log(JSON.stringify(info, null, 2));
    
    if (userLocation) {
        alert(`📍 Géolocalisation actuelle:\nLatitude: ${userLocation.latitude}\nLongitude: ${userLocation.longitude}\nPrécision: ${Math.round(userLocation.accuracy)}m\nDernière mise à jour: ${new Date(userLocation.timestamp).toLocaleString()}`);
    } else {
        alert('📍 Géolocalisation non disponible. Veuillez autoriser l\'accès à votre position.');
    }
}

// Exposer les fonctions globalement pour la console
window.exportLDKData = exportCollectedData;
window.updateLocation = updateUserLocation;
window.showLocationInfo = showLocationInfo;
window.getLDKStats = getLDKStats;
window.trackUserInteraction = trackUserInteraction;

console.log('LDK - Système de collecte enrichi avec horodatage et localisation activé ! 🎭🎵🎨📍');

// Modale de candidature (about.html)
function openApplyModal() {
    const modal = document.getElementById('applyModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        try { trackModalOpen('apply'); } catch (e) {}
    }
}

function closeApplyModal() {
    const modal = document.getElementById('applyModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        const form = document.getElementById('applyForm');
        if (form) form.reset();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const formData = new FormData(applyForm);
                const data = Object.fromEntries(formData);
                if (!data.nom || !data.email || !data.telephone || !data.domaine || !data.message) {
                    showErrorMessage('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                showLoading(applyForm);
                setTimeout(() => {
                    hideLoading(applyForm);
                    const saved = saveEnrichedData(data, 'candidature');
                    showSuccessMessage(applyForm, 'Candidature envoyée avec succès ! Merci pour votre engagement.');
                    trackFormSubmission('candidature');
                    setTimeout(closeApplyModal, 2000);
                }, 1200);
            } catch (err) {
                hideLoading(applyForm);
                showErrorMessage('Erreur lors de l\'envoi de la candidature.');
            }
        });
    }
});
