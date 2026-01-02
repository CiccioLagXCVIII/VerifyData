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
});