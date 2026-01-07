export const Notarizer = {

      // Funzione Asincrona Per Il Calcolo Dell'Hash SHA-256
      async generateFileHash(file) {
            // Campo Per Visualizzare Il Nome Del File
            const fileNameDisplay = document.getElementById('file-name');
            // Contenitore Delle Informazioni Del File
            const fileInfo = document.getElementById('file-info');
            // Elemento Dove Mostrare L'Hash Calcolato
            const fileHashDisplay = document.getElementById('file-hash');

            // Se Nessun File Viene Fornito, Esce Dalla Funzione
            if (!file) {
                  return;
            } else {
                  // Aggiorna Il Nome Del File Nell'Interfaccia Utente
                  fileNameDisplay.textContent = file.name;
                  // Rende Visibile Il Pannello Contenente I Dati Del File
                  fileInfo.style.display = 'block';
                  // Imposta Uno Stato Di Attesa Durante L'Elaborazione
                  fileHashDisplay.textContent = "Calcolo in corso...";

                  try {
                        // Lettura Del File Come ArrayBuffer
                        const arrayBuffer = await file.arrayBuffer();
                        // Genera L'Hash SHA-256
                        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
                        // Converte Il Risultato In Un Array Di Byte
                        const hashArray = Array.from(new Uint8Array(hashBuffer));
                        // Converte I Byte In Stringa Esadecimale
                        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                        // Mostra L'Hash Nell'Interfaccia Utente
                        fileHashDisplay.textContent = hashHex;
                  } catch (error) {
                        // Gestione Degli Errori
                        fileHashDisplay.textContent = "Errore Nel Calcolo Dell'Hash";
                  }
            }
      },

      manageFileUpload() {
            // Area Di Rilascio Del File Drag And Drop
            const dropZone = document.getElementById('drop-zone');
            // Input Di Tipo File Per Selezione Manuale (Nascosto)
            const fileInput = document.getElementById('file-input');
            
            // Gestione Degli Eventi Visivi Di Trascinamento
            if (dropZone) {
                  // Eventi Che Indicano Che Un File Viene Trascinato Sull'Area
                  ['dragenter', 'dragover'].forEach(name => {
                        dropZone.addEventListener(name, (e) => {
                              // Blocca Il Comportamento Predefinito Del Browser
                              e.preventDefault();
                              // Aggiunge Una Classe CSS Per Evidenziare L'Area Di Rilascio
                              dropZone.classList.add('drag-over');
                        });
                  });

                  // Definisce Gli Eventi In Cui Il File Esce O Viene Rilasciato
                  ['dragleave', 'drop'].forEach(name => {
                        dropZone.addEventListener(name, (e) => {
                              // Impedisce L'apertura Automatica Del File Nel Browser
                              e.preventDefault();
                              // Rimuove L'Evidenziazione Visiva Dell'Area Di Rilascio
                              dropZone.classList.remove('drag-over');
                        });
                  });

                  //# Le Arrow Functions Ereditano Quello Dal Contesto In Cui Sono State Create (Si Può Usare Anche Notatizer.generateFileHash)
                  // Cattura L'Evento Di Rilascio Del File Nell'Area Indicata
                  dropZone.addEventListener('drop', (e) => {
                        // Estrae Il Primo File Trascinato E Lo Passa Alla Funzione Di Calcolo
                        this.generateFileHash(e.dataTransfer.files[0]);
                  });

                  // Gestisce La Selezione Del File Tramite Il Selettore Classico
                  fileInput.addEventListener('change', (e) => {
                        // Invia Il File Selezionato Manualmente Alla Logica Di Hashing``
                        this.generateFileHash(e.target.files[0]);
                  });
            }
      },

      copyHashToClipboard() {
            // Elemento Dove Mostrare L'Hash Calcolato
            const fileHashDisplay = document.getElementById('file-hash');
            // Pulsante Per Copiare L'Hash Negli Appunti
            const copyBtn = document.getElementById('copy-btn');

            // Logica Di Copia Negli Appunti E Notifiche
            if (copyBtn) {
                  // Aggiunge Evento Click Al Pulsante Di Copia
                  copyBtn.addEventListener('click', () => {
                        // Recupera L'Hash Visualizzato
                        const text = fileHashDisplay.textContent;
                        // Verifica Che L'Hash Sia Pronto
                        if (text && text !== "Calcolo in corso...") {
                              // Utilizza L'API Di Sistema Per Scrivere Il Testo Negli Appunti
                              navigator.clipboard.writeText(text);
                              // Recupera L'Elemento Toast Dalla Pagina
                              const toast = document.getElementById('copy-toast');
                              // Mostra Il Messaggio Di Conferma Per Alcuni Secondi
                              toast.classList.add('show');
                              // Programma La Scomparsa Automatica Della Notifica
                              setTimeout(() => toast.classList.remove('show'), 2000);
                        }
                  });
            }
      }
}