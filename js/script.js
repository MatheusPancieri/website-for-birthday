// ── Contador regressivo ──────────────────────────────────────────────────────
const EVENT_DATE = new Date('2026-06-13T19:00:00').getTime();

function tick() {
  const diff = EVENT_DATE - Date.now();
  const pad = n => String(Math.max(0, n)).padStart(2, '0');
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = pad(val);
  };

  if (diff <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => set(id, 0));
    return;
  }

  set('days', Math.floor(diff / 86400000));
  set('hours', Math.floor((diff % 86400000) / 3600000));
  set('minutes', Math.floor((diff % 3600000) / 60000));
  set('seconds', Math.floor((diff % 60000) / 1000));
}

tick();
setInterval(tick, 1000);

// ── Partículas douradas (canvas) ─────────────────────────────────────────────
const cv = document.getElementById('sp');
const ctx = cv.getContext('2d');

function resize() {
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const GOLDS = ['#e8d5a3', '#c9a84c', '#f5d97e', '#d4af37', '#f0d88a'];

class P {
  constructor(scatter) {
    this.init(scatter);
  }
  init(scatter) {
    this.x = Math.random() * cv.width;
    this.y = scatter ? Math.random() * cv.height : cv.height + 6;
    this.r = Math.random() * 2.2 + 0.6;
    this.vy = Math.random() * 0.5 + 0.2;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.a = Math.random() * 0.55 + 0.15;
    this.da = Math.random() * 0.0025 + 0.0008;
    this.c = GOLDS[Math.floor(Math.random() * GOLDS.length)];
    this.star = Math.random() > 0.55;
  }
  update() {
    this.y -= this.vy;
    this.x += this.vx;
    this.a -= this.da;
    if (this.y < -8 || this.a <= 0) this.init(false);
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.a);
    ctx.fillStyle = this.c;
    if (this.star) {
      const s = this.r * 2.4;
      ctx.fillRect(this.x - s / 2, this.y - 0.5, s, 1);
      ctx.fillRect(this.x - 0.5, this.y - s / 2, 1, s);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

const particles = Array.from({ length: 42 }, (_, i) => new P(i < 22));

(function loop() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(loop);
})();

// ── Animações de entrada ──────────────────────────────────────────────────────
const io = new IntersectionObserver(
  entries =>
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    }),
  { threshold: 0.1 },
);
document.querySelectorAll('.fu').forEach(el => io.observe(el));

// Dispara os elementos visíveis imediatamente no load
window.addEventListener('load', () => {
  document.querySelectorAll('.fu').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('in');
  });
});

// ── Confirmar presença via WhatsApp ──────────────────────────────────────────
// ⚠️  Substitua pelo número correto (formato: 5567XXXXXXXXX)
const WHATSAPP_NUMBER = '556792717373';

window.confirmarPresenca = function () {
  const msg = encodeURIComponent(
    'Olá! Confirmo minha presença na festa de 80 anos da Sebastiana Batica, ' +
      'no dia 13 de junho de 2026 às 19h na Nativas Churrascaria! 🥂🎉',
  );
  window.open(
    `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${msg}`,
    '_blank',
  );
};
