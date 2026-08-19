/* ═══════════════════════════════════════════════
   CALCULATOR ENGINE
═══════════════════════════════════════════════ */
const C = {
  display: '0',
  expr: '',
  fresh: false,
  memory: null,
  angleMode: 'deg', // deg | rad
  mode: 'standard', // standard | scientific | programmer | converter
  history: JSON.parse(localStorage.getItem('calc_history') || '[]'),
  progBase: 'dec',
};

const $ = id => document.getElementById(id);
const displayMain  = $('display-main');
const displayExpr  = $('display-expr');
const displayHint  = $('display-hint');
const memIndicator = $('mem-indicator');
const progDisplay  = $('prog-display');
const progHex      = $('prog-hex');
const progDec      = $('prog-dec');
const progOct      = $('prog-oct');
const progBin      = $('prog-bin');
const modeBadge    = $('mode-badge');
const angleToggle  = $('angle-toggle');
const keypad       = $('keypad');
const unitPanel    = $('unit-panel');
const toast        = $('toast');

// Safe math evaluator
function safeEval(expr) {
  try {
    // Replace display symbols with JS equivalents
    let e = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, String(Math.PI))
      .replace(/e(?![0-9])/g, String(Math.E))
      .replace(/mod/g, '%');
    const result = Function('"use strict"; return (' + e + ')')();
    if (!isFinite(result)) return 'Error';
    const rounded = parseFloat(result.toPrecision(12));
    return String(rounded);
  } catch {
    return 'Error';
  }
}

function toAngle(val) {
  return C.angleMode === 'deg' ? (val * Math.PI / 180) : val;
}

function applyFn(fn, display) {
  const n = parseFloat(display);
  let result;
  switch(fn) {
    case 'sin':   result = Math.sin(toAngle(n)); break;
    case 'cos':   result = Math.cos(toAngle(n)); break;
    case 'tan':   result = Math.tan(toAngle(n)); break;
    case 'asin':  result = C.angleMode==='deg' ? Math.asin(n)*180/Math.PI : Math.asin(n); break;
    case 'acos':  result = C.angleMode==='deg' ? Math.acos(n)*180/Math.PI : Math.acos(n); break;
    case 'atan':  result = C.angleMode==='deg' ? Math.atan(n)*180/Math.PI : Math.atan(n); break;
    case 'log':   result = Math.log10(n); break;
    case 'ln':    result = Math.log(n); break;
    case 'sqrt':  result = Math.sqrt(n); break;
    case 'cbrt':  result = Math.cbrt(n); break;
    case 'x²':    result = n * n; break;
    case 'x³':    result = n * n * n; break;
    case '1/x':   result = 1 / n; break;
    case 'abs':   result = Math.abs(n); break;
    case 'floor': result = Math.floor(n); break;
    case 'ceil':  result = Math.ceil(n); break;
    case 'n!': {
      if (n < 0 || !Number.isInteger(n) || n > 170) return 'Error';
      let f = 1; for (let i=2; i<=n; i++) f*=i;
      result = f; break;
    }
    case '±': result = -n; break;
    case '10ˣ': result = Math.pow(10, n); break;
    case '2ˣ': result = Math.pow(2, n); break;
    case 'eˣ': result = Math.exp(n); break;
    default: return display;
  }
  if (!isFinite(result) || isNaN(result)) return 'Error';
  return String(parseFloat(result.toPrecision(12)));
}

/* ── Display update ── */
function updateDisplay() {
  displayMain.textContent = formatNumber(C.display);
  displayMain.className = 'display-main' +
    (C.display === 'Error' ? ' error' : '') +
    (C.fresh ? ' fresh' : '');
  displayExpr.textContent = C.expr || '';
  memIndicator.classList.toggle('active', C.memory !== null);
  updateProgDisplay();
}

function formatNumber(val) {
  if (val === 'Error' || val === 'Infinity') return val;
  const n = parseFloat(val);
  if (isNaN(n)) return val;
  if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-10 && n !== 0)) {
    return n.toExponential(6);
  }
  // Add thousands separator for integers
  if (Number.isInteger(n) && Math.abs(n) < 1e15) {
    return n.toLocaleString('en-US', {maximumFractionDigits: 0});
  }
  return val;
}

function updateProgDisplay() {
  if (C.mode !== 'programmer') return;
  const n = Math.trunc(parseFloat(C.display));
  if (isNaN(n) || C.display === 'Error') {
    progHex.textContent = 'Error';
    progDec.textContent = 'Error';
    progOct.textContent = 'Error';
    progBin.textContent = 'Error';
    return;
  }
  progHex.textContent = n.toString(16).toUpperCase();
  progDec.textContent = n.toString(10);
  progOct.textContent = n.toString(8);
  progBin.textContent = n.toString(2);
}

/* ── Input handlers ── */
function inputDigit(d) {
  if (C.fresh || C.display === '0' || C.display === 'Error') {
    C.display = d === '.' ? '0.' : d;
    C.fresh = false;
  } else {
    if (d === '.' && C.display.includes('.')) return;
    if (C.display.length > 16) return;
    C.display += d;
  }
  updateDisplay();
}

function inputOp(op) {
  if (C.display === 'Error') { clearAll(); return; }
  C.expr = formatNumber(C.display) + ' ' + opSymbol(op);
  C.fresh = true;
  // Store op
  C._pendingOp = op;
  C._pendingVal = C.display;
  updateDisplay();
}

function opSymbol(op) {
  return {'+':'+','-':'−','*':'×','/':'÷','%':'mod','**':'^'}[op] || op;
}

function calculate() {
  if (!C._pendingOp || C.display === 'Error') return;
  const a = C._pendingVal;
  const b = C.display;
  const expr = a + C._pendingOp + b;
  const result = safeEval(expr);
  const exprDisplay = formatNumber(a) + ' ' + opSymbol(C._pendingOp) + ' ' + formatNumber(b);
  addHistory(exprDisplay, result);
  C.expr = exprDisplay + ' =';
  C.display = result;
  C._pendingOp = null;
  C._pendingVal = null;
  C.fresh = true;
  updateDisplay();
}

function clearAll() {
  C.display = '0';
  C.expr = '';
  C.fresh = false;
  C._pendingOp = null;
  C._pendingVal = null;
  updateDisplay();
}

function clearEntry() {
  C.display = '0';
  C.fresh = false;
  updateDisplay();
}

function backspace() {
  if (C.fresh || C.display === 'Error') { C.display = '0'; C.fresh = false; }
  else if (C.display.length === 1 || (C.display.length === 2 && C.display[0] === '-')) C.display = '0';
  else C.display = C.display.slice(0, -1);
  updateDisplay();
}

function percent() {
  const n = parseFloat(C.display);
  if (C._pendingVal) {
    C.display = String(parseFloat(C._pendingVal) * n / 100);
  } else {
    C.display = String(n / 100);
  }
  C.fresh = false;
  updateDisplay();
}

/* Memory */
function memOp(op) {
  switch(op) {
    case 'MC': C.memory = null; showToast('Memory cleared','fa-solid fa-trash-can'); break;
    case 'MR': if(C.memory!==null){C.display=String(C.memory);C.fresh=false;updateDisplay();showToast('Memory recalled');} break;
    case 'M+': C.memory = (C.memory || 0) + parseFloat(C.display); showToast('Added to memory'); break;
    case 'M-': C.memory = (C.memory || 0) - parseFloat(C.display); showToast('Subtracted from memory'); break;
    case 'MS': C.memory = parseFloat(C.display); showToast('Saved to memory'); break;
  }
  updateDisplay();
}

/* History */
function addHistory(expr, result) {
  if (result === 'Error') return;
  C.history.unshift({ expr, result });
  if (C.history.length > 30) C.history.pop();
  localStorage.setItem('calc_history', JSON.stringify(C.history));
  renderHistory();
}

function renderHistory() {
  const list = $('h-list');
  if (!C.history.length) {
    list.innerHTML = '<div class="h-empty"><i class="fa-solid fa-clock-rotate-left"></i>No history yet</div>';
    return;
  }
  list.innerHTML = C.history.map((h, i) => `
    <div class="h-item" data-i="${i}">
      <div class="h-expr">${h.expr}</div>
      <div class="h-result">${formatNumber(h.result)}</div>
    </div>`).join('');
  list.querySelectorAll('.h-item').forEach(el => {
    el.addEventListener('click', () => {
      C.display = C.history[+el.dataset.i].result;
      C.fresh = false;
      updateDisplay();
      showToast('Result recalled');
    });
  });
}

$('h-clear-btn').addEventListener('click', () => {
  C.history = [];
  localStorage.removeItem('calc_history');
  renderHistory();
});

/* History panel collapse */
const histPanel = $('history-panel');
const hIcon = $('h-toggle-icon');
$('h-toggle').addEventListener('click', () => {
  histPanel.classList.toggle('collapsed');
  hIcon.className = histPanel.classList.contains('collapsed')
    ? 'fa-solid fa-chevron-right'
    : 'fa-solid fa-chevron-left';
});
