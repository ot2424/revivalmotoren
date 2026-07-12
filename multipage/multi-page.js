(() => {
  const site = window.siteContent || {};
  const navItems = [
    { label: 'Start', href: 'index-multipage.html', key: 'home' },
    { label: 'Leistungen', href: 'leistungen.html', key: 'leistungen' },
    { label: 'Referenzen', href: 'referenzen.html', key: 'referenzen' },
    { label: 'Motoren', href: '../pages/motoren.html', key: 'motoren' },
    { label: 'Über uns', href: 'ueber-uns.html', key: 'ueber-uns' },
    { label: 'Kontakt', href: 'kontakt.html', key: 'kontakt' }
  ];

  const page = document.body.dataset.page || 'home';
  const logo = site.logo || {};
  const contactItems = site.contactItems || [];
  const asset = (path) => {
    if (!path) return '';
    if (/^(https?:|mailto:|tel:|#|\.\.\/)/.test(path)) return path;
    return `../${path}`;
  };
  const whatsappNumber = site.business?.whatsappNumber || '';
  const whatsappMessage = String(site.business?.whatsappMessage || '').trim();
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ''}`
    : 'kontakt.html';

  const brandMarkup = `
    <a class="mp-brand" href="index-multipage.html" aria-label="${logo.name || 'Teuto Motoren'}">
      <span class="mp-brand-icon"><img src="${asset(logo.dark || logo.light || '')}" alt="${logo.alt || ''}"></span>
      <span class="mp-brand-copy">
        <span class="mp-brand-name">${logo.name || ''}</span>
        <span class="mp-brand-tag">${logo.tagline || ''}</span>
      </span>
    </a>
  `;

  const navMarkup = navItems.map(item =>
    `<li><a href="${item.href}" class="${item.key === page ? 'is-active' : ''}">${item.label}</a></li>`
  ).join('');

  const app = document.getElementById('mpApp');
  app.innerHTML = `
    <header class="mp-topbar">
      ${brandMarkup}
      <div class="mp-nav"><ul class="mp-nav-list">${navMarkup}</ul></div>
      <div class="mp-actions">
        <a class="mp-btn-alt" href="${whatsappHref}" ${whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ''}>WhatsApp</a>
        <a class="mp-btn" href="kontakt.html">Angebot anfragen</a>
      </div>
      <button class="mp-mobile-toggle" id="mpMobileToggle" type="button" aria-label="Menü öffnen" aria-expanded="false">
        <svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
      </button>
      <div class="mp-mobile-panel" id="mpMobilePanel">
        <nav>${navItems.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}</nav>
        <div class="mp-mobile-actions">
          <a class="mp-btn-alt" href="${whatsappHref}" ${whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ''}>WhatsApp</a>
          <a class="mp-btn" href="kontakt.html">Angebot anfragen</a>
        </div>
      </div>
    </header>
    <main class="mp-page"><div class="mp-shell" id="mpPageContent"></div></main>
    <footer class="mp-footer">
      <div class="mp-footer-shell">
        <div class="mp-footer-grid">
          <div>
            ${brandMarkup}
            <p class="mp-sub" style="margin-top:18px;max-width:420px">${site.footer?.description || ''}</p>
          </div>
          <div>
            <h5>Navigation</h5>
            <ul>${navItems.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h5>Rechtliches</h5>
            <ul>${(site.footerLegal || []).map(item => `<li><a href="../${item.href}">${item.label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h5>Kontakt</h5>
            <ul>${(site.footerContact || []).map(item => `<li><a href="${item.href === '#kontakt' ? 'kontakt.html' : item.href}">${item.label}</a></li>`).join('')}</ul>
          </div>
        </div>
        <div class="mp-footer-copy">${site.footer?.copyright || ''}</div>
      </div>
    </footer>
    <div class="mp-floating" id="mpFloating">
      <div class="mp-floating-card" id="mpFloatingCard">
        <strong>Direkt Kontakt aufnehmen</strong>
        <p>Schneller Weg zu Anfrage, WhatsApp, Telefon und E-Mail.</p>
        <div class="mp-floating-actions">
          <a class="mp-btn" href="kontakt.html">Anfrage starten</a>
          <a class="mp-btn-alt" href="${whatsappHref}" ${whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ''}>WhatsApp</a>
          ${contactItems[1]?.href ? `<a class="mp-btn-alt" href="${contactItems[1].href}">${contactItems[1].value}</a>` : ''}
          ${contactItems[3]?.href ? `<a class="mp-btn-alt" href="${contactItems[3].href}">${contactItems[3].value}</a>` : ''}
        </div>
      </div>
      <button class="mp-floating-toggle" id="mpFloatingToggle" type="button" aria-label="Kontakt öffnen" aria-expanded="false">
        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>
      </button>
    </div>
  `;

  const pageContent = document.getElementById('mpPageContent');

  const renderHome = () => {
    const scenes = (site.brandScenes || []).slice(0, 4);
    pageContent.innerHTML = `
      <section class="mp-home-hero">
        <img src="${asset(site.hero?.image?.src || '')}" alt="${site.hero?.image?.alt || ''}">
        <div class="mp-home-hero-copy">
          <div>
            <div class="mp-eyebrow">${site.logo?.tagline || 'Teuto Motoren'}</div>
            <h1 class="mp-title">${site.hero?.title || ''}</h1>
            <p class="mp-sub">${site.hero?.subtitle || ''}</p>
          </div>
          <div>
            <div class="mp-cta-row">
              <a class="mp-btn" href="kontakt.html">${site.hero?.primaryAction || 'Angebot anfragen'}</a>
              <a class="mp-btn-alt" href="leistungen.html">${site.hero?.secondaryAction || 'Leistungen ansehen'}</a>
            </div>
            <div class="mp-pill-row" style="margin-top:18px">
              ${(site.heroPills || []).slice(0, 6).map(pill => `<span class="mp-pill">${pill}</span>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="mp-home-strip">
        ${(site.services || []).slice(0, 3).map(service => `
          <article class="mp-home-feature">
            <div class="mp-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.body}</p>
          </article>
        `).join('')}
      </section>

      <section class="mp-home-brands">
        <div class="mp-home-brands-grid">
          ${scenes[0] ? `
            <article class="mp-home-brand-main">
              <img src="${asset(scenes[0].heroImage)}" alt="${scenes[0].heroAlt}">
              <div class="mp-caption"><strong>${scenes[0].name}</strong><span>${scenes[0].subtitle}</span></div>
            </article>` : ''
          }
          <div class="mp-home-brand-side">
            ${scenes.slice(1).map(scene => `
              <article>
                <img src="${asset(scene.heroImage)}" alt="${scene.heroAlt}">
                <div class="mp-caption"><strong>${scene.name}</strong><span>${scene.subtitle}</span></div>
              </article>
            `).join('')}
          </div>
        </div>
        <div class="mp-home-brand-copy">
          <div class="mp-eyebrow">${site.brandsPreview?.label || ''}</div>
          <h2>${site.brandsPreview?.title || ''}</h2>
          <p>${site.brandsPreview?.body || ''}</p>
          <div class="mp-brand-list">
            ${(site.brandsPreview?.brands || []).map(brand => `<span>${brand}</span>`).join('')}
          </div>
          <div class="mp-cta-row">
              <a class="mp-btn" href="../pages/motoren.html">${site.brandsPreview?.button || 'Zur Motoren-Seite →'}</a>
          </div>
        </div>
      </section>

      <section class="mp-home-about-contact">
        <article class="mp-home-about">
          <div class="mp-home-about-media">
            ${(site.about?.images || []).map((image) => `
              <article>
                <img src="${asset(image.src)}" alt="${image.alt}">
              </article>
            `).join('')}
          </div>
          <div class="mp-home-about-copy">
            <div class="mp-eyebrow">${site.about?.label || ''}</div>
            <h2>${(site.about?.title || '').replace(/<br>/g, ' ')}</h2>
            <p class="mp-sub">${site.about?.subtitle || ''}</p>
            <div class="mp-card-tags" style="margin-top:20px">
              ${(site.aboutSpecs || []).map(spec => `<span>${spec.label}</span>`).join('')}
            </div>
            <div class="mp-cta-row" style="margin-top:22px">
              <a class="mp-btn-alt" href="ueber-uns.html">Mehr über den Betrieb</a>
            </div>
          </div>
        </article>

        <article class="mp-home-contact">
          <div class="mp-eyebrow">${site.contactSection?.formTitle || 'Kontakt'}</div>
          <h2 style="margin:12px 0 0;font-size:clamp(2.2rem,4vw,4rem);line-height:.95;letter-spacing:-.06em">${(site.contactSection?.title || '').replace(/<br>/g, ' ')}</h2>
          <p class="mp-sub" style="margin-top:18px">${site.contactSection?.subtitle || ''}</p>
          <div class="mp-contact-list" style="margin-top:22px">
            ${contactItems.slice(0, 4).map(item => `
              <div class="mp-contact-item">
                <strong>${item.label}</strong>
                ${item.href ? `<a href="${item.className === 'js-whatsapp-link' ? whatsappHref : item.href}" ${item.className === 'js-whatsapp-link' && whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.value}</a>` : `<span>${item.value}</span>`}
              </div>
            `).join('')}
          </div>
          <div class="mp-cta-row" style="margin-top:20px">
            <a class="mp-btn" href="kontakt.html">Zur Kontaktseite</a>
          </div>
        </article>
      </section>
    `;
  };

  const renderServices = () => {
    pageContent.innerHTML = `
      <section class="mp-section-card" style="padding:32px">
        <div class="mp-section-head">
          <div>
            <div class="mp-eyebrow">${site.servicesSection?.label || ''}</div>
            <h2>${(site.servicesSection?.title || '').replace(/<br>/g, ' ')}</h2>
          </div>
          <p>${site.servicesSection?.subtitle || ''}</p>
        </div>
        <div class="mp-grid three">
          ${(site.services || []).map(service => `
            <article class="mp-card">
              <div class="mp-icon">${service.icon}</div>
              <h3>${service.title}</h3>
              <p>${service.body}</p>
              <div class="mp-card-tags">${service.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="mp-section-card" style="margin-top:24px;padding:32px">
        <div class="mp-section-head">
          <div>
            <div class="mp-eyebrow">${site.processSection?.label || ''}</div>
            <h2>${(site.processSection?.title || '').replace(/<br>/g, ' ')}</h2>
          </div>
          <p>Die Leistungen bleiben hier thematisch gebündelt und müssen nicht mehr mitten auf der Startseite zwischen andere Inhalte gemischt werden.</p>
        </div>
        <div class="mp-process">
          ${(site.processSteps || []).map(step => `
            <article class="mp-card">
              <div class="mp-step">${step.n}</div>
              <h3>${step.title}</h3>
              <p>${step.body}</p>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  };

  const renderReferences = () => {
    pageContent.innerHTML = `
      <section class="mp-section-card" style="padding:32px">
        <div class="mp-section-head">
          <div>
            <div class="mp-eyebrow">${site.casesSection?.label || ''}</div>
            <h2>${(site.casesSection?.title || '').replace(/<br>/g, ' ')}</h2>
          </div>
          <p>${site.casesSection?.subtitle || ''}</p>
        </div>
        <div class="mp-gallery">
          ${(site.caseGallery || []).map(item => `
            <article class="mp-gallery-item">
              <img src="${asset(item.src)}" alt="${item.alt}">
              <div class="mp-gallery-copy">
                <strong>${item.name}</strong>
                <span>${item.tag}</span>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="mp-section-card" style="margin-top:24px;padding:32px">
        <div class="mp-section-head">
          <div>
            <div class="mp-eyebrow">${site.resultsSection?.label || ''}</div>
            <h2>${(site.resultsSection?.title || '').replace(/<br>/g, ' ')}</h2>
          </div>
          <p>${site.resultsSection?.subtitle || ''}</p>
        </div>
        <div class="mp-grid three">
          ${(site.workshopCards || []).map(card => `
            <article class="mp-gallery-item">
              <img src="${asset(card.src)}" alt="${card.alt}" style="aspect-ratio:1.2/1">
              <div class="mp-gallery-copy">
                <strong>${card.title}</strong>
                <p>${card.sub}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  };

  const renderAbout = () => {
    pageContent.innerHTML = `
      <section class="mp-section-card" style="padding:32px">
        <div class="mp-section-head">
          <div>
            <div class="mp-eyebrow">${site.about?.label || ''}</div>
            <h2>${(site.about?.title || '').replace(/<br>/g, ' ')}</h2>
          </div>
          <p>${site.about?.subtitle || ''}</p>
        </div>
        <div class="mp-grid two">
          <div class="mp-grid" style="grid-template-columns:1fr 1fr;gap:16px">
            ${(site.about?.images || []).map((image, index) => `
              <article class="mp-gallery-item" style="${index === 0 ? 'grid-column:1 / -1' : ''}">
                <img src="${asset(image.src)}" alt="${image.alt}" style="aspect-ratio:${index === 0 ? '1.6/1' : '1/1'}">
              </article>
            `).join('')}
          </div>
          <div class="mp-card">
            <h3 style="font-size:2rem;letter-spacing:-.05em">${site.why?.title?.replace(/<br>/g, ' ') || ''}</h3>
            <p>${site.why?.subtitle || ''}</p>
            <div class="mp-grid two" style="margin-top:22px">
              ${(site.whyFeatures || []).map(feature => `
                <article class="mp-card" style="padding:20px">
                  <h4>${feature.title}</h4>
                  <p>${feature.body}</p>
                </article>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
      <section class="mp-section-card" style="margin-top:24px;padding:32px">
        <div class="mp-grid three">
          ${(site.aboutSpecs || []).map(spec => `
            <article class="mp-card">
              <h3 style="font-size:2.2rem;letter-spacing:-.06em">${spec.value.replace(/<[^>]+>/g, '')}</h3>
              <p>${spec.label}</p>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  };

  const renderContact = () => {
    pageContent.innerHTML = `
      <section class="mp-section-card" style="padding:32px">
        <div class="mp-section-head">
          <div>
            <div class="mp-eyebrow">Kontakt & Anfrage</div>
            <h2>${(site.contactSection?.title || '').replace(/<br>/g, ' ')}</h2>
          </div>
          <p>${site.contactSection?.subtitle || ''}</p>
        </div>
        <div class="mp-contact-layout">
          <div class="mp-card">
            <div class="mp-contact-list">
              ${contactItems.map(item => `
                <div class="mp-contact-item">
                  <strong>${item.label}</strong>
                  ${item.href ? `<a href="${item.className === 'js-whatsapp-link' ? whatsappHref : item.href}" ${item.className === 'js-whatsapp-link' && whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.value}</a>` : `<span>${item.value}</span>`}
                </div>
              `).join('')}
            </div>
          </div>
          <div class="mp-card">
            <form class="mp-form" id="mpContactForm">
              <div class="mp-form-grid">
                <div class="mp-field"><label for="mp-name">Name</label><input id="mp-name" type="text" placeholder="Vor- und Nachname" required></div>
                <div class="mp-field"><label for="mp-mail">E-Mail</label><input id="mp-mail" type="email" placeholder="ihre@email.de" required></div>
              </div>
              <div class="mp-form-grid">
                <div class="mp-field"><label for="mp-phone">Telefon</label><input id="mp-phone" type="tel" placeholder="+49 ..."></div>
                <div class="mp-field"><label for="mp-brand">Fahrzeugmarke</label><input id="mp-brand" type="text" placeholder="Audi, VW, Toyota ..."></div>
              </div>
              <div class="mp-field">
                <label for="mp-message">Problembeschreibung</label>
                <textarea id="mp-message" placeholder="Beschreiben Sie Ihr Anliegen oder den Motorschaden."></textarea>
              </div>
              <button class="mp-btn" type="submit">${site.contactSection?.submitLabel || 'Angebot anfragen'}</button>
            </form>
          </div>
        </div>
      </section>
    `;

    document.getElementById('mpContactForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      event.currentTarget.innerHTML = `
        <div class="mp-card" style="padding:0;background:transparent;border:0">
          <h3 style="margin:0 0 10px">${site.contactSection?.successTitle || 'Anfrage gesendet!'}</h3>
          <p>${site.contactSection?.successText || ''}</p>
        </div>
      `;
    });
  };

  ({
    home: renderHome,
    leistungen: renderServices,
    referenzen: renderReferences,
    'ueber-uns': renderAbout,
    kontakt: renderContact
  }[page] || renderHome)();

  const mobileToggle = document.getElementById('mpMobileToggle');
  const mobilePanel = document.getElementById('mpMobilePanel');
  mobileToggle?.addEventListener('click', () => {
    const open = mobilePanel.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(open));
  });

  const floatingToggle = document.getElementById('mpFloatingToggle');
  const floatingCard = document.getElementById('mpFloatingCard');
  floatingToggle?.addEventListener('click', () => {
    const open = floatingCard.classList.toggle('is-open');
    floatingToggle.setAttribute('aria-expanded', String(open));
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 220) {
      floatingCard?.classList.remove('is-open');
      floatingToggle?.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });
})();
