// Inizializzazione Della Logica Di Caricamento E Notarizzazione
document.addEventListener('DOMContentLoaded', () => {
// seleziona l'area di rilascio per il drag and drop dei file
const dropZone = document.getElementById('drop-zone');
// recupera l'input di tipo file nascosto
const fileInput = document.getElementById('file-input');
// identifica l'elemento dove mostrare l'hash calcolato
const fileHashDisplay = document.getElementById('file-hash');
// individua il campo per visualizzare il nome del documento
const fileNameDisplay = document.getElementById('file-name');
// seleziona il contenitore delle informazioni del file
const fileInfo = document.getElementById('file-info');
// recupera il pulsante per copiare l'hash negli appunti
const copyBtn = document.getElementById('copy-btn');

// Gestione Degli Eventi Visivi Di Trascinamento
if (dropZone) {
      // definisce gli eventi in cui il file entra nell'area sensibile
      ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
            // blocca il comportamento predefinito del browser
            e.preventDefault();
            // aggiunge una classe css per evidenziare l'area di rilascio
            dropZone.classList.add('drag-over');
      });
      });

      // definisce gli eventi in cui il file esce o viene rilasciato
      ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
            // impedisce l'apertura automatica del file nel browser
            e.preventDefault();
            // rimuove l'evidenziazione visiva dell'area
            dropZone.classList.remove('drag-over');
      });
      });

      // cattura l'evento di rilascio del file nell'area indicata
      dropZone.addEventListener('drop', (e) => {
      // estrae il primo file trascinato e lo passa alla funzione di calcolo
      handleFile(e.dataTransfer.files[0]);
      });

      // gestisce la selezione del file tramite il selettore classico
      fileInput.addEventListener('change', (e) => {
      // invia il file selezionato manualmente alla logica di hashing
      handleFile(e.target.files[0]);
      });
}

// Funzione Asincrona Per Il Calcolo Dell'Impronta Digitale SHA-256
async function handleFile(file) {
      // interrompe l'esecuzione se non è stato selezionato alcun file
      if (!file) return;
      
      // aggiorna l'interfaccia con il nome del file caricato
      fileNameDisplay.textContent = file.name;
      // rende visibile il pannello contenente i dati del file
      fileInfo.style.display = 'block';
      // imposta uno stato di attesa durante l'elaborazione crittografica
      fileHashDisplay.textContent = "Calcolo in corso...";

      try {
      // legge il contenuto binario del file come arraybuffer
      const arrayBuffer = await file.arrayBuffer();
      // genera l'hash sha-256 utilizzando le web crypto api del browser
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      // converte il buffer del risultato in un array di byte
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      // trasforma i byte in una stringa esadecimale leggibile
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      // mostra l'impronta digitale definitiva nell'interfaccia utente
      fileHashDisplay.textContent = hashHex;
      } catch (error) {
      // gestisce eventuali errori durante la lettura o il calcolo
      fileHashDisplay.textContent = "Errore nel calcolo";
      }
}

// Logica Di Copia Negli Appunti E Notifiche
if (copyBtn) {
      // associa l'azione di copia al click sul relativo pulsante
      copyBtn.addEventListener('click', () => {
      // preleva l'hash visualizzato a schermo
      const text = fileHashDisplay.textContent;
      // verifica che l'hash sia pronto e non in fase di calcolo
      if (text && text !== "Calcolo in corso...") {
            // utilizza l'api di sistema per scrivere il testo negli appunti
            navigator.clipboard.writeText(text);
            // recupera l'elemento toast per il feedback visivo
            const toast = document.getElementById('copy-toast');
            // mostra il messaggio di conferma per alcuni secondi
            toast.classList.add('show');
            // programma la scomparsa automatica della notifica
            setTimeout(() => toast.classList.remove('show'), 2000);
      }
      });
}
});

// 