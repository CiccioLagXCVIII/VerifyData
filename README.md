# VerifyData

**VerifyData** è una Decentralized Application (DApp) per la notarizzazione digitale e la gestione dell'identità basata sui paradigmi della **Self-Sovereign Identity (SSI)**. Il progetto mira a garantire l'autenticità, l'integrità e la paternità di documenti digitali senza l'ausilio di intermediari centralizzati.

## 1. Visione del Progetto
A differenza dei sistemi di notarizzazione tradizionali, VerifyData introduce un legame indissolubile tra il documento e l'identità verificata del firmatario. Utilizzando gli standard della rete Ethereum, la certificazione diventa un elemento dinamico, verificabile e legalmente rilevante nel contesto del Web3.

## 2. Pilastri Tecnologici e Architetturali

### 2.1 Integrità tramite Hashing (Privacy-by-Design)
In conformità con il GDPR, il documento originale non viene mai caricato on-chain né trasmesso a server esterni.
*   **Processo:** L'algoritmo **SHA-256** genera localmente un'impronta informatica (Hash) univoca.
*   **Risultato:** Solo l'hash viene registrato sulla blockchain, garantendo la **Proof of Existence** senza esporre dati sensibili.

### 2.2 Identità Sovrana e Soulbound Tokens (SBT)
Il sistema supera l'anonimato dei wallet standard implementando lo standard **EIP-5192**.
*   **Badge di Identità:** Un token non trasferibile legato permanentemente all'indirizzo dell'utente.
*   **Valore:** Funge da attestazione digitale che qualifica l'autore (es. "Ente Certificatore", "Professionista Verificato").

### 2.3 Gestione del Ciclo di Vita: Revoca
VerifyData introduce una logica di stato per le certificazioni. L'autore può invalidare una propria notarizzazione on-chain (es. per aggiornamenti o errori), garantendo trasparenza totale sulla validità attuale del documento.

---

## 3. Struttura del Progetto

Il progetto è organizzato per guidare l'utente attraverso un flusso di lavoro logico:

*   `index.html` (Hub Informativo): Landing page divulgativa su crittografia, hashing e vantaggi della blockchain.
*   `connessione.html` (Gateway Web3): Pagina per la connessione di MetaMask e la gestione dell'identità iniziale.
*   `certifica.html` (Notarization Engine): Area operativa drag-and-drop per il calcolo dell'hash e la marcatura temporale.
*   `profilo.html` (Personal Ledger): Dashboard privata per visualizzare lo storico dei documenti e gestire le revoche.
*   `verifica.html` (Public Validator): Portale pubblico per confrontare un file con i registri on-chain e verificarne l'integrità.

---

## 4. Stack Tecnologico

### Smart Contract Layer
*   **Solidity:** Logica di business on-chain.
*   **EIP-5192:** Implementazione dei Soulbound Tokens non trasferibili.

### Frontend & Web3 Integration
*   **Javascript (ES6+):** Logica applicativa e gestione dello stato.
*   **Ethers.js / Web3.js:** Interazione con la blockchain Ethereum.
*   **Web Crypto API:** Calcolo dell'hash SHA-256 lato client.
*   **HTML5 / CSS3 (Bootstrap):** Interfaccia utente reattiva e moderna.

---

## 5. Logica di Funzionamento (High-Level)

1.  **Connessione:** L'utente connette il proprio wallet (MetaMask). Lo stato della sessione viene persistito tramite `localStorage`.
2.  **Identità:** Se l'indirizzo non possiede un badge SBT, l'utente può "mintare" la propria identità sovrana.
3.  **Certificazione:** L'utente carica un file. Il sistema calcola l'hash `0x...` senza inviare il file in rete.
4.  **Notarizzazione:** Una transazione registra l'hash e il timestamp sulla blockchain (Testnet Sepolia).
5.  **Verifica:** Un terzo uploader carica lo stesso file; il sistema calcola l'hash, interroga il contratto e restituisce l'autore verificato e lo stato di validità.

---

## 6. Installazione e Sviluppo Locale

1.  Clona il repository:
    ```bash
    git clone https://github.com/CiccioLagXCVIII/VerifyData.git
    ```
2.  Apri il progetto con un server locale (*Live Server* su VS Code).
3.  Assicurati di avere l'estensione **MetaMask** installata nel browser.
4.  Configura lo Smart Contract su Sepolia e aggiorna l'ABI e l'Address nel file `main.js`.

---

## 7. Note Accademiche
Progetto realizzato per l'esame di **Data Security and Blockchain**.
*   **Studente:** Francesco Lo Verde
*   **Docente:** Prof. Luca Grilli

---

### Licenza
Distribuito sotto licenza MIT. Vedi `LICENSE` per ulteriori informazioni.
