(() => {
  if (/\/kontakt(\.html)?$/i.test(window.location.pathname)) return;

  const root = document.body.dataset.root || '.';
  const site = window.siteContent || {};
  const business = site.business || {};

  const resolveHref = (path) => {
    if (!path) return '#';
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    if (path.startsWith('../') || path.startsWith('./')) return path;
    return `${root}/${path}`;
  };

  const whatsappNumber = String(business.whatsappNumber || '').replace(/[^\d]/g, '');
  const whatsappMessage = String(business.whatsappMessage || '').trim();
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ''}`
    : resolveHref('pages/kontakt.html');

  const existingAnchor = document.querySelector('.desktop-contact-fab, .floating-contact');
  if (existingAnchor) existingAnchor.remove();

  const wrap = document.createElement('div');
  wrap.className = 'floating-contact-wrap';
  wrap.innerHTML = `
    <button type="button" class="desktop-contact-fab" aria-label="Kontaktoptionen öffnen" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.2 17.8c1.5 1 3.4 1.6 5.5 1.6.5 0 1 0 1.5-.1l4.6 2-1.2-4.1c1.3-1.4 2.1-3.3 2.1-5.4 0-4.6-4-8.3-8.9-8.3S1 7.2 1 11.8s4 8.4 8.9 8.4c.2 0 .4 0 .6 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
      </svg>
    </button>
    <div class="desktop-contact-panel" aria-hidden="true">
      <a href="${resolveHref('pages/kontakt.html')}" class="desktop-contact-action desktop-contact-action--primary">Kontakt</a>
      <a href="${whatsappHref}" class="desktop-contact-action desktop-contact-action--ghost"${whatsappNumber ? ' target="_blank" rel="noopener noreferrer"' : ''}>WhatsApp</a>
    </div>
  `;
  document.body.appendChild(wrap);

  const button = wrap.querySelector('.desktop-contact-fab');
  const panel = wrap.querySelector('.desktop-contact-panel');

  let isOpen = false;

  const setOpen = (next) => {
    isOpen = !!next;
    wrap.classList.toggle('is-open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    panel.setAttribute('aria-hidden', String(!isOpen));
  };

  const updateVisibility = () => {
    const shouldShow = window.scrollY > 220;
    wrap.classList.toggle('is-visible', shouldShow);
    if (!shouldShow) setOpen(false);
  };

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(!isOpen);
  });

  document.addEventListener('click', (event) => {
    if (!wrap.contains(event.target)) setOpen(false);
  });

  window.addEventListener('scroll', () => {
    if (isOpen) setOpen(false);
    updateVisibility();
  }, { passive: true });
  window.addEventListener('resize', () => {
    setOpen(false);
    updateVisibility();
  });
  window.addEventListener('orientationchange', () => {
    setOpen(false);
    updateVisibility();
  });

  updateVisibility();
})();
