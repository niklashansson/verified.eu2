"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/modals.ts
  window.Webflow = window.Webflow || [];
  window.Webflow.push(async () => {
    const buttons = document.querySelectorAll('a[href="#book-demo"]');
    const modal = document.querySelector('[verified-demo-element="modal"]');
    if (!buttons.length || !modal)
      return;
    const closeButtons = modal.querySelectorAll('[verified-demo-element="close-button"]');
    if (!closeButtons.length)
      return;
    buttons.forEach((btn) => {
      btn.setAttribute("href", "#/");
      btn.addEventListener("click", () => {
        openModal();
      });
    });
    function openModal() {
      closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          closeModal();
        });
      });
      modal.classList.add("is-active");
    }
    function closeModal() {
      modal.classList.remove("is-active");
    }
  });
})();
//# sourceMappingURL=modals.js.map
