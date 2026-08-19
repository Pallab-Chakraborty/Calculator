/* ═══════════════════════════════════════════════
   KEYPADS
═══════════════════════════════════════════════ */
const KEYPADS = {

  standard: [
    [
      { label:'MC',  cls:'btn-mem', action:()=>memOp('MC') },
      { label:'MR',  cls:'btn-mem', action:()=>memOp('MR') },
      { label:'M+',  cls:'btn-mem', action:()=>memOp('M+') },
      { label:'M-',  cls:'btn-mem', action:()=>memOp('M-') },
    ],
    [
      { label:'AC',  cls:'btn-util btn-clear', action:clearAll },
      { label:'CE',  cls:'btn-util', action:clearEntry },
      { label:'⌫',   cls:'btn-util', action:backspace },
      { label:'÷',   cls:'btn-op', action:()=>inputOp('/') },
    ],
    [
      { label:'7', action:()=>inputDigit('7') },
      { label:'8', action:()=>inputDigit('8') },
      { label:'9', action:()=>inputDigit('9') },
      { label:'×', cls:'btn-op', action:()=>inputOp('*') },
    ],
    [
      { label:'4', action:()=>inputDigit('4') },
      { label:'5', action:()=>inputDigit('5') },
      { label:'6', action:()=>inputDigit('6') },
      { label:'−', cls:'btn-op', action:()=>inputOp('-') },
    ],
    [
      { label:'1', action:()=>inputDigit('1') },
      { label:'2', action:()=>inputDigit('2') },
      { label:'3', action:()=>inputDigit('3') },
      { label:'+', cls:'btn-op', action:()=>inputOp('+') },
    ],
    [
      { label:'±',   cls:'btn-util', action:()=>{ C.display=applyFn('±',C.display); updateDisplay(); } },
      { label:'0',   action:()=>inputDigit('0') },
      { label:'.',   action:()=>inputDigit('.') },
      { label:'=',   cls:'btn-eq', action:calculate },
    ],
  ],

  scientific: [
    [
      { label:'MC', cls:'btn-mem', action:()=>memOp('MC') },
      { label:'MR', cls:'btn-mem', action:()=>memOp('MR') },
      { label:'M+', cls:'btn-mem', action:()=>memOp('M+') },
      { label:'MS', cls:'btn-mem', action:()=>memOp('MS') },
      { label:'M-', cls:'btn-mem', action:()=>memOp('M-') },
    ],
    [
      { label:'sin',  cls:'btn-fn', action:()=>fnApply('sin') },
      { label:'cos',  cls:'btn-fn', action:()=>fnApply('cos') },
      { label:'tan',  cls:'btn-fn', action:()=>fnApply('tan') },
      { label:'π',    cls:'btn-fn', action:()=>insertConst(String(Math.PI)) },
      { label:'e',    cls:'btn-fn', action:()=>insertConst(String(Math.E)) },
    ],
    [
      { label:'sin⁻¹', cls:'btn-fn', subLabel:'asin', action:()=>fnApply('asin') },
      { label:'cos⁻¹', cls:'btn-fn', subLabel:'acos', action:()=>fnApply('acos') },
      { label:'tan⁻¹', cls:'btn-fn', subLabel:'atan', action:()=>fnApply('atan') },
      { label:'log',  cls:'btn-fn', action:()=>fnApply('log') },
      { label:'ln',   cls:'btn-fn', action:()=>fnApply('ln') },
    ],
    [
      { label:'x²',  cls:'btn-fn', action:()=>fnApply('x²') },
      { label:'x³',  cls:'btn-fn', action:()=>fnApply('x³') },
      { label:'√x',  cls:'btn-fn', action:()=>fnApply('sqrt') },
      { label:'∛x',  cls:'btn-fn', action:()=>fnApply('cbrt') },
      { label:'n!',  cls:'btn-fn', action:()=>fnApply('n!') },
    ],
    [
      { label:'1/x', cls:'btn-fn', action:()=>fnApply('1/x') },
      { label:'|x|', cls:'btn-fn', action:()=>fnApply('abs') },
      { label:'eˣ',  cls:'btn-fn', action:()=>fnApply('eˣ') },
      { label:'10ˣ', cls:'btn-fn', action:()=>fnApply('10ˣ') },
      { label:'2ˣ',  cls:'btn-fn', action:()=>fnApply('2ˣ') },
    ],
    [
      { label:'AC', cls:'btn-util btn-clear', action:clearAll },
      { label:'CE', cls:'btn-util', action:clearEntry },
      { label:'⌫',  cls:'btn-util', action:backspace },
      { label:'÷',  cls:'btn-op', action:()=>inputOp('/') },
      { label:'×',  cls:'btn-op', action:()=>inputOp('*') },
    ],
    [
      { label:'7', action:()=>inputDigit('7') },
      { label:'8', action:()=>inputDigit('8') },
      { label:'9', action:()=>inputDigit('9') },
      { label:'−', cls:'btn-op', action:()=>inputOp('-') },
      { label:'+', cls:'btn-op', action:()=>inputOp('+') },
    ],
    [
      { label:'4', action:()=>inputDigit('4') },
      { label:'5', action:()=>inputDigit('5') },
      { label:'6', action:()=>inputDigit('6') },
      { label:'%', cls:'btn-op', action:percent },
      { label:'±', cls:'btn-util', action:()=>{C.display=applyFn('±',C.display);updateDisplay();} },
    ],
    [
      { label:'1', action:()=>inputDigit('1') },
      { label:'2', action:()=>inputDigit('2') },
      { label:'3', action:()=>inputDigit('3') },
      { label:'xʸ', cls:'btn-op', action:()=>inputOp('**') },
      { label:'=', cls:'btn-eq', action:calculate },
    ],
    [
      { label:'(', cls:'btn-fn', action:()=>inputBracket('(') },
      { label:'0', action:()=>inputDigit('0') },
      { label:'.', action:()=>inputDigit('.') },
      { label:')', cls:'btn-fn', action:()=>inputBracket(')') },
    ],
  ],

  programmer: [
    [
      { label:'HEX', cls:'btn-prog-base', id:'base-hex', action:()=>setProgBase('hex') },
      { label:'DEC', cls:'btn-prog-base active-base', id:'base-dec', action:()=>setProgBase('dec') },
      { label:'OCT', cls:'btn-prog-base', id:'base-oct', action:()=>setProgBase('oct') },
      { label:'BIN', cls:'btn-prog-base', id:'base-bin', action:()=>setProgBase('bin') },
    ],
    [
      { label:'AC', cls:'btn-util btn-clear', action:clearAll },
      { label:'CE', cls:'btn-util', action:clearEntry },
      { label:'⌫',  cls:'btn-util', action:backspace },
      { label:'÷',  cls:'btn-op', action:()=>inputOp('/') },
    ],
    [
      { label:'A', cls:'btn-hex', id:'hex-a', action:()=>inputDigit('A') },
      { label:'B', cls:'btn-hex', id:'hex-b', action:()=>inputDigit('B') },
      { label:'C', cls:'btn-hex', id:'hex-c', action:()=>inputDigit('C') },
      { label:'×',  cls:'btn-op', action:()=>inputOp('*') },
    ],
    [
      { label:'D', cls:'btn-hex', id:'hex-d', action:()=>inputDigit('D') },
      { label:'E', cls:'btn-hex', id:'hex-e', action:()=>inputDigit('E') },
      { label:'F', cls:'btn-hex', id:'hex-f', action:()=>inputDigit('F') },
      { label:'−', cls:'btn-op', action:()=>inputOp('-') },
    ],
    [
      { label:'7', action:()=>inputDigit('7') },
      { label:'8', cls:'', id:'prog-8', action:()=>inputDigit('8') },
      { label:'9', cls:'', id:'prog-9', action:()=>inputDigit('9') },
      { label:'+', cls:'btn-op', action:()=>inputOp('+') },
    ],
    [
      { label:'4', action:()=>inputDigit('4') },
      { label:'5', cls:'', id:'prog-5', action:()=>inputDigit('5') },
      { label:'6', cls:'', id:'prog-6', action:()=>inputDigit('6') },
      { label:'%', cls:'btn-op', action:percent },
    ],
    [
      { label:'1', action:()=>inputDigit('1') },
      { label:'2', cls:'', id:'prog-2', action:()=>inputDigit('2') },
      { label:'3', cls:'', id:'prog-3', action:()=>inputDigit('3') },
      { label:'=', cls:'btn-eq', action:calculate },
    ],
    [
      { label:'±', cls:'btn-util', action:()=>{C.display=applyFn('±',C.display);updateDisplay();} },
      { label:'0', action:()=>inputDigit('0') },
      { label:'00', action:()=>{inputDigit('0');inputDigit('0');} },
    ],
  ],
};

function fnApply(fn) {
  const prev = C.display;
  C.display = applyFn(fn, C.display);
  if (C.display !== 'Error') {
    addHistory(`${fn}(${formatNumber(prev)})`, C.display);
    C.expr = `${fn}(${formatNumber(prev)}) =`;
  }
  C.fresh = true;
  updateDisplay();
}

function insertConst(val) {
  C.display = val;
  C.fresh = false;
  updateDisplay();
}

function inputBracket(b) {
  if (C.display === '0' && b === '(') {
    // start fresh expression
  }
}

function setProgBase(base) {
  const n = Math.trunc(parseFloat(C.display));
  if (isNaN(n)) return;
  C.progBase = base;
  C.display = n.toString(base === 'hex' ? 16 : base === 'oct' ? 8 : base === 'bin' ? 2 : 10).toUpperCase();
  C.fresh = false;
  // Update active states
  ['hex','dec','oct','bin'].forEach(b => {
    const el = document.getElementById('base-' + b);
    if (el) el.classList.toggle('active-base', b === base);
  });
  // Disable digits not valid for base
  updateProgButtons(base);
  updateDisplay();
}

function updateProgButtons(base) {
  const limits = { bin:2, oct:8, dec:10, hex:16 };
  const limit = limits[base];
  // Disable 8,9 for oct/bin
  ['prog-8','prog-9'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = limit <= 8;
  });
  // Disable 2-9 for bin (only 0,1 valid)
  ['prog-2','prog-3','prog-5','prog-6','prog-8','prog-9'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = base === 'bin';
  });
  // Disable 2,3 for bin
  if (base === 'bin') {
    const el2 = document.getElementById('prog-2');
    const el3 = document.getElementById('prog-3');
    if(el2) el2.disabled = true;
    if(el3) el3.disabled = true;
  }
  // Hex letters
  ['hex-a','hex-b','hex-c','hex-d','hex-e','hex-f'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = base !== 'hex';
  });
}

/* ── Render keypad ── */
function renderKeypad(mode) {
  keypad.innerHTML = '';
  if (mode === 'converter') { keypad.style.display='none'; return; }
  keypad.style.display = '';
  const rows = KEYPADS[mode] || KEYPADS.standard;
  const cols = mode === 'scientific' ? 'cols5' : 'cols4';
  rows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'key-row ' + (row.length === 5 ? 'cols5' : row.length === 3 ? 'cols4' : 'cols4');
    if (row.length === 3 && mode === 'programmer') rowEl.style.gridTemplateColumns = 'repeat(3,1fr)';
    row.forEach(btn => {
      const b = document.createElement('button');
      b.className = 'btn ' + (btn.cls || '');
      if (btn.id) b.id = btn.id;
      b.innerHTML = btn.label + (btn.subLabel ? `<span class="sub-label">${btn.subLabel}</span>` : '');
      b.addEventListener('click', e => {
        ripple(b, e);
        btn.action();
      });
      rowEl.appendChild(b);
    });
    keypad.appendChild(rowEl);
  });
  if (mode === 'programmer') updateProgButtons(C.progBase);
}

function ripple(btn, e) {
  const rect = btn.getBoundingClientRect();
  btn.style.setProperty('--rx', (e.clientX - rect.left) + 'px');
  btn.style.setProperty('--ry', (e.clientY - rect.top) + 'px');
  btn.classList.remove('ripple');
  void btn.offsetWidth;
  btn.classList.add('ripple');
  setTimeout(() => btn.classList.remove('ripple'), 500);
}
