(function(){
  const STORAGE_KEY = 'teutoConsentSettings.v1';
  const DEFAULTS = {
    essential: true,
    externalMedia: false,
    analytics: false,
    marketing: false
  };
  const listeners = [];

  function readPrefs(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return null;
      const parsed = JSON.parse(raw);
      return {
        essential: true,
        externalMedia: !!parsed.externalMedia,
        analytics: !!parsed.analytics,
        marketing: !!parsed.marketing,
        savedAt: parsed.savedAt || Date.now()
      };
    }catch{
      return null;
    }
  }

  function writePrefs(next){
    const payload = {
      essential: true,
      externalMedia: !!next.externalMedia,
      analytics: !!next.analytics,
      marketing: !!next.marketing,
      savedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.TeutoConsent.state = payload;
    listeners.forEach(fn => {
      try { fn(payload); } catch {}
    });
    return payload;
  }

  function ensureUI(){
    if(document.getElementById('consentOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'consentOverlay';
    overlay.className = 'consent-overlay';
    overlay.innerHTML = `
      <div class="consent-panel" role="dialog" aria-modal="true" aria-labelledby="consentTitle">
        <div class="consent-shell">
          <div class="consent-summary">
            <div class="consent-main">
              <span class="consent-eyebrow">Datenschutz</span>
              <h2 class="consent-title" id="consentTitle">Wir respektieren Ihre Privatsphäre</h2>
              <p class="consent-text">
                Wir verwenden essenzielle Speicherungen für die Grundfunktionen dieser Website. Externe Inhalte, Analysen oder spätere Marketing-Dienste werden nur nach Ihrer Zustimmung aktiviert.
              </p>
              <p class="consent-meta">Ihre Auswahl wird für künftige Besuche gespeichert.</p>
            </div>
            <div class="consent-actions">
              <button type="button" class="consent-btn consent-btn--ghost" data-consent-action="toggle-details">Auswahl selbst bestimmen</button>
              <button type="button" class="consent-btn consent-btn--dark" data-consent-action="deny-all">Alle ablehnen</button>
              <button type="button" class="consent-btn consent-btn--primary" data-consent-action="allow-all">Alle erlauben</button>
            </div>
          </div>
          <div class="consent-detail" id="consentDetail" hidden>
            <div class="consent-points">
              <div class="consent-point"><strong>Essenziell:</strong><span>Erforderlich für grundlegende Funktionen wie das Speichern Ihrer Datenschutzeinstellungen.</span></div>
              <div class="consent-point"><strong>Externe Inhalte:</strong><span>Steuert z. B. eingebettete Karten, Medien und zukünftige Drittinhalte.</span></div>
              <div class="consent-point"><strong>Analyse & Marketing:</strong><span>Aktuell nicht aktiv eingebunden, aber für spätere Erweiterungen vorbereitet.</span></div>
            </div>
            <div class="consent-cats">
              <div class="consent-cat">
                <div class="consent-cat-head">
                  <div class="consent-cat-title">Essenzielle Funktionen</div>
                  <label class="consent-switch is-locked">
                    <input type="checkbox" checked disabled data-consent-key="essential">
                    <span></span>
                  </label>
                </div>
                <p class="consent-cat-copy">Notwendig für die Speicherung Ihrer Consent-Entscheidung und grundlegende Seitennutzung.</p>
              </div>
              <div class="consent-cat">
                <div class="consent-cat-head">
                  <div class="consent-cat-title">Externe Inhalte</div>
                  <label class="consent-switch">
                    <input type="checkbox" data-consent-key="externalMedia">
                    <span></span>
                  </label>
                </div>
                <p class="consent-cat-copy">Zum Laden externer Karten, eingebetteter Medien oder zukünftiger Drittinhalte.</p>
              </div>
              <div class="consent-cat">
                <div class="consent-cat-head">
                  <div class="consent-cat-title">Analyse</div>
                  <label class="consent-switch">
                    <input type="checkbox" data-consent-key="analytics">
                    <span></span>
                  </label>
                </div>
                <p class="consent-cat-copy">Für anonyme Nutzungsanalyse, falls später Statistik-Tools eingebunden werden.</p>
              </div>
              <div class="consent-cat">
                <div class="consent-cat-head">
                  <div class="consent-cat-title">Marketing</div>
                  <label class="consent-switch">
                    <input type="checkbox" data-consent-key="marketing">
                    <span></span>
                  </label>
                </div>
                <p class="consent-cat-copy">Für mögliche Marketing- oder Retargeting-Dienste. Aktuell nicht aktiv.</p>
              </div>
            </div>
            <div class="consent-detail-actions">
              <button type="button" class="consent-btn consent-btn--primary" data-consent-action="save-selection">Auswahl speichern</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.append(overlay);
    overlay.addEventListener('click', (event) => {
      if(event.target === overlay && window.TeutoConsent.hasSaved()){
        closePreferences();
      }
    });
    overlay.querySelector('[data-consent-action="toggle-details"]').addEventListener('click', () => {
      toggleDetails();
    });
    overlay.querySelector('[data-consent-action="allow-all"]').addEventListener('click', () => {
      const saved = writePrefs({ externalMedia: true, analytics: true, marketing: true });
      syncUI(saved);
      closePreferences();
    });
    overlay.querySelector('[data-consent-action="deny-all"]').addEventListener('click', () => {
      const saved = writePrefs({ externalMedia: false, analytics: false, marketing: false });
      syncUI(saved);
      closePreferences();
    });
    overlay.querySelector('[data-consent-action="save-selection"]').addEventListener('click', () => {
      const selection = getSelectionFromUI();
      const saved = writePrefs(selection);
      syncUI(saved);
      closePreferences();
    });
  }

  function syncUI(state){
    const overlay = document.getElementById('consentOverlay');
    if(!overlay) return;
    overlay.querySelectorAll('input[data-consent-key]').forEach(input => {
      const key = input.dataset.consentKey;
      if(key === 'essential'){
        input.checked = true;
        return;
      }
      input.checked = !!state[key];
    });
  }

  function setDetailsExpanded(expanded){
    const overlay = document.getElementById('consentOverlay');
    if(!overlay) return;
    const panel = overlay.querySelector('.consent-panel');
    const detail = overlay.querySelector('#consentDetail');
    const toggle = overlay.querySelector('[data-consent-action="toggle-details"]');
    if(!panel || !detail || !toggle) return;
    panel.classList.toggle('is-expanded', expanded);
    detail.hidden = !expanded;
    toggle.textContent = expanded ? 'Auswahl ausblenden' : 'Auswahl selbst bestimmen';
  }

  function toggleDetails(force){
    const overlay = document.getElementById('consentOverlay');
    if(!overlay) return;
    const panel = overlay.querySelector('.consent-panel');
    const next = typeof force === 'boolean' ? force : !panel.classList.contains('is-expanded');
    setDetailsExpanded(next);
  }

  function getSelectionFromUI(){
    const overlay = document.getElementById('consentOverlay');
    const next = { ...DEFAULTS };
    if(!overlay) return next;
    overlay.querySelectorAll('input[data-consent-key]').forEach(input => {
      const key = input.dataset.consentKey;
      if(key !== 'essential'){
        next[key] = input.checked;
      }
    });
    return next;
  }

  function openPreferences(){
    ensureUI();
    syncUI(window.TeutoConsent.state || DEFAULTS);
    setDetailsExpanded(false);
    document.getElementById('consentOverlay').classList.add('is-open');
    document.body.classList.add('consent-open');
  }

  function closePreferences(){
    const overlay = document.getElementById('consentOverlay');
    if(!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('consent-open');
  }

  window.TeutoConsent = {
    state: readPrefs() || null,
    hasSaved(){
      return !!readPrefs();
    },
    get(){
      return this.state || DEFAULTS;
    },
    has(category){
      const state = this.state || DEFAULTS;
      return category === 'essential' ? true : !!state[category];
    },
    set(next){
      const saved = writePrefs(next);
      syncUI(saved);
      return saved;
    },
    open: openPreferences,
    close: closePreferences,
    onChange(fn){
      if(typeof fn === 'function') listeners.push(fn);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    ensureUI();
    const saved = readPrefs();
    if(saved){
      window.TeutoConsent.state = saved;
      syncUI(saved);
    }else{
      openPreferences();
    }
  });
})();
