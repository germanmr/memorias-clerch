(function () {
  const NAV_ORDER = [
    'intro', 'genealogia', 'arbol', 'das', 'infancia', 'escuela', 'barcelona', 'argentina',
    'antillas', 'familia-espana', 'tito', 'salvador', 'maria', 'rosita', 'dolores',
    'francisco', 'maria-hermana', 'globo', 'fotos', 'nota-1957', 'originales'
  ];

  const SECTION_FIGURES = {
    genealogia: { src: 'diario-esteban-pages/page_004.png', alt: 'Ascendencia Clerch' },
    das: { src: 'diario-esteban-pages/page_006.png', alt: 'Das' },
    escuela: { src: 'diario-esteban-pages/page_010.png', alt: 'Escola de Das' },
    antillas: { src: 'diario-esteban-pages/page_045.png', alt: 'Les Antilles' },
    tito: { src: 'diario-esteban-pages/page_026.png', alt: 'Tito' },
    salvador: { src: 'diario-esteban-pages/page_027.png', alt: 'Salvador' },
    dolores: { src: 'diario-esteban-pages/page_033.png', alt: 'Dolores' },
    globo: { src: 'diario-esteban-pages/page_048.png', alt: 'Bar El Globo' },
    fotos: { src: 'diario-esteban-pages/page_017.png', alt: 'Fotografies' }
  };

  const CONTENT_SECTIONS = NAV_ORDER.filter(id => id !== 'intro');

  let currentLang = localStorage.getItem('memorias-lang') || 'es';

  function t(lang) {
    return window.MEMORIAS_I18N[lang];
  }

  function buildNav(lang) {
    const data = t(lang);
    const container = document.getElementById('nav-links');
    container.innerHTML = '';
    NAV_ORDER.forEach(id => {
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = data.nav[id];
      a.dataset.section = id;
      container.appendChild(a);
    });
  }

  function buildSections(lang) {
    const data = t(lang);
    const root = document.getElementById('sections-root');
    root.innerHTML = '';

    CONTENT_SECTIONS.forEach(id => {
      const sec = data.sections[id];
      if (!sec) return;

      const section = document.createElement('section');
      section.id = id;

      const h2 = document.createElement('h2');
      h2.textContent = sec.title;
      section.appendChild(h2);

      if (sec.lead) {
        const lead = document.createElement('p');
        lead.className = 'lead';
        lead.textContent = sec.lead;
        section.appendChild(lead);
      }

      if (sec.isTree && window.renderGenealogyTree) {
        const treeHost = document.createElement('div');
        treeHost.className = 'tree-root';
        section.appendChild(treeHost);
        window.renderGenealogyTree(lang, treeHost);
      } else if (sec.body) {
        const bodyWrap = document.createElement('div');
        bodyWrap.innerHTML = sec.body;
        while (bodyWrap.firstChild) section.appendChild(bodyWrap.firstChild);
      }

      if (sec.note) {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = sec.note;
        section.appendChild(note);
      }

      if (SECTION_FIGURES[id]) {
        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = SECTION_FIGURES[id].src;
        img.alt = SECTION_FIGURES[id].alt;
        img.loading = 'lazy';
        img.addEventListener('click', () => openModal(img.src));
        const cap = document.createElement('figcaption');
        cap.textContent = sec.fig || '';
        fig.appendChild(img);
        fig.appendChild(cap);
        section.appendChild(fig);
      }

      if (id === 'originales') {
        const gallery = document.createElement('div');
        gallery.className = 'gallery';
        gallery.id = 'gallery';
        for (let i = 1; i <= 52; i++) {
          const n = String(i).padStart(3, '0');
          const a = document.createElement('a');
          const src = `diario-esteban-pages/page_${n}.png`;
          a.href = src;
          a.title = `${data.pageWord} ${i}`;
          a.innerHTML = `<img src="${src}" alt="${data.pageWord} ${i}" loading="lazy">`;
          a.addEventListener('click', e => { e.preventDefault(); openModal(src); });
          gallery.appendChild(a);
        }
        section.appendChild(gallery);
      }

      root.appendChild(section);
    });
  }

  function applyLang(lang) {
    if (!window.MEMORIAS_I18N || !window.MEMORIAS_I18N[lang]) lang = 'es';
    currentLang = lang;
    localStorage.setItem('memorias-lang', lang);

    const data = t(lang);
    document.documentElement.lang = lang === 'ca' ? 'ca' : 'es';
    document.title = data.title;

    document.getElementById('lang-label').textContent = lang === 'ca' ? 'Idioma' : 'Idioma';
    document.getElementById('nav-index').textContent = data.navIndex;
    document.getElementById('intro-eyebrow').textContent = data.intro.eyebrow;
    document.getElementById('intro-h1').textContent = data.intro.h1;
    document.getElementById('intro-subtitle').textContent = data.intro.subtitle;
    document.getElementById('intro-meta').textContent = data.intro.meta;

    const footer = document.getElementById('site-footer');
    footer.innerHTML = `<p>${data.footer1}</p><p style="margin-top:0.5rem">${data.footer2}</p>`;

    document.getElementById('modal-close').setAttribute('aria-label', data.modalClose);

    buildNav(lang);
    buildSections(lang);

    document.querySelectorAll('.lang-bar button').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    initScrollSpy();
  }

  const modal = document.getElementById('modal');
  const modalImg = modal.querySelector('img');

  function openModal(src) {
    modalImg.src = src;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.getElementById('modal-close').onclick = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  modal.onclick = e => { if (e.target === modal) document.getElementById('modal-close').click(); };

  let scrollSpyHandler = null;

  function initScrollSpy() {
    if (scrollSpyHandler) window.removeEventListener('scroll', scrollSpyHandler);
    const sections = document.querySelectorAll('section[id], header#intro');
    scrollSpyHandler = () => {
      let current = 'intro';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      document.querySelectorAll('#nav-links a').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    };
    window.addEventListener('scroll', scrollSpyHandler);
    scrollSpyHandler();
  }

  document.querySelectorAll('.lang-bar button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  applyLang(currentLang);
})();
