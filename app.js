const $ = sel => document.querySelector(sel);

function normalizeDigits(s) {
  if (!s) return s;
  const map = {'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','٫':'.','٬':'',',':''};
  return s.split('').map(ch => map[ch] ?? ch).join('');
}
function toNum(v) {
  if (v == null) return null;
  const t = normalizeDigits(v).replace(',', '.').trim();
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function fmt(v) { if (v == null) return '—'; const n = Number(v); return Number.isFinite(n) ? n.toFixed(2) : String(v); }

function recalc() {
  const ht  = toNum($('#buyTop').value);
  const hi1 = toNum($('#buyHigh').value);
  const lo1 = toNum($('#buyLow').value);
  if (ht != null && hi1 != null && lo1 != null) {
    const b22 = 2*lo1 - hi1;
    const p1  = 2*b22 - (ht + hi1)/2;
    const p2  = 2*b22 - ht;
    const st  = 2*p2 - p1;
    $('#buyP1').textContent = fmt(p1);
    $('#buyP2').textContent = fmt(p2);
    $('#buyStop').textContent = fmt(st);
  } else {
    $('#buyP1').textContent = $('#buyP2').textContent = $('#buyStop').textContent = '—';
  }

  const hl  = toNum($('#sellLow').value);
  const hi2 = toNum($('#sellHigh').value);
  const lo2 = toNum($('#sellLow2').value);
  if (hl != null && hi2 != null && lo2 != null) {
    const d22 = 2*hi2 - lo2;
    const d23 = (hl + lo2)/2;
    const pt2 = 2*d22 - hl;
    const pt1 = 2*d22 - d23;
    const st  = 2*pt2 - pt1;
    $('#sellStop').textContent = fmt(st);
    $('#sellP2').textContent = fmt(pt2);
    $('#sellP1').textContent = fmt(pt1);
  } else {
    $('#sellStop').textContent = $('#sellP2').textContent = $('#sellP1').textContent = '—';
  }
}

['buyTop','buyHigh','buyLow','sellLow','sellHigh','sellLow2'].forEach(id => {
  const el = document.getElementById(id);
  ['input','change','keyup','paste'].forEach(evt => el.addEventListener(evt, recalc));
});

document.getElementById('buyHead').addEventListener('click', () => {
  ['buyTop','buyHigh','buyLow'].forEach(id => document.getElementById(id).value='');
  ['buyP1','buyP2','buyStop'].forEach(id => document.getElementById(id).textContent='—');
});
document.getElementById('sellHead').addEventListener('click', () => {
  ['sellLow','sellHigh','sellLow2'].forEach(id => document.getElementById(id).value='');
  ['sellStop','sellP2','sellP1'].forEach(id => document.getElementById(id).textContent='—');
});

recalc();
