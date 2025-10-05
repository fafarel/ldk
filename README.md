# 🎭 LDK - Legendary Dream of Kermess

## 📋 Système de Collecte d'Informations des Visiteurs

Ce site web dispose d'un système complet de collecte d'informations pour les visiteurs de l'événement LDK.

### 🎯 **Fonctionnalités de Collecte**

#### **1. 📝 Formulaire de Réservation de Billets**
- **Accès** : Boutons "Réserver" dans la section Billets
- **Données collectées** :
  - Type de billet (Standard, Privilégié, VIP)
  - Nom complet
  - Email
  - Téléphone
  - Âge (14-25 ans)
  - Établissement
  - Nombre de billets (1-5)
  - Inscription newsletter (optionnel)

#### **2. 🤝 Formulaire de Partenariat**
- **Accès** : Bouton "Devenir Partenaire" dans la section Partenaires
- **Données collectées** :
  - Nom de l'entreprise/organisation
  - Nom du contact
  - Email professionnel
  - Téléphone
  - Secteur d'activité
  - Type de partenariat souhaité
  - Budget disponible
  - Message de motivation

#### **3. 📞 Formulaire de Contact Amélioré**
- **Accès** : Section Contact
- **Données collectées** :
  - Nom complet
  - Email
  - Téléphone
  - Sujet du message
  - Message
  - Inscription newsletter (optionnel)

#### **4. 📧 Newsletter Popup**
- **Accès** : S'affiche automatiquement après 30 secondes
- **Données collectées** :
  - Nom
  - Email

### 🔧 **Fonctionnalités Techniques**

#### **✅ Validation des Données**
- Validation côté client en temps réel
- Messages d'erreur personnalisés
- Vérification des formats (email, téléphone, âge)

#### **✅ Interface Utilisateur**
- Modales élégantes avec animations
- Indicateurs de chargement
- Messages de succès/erreur
- Design responsive

#### **✅ Stockage Local**
- Données sauvegardées dans le localStorage du navigateur
- Structure JSON organisée par type
- Horodatage automatique

### 📊 **Accès aux Données Collectées**

#### **Pour les Développeurs**
Ouvrez la console du navigateur (F12) et tapez :
```javascript
exportLDKData()
```
Cela téléchargera un fichier JSON avec toutes les données collectées.

#### **Structure des Données**
```json
{
  "reservations": [
    {
      "billetType": "standard",
      "nom": "John Doe",
      "email": "john@example.com",
      "telephone": "+22501234567",
      "age": "18",
      "etablissement": "academia",
      "nombre": "2",
      "newsletter": "on",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "type": "reservation"
    }
  ],
  "partenariats": [...],
  "contacts": [...],
  "newsletters": [...],
  "exportDate": "2024-01-15T10:30:00.000Z"
}
```

### 🚀 **Intégration Backend**

#### **Option 1 : Email (Recommandé pour débuter)**
Remplacez les fonctions de simulation par l'envoi d'emails :

```javascript
// Dans script.js, remplacer setTimeout par :
fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

#### **Option 2 : Base de Données**
Intégrez avec une base de données (MySQL, MongoDB, etc.) :

```javascript
// Exemple avec une API REST
fetch('/api/reservations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

#### **Option 3 : Services Externes**
- **Google Sheets** : Envoi automatique vers une feuille de calcul
- **Airtable** : Base de données en ligne
- **Zapier** : Automatisation des workflows

### 📈 **Analytics et Suivi**

#### **Métriques Disponibles**
- Nombre de réservations par type de billet
- Répartition par âge et établissement
- Demandes de partenariat par secteur
- Taux de conversion newsletter

#### **Exemple de Calcul**
```javascript
// Nombre total de réservations
const reservations = JSON.parse(localStorage.getItem('ldk_reservations') || '[]');
console.log(`Total réservations: ${reservations.length}`);

// Répartition par type de billet
const billetTypes = reservations.reduce((acc, res) => {
  acc[res.billetType] = (acc[res.billetType] || 0) + 1;
  return acc;
}, {});
console.log('Répartition:', billetTypes);
```

### 🔒 **Sécurité et RGPD**

#### **Bonnes Pratiques**
- ✅ Validation côté client ET serveur
- ✅ Chiffrement des données sensibles
- ✅ Consentement explicite pour la newsletter
- ✅ Droit à l'oubli (suppression des données)
- ✅ Information claire sur l'utilisation des données

#### **Recommandations**
1. **Implémentez HTTPS** pour le site en production
2. **Ajoutez des CAPTCHA** pour éviter le spam
3. **Limitez le nombre de soumissions** par IP
4. **Sauvegardez régulièrement** les données
5. **Informez les utilisateurs** de l'utilisation de leurs données

### 🛠️ **Personnalisation**

#### **Modifier les Champs**
Éditez les formulaires dans `index.html` :
```html
<div class="form-group">
  <label for="nouveauChamp">Nouveau champ</label>
  <input type="text" id="nouveauChamp" name="nouveauChamp" required>
</div>
```

#### **Ajouter des Validations**
Dans `script.js`, ajoutez vos règles :
```javascript
function validateCustomData(data) {
  if (data.nouveauChamp.length < 3) {
    showErrorMessage('Le nouveau champ doit contenir au moins 3 caractères');
    return false;
  }
  return true;
}
```

#### **Personnaliser les Messages**
Modifiez les messages de succès/erreur dans les fonctions `handle*Form()`.

### 📞 **Support**

Pour toute question sur le système de collecte de données :
- **Email** : ldkprojet@gmail.com
- **Téléphone** : +225 05 04 05 01 01

---

**LDK - Legendary Dream of Kermess** 🎭🎵🎨
*L'événement culturel qui célèbre la jeunesse ivoirienne*
