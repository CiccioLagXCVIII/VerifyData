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
      const headerBtn = document.getElementById('headerActions');
      // Se l'utente è connesso (walletConnected non è vuoto)
      if (walletConnected) {
            // Se esiste il pulsante "Connetti Wallet", lo trasformiamo in "Indirizzo"
            if (authBtn) {
                  const addr = walletConnected;
                  const shortenedAddress = addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);

                  authBtn.innerHTML = `<i class="bi bi-person-check-fill me-2"></i> ${shortenedAddress}`;
                  // Se è connesso, il pulsante porta al profilo
                  authBtn.href = "profilo.html";
                  // Cambio stile visivo
                  authBtn.classList.replace('btn-outline-primary', 'btn-primary');
            }
            // Se esiste il div "Header Actions", aggingo il pulsante di logout
            if (headerBtn) {
                  // Aggiungo Pulsante Logout Controllando Che Non Esista Già
                  // Evitiamo di aggiungerlo due volte se il codice gira più volte
                  if (!document.getElementById('logoutBtn')) {
                        headerBtn.innerHTML += ` 
                        <button type="button" class="btn btn-danger btn-sm rounded-pill" id="logoutBtn">
                              <i class="bi bi-box-arrow-right"></i>
                        </button>`;
                  }  
            }
      }

const identitySBT = localStorage.getItem('identitySBT'); // Sarà null se non esiste

      if (currentPage === 'profilo.html' && walletConnected) {
            const requestSection = document.getElementById('identityRequest');
            const profileSection = document.getElementById('profileData');
            
            // Se sono presenti entrambe le sezioni (vuol dire che siamo nella pagina profilo)
            if (requestSection && profileSection) {
                  console.log("VerifyData: Sezioni Identificate");
                  if (identitySBT) {
                        console.log("VerifyData: Utente Con Identità");
                        requestSection.parentElement.style.display = 'none';
                        profileSection.parentElement.style.display = 'block';

                        // Richiesta Dati Profilo Alla Blockchain (Simulato)
                        console.log("VerifyData: Caricamento Dati Dall Blockchain (simulato)");
                  } else {
                        requestSection.parentElement.style.display = 'block';
                        profileSection.parentElement.style.display = 'none';
                        console.log("VerifyData: Utente Senza Identità");
                  }
            }
      }
});