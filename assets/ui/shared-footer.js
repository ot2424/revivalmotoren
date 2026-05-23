(() => {
  if (document.querySelector('.shared-footer')) return;
  const site = window.siteContent || {};
  const mount = document.querySelector('[data-shared-footer]');
  const page = document.querySelector('.page');
  const root = document.body.dataset.root || '.';
  if (!site.logo || (!mount && !page)) return;

  const resolveAsset = (path) => {
    if (!path) return '';
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    if (path.startsWith('../') || path.startsWith('./')) return path;
    return `${root}/${path}`;
  };

  const resolveHref = (path) => {
    if (!path) return '#';
    if (/^(https?:|mailto:|tel:)/.test(path)) return path;
    if (path.startsWith('#')) {
      return root === '.' ? `index.html${path}` : `${root}/index.html${path}`;
    }
    if (path.startsWith('../') || path.startsWith('./')) return path;
    return `${root}/${path}`;
  };

  const footer = document.createElement('footer');
  footer.className = 'shared-footer';
  footer.innerHTML = `
    <div class="shared-footer-card">
      <div class="shared-footer-grid">
        <div class="shared-footer-column">
          <div class="shared-footer-brand">
            <span class="shared-footer-brand-icon"><img src="${resolveAsset(site.logo.dark || site.logo.light || '')}" alt="${site.logo.alt || ''}"></span>
            <span class="shared-footer-brand-copy">
              <strong>${site.logo.name || ''}</strong>
              <span>${site.logo.tagline || ''}</span>
            </span>
          </div>
          <p class="shared-footer-description">${site.footer?.description || ''}</p>
        </div>
        <div class="shared-footer-column">
          <h5>Navigation</h5>
          <ul>${(site.footerNav || []).map(item => `<li><a href="${resolveHref(item.href)}">${item.label}</a></li>`).join('')}</ul>
        </div>
        <div class="shared-footer-column">
          <h5>Rechtliches</h5>
          <ul>${(site.footerLegal || []).map(item => `<li><a href="${resolveHref(item.href)}">${item.label}</a></li>`).join('')}</ul>
        </div>
        <div class="shared-footer-column">
          <h5>Kontakt</h5>
          <ul>${(site.footerContact || []).map(item => `<li><a href="${resolveHref(item.href)}">${item.label}</a></li>`).join('')}</ul>
        </div>
      </div>
      <div class="shared-footer-copy">${site.footer?.copyright || ''}</div>
    </div>
  `;

  if (mount && page && !page.contains(mount)) {
    mount.remove();
    page.appendChild(footer);
  } else if (mount) {
    mount.replaceWith(footer);
  } else {
    page.appendChild(footer);
  }
})();
