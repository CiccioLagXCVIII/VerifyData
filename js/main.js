// Attende Il Caricamento Completo Del Documento DOM
document.addEventListener('DOMContentLoaded', () => {
      // Recupera Il Percorso URL Corrente Per Identificare La Pagina
      const path = window.location.pathname;

      // Estrae Il Nome Del File Finale Dal Percorso
      let currentPage = path.split("/").pop();
      // Imposta Di Default La Index Se Il Percorso È Vuoto
      if (currentPage === "" || path.endsWith('/')) {
            currentPage = 'index.html';
      }

      // Mostra In Console La Pagina Attiva Per Debugging
      console.log("VerifyData: Pagina Corrente ->", currentPage);

      // Gestione Dello Stato Attivo Dei Link Di Navigazione
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
            // Ottiene L'attributo Href Di Ogni Collegamento
            const href = link.getAttribute('href');
            // Aggiunge La Classe Active Se Il Link Corrisponde Alla Pagina Attuale
            if (currentPage === href || (currentPage === 'index.html' && href === 'index.html')) {
                  link.classList.add('active');
            } else {
                  // Rimuove La Classe Active Dai Link Non Pertinenti
                  link.classList.remove('active');
            }
      });

      // Elenco Delle Pagine Protette Che Richiedono La Connessione Del Wallet
      const privatePages = ['profilo.html', 'certifica.html'];
      // Recupera L'indirizzo Del Wallet Dallo Storage Locale
      const walletConnected = localStorage.getItem('walletAddress') || "";

      // Reindirizza L'utente Se Prova Ad Accedere A Pagine Private Senza Wallet
      if (privatePages.includes(currentPage) && !walletConnected) {
            alert("Accesso Negato. Connetti Il Tuo Wallet Per Continuare.");
            window.location.href = 'connessione.html';
            return; 
      }

      // Riferimenti Agli Elementi Di Autenticazione Nell'interfaccia
      const authBtn = document.getElementById('connectWalletBtn');
      const headerBtn = document.getElementById('headerActions');
      // Aggiorna L'interfaccia Utente Se Il Wallet Risulta Collegato
      if (walletConnected) {
            if (authBtn) {
                  const addr = walletConnected;
                  // Crea Una Versione Abbreviata Dell'indirizzo Wallet
                  const shortenedAddress = addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);

                  // Trasforma Il Pulsante Di Connessione Nel Profilo Utente
                  authBtn.innerHTML = `<i class="bi bi-person-check-fill me-2"></i> ${shortenedAddress}`;
                  authBtn.href = "profilo.html";
                  authBtn.classList.replace('btn-outline-primary', 'btn-primary');
            }
            // Crea Dinamicamente Il Pulsante Di Logout Nell'header
            if (headerBtn && !document.getElementById('logoutBtn')) {
                  const logoutBtn = document.createElement('button');
                  logoutBtn.type = 'button';
                  logoutBtn.id = 'logoutBtn';
                  logoutBtn.className = 'btn btn-danger btn-sm rounded-pill ms-2';
                  logoutBtn.innerHTML = '<i class="bi bi-box-arrow-right"></i>';

                  // Gestisce L'evento Di Disconnessione E Pulizia Dei Dati
                  logoutBtn.addEventListener('click', () => {
                        localStorage.removeItem('walletAddress');
                        localStorage.removeItem('identitySBT');
                        window.location.href = 'index.html';
                  });

                  // Aggiunge Il Pulsante Creato All'header Della Pagina
                  headerBtn.appendChild(logoutBtn);
            }
      }

// Verifica La Presenza Del Token Identità Soulbound
const identitySBT = localStorage.getItem('identitySBT');

      // Gestione Della Logica Visiva Nella Pagina Profilo
      if (currentPage === 'profilo.html' && walletConnected) {
            const requestSection = document.getElementById('identityRequest');
            const profileSection = document.getElementById('profileData');
            // Verifica L'esistenza Delle Sezioni HTML Prima Di Operare
            if (requestSection && profileSection) {
                  console.log("VerifyData: Sezioni Identificate");
                  // Mostra I Dati Del Profilo Se L'identità SBT È Presente
                  if (identitySBT) {
                        console.log("VerifyData: Utente Con Identità");
                        requestSection.parentElement.style.display = 'none';
                        profileSection.parentElement.style.display = 'block';
                        console.log("VerifyData: Caricamento Dati Dall Blockchain");
                  } else {
                        // Mostra La Sezione Per Richiedere L'identità Se Mancante
                        requestSection.parentElement.style.display = 'block';
                        profileSection.parentElement.style.display = 'none';
                        console.log("VerifyData: Utente Senza Identità");
                  }
            }
      }
});