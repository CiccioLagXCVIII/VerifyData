import { General } from './moduleGeneral.js';

export const Profile = {

    // Gestione Prima Colonna (Indirizzo Wallet)
    async renderWalletInfo(walletConnected) {
        const walletBrandDisplay = document.getElementById('walletBrand');
        const connectionStatus = document.getElementById('connectionStatus');
        const networkDisplay = document.getElementById('networkDisplay');

        // Rilevamento Wallet e Network
        if (window.ethereum) {
            // Wallet
            const provider = window.ethereum;
            let name = "Unknown Wallet";

            if (provider.isMetaMask) {
                name = "MetaMask";
            } else if (provider.isBraveWallet) {
                name = "Brave Wallet";
            } else if (provider.isCoinbaseWallet) {
                name = "Coinbase Wallet";
            } else if (provider.isTrust) {
                name = "Trust Wallet";
            } else if (provider.isRabby) {
                name = "Rabby Wallet";
            } else {
                name = "Injected Web3";
            }

            if (walletBrandDisplay && connectionStatus) {
                walletBrandDisplay.textContent = name;
                connectionStatus.textContent = "Connected";
            }

            console.log("VerifyData: Wallet Identificato:", name);

            // Network
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            let networkName = "Unknown Network";

            const networks = {
                '0x1': 'Ethereum Mainnet',
                '0xaa36a7': 'Sepolia Testnet',
                '0x5': 'Goerli Testnet',
                '0x89': 'Polygon Mainnet',
                '0x13881': 'Mumbai Testnet'
            };

            networkName = networks[chainId] || `Chain ID: ${chainId}`;

            if (networkDisplay) {
                networkDisplay.textContent = networkName;
            }

            // Visualizza Indirizzo Etherscan Del Wallet Collegato
            const etherscanLinkDisplay = document.getElementById('etherscanLinkDisplay');
            if (etherscanLinkDisplay) {
                etherscanLinkDisplay.setAttribute('href', `https://sepolia.etherscan.io/address/${walletConnected}`);
            }

            console.log("VerifyData: Network Rilevato:", networkName);
        } else {
            if (walletBrandDisplay) walletBrandDisplay.textContent = "No Wallet";
            if (connectionStatus) connectionStatus.textContent = "Disconnected";
        }
    },

    // Gestione Seconda Colonna (Dati Identità SBT)
    renderSBTInfo(walletConnected) {
        // Logica Icona "Randomica" Deterministica
        const avatarImg = document.getElementById('userAvatar');
        const fallbackIcon = document.getElementById('userAvatarFallback');

        if (avatarImg && fallbackIcon) {
            const avatarUrl = this.generateUserAvatar(walletConnected);

            avatarImg.src = avatarUrl;
            avatarImg.style.display = 'block';
            fallbackIcon.style.display = 'none';
        }

        // Dati d'esempio (verranno sostituiti dalle chiamate al contract)
        const sbtTokenId = '1234567890';
        const emissionDate = '1 Gennaio 2026';
        const registryNet = 'Ethereum (Sepolia)';
        const trustLevel = 'Advanced';
        const numDocCertificati = '10';
        const dataUltCertifica = '7 Gennaio 2026';

        // Aggiorna L'Interfaccia
        const sbtTokenIdDisplay = document.getElementById('sbtTokenIdDisplay');
        const emissionDateDisplay = document.getElementById('emissionDateDisplay');
        const registryNetDisplay = document.getElementById('registryNetDisplay');
        const trustLevelDisplay = document.getElementById('trustLevelDisplay');
        const numDocCertDisplay = document.getElementById('numDocCertificatiDisplay');
        const dataUltCertDisplay = document.getElementById('dataUltCertificaDisplay');

        if (sbtTokenIdDisplay && emissionDateDisplay && registryNetDisplay && trustLevelDisplay && numDocCertDisplay && dataUltCertDisplay) {
            sbtTokenIdDisplay.textContent = sbtTokenId;
            emissionDateDisplay.textContent = emissionDate;
            registryNetDisplay.textContent = registryNet;
            trustLevelDisplay.textContent = trustLevel;
            numDocCertDisplay.textContent = numDocCertificati;
            dataUltCertDisplay.textContent = dataUltCertifica;
        }
    },

    // Copia Indirizzo Wallet Click Pulsante
    setupEventListeners(walletConnected) {
        const copyBtn = document.getElementById('copyAddressBtn');
        if (copyBtn) {
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(walletConnected);

                // Feedback visivo temporaneo
                const icon = copyBtn.querySelector('i');
                const originalClass = icon.className;
                icon.className = 'bi bi-check';

                setTimeout(() => {
                    icon.className = originalClass;
                }, 2000);
            };
        }
    },

    // Generatore Icona Utente Randomica
    generateUserAvatar(address) {
        // Uso DiceBear API Con Stile 'bottts'
        // Il 'Seed' Assicura Che Lo Stesso Indirizzo Generi Sempre La Stessa Immagine
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${address}`;

        // Alternativa (Mostriciattolo) Usando Robohash:
        // return `https://robohash.org/${address}.png?set=set1`;
    },

    // Funzione Principale
    async updateProfileInterface() {
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
            const profileSection = document.getElementById('profileDashboard');

            // Verifica L'Esistenza Delle Sezioni HTML
            if (requestSection && profileSection) {
                if (identitySBT) {
                    // Mostra I Dati Del Profilo Se L'identità SBT È Presente
                    console.log("VerifyData: Utente Con Identità");
                    requestSection.parentElement.style.display = 'none';
                    profileSection.parentElement.style.display = 'block';

                    // Interagisci Con La Blockchain Per Caricare I Dati Dell'Utente
                    console.log("VerifyData: Caricamento Dati Dalla Blockchain...");

                    // Esecuzione sotto-logiche
                    await this.renderWalletInfo(walletConnected);
                    this.renderSBTInfo(walletConnected);
                    this.setupEventListeners(walletConnected);

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
    },
}