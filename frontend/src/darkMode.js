// ============================================================
//  darkMode.js — Dark mode toggle with localStorage persistence
// ============================================================

const DARK_KEY = 'pizza-dark-mode';

/**
 * Apply dark mode class to <html> element and update toggle button UI
 */
function applyDark(isDark) {
  const html   = document.documentElement;
  const icon   = document.getElementById('dark-icon');
  const label  = document.getElementById('dark-label');

  if (isDark) {
    html.classList.add('dark');
    if (icon)  icon.textContent  = '☀️';
    if (label) label.textContent = 'Light';
  } else {
    html.classList.remove('dark');
    if (icon)  icon.textContent  = '🌙';
    if (label) label.textContent = 'Dark';
  }
}

/**
 * Initialise dark mode from localStorage and wire up the toggle button.
 * Call once from main.js after DOM ready.
 */
export function initDarkMode() {
  // Load saved preference (default: light)
  const saved = localStorage.getItem(DARK_KEY);
  const isDark = saved === 'true';
  applyDark(isDark);

  // Wire toggle button
  const btn = document.getElementById('dark-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const nowDark = !document.documentElement.classList.contains('dark');
      applyDark(nowDark);
      localStorage.setItem(DARK_KEY, String(nowDark));
    });
  }
}
