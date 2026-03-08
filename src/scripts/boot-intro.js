const BOOT_PHASE_DURATION_MS = 5500;
const CURTAIN_PHASE_DURATION_MS = 4000;
const CURTAIN_FINISH_BUFFER_MS = 260;
const MAX_CURTAIN_DELAY_MS = 900;

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
    const maxDurationMs = Math.max(3200, latestFinishMs - dropDelayMs);
    const minDurationMs = Math.min(4300, maxDurationMs);
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

  const sessionKey = 'cyber-study-boot-intro-session-v1';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    root.remove();
    return;
  }

  try {
    if (sessionStorage.getItem(sessionKey) === 'true') {
      root.remove();
      return;
    }
  } catch {
    // Ignore storage errors and continue showing the intro.
  }

  buildBinaryCurtain(root);

  const lines = [
    'initializing cyber training environment',
    'loading modules...',
    '',
    '✓ hardware',
    '✓ networking',
    '✓ security',
    '✓ governance',
    '',
    '32 week roadmap detected',
    'launching interface'
  ];
  const finalPause = 580;
  const lineDelay = Math.max(
    220,
    Math.floor((BOOT_PHASE_DURATION_MS - finalPause) / (lines.length - 1))
  );
  const out = document.getElementById('boot-console');
  const pulse = document.getElementById('packet-pulse');
  const timers = [];

  const clearIntro = () => {
    timers.forEach(clearTimeout);
    try {
      sessionStorage.setItem(sessionKey, 'true');
    } catch {
      // Ignore storage errors.
    }
    root.classList.add('is-clearing');
    timers.push(setTimeout(() => {
      root.classList.add('is-dropping');
    }, 40));
    timers.push(setTimeout(() => {
      root.classList.add('is-removing');
    }, CURTAIN_PHASE_DURATION_MS - 220));
    timers.push(setTimeout(() => {
      root.remove();
    }, CURTAIN_PHASE_DURATION_MS));
  };

  lines.forEach((line, index) => timers.push(setTimeout(() => {
    out.textContent += `${line}\n`;
    if (index === 1) pulse?.classList.add('is-live');
  }, index * lineDelay)));

  timers.push(setTimeout(clearIntro, BOOT_PHASE_DURATION_MS));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootIntro, { once: true });
} else {
  bootIntro();
}
