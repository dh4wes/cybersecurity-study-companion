const CURTAIN_PHASE_DURATION_MS = 1000;
const CURTAIN_FADE_DURATION_MS = 1000;
const CURTAIN_FINISH_BUFFER_MS = 100;
const MAX_CURTAIN_DELAY_MS = 240;
const CURTAIN_TOTAL_CLEAR_MS = CURTAIN_PHASE_DURATION_MS + CURTAIN_FADE_DURATION_MS;

const buildBinaryCurtain = (root) => {
  const curtain = document.getElementById('binary-curtain');
  if (!curtain) return;

  const width = Math.max(window.innerWidth || 0, 320);
  const columns = Math.max(12, Math.min(34, Math.round(width / 44)));
  root.style.setProperty('--binary-columns', String(columns));
  curtain.textContent = '';

  for (let index = 0; index < columns; index += 1) {
    const column = document.createElement('div');
    const rows = Math.max(20, Math.min(42, Math.round((window.innerHeight || 720) / 22)));
    let text = '';

    for (let row = 0; row < rows; row += 1) {
      text += `${Math.random() > 0.5 ? '1' : '0'}\n`;
    }

    column.className = 'binary-column';
    column.textContent = text.trimEnd();
    const dropDelayMs = Math.round(Math.random() * MAX_CURTAIN_DELAY_MS);
    const latestFinishMs = CURTAIN_PHASE_DURATION_MS - CURTAIN_FINISH_BUFFER_MS;
    const maxDurationMs = Math.max(520, latestFinishMs - dropDelayMs);
    const minDurationMs = Math.min(760, maxDurationMs);
    const dropDurationMs =
      minDurationMs + Math.round(Math.random() * Math.max(0, maxDurationMs - minDurationMs));

    column.style.setProperty('--drop-duration', `${dropDurationMs}ms`);
    column.style.setProperty('--drop-delay', `${dropDelayMs}ms`);
    column.style.setProperty('--drop-distance', `${14 + Math.random() * 18}vh`);
    curtain.append(column);
  }
};

const bootIntro = () => {
  const root = document.getElementById('boot-intro');
  if (!root) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    root.remove();
    return;
  }

  const navigationEntry = performance.getEntriesByType('navigation')?.[0];
  const isReloadNavigation = navigationEntry?.type === 'reload'
    || (performance.navigation && performance.navigation.type === 1);

  if (!isReloadNavigation) {
    root.remove();
    return;
  }

  buildBinaryCurtain(root);
  const timers = [];

  const clearIntro = () => {
    timers.forEach(clearTimeout);
    root.classList.add('is-clearing');
    timers.push(setTimeout(() => {
      root.classList.add('is-dropping');
    }, 40));
    timers.push(setTimeout(() => {
      root.classList.add('is-removing');
    }, CURTAIN_PHASE_DURATION_MS));
    timers.push(setTimeout(() => {
      root.remove();
    }, CURTAIN_TOTAL_CLEAR_MS));
  };

  root.classList.add('is-curtain-only');
  clearIntro();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootIntro, { once: true });
} else {
  bootIntro();
}
