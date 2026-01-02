document.addEventListener('DOMContentLoaded', () => {
      console.log("VerifyData: Javascript Caricato");
      
      // Rimuove  eventuali parametri o slash finali dall'URL
      let currentPage = window.location.pathname.split("/").pop();
      if (currentPage === "" || currentPage === undefined) currentPage = 'index.html';

      // Gestione Link Attivo della Sidebar
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
            // Usiamo .includes per gestire meglio i percorsi relativi
            if (link.getAttribute('href') === currentPage) {
                  link.classList.add('active');
            }
      });

      // Controllo Sessione (Protezione Pagine Private)
      const privatePages = ['profilo.html', 'certifica.html'];
      // Recupero indirizzo wallet dalla localStorage
      const walletConnected = localStorage.getItem('walletAddress') || "";

      if (privatePages.includes(currentPage) && !walletConnected) {
            alert("Accesso Negato. Connetti Il Tuo Wallet Per Continuare.");
            window.location.href = 'connessione.html';
            return; // Blocca l'esecuzione del resto del codice
      }

      // Aggiornamento Pulsante Connessione
      const authBtn = document.getElementById('connectWalletBtn');

      if (authBtn && walletConnected) {
            const addr = walletConnected;
            const shortenedAddress = addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);

            authBtn.innerHTML = `<i class="bi bi-person-check-fill me-2"></i> ${shortenedAddress}`;
            
            // Se è connesso, il pulsante porta al profilo
            authBtn.href = "profilo.html";
            
            // Cambio stile visivo
            authBtn.classList.replace('btn-outline-primary', 'btn-primary');
      }
});