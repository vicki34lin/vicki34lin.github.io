/* =========================================
   MAIN.JS — Gallery rendering, lazy loading, lightbox
   ========================================= */

(function () {
  'use strict';

  // ── State ─────────────────────────────────
  let allImages = [];   // flat list of { src, label } for lightbox navigation
  let lightboxIndex = 0;

  // ── DOM refs ──────────────────────────────
  const gallery     = document.getElementById('gallery');
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightboxImg');
  const lbLabel     = document.getElementById('lightboxLabel');
  const lbCounter   = document.getElementById('lightboxCounter');
  const lbClose     = document.getElementById('lightboxClose');
  const lbPrev      = document.getElementById('lightboxPrev');
  const lbNext      = document.getElementById('lightboxNext');
  const lbBackdrop  = document.getElementById('lightboxBackdrop');

  // ── Render gallery ────────────────────────
  function render() {
    gallery.innerHTML = '';
    allImages = [];

    portfolioData.forEach((item, i) => {
      const inputOffset = allImages.length;
      item.inputs.forEach(src => allImages.push({ src, label: 'INPUT' }));
      const outputOffset = allImages.length;
      item.outputs.forEach(src => allImages.push({ src, label: 'OUTPUT' }));

      const card = buildCard(item, i, inputOffset, outputOffset);
      gallery.appendChild(card);
    });

    observeCards();
    observeLazyImages();
  }

  // ── Build a single card ───────────────────
  function buildCard(item, index, inputOffset, outputOffset) {
    const card = document.createElement('article');
    card.className = 'card';

    // Header
    const header = document.createElement('div');
    header.className = 'card-header';
    header.innerHTML = `
      <span class="card-index">No.${String(index + 1).padStart(2, '0')}</span>
      <h2 class="card-title">${escHtml(item.title)}</h2>
    `;

    // Body
    const body = document.createElement('div');
    body.className = 'card-body';

    // Col: Input
    const colInput = document.createElement('div');
    colInput.className = 'card-col';
    colInput.innerHTML = `<div class="col-label">Input</div>`;
    colInput.appendChild(buildImageBlock(item.inputs, inputOffset, 'INPUT'));

    // Divider 1
    const div1 = document.createElement('div');
    div1.className = 'card-col-divider';

    // Col: Prompt
    const colPrompt = document.createElement('div');
    colPrompt.className = 'card-col card-col--prompt';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.setAttribute('aria-label', '複製 Prompt');
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="9" y="9" width="13" height="13" rx="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
      複製
    `;
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(item.prompt).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          已複製
        `;
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            複製
          `;
        }, 2000);
      });
    });

    const promptHeader = document.createElement('div');
    promptHeader.className = 'prompt-col-header';
    promptHeader.innerHTML = `<div class="col-label">Prompt</div>`;
    promptHeader.appendChild(copyBtn);

    const scrollWrap = document.createElement('div');
    scrollWrap.className = 'prompt-scroll-wrap';

    const promptText = document.createElement('p');
    promptText.className = 'col-prompt-text';
    promptText.textContent = item.prompt;
    scrollWrap.appendChild(promptText);

    colPrompt.appendChild(promptHeader);
    colPrompt.appendChild(scrollWrap);

    if (item.tags && item.tags.length) {
      const tagsDiv = document.createElement('div');
      tagsDiv.className = 'col-prompt-tags';
      tagsDiv.innerHTML = item.tags.map(t => `<span class="prompt-tag">${escHtml(t)}</span>`).join('');
      colPrompt.appendChild(tagsDiv);
    }

    // Divider 2
    const div2 = document.createElement('div');
    div2.className = 'card-col-divider';

    // Col: Output
    const colOutput = document.createElement('div');
    colOutput.className = 'card-col';
    colOutput.innerHTML = `<div class="col-label">Output</div>`;
    colOutput.appendChild(buildImageBlock(item.outputs, outputOffset, 'OUTPUT'));

    body.appendChild(colInput);
    body.appendChild(div1);
    body.appendChild(colPrompt);
    body.appendChild(div2);
    body.appendChild(colOutput);

    card.appendChild(header);
    card.appendChild(body);
    return card;
  }

  // ── Build image block (single or carousel) ─
  function buildImageBlock(srcs, globalOffset, label) {
    if (srcs.length > 1) {
      return buildCarousel(srcs, globalOffset, label);
    }
    return buildSingleImage(srcs[0], globalOffset, label);
  }

  function buildSingleImage(src, globalIdx, label) {
    const wrap = document.createElement('div');
    wrap.className = 'img-thumb-wrap loading';

    const img = document.createElement('img');
    img.alt = label;
    img.dataset.src = src;
    img.dataset.index = globalIdx;

    const overlay = document.createElement('div');
    overlay.className = 'img-overlay';
    overlay.innerHTML = `
      <span class="img-overlay-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
        </svg>
      </span>
    `;

    img.addEventListener('load', () => {
      wrap.classList.remove('loading');
      wrap.classList.add('loaded');
    });
    wrap.addEventListener('click', () => openLightbox(globalIdx));

    wrap.appendChild(img);
    wrap.appendChild(overlay);
    return wrap;
  }

  function buildCarousel(srcs, globalOffset, label) {
    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    const slidesWrap = document.createElement('div');
    slidesWrap.className = 'carousel-slides';

    let currentIndex = 0;

    // Build slides — first is active (normal flow), rest hidden (absolute)
    const slideEls = srcs.map((src, localIdx) => {
      const globalIdx = globalOffset + localIdx;
      const slide = document.createElement('div');
      slide.className = 'carousel-slide' + (localIdx > 0 ? ' hidden' : '');
      slide.appendChild(buildSingleImage(src, globalIdx, `${label} ${localIdx + 1}`));
      slidesWrap.appendChild(slide);
      return slide;
    });

    // Nav buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-prev';
    prevBtn.setAttribute('aria-label', '上一張');
    prevBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`;
    prevBtn.disabled = true;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-next';
    nextBtn.setAttribute('aria-label', '下一張');
    nextBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;

    // Dots
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'carousel-dots';
    const dotEls = srcs.map((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      return dot;
    });
    dotEls.forEach(d => dotsWrap.appendChild(d));

    const goTo = (idx) => {
      slideEls[currentIndex].classList.add('hidden');
      slideEls[idx].classList.remove('hidden');
      currentIndex = idx;
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === srcs.length - 1;
      dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex + 1); });
    dotEls.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    // Touch swipe
    let touchStartX = 0;
    slidesWrap.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    slidesWrap.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        const next = currentIndex + (dx < 0 ? 1 : -1);
        if (next >= 0 && next < srcs.length) goTo(next);
      }
    }, { passive: true });

    // Mouse drag
    let dragStartX = 0;
    let isDragging = false;
    slidesWrap.addEventListener('mousedown', e => {
      dragStartX = e.clientX;
      isDragging = true;
    });
    slidesWrap.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 40) {
        const next = currentIndex + (dx < 0 ? 1 : -1);
        if (next >= 0 && next < srcs.length) goTo(next);
      }
    });
    slidesWrap.addEventListener('mouseleave', () => { isDragging = false; });
    slidesWrap.style.cursor = 'grab';

    carousel.appendChild(slidesWrap);
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);
    carousel.appendChild(dotsWrap);

    return carousel;
  }

  // ── Intersection Observer: card reveal ────
  function observeCards() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.card').forEach(card => io.observe(card));
  }

  // ── Intersection Observer: lazy images ────
  function observeLazyImages() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }
          io.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));
  }

  // ── Lightbox ──────────────────────────────
  function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox(true);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightbox(instant) {
    const item = allImages[lightboxIndex];
    if (!item) return;

    if (instant) {
      lbImg.src = item.src;
    } else {
      lbImg.classList.add('fade');
      setTimeout(() => {
        lbImg.src = item.src;
        lbImg.classList.remove('fade');
      }, 150);
    }

    lbLabel.textContent = item.label;
    lbCounter.textContent = `${lightboxIndex + 1} / ${allImages.length}`;
    lbPrev.disabled = lightboxIndex === 0;
    lbNext.disabled = lightboxIndex === allImages.length - 1;
  }

  function navigate(dir) {
    const next = lightboxIndex + dir;
    if (next < 0 || next >= allImages.length) return;
    lightboxIndex = next;
    updateLightbox(false);
  }

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')       closeLightbox();
    if (e.key === 'ArrowLeft')    navigate(-1);
    if (e.key === 'ArrowRight')   navigate(1);
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ── Sync prompt col height to image columns ─
  // Sets explicit height on the flex container so flex:1 + min-height:0
  // properly constrains the scroll wrap and enables the scrollbar.
  function syncPromptHeights() {
    document.querySelectorAll('.card').forEach(card => {
      const cols = card.querySelectorAll('.card-col');
      if (cols.length < 3) return;

      const inputCol  = cols[0];
      const promptCol = cols[1];
      const outputCol = cols[2];

      const update = () => {
        const imgH = Math.max(inputCol.offsetHeight, outputCol.offsetHeight);
        // Only constrain once images have loaded (column taller than just the label)
        if (imgH < 160) {
          promptCol.style.height = '';
          return;
        }
        promptCol.style.height = imgH + 'px';
      };

      const ro = new ResizeObserver(update);
      ro.observe(inputCol);
      ro.observe(outputCol);

      card.querySelectorAll('img').forEach(img => {
        if (!img.complete) img.addEventListener('load', update, { once: true });
      });

      update();
    });
  }

  // ── Filter bar ───────────────────────────
  function buildFilterBar() {
    const existing = document.getElementById('filterBar');
    if (existing) existing.remove();

    const tags = ['全部', ...Array.from(
      new Set(portfolioData.flatMap(item => item.tags || []))
    )];

    const bar = document.createElement('div');
    bar.id = 'filterBar';
    bar.className = 'filter-bar';

    let activeTag = '全部';

    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (tag === '全部' ? ' active' : '');
      btn.textContent = tag;
      btn.addEventListener('click', () => {
        activeTag = tag;
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.textContent === activeTag));
        filterCards(activeTag);
      });
      bar.appendChild(btn);
    });

    gallery.parentNode.insertBefore(bar, gallery);
  }

  function filterCards(tag) {
    document.querySelectorAll('.card').forEach((card, i) => {
      const item = portfolioData[i];
      const show = tag === '全部' || (item && item.tags && item.tags.includes(tag));
      card.classList.toggle('filtered-out', !show);
    });
  }

  // ── Util ──────────────────────────────────
  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Init ──────────────────────────────────
  render();
  buildFilterBar();
  requestAnimationFrame(() => requestAnimationFrame(syncPromptHeights));

})();
