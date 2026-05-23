(function(){
  function ensureBars(toggle){
    if(!toggle) return;
    if(toggle.querySelector('.mnav-toggle-bar')) return;
    toggle.innerHTML = '<span class="mnav-toggle-bar"></span><span class="mnav-toggle-bar"></span><span class="mnav-toggle-bar"></span>';
  }

  function bind(options){
    const settings = Object.assign({
      toggleId: '',
      panelId: '',
      panelOpenClass: 'is-open',
      closeSelectors: 'a',
      bodyOpenClass: '',
      lockBody: false,
      desktopBreakpoint: 768
    }, options || {});

    const toggle = document.getElementById(settings.toggleId);
    const panel = document.getElementById(settings.panelId);
    if(!toggle || !panel) return null;

    ensureBars(toggle);

    const setOpen = (open) => {
      panel.classList.toggle(settings.panelOpenClass, open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      panel.setAttribute('aria-hidden', String(!open));
      if(settings.bodyOpenClass){
        document.body.classList.toggle(settings.bodyOpenClass, open);
      }
      if(settings.lockBody){
        document.body.style.overflow = open ? 'hidden' : '';
      }
    };

    toggle.addEventListener('click', () => {
      const open = !panel.classList.contains(settings.panelOpenClass);
      setOpen(open);
    });

    panel.querySelectorAll(settings.closeSelectors).forEach((node) => {
      node.addEventListener('click', () => setOpen(false));
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > settings.desktopBreakpoint){
        setOpen(false);
      }
    });

    return { setOpen };
  }

  window.SharedMobileNav = { bind, ensureBars };
})();
