/* ═══════════════════════════════════════════════
   KEYBOARD SUPPORT
═══════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (C.mode === 'converter') return;
  // Don't intercept when typing in unit inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
  const k = e.key;
  if (k >= '0' && k <= '9') { e.preventDefault(); inputDigit(k); }
  else if (k === '+') { e.preventDefault(); inputOp('+'); }
  else if (k === '-') { e.preventDefault(); inputOp('-'); }
  else if (k === '*') { e.preventDefault(); inputOp('*'); }
  else if (k === '/') { e.preventDefault(); inputOp('/'); }
  else if (k === '%') { e.preventDefault(); percent(); }
  else if (k === '.') { e.preventDefault(); inputDigit('.'); }
  else if (k === 'Enter' || k === '=') { e.preventDefault(); calculate(); }
  else if (k === 'Backspace') { e.preventDefault(); backspace(); }
  else if (k === 'Escape' || k === 'Delete') { e.preventDefault(); clearAll(); }
  else if (k === 'c' && !e.ctrlKey) { e.preventDefault(); clearAll(); }
  // Hex keys
  else if (C.mode === 'programmer' && C.progBase === 'hex') {
    if ('abcdefABCDEF'.includes(k)) { e.preventDefault(); inputDigit(k.toUpperCase()); }
  }
  highlightKey(k);
});

function highlightKey(k) {
  // Flash the corresponding button
  const map = {
    '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
  };
  // Flash briefly
  keypad.querySelectorAll('.btn').forEach(b => {
    if (b.textContent.trim() === (map[k] || k)) {
      b.style.transform = 'scale(0.94)';
      setTimeout(() => b.style.transform = '', 100);
    }
  });
}

