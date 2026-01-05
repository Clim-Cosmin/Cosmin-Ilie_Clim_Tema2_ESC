document.addEventListener('DOMContentLoaded', function() {
    // Elemente DOM
    const factDisplay = document.getElementById('factDisplay');
    const getFactBtn = document.getElementById('getFactBtn');
    const likeBtn = document.getElementById('likeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const factCountElement = document.getElementById('factCount');
    const likeCountElement = document.getElementById('likeCount');
    const historyContainer = document.getElementById('historyContainer');
    const notification = document.getElementById('notification');
    
    // Variabile de stare
    let factCount = 0;
    let likeCount = 0;
    let currentFact = '';
    let history = JSON.parse(localStorage.getItem('catFactsHistory')) || [];
    
    // Inițializare contoare
    factCountElement.textContent = factCount;
    likeCountElement.textContent = likeCount;
    
    // Încărcare istoric la pornire
    loadHistory();
    
    // Eveniment pentru butonul de obținere curiozitate
    getFactBtn.addEventListener('click', fetchCatFact);
    
    // Eveniment pentru butonul de apreciere
    likeBtn.addEventListener('click', function() {
        likeCount++;
        likeCountElement.textContent = likeCount;
        likeBtn.innerHTML = '<i class="fas fa-heart"></i> Apreciat';
        likeBtn.disabled = true;
        likeBtn.classList.add('liked');
        showNotification('Mulțumim pentru apreciere! 😻');
        
        // Salvare like-uri în localStorage
        localStorage.setItem('catFactsLikes', likeCount);
    });
    
    // Eveniment pentru butonul de copiere
    copyBtn.addEventListener('click', function() {
        if (currentFact) {
            navigator.clipboard.writeText(currentFact)
                .then(() => {
                    showNotification('Curiozitate copiată în clipboard! 📋');
                })
                .catch(err => {
                    console.error('Eroare la copiere: ', err);
                    showNotification('Nu s-a putut copia textul!');
                });
        } else {
            showNotification('Nu există nicio curiozitate de copiat!');
        }
    });
    
    // Eveniment pentru butonul de ștergere istoric
    clearHistoryBtn.addEventListener('click', function() {
        if (history.length > 0) {
            if (confirm('Sigur doriți să ștergeți istoricul?')) {
                history = [];
                localStorage.removeItem('catFactsHistory');
                loadHistory();
                showNotification('Istoric șters cu succes!');
            }
        } else {
            showNotification('Istoricul este deja gol!');
        }
    });
    
    // Funcție pentru obținerea unei curiozități despre pisici
    async function fetchCatFact() {
        try {
            // Arată stare de încărcare
            factDisplay.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Se încarcă o curiozitate...</p>';
            getFactBtn.disabled = true;
            getFactBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se încarcă...';
            
            // Apelare API
            const response = await fetch('https://catfact.ninja/fact');
            
            if (!response.ok) {
                throw new Error(`Eroare API: ${response.status}`);
            }
            
            const data = await response.json();
            currentFact = data.fact;
            
            // Afișare curiozitate
            factDisplay.innerHTML = `<p>"${currentFact}"</p>`;
            
            // Actualizare contor
            factCount++;
            factCountElement.textContent = factCount;
            
            // Activare butoane
            getFactBtn.disabled = false;
            getFactBtn.innerHTML = '<i class="fas fa-cat"></i> Află o curiozitate!';
            likeBtn.disabled = false;
            likeBtn.innerHTML = '<i class="far fa-heart"></i> Apreciază';
            likeBtn.classList.remove('liked');
            
            // Adăugare în istoric
            const factItem = {
                text: currentFact,
                date: new Date().toLocaleString('ro-RO'),
                liked: false
            };
            
            history.unshift(factItem);
            
            // Limitare istoric la ultimele 10 elemente
            if (history.length > 10) {
                history = history.slice(0, 10);
            }
            
            // Salvarea în localStorage
            localStorage.setItem('catFactsHistory', JSON.stringify(history));
            
            // Reîncărcare istoric
            loadHistory();
            
            // Notificare succes
            showNotification('Curiozitate nouă încărcată cu succes! 🐱');
            
        } catch (error) {
            console.error('Eroare la obținerea curiozității:', error);
            
            // Afișare mesaj de eroare
            factDisplay.innerHTML = `
                <p style="color: #ff4757;">
                    <i class="fas fa-exclamation-triangle"></i> 
                    A apărut o eroare la încărcarea curiozității. 
                    Vă rugăm să încercați din nou!
                </p>
            `;
            
            // Reactivare buton
            getFactBtn.disabled = false;
            getFactBtn.innerHTML = '<i class="fas fa-cat"></i> Află o curiozitate!';
            
            // Notificare eroare
            showNotification('Eroare la încărcarea curiozității!');
        }
    }
    
    // Funcție pentru încărcarea istoricului
    function loadHistory() {
        // Curăță containerul istoric
        historyContainer.innerHTML = '';
        
        // Dacă istoricul este gol, afișează mesaj
        if (history.length === 0) {
            historyContainer.innerHTML = '<p class="empty-history">Nu există istoric încă. Obține prima curiozitate!</p>';
            return;
        }
        
        // Adaugă fiecare element din istoric
        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="fact-text">${item.text}</div>
                <div class="fact-date">${item.date} ${item.liked ? ' <i class="fas fa-heart" style="color:#ff4757;"></i>' : ''}</div>
            `;
            
            // Adaugă eveniment de click pentru reafișare
            historyItem.addEventListener('click', () => {
                currentFact = item.text;
                factDisplay.innerHTML = `<p>"${currentFact}"</p>`;
                showNotification('Curiozitate din istoric reîncărcată!');
            });
            
            historyContainer.appendChild(historyItem);
        });
    }
    
    // Funcție pentru afișarea notificărilor
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Încărcare like-uri salvate la pornire
    const savedLikes = localStorage.getItem('catFactsLikes');
    if (savedLikes) {
        likeCount = parseInt(savedLikes);
        likeCountElement.textContent = likeCount;
    }
    
    // Obține o curiozitate la încărcarea paginii
    fetchCatFact();
});