# VerifyData
# Progetto VerifyData: Sistema di Certificazione Decentralizzata e Identità Sovrana

## 1. Visione del Progetto
**VerifyData** è una Decentralized Application (DApp) progettata per la notarizzazione digitale e la gestione dell'identità basata sui paradigmi della **Self-Sovereign Identity (SSI)**. L'obiettivo principale è fornire un'infrastruttura fiduciaria (trustless) che permetta di garantire l'autenticità, l'integrità e la paternità di documenti digitali, eliminando la necessità di intermediari centralizzati.

A differenza dei sistemi di notarizzazione tradizionali, VerifyData introduce un legame indissolubile tra il documento e l'identità verificata del firmatario, utilizzando standard emergenti della rete Ethereum per garantire che la certificazione non sia solo un dato statico, ma un elemento dinamico e verificabile.

## 2. I Pilastri Tecnologici e Architetturali

### 2.1 Integrità e Notarizzazione tramite Hashing (Privacy-by-Design)
Il sistema adotta un approccio **Privacy-by-Design** in conformità con il GDPR. Il documento originale (sia esso un referto medico, un contratto o codice sorgente) non viene mai caricato sulla blockchain né trasmesso al server.
*   **Processo:** Attraverso l'algoritmo **SHA-256**, viene generata localmente nel browser un'impronta informatica (Hash) univoca.
*   **Risultato:** Solo l'hash viene registrato on-chain. Ciò garantisce l'immutabilità del dato e la prova di esistenza (Proof of Existence) senza esporre informazioni sensibili.

### 2.2 Identità Sovrana e Soulbound Tokens (SBT)
Il cuore innovativo di VerifyData risiede nel modulo di identità. Per superare l'anonimato degli indirizzi wallet standard, il progetto implementa il concetto di **Soulbound Tokens (SBT)**, ispirato alla proposta di Vitalik Buterin e allo standard **EIP-5192**.
*   **Funzionamento:** Gli utenti possono richiedere un "Badge di Identità", un token non trasferibile legato permanentemente al proprio indirizzo.
*   **Valore:** Questo badge funge da attestazione digitale (Attestation) che qualifica l'autore della certificazione (es. "Medico Verificato", "Ente Certificatore"), permettendo a terzi di distinguere tra una notarizzazione anonima e una professionale.

### 2.3 Gestione del Ciclo di Vita: Revoca e Aggiornamento
Uno dei limiti dei registri distribuiti è la persistenza di dati obsoleti. VerifyData introduce una **logica di stato** per ogni certificazione:
*   **Revoca On-Chain:** L'autore ha la facoltà di invalidare una propria certificazione (es. in caso di errore nel documento originale o emissione di una nuova versione).
*   **Trasparenza:** La revoca non cancella la cronologia (impossibile in blockchain), ma aggiorna lo stato del record, informando chiunque consulti il portale che quel documento non è più da considerarsi valido.

---

## 3. Architettura dell'Interfaccia Utente

La DApp è strutturata in cinque moduli funzionali per guidare l'utente nel processo di certificazione:

1.  **Hub Informativo (Home):** Landing page dedicata alla divulgazione dei concetti di crittografia asimmetrica, hashing e i vantaggi della blockchain rispetto ai sistemi centralizzati.
2.  **Identity Manager (Profilo Digitale):** Interfaccia per la gestione del proprio profilo SSI e per l'interazione con il contratto di emissione dei Soulbound Tokens.
3.  **Notarization Engine (Certifica):** Area operativa dotata di drag-and-drop per il calcolo dell'hash in tempo reale e l'invio della transazione di marcatura temporale (Timestamping).
4.  **Personal Ledger (I miei Documenti):** Dashboard privata che interroga la blockchain per mostrare lo storico delle certificazioni effettuate dall'utente, offrendo gli strumenti per la gestione della revoca.
5.  **Public Validator (Verifica):** Portale pubblico di verifica. Caricando un file, il sistema confronta l'hash calcolato al volo con quello registrato on-chain, restituendo l'esito sulla validità, l'autore e l'integrità del documento.

---

## 4. Piano di Implementazione Tecnica

### Fase 1: Smart Contract Layer (Solidity)
*   Sviluppo del contratto principale basato su mappature (`mapping`) per l'archiviazione efficiente degli hash.
*   Implementazione dell'interfaccia **EIP-5192** per garantire la non-trasferibilità dei badge di identità.
*   Definizione delle funzioni di controllo accesso (Access Control) per le operazioni di revoca.

### Fase 2: Sviluppo Frontend & Client-Side Logic
*   Sviluppo dell'interfaccia reattiva in HTML5 e CSS3.
*   Integrazione della libreria **Crypto-JS** o delle Web Crypto API per l'hashing locale dei file.

### Fase 3: Integrazione Web3 (Ethers.js / Web3.js)
*   Gestione della comunicazione con il provider (MetaMask).
*   Sincronizzazione dello stato della DApp con gli eventi emessi dallo Smart Contract.
*   Parsing dei dati on-chain per la visualizzazione dell'archivio storico.

### Fase 4: Validazione e Test
*   Deployment su **Testnet Sepolia** per simulare un ambiente di produzione.
*   Verifica formale delle funzioni di sicurezza e della resistenza a tentativi di manipolazione dei dati.
*   
