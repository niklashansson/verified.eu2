window.Webflow = window.Webflow || [];
window.Webflow.push(async () => {
  // enables Webflow editors to link to a modal

  // select all buttons with href="#book-demo"
  const buttons = document.querySelectorAll('a[href="#book-demo"]');

  // select the modal element
  const modal = <HTMLDivElement>document.querySelector('[verified-demo-element="modal"]');
  if (!buttons.length || !modal) return;

  // select close buttons inside the modal
  const closeButtons = modal.querySelectorAll('[verified-demo-element="close-button"]');
  if (!closeButtons.length) return;

  buttons.forEach((btn) => {
    btn.setAttribute('href', '#');
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  function openModal() {
    // adds event listeners to close buttons when opening the modal
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        closeModal();
      });
    });

    modal.classList.add('is-active');
  }

  function closeModal() {
    modal.classList.remove('is-active');
  }
});
