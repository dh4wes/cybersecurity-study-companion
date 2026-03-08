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
    column.style.setProperty('--drop-duration', `${4.2 + Math.random() * 1.8}s`);
    column.style.setProperty('--drop-delay', `${Math.random() * 0.9}s`);
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
  const lineDelay = 560;
  const revealPause = 260;
  const dropDelay = 180;
  const dropDuration = 5900;
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
    }, dropDelay));
    timers.push(setTimeout(() => {
      root.classList.add('is-removing');
    }, dropDelay + dropDuration - 220));
    timers.push(setTimeout(() => {
      root.remove();
    }, dropDelay + dropDuration + 120));
  };

  lines.forEach((line, index) => timers.push(setTimeout(() => {
    out.textContent += `${line}\n`;
    if (index === 1) pulse?.classList.add('is-live');
  }, index * lineDelay)));

  timers.push(setTimeout(clearIntro, lines.length * lineDelay + revealPause));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootIntro, { once: true });
} else {
  bootIntro();
}
