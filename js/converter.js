/* ═══════════════════════════════════════════════
   UNIT CONVERTER
═══════════════════════════════════════════════ */
const UNITS = {
  Length: {
    Meter: 1, Kilometer: 1000, Centimeter: 0.01, Millimeter: 0.001,
    Mile: 1609.344, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254,
    'Nautical Mile': 1852, Lightyear: 9.461e15,
  },
  Weight: {
    Kilogram: 1, Gram: 0.001, Milligram: 1e-6,
    Pound: 0.453592, Ounce: 0.0283495, Tonne: 1000,
    Stone: 6.35029, Carat: 0.0002,
  },
  Temperature: { Celsius: 'c', Fahrenheit: 'f', Kelvin: 'k' },
  Area: {
    'm²': 1, 'km²': 1e6, 'cm²': 1e-4, 'ft²': 0.092903,
    'in²': 0.00064516, 'mi²': 2589988.1, Acre: 4046.856, Hectare: 10000,
  },
  Volume: {
    Liter: 1, Milliliter: 0.001, Gallon: 3.78541, Pint: 0.473176,
    Cup: 0.236588, 'Fluid Oz': 0.0295735, 'm³': 1000, 'cm³': 0.001,
  },
  Speed: {
    'm/s': 1, 'km/h': 0.277778, mph: 0.44704, Knot: 0.514444,
    'ft/s': 0.3048, 'Mach': 340.29,
  },
  Time: {
    Second: 1, Minute: 60, Hour: 3600, Day: 86400,
    Week: 604800, Month: 2629746, Year: 31556952,
  },
  Data: {
    Bit: 1, Byte: 8, Kilobyte: 8192, Megabyte: 8388608,
    Gigabyte: 8589934592, Terabyte: 8796093022208, Kilobit: 1000, Megabit: 1e6,
  },
};

let activeUnitType = 'Length';

function convertTemp(val, from, to) {
  let celsius;
  if (from === 'Celsius') celsius = val;
  else if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
  else celsius = val - 273.15;
  if (to === 'Celsius') return celsius;
  if (to === 'Fahrenheit') return celsius * 9/5 + 32;
  return celsius + 273.15;
}

function doConvert() {
  const fromVal = parseFloat($('unit-from-val').value);
  const fromUnit = $('unit-from-sel').value;
  const toUnit   = $('unit-to-sel').value;
  if (isNaN(fromVal)) { $('unit-result').textContent = '—'; return; }
  let result;
  if (activeUnitType === 'Temperature') {
    result = convertTemp(fromVal, fromUnit, toUnit);
  } else {
    const u = UNITS[activeUnitType];
    result = fromVal * u[fromUnit] / u[toUnit];
  }
  const fmt = parseFloat(result.toPrecision(8));
  $('unit-result').textContent = fmt.toLocaleString('en-US', {maximumFractionDigits: 8});
  $('unit-result-label').textContent = `${fromVal} ${fromUnit} = ${fmt} ${toUnit}`;
  $('unit-to-val').value = fmt;
}

function buildUnitPanel() {
  // Type buttons
  const typeRow = $('unit-type-row');
  Object.keys(UNITS).forEach(type => {
    const btn = document.createElement('button');
    btn.className = 'unit-type-btn' + (type === activeUnitType ? ' active' : '');
    btn.textContent = type;
    btn.addEventListener('click', () => {
      activeUnitType = type;
      typeRow.querySelectorAll('.unit-type-btn').forEach(b => b.classList.toggle('active', b.textContent === type));
      populateUnitSelects(type);
      doConvert();
    });
    typeRow.appendChild(btn);
  });
  populateUnitSelects(activeUnitType);

  $('unit-from-val').addEventListener('input', doConvert);
  $('unit-from-sel').addEventListener('change', doConvert);
  $('unit-to-sel').addEventListener('change', doConvert);
  $('unit-swap').addEventListener('click', () => {
    const fSel = $('unit-from-sel').value;
    const tSel = $('unit-to-sel').value;
    $('unit-from-sel').value = tSel;
    $('unit-to-sel').value = fSel;
    const fVal = $('unit-from-val').value;
    const tVal = $('unit-to-val').value;
    $('unit-from-val').value = tVal;
    doConvert();
  });
  doConvert();
}

function populateUnitSelects(type) {
  const keys = Object.keys(UNITS[type]);
  [$('unit-from-sel'), $('unit-to-sel')].forEach((sel, si) => {
    sel.innerHTML = keys.map(k => `<option value="${k}">${k}</option>`).join('');
    if (si === 1 && keys.length > 1) sel.selectedIndex = 1;
  });
  doConvert();
}

