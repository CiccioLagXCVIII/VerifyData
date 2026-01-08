import { General } from './moduleGeneral.js';

export const Profile = {
      updateProfileInterface() {
            const walletConnected = localStorage.getItem('walletAddress') || "";    
            const currentPage = General.findPage();
            
            if (currentPage === 'profilo.html' && walletConnected) {
                  // Visualizza Indirizzo Del Wallet Collegato
                  const walletDisplay = document.getElementById('walletAddressDisplay');
                  if (walletDisplay) {
                        walletDisplay.textContent = walletConnected;
                  }
                  
                  // Verifica La Presenza Del Token Identità Soulbound
                  const identitySBT = localStorage.getItem('identitySBT');

                  const requestSection = document.getElementById('identityRequest');
                  const profileSection = document.getElementById('profileData');

                  // Verifica L'Esistenza Delle Sezioni HTML
                  if (requestSection && profileSection) {
                        if (identitySBT) {
                              // Mostra I Dati Del Profilo Se L'identità SBT È Presente
                              console.log("VerifyData: Utente Con Identità");
                              requestSection.parentElement.style.display = 'none';
                              profileSection.parentElement.style.display = 'block';

                              // Interagisci Con La Blockchain Per Caricare I Dati Dell'Utente
                              console.log("VerifyData: Caricamento Dati Dalla Blockchain...");
                        } else {
                              // Mostra La Sezione Per Richiedere L'Identità Se Mancante
                              console.log("VerifyData: Utente Senza Identità");
                              requestSection.parentElement.style.display = 'block';
                              profileSection.parentElement.style.display = 'none';

                              // Interagisci Con La Blockchain Per Caricare I Dati Dell'Utente
                              console.log("VerifyData: Chiama La Funzione Auth.mintIdentitySBT() ...");
                        }
                  }
            }
      }
}
