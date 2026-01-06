## Descrizione Approfondita Progetto
**VerifyData** è una Decentralized Application (DApp) progettata per la notarizzazione digitale e la gestione dell'identità basata sui paradigmi della **Self-Sovereign Identity (SSI)**. Il progetto nasce per risolvere il problema della fiducia nella condivisione di documenti digitali, garantendo che un file non sia stato alterato (Integrità) e che provenga da una fonte identificata e autorevole (Autenticità).

A differenza dei servizi di timestamping tradizionali che si appoggiano su Certification Authority centralizzate, VerifyData utilizza la blockchain di Ethereum come registro immutabile "trustless". L'innovazione principale risiede nell'integrazione dei **Soulbound Tokens (SBT)**: l'identità del firmatario non è un semplice indirizzo esadecimale anonimo, ma un profilo verificato e non trasferibile che qualifica l'autore della certificazione.

## ## Descrizione Approfondita Logica
La logica del sistema ruota attorno a tre concetti chiave:

1.  **Privacy-by-Design (Hashing Locale):** La sicurezza dei dati è garantita dal calcolo dell'impronta digitale (Hash SHA-256) direttamente nel browser dell'utente. Il documento originale non viene mai trasmesso alla rete, rendendo il sistema intrinsecamente conforme al GDPR.
2.  **Legame Indissolubile Identità-Documento:** Ogni notarizzazione registrata nello smart contract contiene l'indirizzo del mittente. Il sistema interroga la blockchain per verificare se tale indirizzo possiede un SBT (Identity Badge). Se presente, la certificazione assume valore legale/professionale; in caso contrario, rimane una notarizzazione anonima.
3.  **Gestione dello Stato (Revoca):** Poiché i dati su blockchain sono permanenti, la "cancellazione" è impossibile. VerifyData implementa una logica di stato: l'autore può marcare un hash come "Revocato". Il registro pubblico mostrerà che il documento esisteva in una certa data, ma che l'autore ne ha invalidato la validità in un momento successivo.

## ## Descrizione Approfondita Obiettivi e Funzionalità
L'obiettivo è fornire un'interfaccia intuitiva che nasconda la complessità della blockchain, offrendo:
*   **Proof of Existence:** Dimostrare che un documento esisteva già in una determinata data.
*   **Proof of Integrity:** Garantire che il file non sia stato manipolato (anche un singolo bit alterato cambierebbe l'hash).
*   **Proof of Authorship:** Collegare il file a un'identità digitale sovrana.
*   **Verifica Pubblica:** Un portale dove chiunque può trascinare un file e ottenere istantaneamente il certificato di autenticità interrogando lo smart contract.

## ## Descrizione Approfondita Tecnologie Utilizzate
*   **Smart Contract Layer:** Solidity, standard **EIP-5192** (Soulbound Tokens) per l'identità non trasferibile.
*   **Blockchain Network:** Ethereum (Testnet Sepolia per lo sviluppo).
*   **Frontend:** HTML5, CSS3 (Bootstrap per il layout, Bootstrap Icons per la parte grafica).
*   **Web3 Integration:** **Ethers.js** (o Web3.js) per la comunicazione tra browser e smart contract.
*   **Cryptography:** **Web Crypto API** (SubtleCrypto) per il calcolo dell'hash SHA-256 lato client.
*   **Storage Locale:** Browser `localStorage` per la persistenza della sessione del wallet.

---

## Descrizione Approfondita Singole Pagine


### Pagina Index.html
**Scopo:** Educare l'utente e presentare il progetto.
- **Contenuti:**
    - Hero section con la "Value Proposition" (Perché usare la blockchain per i tuoi documenti?).
    - Sezione "Come Funziona": Spiegazione visiva del processo di Hashing (File -> Hash -> Blockchain).
    - Vantaggi: Immutabilità, Privacy (il file non lascia il PC), Identità Sovrana (SBT).
- **Logica:** Pagina statica, non richiede connessione al wallet per la lettura.

```html
<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Progetto - Home</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Bootstrap Icons -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
        <link rel="stylesheet" href="Style.css">
    </head>
    <body>

        <header class="app-header d-flex justify-content-between align-items-center px-4">
            <h5 class="mb-0 text-white">
                <i class="bi bi-layers-half me-2 text-primary"></i>VerifyData
            </h5>
            <!-- Pulsante Accesso a destra -->
            <div id="headerActions" class="d-flex align-items-center gap-2">
                <a href="connessione.html" class="btn btn-outline-primary btn-sm rounded-pill" id="connectWalletBtn">
                    <i class="bi bi-wallet-fill"></i> Connetti Wallet
                </a>
            </div>
        </header>

        <div class="main-container">
            <!-- Sidebar -->
            <aside class="sidebar">
                <nav class="nav-links">
                    <a href="index.html" class="nav-link active">
                        <i class="bi bi-house-door"></i> <span>Presentazione</span>
                    </a>
                    <a href="profilo.html" class="nav-link">
                        <i class="bi bi-person-vcard"></i> <span>Profilo SSI</span>
                    </a>
                    <a href="certifica.html" class="nav-link">
                        <i class="bi bi-shield-check"></i> <span>Certifica Documento</span>
                    </a>
                    <a href="verifica.html" class="nav-link">
                        <i class="bi bi-search"></i> <span>Verifica Pubblica</span>
                    </a>
                </nav>

                <div class="sidebar-footer">
                    <a href="https://github.com/CiccioLagXCVIII" target="_blank" class="github-link">
                        <i class="bi bi-github me-2"></i> <span>GitHub Project</span>
                    </a>
                </div>
            </aside>

            <!-- Contenuto Centrale -->
            <main class="content-area">
                <div class="custom-card">
                    <!-- Intestazione Progetto -->
                    <div class="mb-4 text-center">
                        <span class="badge bg-primary px-3 py-2 mb-2 rounded-pill">Data Security & Blockchain Project</span>
                        <h1 class="display-5 fw-bold text-white">VerifyData</h1>
                        <p class="lead text-secondary">Notarizzazione Digitale e Identità Sovrana su Ethereum</p>
                    </div>
                    
                    <hr class="border-secondary mb-5">

                    <!-- Sezione Vision e Pilastri -->
                    <div class="row g-3">
                        <!-- Visione -->
                        <div class="col-12">
                            <h4 class="text-white border-start border-primary border-4 ps-3">Visione del Progetto</h4>
                            <p class="text-secondary">
                                [Inserisci qui la descrizione della visione: Trustless, Eliminazione intermediari, GDPR compliance]
                            </p>
                        </div>

                        <!-- Pilastro 1: Hashing -->
                        <div class="col-md-6">
                            <div class="p-3 border border-secondary rounded h-100">
                                <h6 class="text-primary"><i class="bi bi-hash me-2"></i>Integrità (SHA-256)</h6>
                                <p class="small text-secondary mb-0">
                                    [Spiega come l'hashing garantisce che il file non venga mai caricato on-chain (Privacy-by-Design)]
                                </p>
                            </div>
                        </div>

                        <!-- Pilastro 2: SBT -->
                        <div class="col-md-6">
                            <div class="p-3 border border-secondary rounded h-100">
                                <h6 class="text-primary"><i class="bi bi-person-badge me-2"></i>Soulbound Tokens (SSI)</h6>
                                <p class="small text-secondary mb-0">
                                    [Spiega l'uso degli EIP-5192 per l'identità non trasferibile del firmatario]
                                </p>
                            </div>
                        </div>

                        <!-- Pilastro 3: Ciclo di Vita -->
                        <div class="col-md-6">
                            <div class="p-3 border border-secondary rounded h-100">
                                <h6 class="text-primary"><i class="bi bi-arrow-repeat me-2"></i>Revoca e Stato</h6>
                                <p class="small text-secondary mb-0">
                                    [Spiega la possibilità di invalidare certificazioni obsoletate mantenendo lo storico]
                                </p>
                            </div>
                        </div>

                        <!-- Pilastro 4: Smart Contract -->
                        <div class="col-md-6">
                            <div class="p-3 border border-secondary rounded h-100">
                                <h6 class="text-primary"><i class="bi bi-code-slash me-2"></i>Smart Contract Logic</h6>
                                <p class="small text-secondary mb-0">
                                    [Descrivi brevemente l'uso di Solidity e della Testnet Sepolia per la persistenza dei dati]
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Studente -->
                    <div class="mt-5 pt-4 border-top border-secondary d-flex justify-content-between align-items-center">
                        <div class="me-3">
                            <p class="mb-0 text-white fw-bold">Francesco Lo Verde</p>
                            <p class="small mb-0">Studente Università degli Studi di Perugia</p>
                        </div>
                        <div class="flex-shrink-0 logo-container">
                            <img src="Images/logoUnipg.svg" alt="Unipg Logo" class="unipg-logo">
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <script src="js/main.js"></script>
    </body>
</html>
```

### Pagina Profilo.html
**Scopo:** Gestione dello storico e della propria identità.
- **Contenuti:**
    - Visualizzazione del proprio badge SBT (Identità Sovrana).
    - Tabella dei documenti certificati (Data, Nome File, Hash, Stato).
    - Azione di "Revoca" per ogni documento.
- **Logica ad alto livello:**
    1. Al caricamento, interroga la blockchain filtrando i documenti creati dall'indirizzo connesso.
    2. Se l'utente clicca su "Revoca", viene inviata una transazione allo Smart Contract per cambiare lo stato di quel certificato da `valid` a `revoked`.

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Progetto - Form 1</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header class="app-header d-flex justify-content-between align-items-center px-4" id="navbar">
        <h5 class="mb-0 text-white">
            <i class="bi bi-layers-half me-2 text-primary"></i>VerifyData
        </h5>
        <!-- Pulsante Accesso a destra -->
        <div id="headerActions" class="d-flex align-items-center gap-2">
            <!-- Nella Pagina Profilo Non Mostriamo Il Pulsante Di Connessione Perché L'Utente È Già Connesso -->
            <!--
            <a href="connessione.html" class="btn btn-outline-primary btn-sm rounded-pill" id="connectWalletBtn">
                <i class="bi bi-wallet-fill"></i> Connetti Wallet
            </a>
            -->
        </div>
    </header>

    <div class="main-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <nav class="nav-links">
                <a href="index.html" class="nav-link">
                    <i class="bi bi-house-door"></i> <span>Presentazione</span>
                </a>
                <a href="profilo.html" class="nav-link active">
                    <i class="bi bi-person-vcard"></i> <span>Profilo SSI</span>
                </a>
                <a href="certifica.html" class="nav-link">
                    <i class="bi bi-shield-check"></i> <span>Certifica Documento</span>
                </a>
                <a href="verifica.html" class="nav-link">
                    <i class="bi bi-search"></i> <span>Verifica Pubblica</span>
                </a>
            </nav>

            <div class="sidebar-footer">
                <a href="https://github.com/CiccioLagXCVIII" target="blank" class="github-link">
                    <i class="bi bi-github me-2"></i> <span>GitHub</span>
                </a>
            </div>
        </aside>
        
        <main class="content-area">
            <!-- Card Richiesta: Visibile Se Non Ha Identità -->
            <div class="custom-card" style="display: none;">
                <div id="identityRequest">
                    <h2 class="mb-4 text-center">Richiedi Identità Sovrana</h2>
                    <p class="text-center">Per certificare documenti come utente verificato, devi richiedere il tuo Badge SBT.</p>
                    <form id="mintSBTForm" class="text-center">
                        <button type="submit" class="btn btn-primary">Minta il tuo Badge (SBT)</button>
                    </form>
                </div>
            </div>

            <!-- Card Dati: nascosta di default -->
            <div class="custom-card" style="display: none;">
                <div id="profileData">
                    <h2 class="mb-4 text-center">Dashboard Identità</h2>
                    <div class="alert alert-info">
                        <strong>Wallet:</strong> <span id="walletAddressDisplay" class="font-monospace"></span><br>
                        <strong>Status:</strong> <span class="badge bg-success">Identità Verificata</span>
                    </div>
                    
                    <h4 class="mt-4">I Tuoi Documenti Certificati</h4>
                    <table class="table table-dark table-hover mt-3">
                        <thead>
                            <tr>
                                <th>Nome File</th>
                                <th>Data</th>
                                <th>Hash SHA-256</th>
                                <th>Azione</th>
                            </tr>
                        </thead>
                        <tbody id="documentsTable">
                            <!-- Riga d'esempio simulata -->
                            <tr>
                                <td>Contratto_Affitto.pdf</td>
                                <td>02/01/2026</td>
                                <td><small>8f32...a12b</small></td>
                                <td><button class="btn btn-danger btn-sm">Revoca</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>  
    <script src="js/main.js"></script>
    <script src="js/auth.js"></script>
</body>
</html>
```

### Pagina Certifica.html
**Scopo:** Effettuare la marcatura temporale del documento.
- **Contenuti:**
    - Area Drag & Drop per il caricamento file.
    - Anteprima nome file e calcolo in tempo reale dell'Hash SHA-256.
    - Pulsante "Registra su Blockchain" (disabilitato se l'utente non è loggato o non ha l'SBT).
- **Logica ad alto livello:**
    1. L'utente carica il file.
    2. JavaScript calcola l'hash localmente.
    3. Al click su "Registra", viene invocato lo Smart Contract passando l'hash come parametro.
    4. Feedback di attesa della transazione e conferma finale.

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Progetto - Form 2</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header class="app-header d-flex justify-content-between align-items-center px-4">
            <h5 class="mb-0 text-white">
                <i class="bi bi-layers-half me-2 text-primary"></i>VerifyData
            </h5>
            <!-- Pulsante Accesso a destra -->
            <div id="headerActions" class="d-flex align-items-center gap-2">
                <a href="connessione.html" class="btn btn-outline-primary btn-sm rounded-pill" id="connectWalletBtn">
                    <i class="bi bi-wallet-fill"></i> Connetti Wallet
                </a>
            </div>
        </header>

        <div class="main-container">
            <!-- Sidebar -->
            <aside class="sidebar">
                <nav class="nav-links">
                    <a href="index.html" class="nav-link">
                        <i class="bi bi-house-door"></i> <span>Presentazione</span>
                    </a>
                    <a href="profilo.html" class="nav-link">
                        <i class="bi bi-person-vcard"></i> <span>Profilo SSI</span>
                    </a>
                    <a href="certifica.html" class="nav-link active">
                        <i class="bi bi-shield-check"></i> <span>Certifica Documento </span>
                    </a>
                    <a href="verifica.html" class="nav-link">
                        <i class="bi bi-search"></i> <span>Verifica Pubblica</span>
                    </a>
                </nav>

                <div class="sidebar-footer">
                    <a href="https://github.com/CiccioLagXCVIII" target="_blank" class="github-link">
                        <i class="bi bi-github me-2"></i> <span>GitHub Project</span>
                    </a>
                </div>
            </aside>

        <main class="content-area">
            <div class="custom-card">
                <h2 id="form-title" class="mb-4">Caricamento Documenti</h2>
                <form>
                    <div id="drop-zone" class="upload-area">
                        <label for="file-input"><i class="bi bi-cloud-arrow-up fs-1"></i></label>
                        <p>Trascina Qui Il File Oppure <label for="file-input" id="upload-link">Selezionalo Manualmente</label></p>
                        <input type="file" id="file-input" hidden>
                    </div>

                    <div id="file-info" class="mt-3 mb-4 text-muted">
                        <strong>Hash SHA-256 Del File "<span id="file-name"></span>":</strong>
                        
                        <div class="hash-container">
                            <span id="file-hash" class="text-success font-monospace">
                                <!-- Hash generato via JS -->
                            </span>
                            
                            <button type="button" id="copy-btn" class="btn btn-outline-light btn-sm border-0" title="Copia Hash">
                                <i class="bi bi-copy"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success px-4">Carica Documento</button>
                </form>
            </div>
        </main>
    </div>

    <div id="copy-toast" class="copy-toast">
        <i class="bi bi-check-circle me-2"></i> Hash Copiato!
    </div>

    <script src="js/main.js"></script>
    <script src="js/notarizer.js"></script>
</body>
</html>
```

### Pagina Connessione.html
**Scopo:** Gestire l'onboarding dell'utente nel Web3.
- **Contenuti:**
    - Card dinamica che cambia stato in base alla connessione.
    - Pulsante "Connetti MetaMask".
    - Messaggi di errore se il wallet non è installato.
- **Logica ad alto livello:**
    1. **Stato 1 (Disconnesso):** Mostra il tasto di connessione.
    2. **Stato 2 (Connesso, No SBT):** Rileva l'indirizzo dal wallet, nota che non ha un'identità SBT e mostra il tasto "Richiedi Identità Digitale".
    3. **Stato 3 (Connesso + SBT):** Mostra i dettagli dell'identità e reindirizza al Profilo.

```html
<!DOCTYPE html>
<html lang="it">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Progetto - Home</title>
      <!-- Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <!-- Bootstrap Icons -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
      <link rel="stylesheet" href="css/style.css">

</head>
<body>
      <header class="app-header d-flex justify-content-between align-items-center px-4">
            <h5 class="mb-0 text-white">
                  <i class="bi bi-layers-half me-2 text-primary"></i>VerifyData
            </h5>
            <!-- Pulsante Accesso A Destra Non Serve -->
      </header>

      <div class="main-container">
            <!-- Sidebar -->
            <aside class="sidebar">
                  <nav class="nav-links">
                        <a href="index.html" class="nav-link">
                              <i class="bi bi-house-door"></i> <span>Presentazione</span>
                        </a>
                        <a href="profilo.html" class="nav-link">
                              <i class="bi bi-person-vcard"></i> <span>Profilo SSI</span>
                        </a>
                        <a href="certifica.html" class="nav-link">
                              <i class="bi bi-shield-check"></i> <span>Certifica Documento</span>
                        </a>
                        <a href="verifica.html" class="nav-link">
                              <i class="bi bi-search"></i> <span>Verifica Pubblica</span>
                        </a>
                  </nav>

                  <div class="sidebar-footer">
                        <a href="https://github.com/CiccioLagXCVIII" target="_blank" class="github-link">
                              <i class="bi bi-github me-2"></i> <span>GitHub Project</span>
                        </a>
                  </div>
            </aside>

            <!-- Contenuto Centrale -->
            <main class="content-area">
                  <div class="custom-card">
                        <h2 id="form-title" class="mb-4">Connessione Al Wallet</h2>
                        
                        <div class="row g-3">
                              
                              <!-- Prima Colonna: Titolo -->
                              <div class="col-md-6">
                                    <div class="h-100 d-flex align-items-center justify-content-left">
                                          <p class="mb-0 text-center">Utilizza MetaMask per accedere in modo sicuro alla piattaforma</p>
                                    </div>
                              </div>

                              <!-- Seconda Colonna: Bottone -->
                              <div class="col-md-6">
                                    <div class="p-3 h-100 d-flex align-items-center justify-content-center">
                                          <!-- Il bottone qui -->
                                          <button class="btn btn-primary w-100 py-3" id="connectWalletBtn">
                                                <i class="bi bi-wallet2 me-2"></i> Connetti Wallet
                                          </button>
                                    </div>
                              </div>
                              
                        </div>
                  </div>
            </main>
      </div>
      <script src="js/main.js"></script>
      <script src="js/auth.js"></script>
</body>
</html>
```

### Pagina Verifica.html
**Scopo:** Permettere a chiunque (anche senza wallet) di verificare un documento ricevuto.
- **Contenuti:**
    - Area di upload per il file da controllare.
    - Pannello dei risultati (Verde: Valido / Rosso: Non trovato o Revocato).
    - Dettagli: Chi ha firmato il documento e quando.
- **Logica ad alto livello:**
    1. Calcola l'hash del file caricato.
    2. Interroga la blockchain (funzione `read-only`) per vedere se quell'hash esiste nel registro.
    3. Se esiste, recupera l'indirizzo del firmatario e controlla se ha un SBT valido.

```html
<!DOCTYPE html>
<html lang="it">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Progetto - Form 1</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
      <link rel="stylesheet" href="css/style.css">
</head>
<body>

      <header class="app-header d-flex justify-content-between align-items-center px-4">
            <h5 class="mb-0 text-white">
                  <i class="bi bi-layers-half me-2 text-primary"></i>VerifyData
            </h5>
            <!-- Pulsante Accesso a destra -->
            <div id="headerActions" class="d-flex align-items-center gap-2">
                  <a href="connessione.html" class="btn btn-outline-primary btn-sm rounded-pill" id="connectWalletBtn">
                        <i class="bi bi-wallet-fill"></i> Connetti Wallet
                  </a>
            </div>
      </header>

      <div class="main-container">
            <!-- Sidebar -->
            <aside class="sidebar">
            <nav class="nav-links">
                  <a href="index.html" class="nav-link">
                        <i class="bi bi-house-door"></i> <span>Presentazione</span>
                  </a>
                  <a href="profilo.html" class="nav-link">
                        <i class="bi bi-person-vcard"></i> <span>Profilo SSI</span>
                  </a>
                  <a href="certifica.html" class="nav-link">
                        <i class="bi bi-shield-check"></i> <span>Certifica Documento</span>
                  </a>
                  <a href="verifica.html" class="nav-link active">
                        <i class="bi bi-search"></i> <span>Verifica Pubblica</span>
                  </a>
            </nav>

            <div class="sidebar-footer">
                  <a href="https://github.com/CiccioLagXCVIII" target="_blank" class="github-link">
                        <i class="bi bi-github me-2"></i> <span>GitHub Project</span>
                  </a>
            </div>
            </aside>

            <main class="content-area">
            <div class="custom-card">
                  <h2 class="mb-4">Verifica Documento</h2>
                  <form>
                        <div class="mb-3">
                              <label class="form-label">Nome</label>
                              <input type="text" class="form-control" placeholder="Mario Rossi">
                        </div>
                        <div class="mb-3">
                              <label class="form-label">Indirizzo Email</label>
                              <input type="email" class="form-control" placeholder="name@example.com">
                        </div>
                        <button type="submit" class="btn btn-primary px-4">Verifica</button>
                  </form>
            </div>
            </main>
      </div>
      <script src="js/main.js"></script>
      <script src="js/notarizer.js"></script>
</body>
</html>
```

### Pagina CSS Style.css
Foglio di stile globale. Definisce il design della sidebar, della navigazione e delle card.
```css
/* Placeholder: Variabili colori (Navy, Cyber Blue), Layout Sidebar, Responsive Design */
```

### Script Main.js
Gestisce la logica comune a tutte le pagine, come la navigazione della sidebar e l'aggiornamento dell'header (stato del wallet).
```javascript
// Determina La Pagina Corrente A Livello Globale Per Evitare Ricalcoli
const path = window.location.pathname;
window.verifyDataPage = path.split("/").pop() || 'index.html';
if (window.verifyDataPage === "" || path.endsWith('/')) window.verifyDataPage = 'index.html';

document.addEventListener('DOMContentLoaded', () => {
      // Mostra In Console La Pagina Attiva Per Debugging Usando La Variabile Globale
      console.log("VerifyData: Pagina Corrente ->", window.verifyDataPage);

      // Gestione Dello Stato Attivo Dei Link Di Navigazione
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Confronta L'href Del Link Con La Variabile Globale Della Pagina
            if (window.verifyDataPage === href) {
                  link.classList.add('active');
            } else {
                  link.classList.remove('active');
            }
      });

      // Elenco Delle Pagine Protette Che Richiedono La Connessione Del Wallet
      const privatePages = ['profilo.html', 'certifica.html'];
      const walletConnected = localStorage.getItem('walletAddress') || "";

      // Reindirizza L'utente Se Prova Ad Accedere A Pagine Private Senza Wallet
      if (privatePages.includes(window.verifyDataPage) && !walletConnected) {
            alert("Accesso Negato. Connetti Il Tuo Wallet Per Continuare.");
            window.location.href = 'connessione.html';
            return; 
      }

      // Riferimenti Agli Elementi Di Autenticazione Nell'interfaccia
      const authBtn = document.getElementById('connectWalletBtn');
      const headerBtn = document.getElementById('headerActions');

      // Aggiorna L'interfaccia Utente Se Il Wallet Risulta Collegato
      if (walletConnected) {
            // Verifica L'esistenza Del Pulsante (Evita Errori Su connessione.html)
            if (authBtn) {
                  const addr = walletConnected;
                  const shortenedAddress = addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);

                  authBtn.innerHTML = `<i class="bi bi-person-check-fill me-2"></i> ${shortenedAddress}`;
                  authBtn.href = "profilo.html";
                  authBtn.classList.replace('btn-outline-primary', 'btn-primary');
            }

            // Crea Dinamicamente Il Pulsante Di Logout Solo Se Esiste Il Contenitore Header
            if (headerBtn && !document.getElementById('logoutBtn')) {
                  const logoutBtn = document.createElement('button');
                  logoutBtn.type = 'button';
                  logoutBtn.id = 'logoutBtn';
                  logoutBtn.className = 'btn btn-danger btn-sm rounded-pill ms-2';
                  logoutBtn.innerHTML = '<i class="bi bi-box-arrow-right"></i>';

                  // Gestisce L'evento Di Disconnessione (Logica Accorpata Qui Per Evitare Conflitti)
                  logoutBtn.addEventListener('click', () => {
                        localStorage.removeItem('walletAddress');
                        localStorage.removeItem('identitySBT');
                        window.location.href = 'index.html';
                  });

                  headerBtn.appendChild(logoutBtn);
            }
      }

      // Logica Specifica Per La Pagina Profilo
      if (window.verifyDataPage === 'profilo.html' && walletConnected) {
            // Visualizza l'indirizzo del Wallet nel profilo
            const walletDisplay = document.getElementById('walletAddressDisplay');
            if (walletDisplay) {
                  walletDisplay.textContent = walletConnected;
            }

            // Verifica La Presenza Del Token Identità Soulbound
            const identitySBT = localStorage.getItem('identitySBT');

            const requestSection = document.getElementById('identityRequest');
            const profileSection = document.getElementById('profileData');

            // Verifica L'Esistenza Delle Sezioni HTML Prima Di Operare
            if (requestSection && profileSection) {
                  if (identitySBT) {
                        // Mostra I Dati Del Profilo Se L'identità SBT È Presente
                        console.log("VerifyData: Utente Con Identità");
                        requestSection.parentElement.style.display = 'none';
                        profileSection.parentElement.style.display = 'block';
                        console.log("VerifyData: Caricamento Dati Dall Blockchain");
                  } else {
                        // Mostra La Sezione Per Richiedere L'Identità Se Mancante
                        console.log("VerifyData: Utente Senza Identità");
                        requestSection.parentElement.style.display = 'block';
                        profileSection.parentElement.style.display = 'none';
                  }
            }
      }
});
```

### Script Auth.js
Contiene le funzioni per interagire con MetaMask, gestire il login, il logout e verificare la presenza del Soulbound Token nel wallet dell'utente.
```javascript
// Inizializzazione Della Logica Di Autenticazione Web3
document.addEventListener('DOMContentLoaded', () => {
      // Recupera L'elemento Del Pulsante Per La Connessione Al Wallet
      const connectWalletBtn = document.getElementById('connectWalletBtn');

      // Gestisce Il Click Per La Connessione Tramite Provider Web3
      if (connectWalletBtn) {
            connectWalletBtn.addEventListener('click', async (e) => {
                  // Se Il Pulsante È Già In Stato "Profilo" (Gestito Da main.js), Non Rieseguire Login
                  if (localStorage.getItem('walletAddress')) return;

                  if (typeof window.ethereum !== 'undefined') {
                        try {
                              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                              const userAddress = accounts[0];
                              localStorage.setItem('walletAddress', userAddress);
                              console.log("VerifyData: Connessione Effettuata ->", userAddress);
                              window.location.href = 'profilo.html';
                        } catch (error) {
                              console.error("VerifyData: Errore Durante La Connessione ->", error);
                        }
                  } else {
                        alert("Per favore installa MetaMask!");
                  }
            });
      }

      // Gestione Del Modulo Per Il Minting Dell'identità SBT
      const mintSBTForm = document.getElementById('mintSBTForm');
      
      // Usa La Variabile Globale Definita In main.js Per Il Controllo Pagina
      if (window.verifyDataPage === "profilo.html" && mintSBTForm) {
            mintSBTForm.addEventListener('submit', (e) => {
                  e.preventDefault(); 
                  console.log("VerifyData: Richiesta Minting SBT Alla Blockchain...");
                  localStorage.setItem('identitySBT', 'true');
                  window.location.reload();
            });
      }
});
```

### Script Notarizer.js
Gestisce il calcolo crittografico dell'hash e le chiamate alle funzioni `write` e `read` dello Smart Contract per la registrazione e verifica dei file.
```javascript
// Inizializzazione Della Logica Di Caricamento E Notarizzazione
document.addEventListener('DOMContentLoaded', () => {
// seleziona l'area di rilascio per il drag and drop dei file
const dropZone = document.getElementById('drop-zone');
// recupera l'input di tipo file nascosto
const fileInput = document.getElementById('file-input');
// identifica l'elemento dove mostrare l'hash calcolato
const fileHashDisplay = document.getElementById('file-hash');
// individua il campo per visualizzare il nome del documento
const fileNameDisplay = document.getElementById('file-name');
// seleziona il contenitore delle informazioni del file
const fileInfo = document.getElementById('file-info');
// recupera il pulsante per copiare l'hash negli appunti
const copyBtn = document.getElementById('copy-btn');

// Gestione Degli Eventi Visivi Di Trascinamento
if (dropZone) {
      // definisce gli eventi in cui il file entra nell'area sensibile
      ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
            // blocca il comportamento predefinito del browser
            e.preventDefault();
            // aggiunge una classe css per evidenziare l'area di rilascio
            dropZone.classList.add('drag-over');
      });
      });

      // definisce gli eventi in cui il file esce o viene rilasciato
      ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
            // impedisce l'apertura automatica del file nel browser
            e.preventDefault();
            // rimuove l'evidenziazione visiva dell'area
            dropZone.classList.remove('drag-over');
      });
      });

      // cattura l'evento di rilascio del file nell'area indicata
      dropZone.addEventListener('drop', (e) => {
      // estrae il primo file trascinato e lo passa alla funzione di calcolo
      handleFile(e.dataTransfer.files[0]);
      });

      // gestisce la selezione del file tramite il selettore classico
      fileInput.addEventListener('change', (e) => {
      // invia il file selezionato manualmente alla logica di hashing
      handleFile(e.target.files[0]);
      });
}

// Funzione Asincrona Per Il Calcolo Dell'Impronta Digitale SHA-256
async function handleFile(file) {
      // interrompe l'esecuzione se non è stato selezionato alcun file
      if (!file) return;
      
      // aggiorna l'interfaccia con il nome del file caricato
      fileNameDisplay.textContent = file.name;
      // rende visibile il pannello contenente i dati del file
      fileInfo.style.display = 'block';
      // imposta uno stato di attesa durante l'elaborazione crittografica
      fileHashDisplay.textContent = "Calcolo in corso...";

      try {
      // legge il contenuto binario del file come arraybuffer
      const arrayBuffer = await file.arrayBuffer();
      // genera l'hash sha-256 utilizzando le web crypto api del browser
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      // converte il buffer del risultato in un array di byte
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      // trasforma i byte in una stringa esadecimale leggibile
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      // mostra l'impronta digitale definitiva nell'interfaccia utente
      fileHashDisplay.textContent = hashHex;
      } catch (error) {
      // gestisce eventuali errori durante la lettura o il calcolo
      fileHashDisplay.textContent = "Errore nel calcolo";
      }
}

// Logica Di Copia Negli Appunti E Notifiche
if (copyBtn) {
      // associa l'azione di copia al click sul relativo pulsante
      copyBtn.addEventListener('click', () => {
      // preleva l'hash visualizzato a schermo
      const text = fileHashDisplay.textContent;
      // verifica che l'hash sia pronto e non in fase di calcolo
      if (text && text !== "Calcolo in corso...") {
            // utilizza l'api di sistema per scrivere il testo negli appunti
            navigator.clipboard.writeText(text);
            // recupera l'elemento toast per il feedback visivo
            const toast = document.getElementById('copy-toast');
            // mostra il messaggio di conferma per alcuni secondi
            toast.classList.add('show');
            // programma la scomparsa automatica della notifica
            setTimeout(() => toast.classList.remove('show'), 2000);
      }
      });
}
});

// 
```

### Logica Del Local Storage
Poichè la DApp deve essere Frontend-Only, uso il `localStorage` per memorizzare lo stato della sessione:
- `walletAddress`: Indirizzo Del Wallet
- `identitySBT`: Variabile Booleana Che Indica Se Allo Specifico Address È Collegata Un Identità

Se un utente prova ad accedere a `certifica.html` o `profilo.html` e non è presente `walletAddress` e/o `identitySBT` è `false`, viene automaticamente reindirizzato a `connessione.html`.

## Sicurezza E Privacy

1. **Zero-Knowledge Proof Of Content:** Non carichiamo mai il contenuto del file. Solo l'impronta digitale (hash) viene caricato in rete.
2. **Identity Linkage:** Solo chi possiede l'SBT può apparire come "Firmatario Verificato", prevenendo lo spam di notarizzazioni anonime.
3. **Immutabilità Dinamica:** La blockchain garantisce che la data di certificazione sia certa, ma la logica di revoca permette la gestione del ciclo di vita del documento.