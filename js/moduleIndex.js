const definitions = {
      integrity: {
            title: "Integrità del Dato",
            content: "[...]"
      },
      sbt: {
            title: "Soulbound Token (SBT)",
            content: "[...]"
      },
      ssi: {
            title: "Self-Sovereign Identity (SSI)",
            content: "[...]"
      },
      immutability: {
            title: "Immutabilità",
            content: "[...]"
      },
      gas: {
            title: "Gas Fees",
            content: "[...]"
      },
      contract: {
            title: "Smart Contract",
            content: "[...]"
      },
      revocation: {
            title: "Revoca",
            content: "[...]"
      },
      privacy: {
            title: "Privacy",
            content: "[...]"
      },
};

export const HomeManager = {
      init() {
            this.setupModal();
            this.setupAvalanche();
            this.updateStatus();
      },

      setupModal() {
            const infoBtns = document.querySelectorAll('.info-btn');
            const modal = new bootstrap.Modal(document.getElementById('infoModal'));
            const modalTitle = document.getElementById('infoModalLabel');
            const modalBody = document.getElementById('infoModalBody');

            infoBtns.forEach(btn => {
                  btn.addEventListener('click', () => {
                        const key = btn.getAttribute('data-def');
                        const data = definitions[key] || { title: "Info", content: "Dettagli in arrivo..." };
                        
                        modalTitle.textContent = data.title;
                        modalBody.textContent = data.content;
                        modal.show();
                  });
            });
      },

      async setupAvalanche() {
            const input = document.getElementById('avalancheInput');
            const output = document.getElementById('avalancheOutput');

            if (!input) return;

            input.addEventListener('input', async (e) => {
                  const text = e.target.value;
                  if (text === "") {
                  output.textContent = "Hash Calcolato"; // Hash vuoto
                  return;
                  }

                  // Calcolo hash rapido per la demo
                  const msgBuffer = new TextEncoder().encode(text);
                  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                  const hashArray = Array.from(new Uint8Array(hashBuffer));
                  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                  output.textContent = hashHex;
            });
      },

      updateStatus() {
            const statusText = document.querySelector('.status-indicator .text-white');
            if (navigator.onLine) {
                  statusText.textContent = "Online";
                  statusText.className = "text-white";
            } else {
                  statusText.textContent = "Offline";
                  statusText.className = "text-danger";
            }
      }

};