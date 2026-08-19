/* ═══════════════════════════════════════════════
   MODE SWITCHING
═══════════════════════════════════════════════ */
const BADGE_MAP = { standard:'STD', scientific:'SCI', programmer:'PRG', converter:'CVT' };

document.querySelectorAll('.mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    C.mode = tab.dataset.mode;
    modeBadge.textContent = BADGE_MAP[C.mode];
    // Show/hide elements
    angleToggle.classList.toggle('visible', C.mode === 'scientific');
    progDisplay.classList.toggle('visible', C.mode === 'programmer');
    unitPanel.classList.toggle('visible', C.mode === 'converter');
    keypad.style.display = C.mode === 'converter' ? 'none' : '';
    // Reset prog base display
    if (C.mode === 'programmer') { setProgBase('dec'); }
    renderKeypad(C.mode);
    clearAll();
    displayHint.textContent = {
      standard: 'Keyboard: 0-9, +-*/',
      scientific: 'Scientific mode — full keyboard',
      programmer: 'Click base to convert',
      converter: 'Unit conversion mode',
    }[C.mode];
  });
});

/* Angle toggle */
document.querySelectorAll('.angle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    C.angleMode = btn.dataset.angle;
    document.querySelectorAll('.angle-btn').forEach(b => b.classList.toggle('active', b === btn));
    showToast(`Angle mode: ${C.angleMode.toUpperCase()}`);
  });
});

/* Copy button */
$('copy-btn').addEventListener('click', copyResult);
displayMain.addEventListener('click', copyResult);

function copyResult() {
  const val = C.display;
  if (val === 'Error' || val === '0') return;
  navigator.clipboard?.writeText(val).then(() => showToast('Copied: ' + val)).catch(() => showToast('Copied!'));
}
