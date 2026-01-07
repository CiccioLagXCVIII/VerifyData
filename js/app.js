// app.js
import { General } from './moduleGeneral.js';
import { HomeManager } from './moduleIndex.js';
import { Auth } from './moduleAuth.js';
import { Notarizer } from './moduleNotarizer.js';
import { Profile } from './moduleProfile.js';

document.addEventListener('DOMContentLoaded', () => {
      // Esecuzione Logiche Comumni A Tutte Le Pagine
      General.activeNavLink();
      General.protectPrivatePages();
      General.updateLoginBtn();

      // Esecuzione Logiche Specifiche In Base Alla Pagina
      const page = General.findPage();

      switch (page) {
            case 'index.html':
                  HomeManager.init();
                  break;
            case 'connessione.html':
                  // Assegna la funzione al click del bottone se presente
                  const btn = document.getElementById('connectWalletBtn');
                  if (btn) btn.addEventListener('click', () => Auth.checkWallet());
                  break;
            case 'profilo.html':
                  Profile.updateProfileInterface();
                  Auth.mintIdentitySBT();
                  break;
            case 'certifica.html':
                  Notarizer.manageFileUpload();
                  Notarizer.copyHashToClipboard();
                  break;
            case 'verifica.html':
                  Notarizer.manageFileUpload();
                  break;
            default:
                  // Nessuna azione specifica
                  break;
      }
});