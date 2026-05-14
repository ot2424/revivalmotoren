(() => {
  const site = window.siteContent || {};
  const root = document.body.dataset.root || '.';
  const overviewHref = document.body.dataset.overview || '../motoren.html';
  const currentBrand = document.body.dataset.brand || '';
  const logo = site.logo || {};
  const brands = site.brandScenes || [];
  const support = site.generalBrandsPanel || {};
  const contactItems = site.contactItems || [];
  const whatsappNumber = site.business?.whatsappNumber || '';
  const whatsappMessage = site.business?.whatsappMessage || 'Hallo Teuto Motoren';

  const asset = (path) => {
    if (!path) return '';
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    if (path.startsWith('../') || path.startsWith('./')) return path;
    return `${root}/${path}`;
  };

  const resolveHref = (path) => {
    if (!path) return '#';
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    if (path.startsWith('../') || path.startsWith('./')) return path;
    return `${root}/${path}`;
  };

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
    : resolveHref('index.html#kontakt');

  const brandFileMap = {
    Audi: 'audi.html',
    BMW: 'bmw.html',
    Mercedes: 'mercedes.html',
    'Range Rover': 'range-rover.html'
  };

  const navItems = [
    { label: 'Startseite', href: resolveHref('index.html') },
    { label: 'Leistungen', href: resolveHref('index.html#leistungen') },
    { label: 'Referenzen', href: resolveHref('index.html#cases') },
    { label: 'Motoren', href: overviewHref, key: 'overview' },
    { label: 'Kontakt', href: resolveHref('index.html#kontakt') }
  ];

  const brandLink = (brand) => currentBrand === brand.name ? '#' : (currentBrand ? brandFileMap[brand.name] : `motoren-pages/${brandFileMap[brand.name]}`);

  const app = document.getElementById('motorenApp');
  app.innerHTML = `
    <nav class="mpg-nav">
      <div class="mpg-nav-layout">
        <a href="${resolveHref('index.html')}" class="mpg-brand">
          <span class="mpg-brand-icon"><img src="${asset(logo.dark || logo.light || '')}" alt="${logo.alt || ''}"></span>
          <span class="mpg-brand-copy">
            <span class="mpg-brand-name">${logo.name || ''}</span>
            <span class="mpg-brand-tag">${logo.tagline || ''}</span>
          </span>
        </a>
        <div class="mpg-nav-center">
          <ul class="mpg-nav-list">
            ${navItems.map(item => `<li><a href="${item.href}" class="${item.key === 'overview' && !currentBrand ? 'is-active' : ''}">${item.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="mpg-nav-actions">
          <a class="mpg-action" href="${whatsappHref}" ${whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ''}>WhatsApp</a>
          <a class="mpg-action-solid" href="${resolveHref('index.html#kontakt')}">Angebot anfragen</a>
        </div>
        <button class="mpg-mobile-toggle" id="mpgMobileToggle" type="button" aria-expanded="false" aria-label="Menü öffnen">
          <svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
        </button>
        <div class="mpg-mobile-panel" id="mpgMobilePanel">
          <nav>${navItems.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}</nav>
          <div class="mpg-mobile-actions">
            <a class="mpg-action" href="${whatsappHref}" ${whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ''}>WhatsApp</a>
            <a class="mpg-action-solid" href="${resolveHref('index.html#kontakt')}">Angebot anfragen</a>
          </div>
        </div>
      </div>
    </nav>
    <main class="mpg-page"><div class="mpg-shell" id="motorenPageContent"></div></main>
  `;

  const content = document.getElementById('motorenPageContent');

  const renderOverview = () => {
    content.innerHTML = `
      <section class="mpg-hero">
        <img src="${asset('range/range rover.jpg')}" alt="Motorenwelt Teuto Motoren">
        <div class="mpg-hero-copy">
          <div class="mpg-hero-card">
            <span class="mpg-eyebrow">Motorenwelt</span>
            <h1 class="mpg-title">Beliebte Motoren und Baureihen aus unserer Arbeit</h1>
            <p class="mpg-copy">Ob Performance-Fahrzeug, Oberklasse oder Alltagsauto: Wir arbeiten an einer Vielzahl moderner Motoren und Antriebskonzepte. Die gezeigten Markenbereiche dienen als strukturierter Einblick in unsere Arbeit.</p>
            <div class="mpg-hero-actions">
              <a class="mpg-action-solid" href="#marken">Marken ansehen</a>
              <a class="mpg-action" href="${resolveHref('index.html#kontakt')}">Anfrage senden</a>
            </div>
          </div>
        </div>
      </section>

      <section class="mpg-overview" id="marken">
        ${brands.map(brand => `
          <article class="mpg-brand-card">
            <img src="${asset(brand.heroImage)}" alt="${brand.heroAlt}">
            <div class="mpg-brand-card-copy">
              <span class="mpg-eyebrow">${brand.name}</span>
              <h2>${brand.title}</h2>
              <p>${brand.intro}</p>
              <div class="mpg-pills">
                ${brand.motors.slice(0, 4).map(motor => `<span>${motor.name}</span>`).join('')}
              </div>
              <div class="mpg-hero-actions">
                <a class="mpg-action-solid" href="${brandLink(brand)}">Zur ${brand.name}-Seite</a>
              </div>
            </div>
          </article>
        `).join('')}
      </section>

      <section class="mpg-support">
        <div class="mpg-support-grid">
          ${(support.images || []).map(image => `
            <div class="tile"><img src="${asset(image.src)}" alt="${image.alt}"></div>
          `).join('')}
        </div>
        <div class="mpg-support-copy">
          <div class="mpg-support-card">
            <span class="mpg-eyebrow">${support.label || 'Weitere Marken'}</span>
            <h3>${support.title || ''}</h3>
            <p>${support.body || ''}</p>
            <div class="mpg-hero-actions">
              <a class="mpg-action-solid" href="${resolveHref('index.html#kontakt')}">${support.button || 'Service anfragen →'}</a>
            </div>
          </div>
        </div>
      </section>

      <footer class="mpg-footer">
        <div class="mpg-footer-card">
          <div class="mpg-footer-grid">
            <div>
              <div class="mpg-brand">
                <span class="mpg-brand-icon"><img src="${asset(logo.dark || logo.light || '')}" alt="${logo.alt || ''}"></span>
                <span class="mpg-brand-copy">
                  <span class="mpg-brand-name">${logo.name || ''}</span>
                  <span class="mpg-brand-tag">${logo.tagline || ''}</span>
                </span>
              </div>
              <p class="mpg-copy" style="margin-top:18px">${site.footer?.description || ''}</p>
            </div>
            <div>
              <h5>Navigation</h5>
              <ul>${(site.footerNav || []).map(item => `<li><a href="${resolveHref(`index.html${item.href}`)}">${item.label}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h5>Rechtliches</h5>
              <ul>${(site.footerLegal || []).map(item => `<li><a href="${resolveHref(item.href)}">${item.label}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h5>Kontakt</h5>
              <ul>${contactItems.slice(1, 4).map(item => `<li><a href="${item.className === 'js-whatsapp-link' ? whatsappHref : resolveHref(item.href || '#')}">${item.value}</a></li>`).join('')}</ul>
            </div>
          </div>
          <div class="mpg-footer-copy">${site.footer?.copyright || ''}</div>
        </div>
      </footer>
    `;
  };

  const renderBrandPage = () => {
    const brand = brands.find(item => item.name === currentBrand);
    if (!brand) {
      renderOverview();
      return;
    }

    content.innerHTML = `
      <section class="mpg-hero">
        <img src="${asset(brand.heroImage)}" alt="${brand.heroAlt}">
        <div class="mpg-hero-copy">
          <div class="mpg-hero-card">
            <span class="mpg-eyebrow">${brand.chip || brand.name}</span>
            <h1 class="mpg-title">${brand.title}</h1>
            <p class="mpg-copy">${brand.intro}</p>
            <div class="mpg-pills">
              ${brands.map(item => `<span class="${item.name === brand.name ? 'is-active' : ''}">${item.name}</span>`).join('')}
            </div>
            <div class="mpg-hero-actions">
              <a class="mpg-action" href="${overviewHref}">Zur Motorenübersicht</a>
              <a class="mpg-action-solid" href="${resolveHref('index.html#kontakt')}">Anfrage senden</a>
            </div>
          </div>
        </div>
      </section>

      <section class="mpg-section">
        <div class="mpg-section-head">
          <div>
            <span class="mpg-eyebrow">${brand.name}</span>
            <h3>${brand.subtitle}</h3>
          </div>
          <p>${brand.teaser || ''}</p>
        </div>
        <div class="mpg-overview">
          ${brand.motors.map((motor, index) => `
            <article class="mpg-brand-card" style="min-height:460px">
              <img src="${asset(brand.slides[index] ? brand.slides[index].src : brand.heroImage)}" alt="${motor.name}">
              <div class="mpg-brand-card-copy" style="min-height:460px">
                <span class="mpg-eyebrow">${motor.meta}</span>
                <h2 style="font-size:clamp(2rem,3vw,3rem)">${motor.name}</h2>
                <p>${motor.copy}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="mpg-section">
        <div class="mpg-section-head">
          <div>
            <span class="mpg-eyebrow">Weitere Markenwelten</span>
            <h3>Weitere Bereiche aus unserer Motorenwelt</h3>
          </div>
          <p>Sie können einzelne Marken jetzt separat öffnen, statt alles auf einer einzigen, langen Motoren-Seite unterzubringen.</p>
        </div>
        <div class="mpg-overview">
          ${brands.filter(item => item.name !== brand.name).map(item => `
            <article class="mpg-brand-card" style="min-height:360px">
              <img src="${asset(item.heroImage)}" alt="${item.heroAlt}">
              <div class="mpg-brand-card-copy" style="min-height:360px">
                <span class="mpg-eyebrow">${item.name}</span>
                <h2 style="font-size:clamp(1.9rem,3vw,2.8rem)">${item.title}</h2>
                <p>${item.teaser}</p>
                <div class="mpg-hero-actions">
                  <a class="mpg-action-solid" href="${brandFileMap[item.name]}">Öffnen</a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <footer class="mpg-footer">
        <div class="mpg-footer-card">
          <div class="mpg-footer-grid">
            <div>
              <div class="mpg-brand">
                <span class="mpg-brand-icon"><img src="${asset(logo.dark || logo.light || '')}" alt="${logo.alt || ''}"></span>
                <span class="mpg-brand-copy">
                  <span class="mpg-brand-name">${logo.name || ''}</span>
                  <span class="mpg-brand-tag">${logo.tagline || ''}</span>
                </span>
              </div>
              <p class="mpg-copy" style="margin-top:18px">${site.footer?.description || ''}</p>
            </div>
            <div>
              <h5>Übersicht</h5>
              <ul><li><a href="${overviewHref}">Motorenübersicht</a></li>${brands.map(item => `<li><a href="${brandFileMap[item.name]}">${item.name}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h5>Rechtliches</h5>
              <ul>${(site.footerLegal || []).map(item => `<li><a href="${resolveHref(item.href)}">${item.label}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h5>Kontakt</h5>
              <ul>${contactItems.slice(1, 4).map(item => `<li><a href="${item.className === 'js-whatsapp-link' ? whatsappHref : resolveHref(item.href || '#')}">${item.value}</a></li>`).join('')}</ul>
            </div>
          </div>
          <div class="mpg-footer-copy">${site.footer?.copyright || ''}</div>
        </div>
      </footer>
    `;
  };

  if (currentBrand) {
    renderBrandPage();
  } else {
    renderOverview();
  }

  const mobileToggle = document.getElementById('mpgMobileToggle');
  const mobilePanel = document.getElementById('mpgMobilePanel');
  mobileToggle?.addEventListener('click', () => {
    const open = mobilePanel.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(open));
  });
})();
