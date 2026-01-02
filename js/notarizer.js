// js/notarizer.js
document.addEventListener('DOMContentLoaded', () => {
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileHashDisplay = document.getElementById('file-hash');
const fileNameDisplay = document.getElementById('file-name');
const fileInfo = document.getElementById('file-info');
const copyBtn = document.getElementById('copy-btn');

if (dropZone) {
      // Gestione Drag & Drop
      ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
      });
      });

      ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
      });
      });

      dropZone.addEventListener('drop', (e) => {
      handleFile(e.dataTransfer.files[0]);
      });

      fileInput.addEventListener('change', (e) => {
      handleFile(e.target.files[0]);
      });
}

async function handleFile(file) {
      if (!file) return;
      
      fileNameDisplay.textContent = file.name;
      fileInfo.style.display = 'block';
      fileHashDisplay.textContent = "Calcolo in corso...";

      try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      fileHashDisplay.textContent = hashHex;
      } catch (error) {
      fileHashDisplay.textContent = "Errore nel calcolo";
      }
}

if (copyBtn) {
      copyBtn.addEventListener('click', () => {
      const text = fileHashDisplay.textContent;
      if (text && text !== "Calcolo in corso...") {
            navigator.clipboard.writeText(text);
            const toast = document.getElementById('copy-toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
      }
      });
}
});