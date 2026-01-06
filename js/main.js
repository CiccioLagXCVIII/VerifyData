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