(() => {
  const existing = document.getElementById('scrollTopButton');
  if (existing) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'scrollTopButton';
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Nach oben');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 15 12 9.5 17.5 15" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1"/>
    </svg>
  `;
  document.body.appendChild(btn);

  const update = () => {
    const shouldShow = window.scrollY > 320;
    btn.classList.toggle('is-visible', shouldShow);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('orientationchange', update);
  update();
})();
