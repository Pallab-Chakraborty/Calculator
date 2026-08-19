/* ═══════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════ */
let toastT;
function showToast(msg, icon = 'fa-solid fa-check') {
  $('toast-msg').textContent = msg;
  toast.querySelector('i').className = icon + ' ' + (icon.includes('trash') ? '' : '');
  toast.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* Programmer base display click-to-copy */
['prog-hex','prog-dec','prog-oct','prog-bin'].forEach(id => {
  $(id).addEventListener('click', () => {
    const val = $(id).textContent;
    navigator.clipboard?.writeText(val).then(() => showToast('Copied: ' + val));
  });
});

