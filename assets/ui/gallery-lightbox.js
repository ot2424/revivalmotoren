(function(){
  const SELECTOR = '[data-lightbox-gallery]';
  let lightbox;
  let lightboxDialog;
  let lightboxImage;
  let lightboxCount;
  let lightboxPrev;
  let lightboxNext;
  let activeGallery = [];
  let activeIndex = 0;
  let touchStartX = 0;

  function ensureLightbox(){
    if(lightbox) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-lightbox';
    wrapper.id = 'sharedGalleryLightbox';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML = `
      <div class="gallery-lightbox-dialog">
        <div class="gallery-lightbox-stage">
          <img id="sharedGalleryLightboxImage" src="" alt="">
        </div>
        <button class="gallery-lightbox-close" id="sharedGalleryLightboxClose" type="button" aria-label="Galerie schließen">×</button>
        <button class="gallery-lightbox-nav prev" id="sharedGalleryLightboxPrev" type="button" aria-label="Vorheriges Bild">‹</button>
        <button class="gallery-lightbox-nav next" id="sharedGalleryLightboxNext" type="button" aria-label="Nächstes Bild">›</button>
        <div class="gallery-lightbox-meta">
          <span class="gallery-lightbox-count" id="sharedGalleryLightboxCount">1 / 1</span>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
    lightbox = wrapper;
    lightboxDialog = wrapper.querySelector('.gallery-lightbox-dialog');
    lightboxImage = wrapper.querySelector('#sharedGalleryLightboxImage');
    lightboxCount = wrapper.querySelector('#sharedGalleryLightboxCount');
    lightboxPrev = wrapper.querySelector('#sharedGalleryLightboxPrev');
    lightboxNext = wrapper.querySelector('#sharedGalleryLightboxNext');

    wrapper.addEventListener('click', (event) => {
      if (event.target === wrapper) close();
    });
    wrapper.querySelector('#sharedGalleryLightboxClose').addEventListener('click', close);
    lightboxPrev.addEventListener('click', () => move(-1));
    lightboxNext.addEventListener('click', () => move(1));
    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    });
    lightboxDialog.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive:true });
    lightboxDialog.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) < 40) return;
      move(delta > 0 ? -1 : 1);
    }, { passive:true });
  }

  function normalizeItems(container){
    return Array.from(container.querySelectorAll('img'))
      .filter((img) => !img.closest('[data-lightbox-ignore]'))
      .map((img) => ({
        src: img.dataset.lightboxSrc || img.currentSrc || img.src,
        alt: img.getAttribute('alt') || 'Bild',
        style: img.dataset.lightboxStyle || ''
      }))
      .filter((item) => item.src);
  }

  function render(){
    const image = activeGallery[activeIndex];
    if (!image) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxImage.style.cssText = image.style || '';
    lightboxCount.textContent = `${activeIndex + 1} / ${activeGallery.length}`;
    const showNav = activeGallery.length > 1;
    lightboxPrev.style.display = showNav ? 'inline-flex' : 'none';
    lightboxNext.style.display = showNav ? 'inline-flex' : 'none';
  }

  function open(gallery, index){
    ensureLightbox();
    activeGallery = gallery;
    activeIndex = index;
    render();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function move(step){
    if (!activeGallery.length) return;
    activeIndex = (activeIndex + step + activeGallery.length) % activeGallery.length;
    render();
  }

  function bind(root = document){
    ensureLightbox();
    root.querySelectorAll(SELECTOR).forEach((container) => {
      if (container.dataset.lightboxBound === 'true') return;
      const images = Array.from(container.querySelectorAll('img')).filter((img) => !img.closest('[data-lightbox-ignore]'));
      if (!images.length) return;
      container.dataset.lightboxBound = 'true';
      container.addEventListener('click', (event) => {
        const clicked = event.target.closest('img');
        if (!clicked || !container.contains(clicked) || clicked.closest('[data-lightbox-ignore]')) return;
        const orderedImages = Array.from(container.querySelectorAll('img')).filter((img) => !img.closest('[data-lightbox-ignore]'));
        const index = orderedImages.indexOf(clicked);
        if (index === -1) return;
        open(normalizeItems(container), index);
      });
    });
  }

  window.GalleryLightbox = { bind, open, close };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bind(document));
  } else {
    bind(document);
  }
})();
