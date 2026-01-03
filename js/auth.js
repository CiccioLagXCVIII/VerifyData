// Inizializzazione Della Logica Di Autenticazione Web3
document.addEventListener('DOMContentLoaded', () => {
      // recupera l'elemento del pulsante per la connessione al wallet
      const connectWalletBtn = document.getElementById('connectWalletBtn');

      // controlla se l'elemento del pulsante è presente nella pagina corrente
      if (connectWalletBtn) {
            // associa un evento di click per avviare la procedura di login
            connectWalletBtn.addEventListener('click', async () => {
            // verifica se il browser ha installato un provider come metamask
            if (typeof window.ethereum !== 'undefined') {
                  try {
                        // richiede all'utente l'autorizzazione per accedere ai suoi account
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        // estrae l'indirizzo pubblico principale dell'utente connesso
                        const userAddress = accounts[0];

                        // salva l'indirizzo nel browser per persistere la sessione
                        localStorage.setItem('walletAddress', userAddress);
                        // registra l'avvenuta connessione nella console per scopi di debug
                        console.log("Connesso:", userAddress);

                        // reindirizza l'utente alla dashboard personale dopo il successo
                        window.location.href = 'profilo.html';
                  } catch (error) {
                        // cattura e logga eventuali errori o rifiuti della connessione
                        console.error("Errore connessione:", error);
                  }
            } else {
                  // avvisa l'utente della necessità di installare un wallet web3
                  alert("Per favore installa MetaMask!");
            }
            });
      }

      // Estrazione Del Nome Della Pagina E Gestione Minting Identità
      let currentPage = window.location.pathname.split("/").pop();
      // identifica il modulo per la creazione del badge soulbound
      let mintSBTForm = document.getElementById('mintSBTForm');
      
      // esegue la logica solo se l'utente si trova nella pagina profilo
      if (currentPage === "profilo.html" && mintSBTForm) {
            // gestisce l'invio del form per simulare la scrittura on-chain
            mintSBTForm.addEventListener('submit', (e) => {
                  // impedisce il comportamento predefinito di ricaricamento del form
                  e.preventDefault(); 
                  // comunica l'inizio del processo di minting digitale
                  console.log("VerifyData: Richiesta Minting SBT Alla Blockchain...");
                  // memorizza lo stato di identità verificata nello storage locale
                  localStorage.setItem('identitySBT', true);
                  // ricarica la pagina per aggiornare la visualizzazione dei permessi
                  window.location.reload();
            });
      }

      // Procedura Di Disconnessione E Pulizia Della Sessione
      const logoutBtn = document.getElementById('logoutBtn');
      // verifica l'esistenza del tasto di uscita nell'interfaccia
      if (logoutBtn) {
            // definisce le azioni da compiere al momento del logout
            logoutBtn.addEventListener('click', () => {
                  // elimina l'indirizzo del wallet dalla memoria locale
                  localStorage.removeItem('walletAddress');
                  // rimuove il flag dell'identità sbt dalla sessione
                  localStorage.removeItem('identitySBT');
                  // conferma la chiusura della sessione nella console
                  console.log("Utente Disconnesso");
                  // aggiorna la pagina per tornare allo stato di visitatore
                  window.location.reload();
            });
      }
});