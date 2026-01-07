export const General = {
      findPage() {
            const path = window.location.pathname;
            if (path.includes('/index.html')) {
                  return 'index.html';
            } else if (path.includes('/connessione.html')) {
                  return 'connessione.html';
            } else if (path.includes('/profilo.html')) {
                  return 'profilo.html';
            } else if (path.includes('/certifica.html')) {
                  return 'certifica.html';
            } else if (path.includes('/verifica.html')) {
                  return 'verifica.html';
            } else {
                  return 'index.html';
            }

      },

      activeNavLink() {
            const navLinks = document.querySelectorAll('.nav-link');
            const currentPage = this.findPage();

            navLinks.forEach(link => {
                  const href = link.getAttribute('href');
                  // Confronta L'href Del Link Con La Variabile Globale Della Pagina
                  if (currentPage === href) {
                        link.classList.add('active');
                  } else {
                        link.classList.remove('active');
                  }
            });
      },

      protectPrivatePages() {
            const privatePages = ['profilo.html', 'certifica.html'];
            const walletConnected = localStorage.getItem('walletAddress') || "";
            const currentPage = this.findPage();

            // Reindirizza L'utente Se Prova Ad Accedere A Pagine Private Senza Wallet
            if (privatePages.includes(currentPage) && !walletConnected) {
                  alert("Accesso Negato. Connetti Il Tuo Wallet Per Continuare.");
                  window.location.href = 'connessione.html';
                  return; 
            }
      },

      updateLoginBtn() {
            const authBtn = document.getElementById('connectWalletBtn');
            const headerBtn = document.getElementById('headerActions');
            const walletConnected = localStorage.getItem('walletAddress') || "";

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
      },

      // Altre Funzioni Se Necessario
};