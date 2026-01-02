// js/auth.js
// Import Web3 se necessario per il futuro, per ora usiamo window.ethereum
document.addEventListener('DOMContentLoaded', () => {
const connectWalletBtn = document.getElementById('connectWalletBtn');

      if (connectWalletBtn) {
            connectWalletBtn.addEventListener('click', async () => {
            if (typeof window.ethereum !== 'undefined') {
                  try {
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        const userAddress = accounts[0];

                        localStorage.setItem('walletAddress', userAddress);
                        console.log("Connesso:", userAddress);

                        // Reindirizza al profilo dopo il login
                        window.location.href = 'profilo.html';
                  } catch (error) {
                        console.error("Errore connessione:", error);
                  }
            } else {
                  alert("Per favore installa MetaMask!");
            }
            });
      }

      // Rimuove  eventuali parametri o slash finali dall'URL
      let currentPage = window.location.pathname.split("/").pop();
      let mintSBTForm = document.getElementById('mintSBTForm');
      
      if (currentPage === "profilo.html" && mintSBTForm) {
            mintSBTForm.addEventListener('submit', (e) => {
                  e.preventDefault(); // Impedisce il refresh immediato del browser dovuto al form

                  // Simula Il Minting Della SBT Nella Blockchain
                  console.log("VerifyData: Richiesta Minting SBT Alla Blockchain...");

                  // Una Volta Mintata Salva Lo Stato Nella localStorage
                  localStorage.setItem('identitySBT', true);

                  // Ricarica La Pagina Per Aggiornare La Visualizzazione
                  window.location.reload();
            });
      }

      // Gestione Logout
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                  // Rimuovi Address Wallet e SBT dalla localStorage
                  // (Meglio Non Fare Clean Completo per Mantenere Altri Dati Eventuali)
                  localStorage.removeItem('walletAddress');
                  localStorage.removeItem('identitySBT');
                  console.log("Utente Disconnesso");
                  // Ricarica La Pagina Per Aggiornare La Visualizzazione
                  window.location.reload();
            });
      }
});