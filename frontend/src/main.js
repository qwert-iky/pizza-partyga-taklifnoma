// ============================================================
//  main.js — Entry point: wires everything together
// ============================================================

import { initDarkMode }                        from './darkMode.js';
import { initScrollReveal, launchConfetti,
         initCountdown, updateVoteBars }       from './animations.js';
import { fetchGuests, addGuest,
         fetchVotes, submitVote }              from './api.js';

// ============================================================
//  Constants
// ============================================================
const REFRESH_INTERVAL_MS = 30_000; // 30 seconds

// ============================================================
//  DOM Helpers
// ============================================================
function $(id) { return document.getElementById(id); }

function showMsg(el, text, isOk) {
  if (!el) return;
  el.textContent   = text;
  el.className     = `text-center font-nunito font-bold py-2 rounded-xl ${
    isOk
      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
      : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
  }`;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

// ============================================================
//  Render Guests
// ============================================================
function renderGuests(guests) {
  const list      = $('guests-list');
  const countEl   = $('guest-count');
  if (!list) return;

  if (!Array.isArray(guests) || guests.length === 0) {
    list.innerHTML = `
      <div class="text-center py-8 text-gray-400 dark:text-gray-500">
        <div class="text-4xl mb-2">🍕</div>
        <p class="font-nunito">Hali hech kim qo'shilmagan...</p>
      </div>`;
    if (countEl) countEl.textContent = '0';
    return;
  }

  if (countEl) countEl.textContent = guests.length;

  list.innerHTML = guests.map((g, i) => `
    <div class="guest-item flex items-center gap-3 bg-pizza-cream dark:bg-gray-700 rounded-xl px-4 py-3"
         style="animation-delay:${i * 0.06}s">
      <span class="text-2xl">🍕</span>
      <div>
        <p class="font-nunito font-bold text-gray-800 dark:text-white leading-tight">${escapeHtml(g.name)}</p>
        ${g.phone ? `<p class="font-nunito text-xs text-gray-500 dark:text-gray-400">${escapeHtml(g.phone)}</p>` : ''}
      </div>
      <span class="ml-auto text-green-500 font-bold text-sm">✅ Keladi</span>
    </div>`
  ).join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================
//  Load & Refresh Guests
// ============================================================
async function loadGuests() {
  try {
    const guests = await fetchGuests();
    renderGuests(guests);
  } catch (err) {
    console.warn('Mehmonlar yuklanmadi:', err.message);
  }
}

// ============================================================
//  Load & Refresh Votes
// ============================================================
async function loadVotes() {
  try {
    const stats = await fetchVotes();
    // Backend may return { data: {...} } or the stats directly
    const normalized = stats.data || stats;
    updateVoteBars(normalized);
  } catch (err) {
    console.warn('Ovozlar yuklanmadi:', err.message);
  }
}

// ============================================================
//  RSVP Form Submit
// ============================================================
function initRsvpForm() {
  const form   = $('rsvp-form');
  const btn    = $('rsvp-btn');
  const msgEl  = $('rsvp-msg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = $('guest-name')?.value.trim();
    const phone = $('guest-phone')?.value.trim();

    if (!name) {
      showMsg(msgEl, '⚠️ Iltimos, ismingizni kiriting!', false);
      return;
    }

    btn.disabled    = true;
    btn.textContent = 'Yuborilmoqda... ⏳';

    try {
      await addGuest(name, phone);
      showMsg(msgEl, `🎉 ${name}, siz ro'yxatga kiritildingiz!`, true);
      form.reset();
      await loadGuests();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Xato yuz berdi';
      showMsg(msgEl, `❌ ${msg}`, false);
    } finally {
      btn.disabled    = false;
      btn.textContent = 'Ha, Boraman! 🍕';
    }
  });
}

// ============================================================
//  Movie Vote  (exposed globally for inline onclick)
// ============================================================
window.castVote = async function (movie) {
  const voterName = $('voter-name')?.value.trim();
  const msgEl     = $('vote-msg');

  if (!voterName) {
    showMsg(msgEl, '⚠️ Iltimos, avval ismingizni kiriting!', false);
    $('voter-name')?.focus();
    return;
  }

  try {
    await submitVote(voterName, movie);
    showMsg(msgEl, `✅ "${movie}" uchun ovozingiz qabul qilindi!`, true);
    await loadVotes();
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Xato yuz berdi';
    showMsg(msgEl, `❌ ${msg}`, false);
  }
};

// ============================================================
//  Auto Refresh every 30 s
// ============================================================
function startAutoRefresh() {
  setInterval(async () => {
    await loadGuests();
    await loadVotes();
  }, REFRESH_INTERVAL_MS);
}

// ============================================================
//  Bootstrap
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Dark mode
  initDarkMode();

  // 2. Scroll reveal animations
  initScrollReveal();

  // 3. Countdown to event date
  initCountdown('2024-11-25T18:00:00');

  // 4. Confetti on load
  launchConfetti(70);

  // 5. Wire RSVP form
  initRsvpForm();

  // 6. Load initial data
  await Promise.allSettled([loadGuests(), loadVotes()]);

  // 7. Auto-refresh
  startAutoRefresh();
});
