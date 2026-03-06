const bootIntro = () => {
  const root = document.getElementById('boot-intro');
  if (!root) return;
  const key = 'bootIntroSeen-v2';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = localStorage.getItem(key) === 'true';
  if (reduce || seen) return root.remove();
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
  const finalPause = 1400;
  const out = document.getElementById('boot-console');
  const pulse = document.getElementById('packet-pulse');
  const timers = [];
  const done = () => {
    timers.forEach(clearTimeout);
    localStorage.setItem(key, 'true');
    root.classList.add('is-fading');
    setTimeout(() => root.remove(), 220);
  };
  document.getElementById('skip-intro')?.addEventListener('click', done, { once: true });
  lines.forEach((line, i) => timers.push(setTimeout(() => {
    out.textContent += `${line}\n`;
    if (i === 1) pulse?.classList.add('is-live');
  }, i * lineDelay)));
  timers.push(setTimeout(done, lines.length * lineDelay + finalPause));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootIntro, { once: true });
} else {
  bootIntro();
}
