(function(){
  const SELECTOR = '[data-lightbox-gallery]';
  let lightbox;
  let lightboxDialog;
  let lightboxImage;
  let lightboxVideo;
  let lightboxCount;
  let lightboxPrev;
  let lightboxNext;
  let activeGallery = [];
  let activeIndex = 0;
  let touchStartX = 0;
  let pausedPageVideos = [];

  function pausePageVideos(){
    pausedPageVideos = Array.from(document.querySelectorAll('video'))
      .filter((video) => video !== lightboxVideo && !video.paused);
    pausedPageVideos.forEach((video) => video.pause());
  }

  function resumePageVideos(){
    pausedPageVideos.forEach((video) => {
      if(document.contains(video)) video.play().catch(() => {});
    });
    pausedPageVideos = [];
  }

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
          <video id="sharedGalleryLightboxVideo" controls muted playsinline preload="metadata"></video>
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
    lightboxVideo = wrapper.querySelector('#sharedGalleryLightboxVideo');
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
    return Array.from(container.querySelectorAll('img, video'))
      .filter((media) => !media.closest('[data-lightbox-ignore]'))
      .map((media) => {
        const source = media.tagName === 'VIDEO' ? media.querySelector('source') : null;
        const src = media.dataset.lightboxSrc || media.currentSrc || media.src || source?.src || source?.dataset.src || media.dataset.src;
        return {
          type: media.tagName === 'VIDEO' ? 'video' : 'image',
          src,
          poster: media.getAttribute('poster') || '',
          alt: media.getAttribute('alt') || media.getAttribute('aria-label') || 'Bild',
          style: media.dataset.lightboxStyle || ''
        };
      })
      .filter((item) => item.src);
  }

  function render(){
    const item = activeGallery[activeIndex];
    if (!item) return;
    lightbox.classList.toggle('is-video-open', item.type === 'video');
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.removeAttribute('poster');
    lightboxVideo.load();
    lightboxImage.removeAttribute('src');
    lightboxImage.alt = '';
    lightboxImage.style.cssText = '';
    lightboxImage.hidden = item.type === 'video';
    lightboxVideo.hidden = item.type !== 'video';

    if(item.type === 'video'){
      lightboxVideo.src = item.src;
      if(item.poster) lightboxVideo.poster = item.poster;
      lightboxVideo.setAttribute('aria-label', item.alt);
      lightboxVideo.play().catch(() => {});
    } else {
      lightboxImage.src = item.src;
      lightboxImage.alt = item.alt;
      lightboxImage.style.cssText = item.style || '';
    }
    lightboxCount.textContent = `${activeIndex + 1} / ${activeGallery.length}`;
    const showNav = activeGallery.length > 1;
    lightboxPrev.style.display = showNav ? 'inline-flex' : 'none';
    lightboxNext.style.display = showNav ? 'inline-flex' : 'none';
  }

  function open(gallery, index){
    ensureLightbox();
    activeGallery = gallery;
    activeIndex = index;
    pausePageVideos();
    document.body.classList.add('is-lightbox-open');
    window.dispatchEvent(new CustomEvent('gallery-lightbox:open'));
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    render();
  }

  function close(){
    if (!lightbox) return;
    lightboxVideo?.pause();
    lightboxVideo?.removeAttribute('src');
    lightboxVideo?.load();
    lightbox.classList.remove('is-open');
    lightbox.classList.remove('is-video-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.classList.remove('is-lightbox-open');
    window.dispatchEvent(new CustomEvent('gallery-lightbox:close'));
    resumePageVideos();
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
      const mediaItems = Array.from(container.querySelectorAll('img, video')).filter((media) => !media.closest('[data-lightbox-ignore]'));
      if (!mediaItems.length) return;
      container.dataset.lightboxBound = 'true';
      container.addEventListener('click', (event) => {
        const clicked = event.target.closest('img, video');
        if (!clicked || !container.contains(clicked) || clicked.closest('[data-lightbox-ignore]')) return;
        const orderedMedia = Array.from(container.querySelectorAll('img, video')).filter((media) => !media.closest('[data-lightbox-ignore]'));
        const index = orderedMedia.indexOf(clicked);
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
