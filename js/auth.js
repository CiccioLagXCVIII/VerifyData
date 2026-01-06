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