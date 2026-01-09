export const Auth = {

    // Funzione Che Gestisce La Connessione Al Wallet MetaMask
    async checkWallet() {
        // Recupera L'Elemento Del Pulsante Per La Connessione Al Wallet
        const connectWalletBtn = document.getElementById('connectWalletBtn');

        if (connectWalletBtn) {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // Richiede L'Accesso Agli Account Del Wallet
                    // Nota: Aggiunto 'await' per attendere la risposta dell'utente su MetaMask

                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const userAddress = accounts[0];

                    // Memorizza L'Indirizzo Localmente Per Gestire La Sessione
                    localStorage.setItem('walletAddress', userAddress); ``

                    console.log("VerifyData: Connessione Effettuata ->", userAddress);

                    // Interazione Smart Contract
                    console.log("VerifyData: Controllo On-Chain Se L'Indirizzo Possiede Già Un SBT...");

                    // Reindirizza L'Utente Alla Dashboard Dopo Il Login
                    window.location.href = 'profilo.html';
                } catch (error) {
                    console.error("VerifyData: Errore Durante La Connessione Al Wallet", error);
                }
            } else {
                // Notifica L'Utente Se Il Provider Web3 Non È Installato
                alert("Per Favore Installa MetaMask!");
            }
        }
    },

    // Funzione Per Gestire Il Ciclo Di Vita Del Minting Dell'Identità Digitale SBT
    mintIdentitySBT() {
        const mintSBTForm = document.getElementById('mintSBTForm');

        if (mintSBTForm) {
            // Ascolta L'Invio Del Modulo Per Avviare La Transazione
            mintSBTForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const userAddress = localStorage.getItem('walletAddress');
                console.log("VerifyData: Preparazione Transazione Per Address ->", userAddress);

                // Interazione Smart Contract
                console.log("VerifyData: Chiamata Al Metodo safeMint() Del Contratto SBT...");

                // Simulazione Del Successo Della Transazione Su Blockchain
                localStorage.setItem('identitySBT', 'true');

                // Ricarica La Pagina Per Aggiornare L'Interfaccia Con I Nuovi Dati
                window.location.reload();
            });
        }
    }

};