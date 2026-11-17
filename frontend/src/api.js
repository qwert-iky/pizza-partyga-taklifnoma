// ============================================================
//  api.js — All backend API calls via Axios
// ============================================================

// Local da localhost, deploy da avtomatik o'sha sayt URL ishlatiladi
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : '/api';

// ---- Guests ------------------------------------------------

/**
 * GET /api/guests  → returns array of guest objects
 * Backend returns { count, guests: [...] }, we extract the array.
 */
export async function fetchGuests() {
  const res = await axios.get(`${API_URL}/guests`);
  const data = res.data;
  // Backend wraps in { count, guests: [...] }
  if (data && Array.isArray(data.guests)) return data.guests;
  // Fallback if already an array
  if (Array.isArray(data)) return data;
  return [];
}

/**
 * POST /api/guests  → { name, phone }
 * Returns the created guest object
 */
export async function addGuest(name, phone) {
  const res = await axios.post(`${API_URL}/guests`, { name, phone });
  return res.data;
}

// ---- Votes -------------------------------------------------

/**
 * GET /api/votes/stats  → returns normalized vote statistics object
 * Normalized shape: { Boshpana: N, Odisseya: N, Interstellar: N, "The Dark Knight": N }
 */
export async function fetchVotes() {
  const res = await axios.get(`${API_URL}/votes/stats`);
  const data = res.data;
  // Backend returns { total, stats: [{movie, count, percentage}] }
  // Normalize to flat object: { MovieName: count }
  if (data && Array.isArray(data.stats)) {
    const flat = {};
    data.stats.forEach(s => { flat[s.movie] = s.count; });
    return flat;
  }
  // Fallback if already flat
  return data;
}

/**
 * POST /api/votes  → { voterName, movie }
 * Returns the created vote object
 */
export async function submitVote(voterName, movie) {
  const res = await axios.post(`${API_URL}/votes`, { voterName, movie });
  return res.data;
}
