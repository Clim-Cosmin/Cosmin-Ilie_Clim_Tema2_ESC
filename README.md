# Cat Facts Dashboard

O aplicație web elegantă și profesională de tip Dashboard care afișează fapte interesante despre pisici, utilizând Cat Facts API.

## Caracteristici

- **Design profesional de tip Dashboard**: Interfață modernă și intuitivă
- **Integrare cu Cat Facts API**: Obține fapte reale și actualizate despre pisici
- **Filtrare avansată**: Filtrează faptele după număr și lungime
- **Sistem de logging**: Afișează jurnale detaliate pentru depanare
- **Gestionare erori robustă**: Afișează erorile atât în consolă cât și în interfața utilizatorului
- **Design responsive**: Funcționează pe dispozitive mobile și desktop

## Tehnologii utilizate

- HTML5, CSS3, JavaScript vanilla
- Font Awesome pentru pictograme
- Cat Facts API (https://catfact.ninja/)

## Funcționalități

1. **Încărcare fapte**: Obține între 1 și 20 de fapte despre pisici
2. **Filtrare după lungime**: Filtrează faptele după lungime (scurt, mediu, lung)
3. **Statistici**: Vezi numărul total de fapte și lungimea medie
4. **Jurnal console**: Monitorizează toate etapele procesului
5. **Gestionare erori**: Afișează erorile clar în interfață și consolă

## Structura codului

### HTML
- Structură semantică cu header, dashboard, card-uri și footer
- Elemente pentru afișarea faptelor, controalelor și jurnalului

### CSS
- Variabile CSS pentru culori și stiluri consistente
- Design responsive cu Grid și Flexbox
- Animații subtile pentru o experiență plăcută

### JavaScript
- Utilizează `async/await` pentru operațiuni asincrone
- Implementează blocuri `try/catch` pentru gestionarea erorilor
- Logging detaliat în fiecare etapă a procesului
- Arhitectură modulară și ușor de întreținut

## Logging și depanare

Aplicația include un sistem de logging cuprinzător:

1. **Console.log în browser**: Toate etapele sunt logate în consola browserului
2. **Consolă vizuală**: Afișează jurnalul direct în interfață
3. **Mesaje de eroare**: Erorile sunt afișate clar atât în consolă cât și în UI

Exemple de mesaje logate:
- "Cerere trimisă pentru X fapt(e) despre pisici..."
- "Date primite cu succes: X fapt(e)"
- "Eroare la pasul de obținere a datelor: [mesaj de eroare]"

## Cum se utilizează

1. Deschideți fișierul HTML într-un browser modern
2. Selectați numărul de fapte dorite din dropdown
3. Alegeți o filtrare după lungime (opțional)
4. Apăsați "Încarcă fapte noi" pentru a obține fapte despre pisici
5. Utilizați butonul "Afișează/ascunde consola" pentru a vedea jurnalul

## Gestionarea erorilor

Dacă cererea către API eșuează:
1. Eroarea este logată în consolă cu detalii complete
2. Un mesaj de eroare este afișat în interfața utilizatorului
3. Mesajul de eroare dispare automat după 10 secunde

## Personalizare

Puteți personaliza aplicația modificând variabilele CSS din secțiunea `:root`:
- Culori primare și secundare
- Dimensiuni și raze de colț
- Umbre și tranziții

## Compatibilitate

Aplicația funcționează în toate browserele moderne care suportă:
- ES6+ (async/await, arrow functions)
- CSS Grid și Flexbox
- Fetch API

## API utilizat

Aplicația folosește Cat Facts API (https://catfact.ninja/), un API gratuit și open-source care oferă fapte interesante despre pisici.