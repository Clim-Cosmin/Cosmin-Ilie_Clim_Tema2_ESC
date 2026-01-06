// script.js - Funcționalitatea pentru aplicația de curiozități despre pisici

// Variabile pentru elementele HTML
const factText = document.getElementById('fact-text');
const existenceElement = document.getElementById('existence');
const breedElement = document.getElementById('breed');
const typeElement = document.getElementById('type');
const loadButton = document.getElementById('load-fact');

// URL-ul API-ului Cat Facts
const API_URL = 'https://catfact.ninja/fact';

// Date suplimentare pentru tabel (completate aleatoriu, deoarece API-ul nu oferă aceste detalii)
const existenceOptions = ["Sute de ani", "Mii de ani", "Secole întregi", "Din antichitate", "De la începutul domesticirii", "Din evul mediu", "Descoperit recent", "De secole"];
const breedOptions = ["Toate rasele", "Pisici domestice", "Siameză", "Persană", "Maine Coon", "Sphinx", "British Shorthair", "Bengalez", "Ragdoll", "Abyssinian", "Scottish Fold", "Siberian", "Birman"];
const typeOptions = ["Realitate științifică", "Mit popular", "Parțial adevărat", "Confirmat de cercetători", "Credință populară", "Dovedit științific"];

// Funcție pentru a genera un număr aleatoriu într-un interval
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funcție asincronă pentru a obține o curiozitate de la API
async function fetchCatFact() {
    try {
        // Afișăm un mesaj de încărcare
        factText.innerHTML = '<span class="loading"><i class="fas fa-spinner fa-spin"></i> Se încarcă o curiozitate fascinantă...</span>';
        loadButton.disabled = true;
        
        // Adăugăm o clasă de animație pentru containerul de curiozități
        document.querySelector('.fact-container').classList.add('loading-animation');
        
        // Facem cererea către API
        const response = await fetch(API_URL);
        
        // Verificăm dacă răspunsul este ok
        if (!response.ok) {
            throw new Error(`Eroare API: ${response.status} ${response.statusText}`);
        }
        
        // Așteptăm datele JSON
        const data = await response.json();
        
        // Verificăm dacă avem datele necesare
        if (!data.fact) {
            throw new Error('Datele primite de la API nu conțin o curiozitate validă.');
        }
        
        // Actualizăm curiozitatea pe pagină
        factText.textContent = data.fact;
        
        // Generăm date aleatorii pentru tabel (deoarece API-ul nu oferă aceste detalii)
        existenceElement.textContent = existenceOptions[getRandomInt(0, existenceOptions.length - 1)];
        breedElement.textContent = breedOptions[getRandomInt(0, breedOptions.length - 1)];
        typeElement.textContent = typeOptions[getRandomInt(0, typeOptions.length - 1)];
        
        // Eliminăm clasa de animație
        document.querySelector('.fact-container').classList.remove('loading-animation');
        
        // Activăm butonul din nou
        loadButton.disabled = false;
        
        // Adăugăm un efect vizual subtil
        document.querySelector('.fact-container').style.transform = 'scale(1.02)';
        setTimeout(() => {
            document.querySelector('.fact-container').style.transform = 'scale(1)';
        }, 300);
        
        // Înregistrăm succesul în consolă
        console.log('Curiozitate încărcată cu succes de la API:', data.fact);
        
        // Afișăm un mesaj de succes
        showNotification('Curiozitate încărcată cu succes!', 'success');
        
    } catch (error) {
        // Gestionăm erorile
        console.error('Eroare la încărcarea curiozității:', error);
        
        // Afișăm un mesaj de eroare pe pagină
        factText.innerHTML = `<span class="error-message"><i class="fas fa-exclamation-triangle"></i> Nu s-a putut încărca o curiozitate. Eroare: ${error.message}. Încercați din nou.</span>`;
        
        // Eliminăm clasa de animație
        document.querySelector('.fact-container').classList.remove('loading-animation');
        
        // Activăm butonul pentru a permite încercarea din nou
        loadButton.disabled = false;
        
        // Afișăm o notificare de eroare
        showNotification('Eroare la încărcarea datelor. Încercați din nou.', 'error');
    }
}

// Funcție pentru a afișa notificări temporare
function showNotification(message, type) {
    // Eliminăm orice notificare existentă
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cream notificarea
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Adăugăm notificarea în pagină
    document.body.appendChild(notification);
    
    // Afișăm notificarea cu o animație
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Eliminăm notificarea după 4 secunde
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Funcție pentru a încărca prima curiozitate la deschiderea paginii
function initializeApp() {
    // Mică întârziere pentru efect vizual
    setTimeout(() => {
        fetchCatFact();
    }, 500);
}

// Adăugăm eveniment pentru buton
loadButton.addEventListener('click', fetchCatFact);

// Adăugăm efect de taste pentru accesibilitate
loadButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fetchCatFact();
    }
});

// Adăugăm posibilitatea de a folosi tasta spațiu pentru a reîncărca
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault(); // Previne scroll-ul la apăsarea spațiului
        fetchCatFact();
    }
});

// Inițializăm aplicația când DOM-ul este complet încărcat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}