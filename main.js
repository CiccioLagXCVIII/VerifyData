const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileInfo = document.getElementById('file-info');
const fileNameDisplay = document.getElementById('file-name');
const fileHashDisplay = document.getElementById('file-hash');

// --- Gestione Drag And Drop ---
['dragenter', 'dragover'].forEach(eventName => {
dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
});
});

['dragleave', 'drop'].forEach(eventName => {
dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
});
});

// --- Gestione Caricamento File ---

// Drag and Drop
dropZone.addEventListener('drop', (e) => {
const files = e.dataTransfer.files;
if (files.length > 0) {
      handleFile(files[0]);
}
});

// Selezione Manuale
fileInput.addEventListener('change', (e) => {
if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
}
});

// --- Calcolo Hash ---

async function handleFile(file) {
      // Informazioni File
      fileNameDisplay.textContent = file.name;
      fileInfo.style.display = 'block';
      fileHashDisplay.textContent = "Calcolo in corso...";

      try {
            // Legge Il File Come ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();

            // Calcolo Hash SHA-256
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);

            // Converto L'ArrayBuffer In Una Stringa Esadecimale
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            // Visualizza L'Hash Finale
            fileHashDisplay.textContent = hashHex;
      } catch (error) {
            console.error("Errore Nel Calcolo Dell'Hash:", error);
            fileHashDisplay.textContent = "Errore Durante Il Calcolo Dell'Hash";
      }
}

// Aggiungi questa riga che mancava!
const copyBtn = document.getElementById('copy-btn'); 
const copyToast = document.getElementById('copy-toast');

// Ora il listener funzionerà perché copyBtn è definito
copyBtn.addEventListener('click', () => {
      const hashText = document.getElementById('file-hash').innerText;

      if (hashText && hashText !== "Calcolo in corso...") {
            navigator.clipboard.writeText(hashText).then(() => {
                  // Mostra il messaggio
                  copyToast.classList.add('show');

                  // Feedback icona
                  // const icon = copyBtn.querySelector('i');
                  // icon.classList.replace('bi-copy', 'bi-check-lg');

                  // Nascondi dopo 2 secondi
                  setTimeout(() => {
                        copyToast.classList.remove('show');
                        // icon.classList.replace('bi-check-lg', 'bi-copy');
                  }, 2000);
            });
      }
});