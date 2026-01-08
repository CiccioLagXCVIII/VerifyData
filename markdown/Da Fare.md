# Cose Da Fare

## 1. 🏗️ HTML (Struttura Pagine)

### `index.html` (Presentazione)

* **Rimozione Placeholder:** Sostituire `[...]` nell'oggetto `definitions` con spiegazioni tecniche reali (SHA-256, EIP-5192, Timestamping).
* **Info Legali:** Sezione sulla validità dei documenti digitali (es. accenno al regolamento eIDAS).

### `connessione.html` (Onboarding)

* **No-Wallet Feedback:** Se MetaMask non è installato, mostrare un messaggio chiaro con link al download ufficiale.
* **Gestione Errori:** Messaggio visibile in caso l'utente rifiuti esplicitamente la connessione tramite il pop-up del wallet.
* **Session Persistence:** Ottimizzare il caricamento affinché l'indirizzo non "scompaia" temporaneamente durante il refresh della pagina.

### `certifica.html` (Notarizzazione)

* **Pulsante Reset:** Aggiungere un tasto per pulire l'area di upload e l'hash calcolato se l'utente ha scelto il file sbagliato.
* **Mining UI:** Inserire uno spinner o una barra di caricamento che si attivi dopo il click su "Notarizza" per simulare l'attesa del blocco.
* **Metadata:** Aggiungere campi input per "Titolo Documento" o "Tag" (es. Lavoro, Medico) da associare alla notarizzazione.

### `profilo.html` (Dashboard SSI)

* **Tabella Dinamica:** Popolare il `tbody` con dati reali (estratti inizialmente da localStorage e poi da eventi blockchain).
* **Empty State:** Mostrare un messaggio "Ancora nessun documento" se l'elenco è vuoto.
* **SBT Visual Badge:** Creare una card grafica futuristica che rappresenti l'Identity Badge (ID Token, data emissione, status).
* **Export Dati:** Pulsante per scaricare lo storico delle proprie notarizzazioni in formato CSV o JSON.
* **Filtri:** Barra di ricerca per filtrare i documenti per nome o hash.

### `verifica.html` (Public Validator)

* **Correzione Campi:** Rimuovere i campi "Nome" ed "Email" (inutili).
* **Integrazione Hashing:** Inserire la stessa area Drag & Drop di `certifica.html`. La verifica deve basarsi sull'hash del file.
* **Timeline Report:** Se il file è valido, mostrare una linea temporale: *Creato il... -> Firmato da [Indirizzo] -> Status: Valido*.
* **Verifica Manuale:** Aggiungere un campo input per incollare direttamente una stringa Hash (per chi non ha il file fisico).

---

## 2. 🎨 CSS (Estetica e UX)

* **Feedback Visivo:** Aggiungere transizioni fluide (`transition: 0.3s`) su hover di pulsanti, link e aree drop-zone.
* **Loading States:** Definire classi CSS per spinner e stati di disabilitazione pulsanti durante le transazioni.
* **Blockchain Branding:** Personalizzare la palette Bootstrap con colori "cyber" (es. viola elettrico o verde neon per i successi) su sfondo scuro.
* **Status Indicators:** Creare animazioni più curate per i punti "pulse" (es. quello della connessione Sepolia).

---

## 3. ⚙️ JAVASCRIPT (Logica e Web3)

* **MetaMask Listeners:** Implementare in `auth.js` l'ascolto di `accountsChanged` (per cambiare profilo se l'utente cambia wallet) e `chainChanged` (per ricaricare la pagina).
* **Network Check:** Funzione che verifichi se l'utente è su **Sepolia Testnet**. Se è su un'altra rete, mostrare un avviso o bloccare le funzioni di scrittura.
* **Ethers.js Integration:** Sostituire le simulazioni con chiamate reali agli Smart Contract (una volta pronti).
* **Contract Manager:** Creare un modulo dedicato per inizializzare l'istanza del contratto una sola volta e riutilizzarla in tutta la DApp.
* **Gas Estimation:** Mostrare all'utente una stima del costo della transazione prima di procedere.

---

## 4. 🧠 LOGICA (Backend & Security)

* **Fonte della Verità:** Passare dal `localStorage` alla Blockchain. Il wallet e lo stato dell'SBT devono essere verificati on-chain ad ogni caricamento critico.
* **Lookup Logic:** La pagina di verifica deve interrogare lo smart contract usando l'hash calcolato come chiave di ricerca.
* **Revocation Flow:** Implementare la logica per cui solo l'autore originale del documento può inviare la transazione di revoca.
* **Privacy-by-Design:** Ribadire nella logica che nessun dato sensibile (nome file originale, contenuto) viene mai salvato on-chain, ma solo l'hash e metadati criptici.
* **Identity Linkage:** Integrare il check: *Hash Valido + Autore possiede SBT = Certificazione Professionale*.
