// ===== SOUTH INDIA TOURISM — MAIN JS =====

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollReveal();
  initBackToTop();
  initSearch();
  initFilters();
  initMapModals();
  initNavbarScroll();
  initCounterAnimation();
});

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(toggle, saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(toggle, next);
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SEARCH =====
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.place-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.getAttribute('data-name') || '';
      const category = card.getAttribute('data-category') || '';
      const desc = card.querySelector('.place-card-desc')?.textContent || '';
      const match = title.toLowerCase().includes(query) ||
                    category.toLowerCase().includes(query) ||
                    desc.toLowerCase().includes(query);

      const col = card.closest('.col-md-6, .col-lg-4');
      if (col) {
        col.style.display = match ? '' : 'none';
      }
      if (match) visibleCount++;
    });

    if (noResults) {
      noResults.classList.toggle('show', visibleCount === 0 && query.length > 0);
    }
  });
}

// ===== FILTERS =====
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.place-card');
      const noResults = document.getElementById('noResults');
      let visibleCount = 0;

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        const match = category === 'all' || cardCat.toLowerCase() === category.toLowerCase();

        const col = card.closest('.col-md-6, .col-lg-4');
        if (col) {
          col.style.display = match ? '' : 'none';
          if (match) {
            // Re-trigger reveal animation
            card.classList.remove('revealed');
            setTimeout(() => card.classList.add('revealed'), 50);
          }
        }
        if (match) visibleCount++;
      });

      // Clear search
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = '';

      if (noResults) {
        noResults.classList.toggle('show', visibleCount === 0);
      }
    });
  });
}

// ===== MAP MODALS =====
function initMapModals() {
  const mapBtns = document.querySelectorAll('[data-map-lat]');
  if (!mapBtns.length) return;

  mapBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lat = btn.getAttribute('data-map-lat');
      const lng = btn.getAttribute('data-map-lng');
      const name = btn.getAttribute('data-map-name');

      const modalTitle = document.getElementById('mapModalLabel');
      const mapFrame = document.getElementById('mapFrame');
      const directionsLink = document.getElementById('directionsLink');

      if (modalTitle) modalTitle.textContent = name;
      if (mapFrame) {
        mapFrame.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${lat},${lng}!5e0!3m2!1sen!2sin!4v1`;
      }
      if (directionsLink) {
        directionsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      }

      const modal = new bootstrap.Modal(document.getElementById('mapModal'));
      modal.show();
    });
  });

  // Clear iframe on modal close
  const mapModal = document.getElementById('mapModal');
  if (mapModal) {
    mapModal.addEventListener('hidden.bs.modal', () => {
      const mapFrame = document.getElementById('mapFrame');
      if (mapFrame) mapFrame.src = '';
    });
  }
}

// ===== NAVBAR SCROLL =====
function initNavbarScroll() {
  const navbar = document.querySelector('.custom-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.padding = '6px 0';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.padding = '12px 0';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix) {
  let current = 0;
  const increment = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 25);
}
