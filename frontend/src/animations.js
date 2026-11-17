// ============================================================
//  animations.js — Scroll reveal, confetti, floating pizzas
// ============================================================

// ---- Scroll Reveal (IntersectionObserver) ------------------

/**
 * Observe all .reveal elements and add .visible when they enter the viewport.
 */
export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ---- Confetti ----------------------------------------------

const CONFETTI_EMOJIS = ['🍕', '🎉', '🎊', '⭐', '🔥', '🎈', '✨', '🍅', '🧀'];

/**
 * Spawn `count` confetti pieces that fall from the top of the screen.
 */
export function launchConfetti(count = 60) {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  container.innerHTML = ''; // clear previous

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.textContent = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];

    const left     = Math.random() * 100;          // vw
    const duration = 2 + Math.random() * 3;        // 2–5 s
    const delay    = Math.random() * 2;            // 0–2 s
    const size     = 1 + Math.random() * 1.5;     // rem

    piece.style.cssText = `
      left: ${left}%;
      font-size: ${size}rem;
      --duration: ${duration}s;
      --delay: ${delay}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(piece);
  }

  // Auto-clear after all animations finish
  setTimeout(() => { container.innerHTML = ''; }, 7000);
}

// ---- Countdown Timer ---------------------------------------

/**
 * Run a live countdown to the event date.
 * @param {string} targetDateStr - ISO date string, e.g. "2024-11-25T18:00:00"
 */
export function initCountdown(targetDateStr) {
  const target = new Date(targetDateStr).getTime();

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('count-days').textContent  = '00';
      document.getElementById('count-hours').textContent = '00';
      document.getElementById('count-mins').textContent  = '00';
      document.getElementById('count-secs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    const dEl = document.getElementById('count-days');
    const hEl = document.getElementById('count-hours');
    const mEl = document.getElementById('count-mins');
    const sEl = document.getElementById('count-secs');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
    if (sEl) sEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
}

// ---- Vote Progress Bars ------------------------------------

const MOVIES = ['Boshpana', 'Odisseya', 'Interstellar', 'The Dark Knight'];

/**
 * Animate vote progress bars given a stats object:
 * { Boshpana: N, Odisseya: N, Interstellar: N, "The Dark Knight": N }
 */
export function updateVoteBars(stats) {
  if (!stats) return;

  const total = MOVIES.reduce((sum, m) => sum + (stats[m] || 0), 0);

  MOVIES.forEach((movie) => {
    const count = stats[movie] || 0;
    const pct   = total > 0 ? Math.round((count / total) * 100) : 0;

    const bar      = document.getElementById(`bar-${movie}`);
    const votesEl  = document.getElementById(`votes-${movie}`);
    const pctEl    = document.getElementById(`pct-${movie}`);

    if (bar)     bar.style.width     = `${pct}%`;
    if (votesEl) votesEl.textContent = count;
    if (pctEl)   pctEl.textContent   = pct;
  });
}
