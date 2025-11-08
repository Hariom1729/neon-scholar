// Simple XP utilities using localStorage. Emits a global 'xpUpdated' event on changes.
export function getXp() {
  try {
    const v = Number(localStorage.getItem('xp') || 0);
    return Number.isNaN(v) ? 0 : v;
  } catch (e) {
    return 0;
  }
}

export function setXp(value) {
  try {
    localStorage.setItem('xp', String(value));
    window.dispatchEvent(new CustomEvent('xpUpdated', { detail: { xp: value } }));
  } catch (e) {
    console.error('setXp error', e);
  }
}

export function addXp(amount) {
  try {
    const current = getXp();
    const next = current + Number(amount || 0);
    setXp(next);
    // include xpAdded and lastCompleted in event for backward compatibility
    window.dispatchEvent(new CustomEvent('xpUpdated', { detail: { xp: next, xpAdded: amount } }));
    return next;
  } catch (e) {
    console.error('addXp error', e);
    return getXp();
  }
}
