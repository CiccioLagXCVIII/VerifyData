### 🌎 Logica Di Sistema
**Robustezza Navigazione:** In `main.js`, passare dal controllo `pathname.pop()` a `location.pathname.includes()` per evitare bug con parametri URL.

**Event Listener Provider:** Implementare in `auth.js` l'ascolto degli eventi di MetaMask:
    - `accountsChanged`: Per aggiornare l'interfaccia se l'utente cambia wallet.
    - `chainChanged`: Per ricaricare la pagina se l'utente cambia rete.
  
**Network Check:** Aggiungere un controllo per verificare che l'utente sia su **Sepolia Testnet**. Se su Mainnet, mostrare un avviso.

**Database Simulato (LocalStorage):** Creare una struttura dati in `localStorage` per memorizzare i documenti notarizzati dell'utente (es. `docs_0xAddress: [{hash, name, date, status}]`).

### 🌎 Grafica Globale
**Feedback Visivo:** Aggiungere transizioni CSS sugli hover (pulsanti e drop-zone).

**Branding:** Valutare l'uso di colori "Blockchain" (viola elettrico o verde neon su sfondo scuro) per differenziarsi dal tema standard di Bootstrap.

**Loading States:** Implementare spinner o barre di caricamento per simulare i tempi di mining della blockchain (2-3 secondi).

## 📄 Grafica Specifica Pagina

### 1. `index.html` (Presentazione)
*L'obiettivo è dimostrare la padronanza teorica dei concetti di Data Security.*

**Necessario:** Sostituire tutti i placeholder `[...]` con testi tecnici:
    - Spiegare l'unidirezionalità di SHA-256.
    - Spiegare la non-trasferibilità dell'EIP-5192.
    - Definire il concetto di "Timestamping decentralizzato".
**Per la lode:**
    - **Interactive Hash Demo:** Un piccolo box di testo dove l'utente scrive e vede l'hash cambiare in tempo reale (effetto *avalanche*).
    - **Diagramma di Flusso:** Inserire uno schema (CSS o immagine) che mostri il percorso: *File -> Hash -> Firma -> Blockchain*.
    - **Glossario:** Tabella pop-up o sezione che definisce termini come *Gas Fee*, *Immutabilità* e *Self-Sovereign Identity*.

### 2. `connessione.html` (Gateway)
*Gestione della sicurezza nell'onboarding.*

**Necessario:**
    - **Gestione Errori:** Se l'utente rifiuta la connessione, mostrare un alert o un messaggio rosso "Connessione rifiutata".
    - **Feedback Assenza Wallet:** Se `window.ethereum` è undefined, mostrare un link diretto per installare MetaMask.
**Per la lode:**
    - **Session Persistence:** Ottimizzare il refresh della pagina affinché l'indirizzo non "scompaia" temporaneamente prima del caricamento del JS.

### 3. `certifica.html` (Notarizzazione)
*Il cuore operativo del sistema.*

**Necessario:**
    - **Pulsante Reset:** Permettere di pulire l'area dopo il calcolo dell'hash se l'utente ha scelto il file sbagliato.
    - **Simulazione Mining:** Al click su "Registra", mostrare un caricamento che simuli l'attesa del blocco.
    - **Persistence:** Al successo, salvare l'oggetto documento nel `localStorage` associato all'indirizzo dell'utente.
**Per la lode:**
    - **Metadata opzionali:** Aggiungere campi per "Titolo documento" o "Tag" (es. Lavoro, Medico, Legale).
    - **Chunking Hashing:** Per file molto grandi (>100MB), implementare la lettura a pezzi (chunks) per non bloccare il thread del browser.

### 4. `profilo.html` (Dashboard Identità)
*Gestione dei dati e dell'identità SSI.*

**Necessario:**
    - **Tabella Dinamica:** Popolare il `tbody` leggendo dal `localStorage`.
    - **Empty State:** Mostrare un messaggio "Ancora nessun documento" se l'array è vuoto.
    - **Logica di Revoca:** Il tasto revoca deve cambiare lo stato del documento da `Valido` a `Revocato` localmente.
**Per la lode:**
    - **Visual Identity Card:** Creare un elemento grafico per il badge SBT (una card futuristica con ID Token e data emissione).
    - **Filtri e Ricerca:** Aggiungere una barra di ricerca per filtrare i documenti per nome o per stato.

### 5. `verifica.html` (Public Validator)
*La sezione più importante per la verifica dell'integrità.*

**Necessario:** 
    - **Rimozione Form Email/Nome:** Eliminare i campi Mario Rossi, sono concettualmente errati.
    - **Integrazione Drag & Drop:** Inserire la stessa logica di hashing di `certifica.html`. La verifica deve avvenire calcolando l'hash del file caricato.
    - **Lookup Logic:** Confrontare l'hash generato con quelli presenti nel sistema (per ora il `localStorage`).
**Per la lode:**
    - **Certificate Report:** Se il file è trovato, generare una "Timeline" visiva: *Creato il... -> Firmato da... -> Stato attuale*.
    - **Verifica Manuale:** Aggiungere un campo input per incollare direttamente l'hash (per chi non ha il file fisico).

## 😶‍🌫️ Prossimi Passi
1.  **Solidity Layer:** Sviluppare lo Smart Contract
2.  **Web3 Integration:** Sostituire le letture/scritture dal `localStorage` con le chiamate `contract.methods` tramite Ethers.js.
3.  **Deployment:** Caricare lo smart contract su Sepolia e configurare l'indirizzo nel frontend.