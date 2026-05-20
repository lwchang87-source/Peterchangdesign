/* ============================================================
   Portfolio — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky nav — hide on scroll down, show on scroll up -- */
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const scrollingDown = currentY > lastScrollY;

    if (currentY <= 20) {
      nav.classList.remove('scrolled', 'nav-hidden');
    } else if (scrollingDown) {
      nav.classList.add('nav-hidden');
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('nav-hidden');
      nav.classList.add('scrolled');
    }

    lastScrollY = currentY;
  }, { passive: true });

  /* --- Mobile nav toggle ----------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* --- Pair headings with their first sibling content ------- */
  // Heading waits; when first sibling content enters view both animate together
  const headingPairs   = new Map(); // firstContentReveal → heading
  const pairedHeadings = new Set();

  document.querySelectorAll('h2.reveal').forEach(heading => {
    let sibling = heading.nextElementSibling;
    while (sibling) {
      const target = sibling.classList.contains('reveal')
        ? sibling
        : sibling.querySelector('.reveal');
      if (target && !target.matches('h2')) {
        headingPairs.set(target, heading);
        pairedHeadings.add(heading);
        break;
      }
      sibling = sibling.nextElementSibling;
    }
  });

  /* --- Intersection Observer for reveal -------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Paired headings are held back until their content fires
      if (pairedHeadings.has(el)) {
        if (el.classList.contains('revealed')) observer.unobserve(el);
        return;
      }

      el.classList.add('revealed');
      observer.unobserve(el);

      // Reveal heading simultaneously with its content
      const heading = headingPairs.get(el);
      if (heading && !heading.classList.contains('revealed')) {
        heading.classList.add('revealed');
        observer.unobserve(heading);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -32px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* --- Row-staggered delays for project cards -------------- */
  function applyCardStagger(cards) {
    let rowTop = -1;
    let colIdx = 0;
    cards.forEach(card => {
      const top = card.offsetTop;
      if (Math.abs(top - rowTop) > 5) { rowTop = top; colIdx = 0; }
      card.style.transitionDelay = `${(colIdx * 0.12).toFixed(2)}s`;
      colIdx++;
    });
  }

  document.querySelectorAll('.cards-grid').forEach(grid => {
    const cards = Array.from(grid.querySelectorAll('.project-card.reveal'));
    applyCardStagger(cards);
  });

  /* --- Filter tabs ----------------------------------------- */
  const filterTabs   = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      // Re-animate visible cards
      const visible = Array.from(projectCards).filter(c => !c.classList.contains('hidden'));
      visible.forEach(card => card.classList.remove('revealed'));

      applyCardStagger(visible);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          visible.forEach(card => card.classList.add('revealed'));
        });
      });
    });
  });

  /* --- Hero 3D carousel — shuffle slide order on each load ----------- */
  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
    const slides = Array.from(heroCarousel.children);
    for (let i = slides.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      heroCarousel.appendChild(slides[j]);
      [slides[i], slides[j]] = [slides[j], slides[i]];
    }
  }

  /* --- Marquee: start only when scrolled into view --------- */
  const marquee = document.querySelector('.clients-marquee');
  if (marquee) {
    const marqueeObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        marquee.classList.add('playing');
        marqueeObserver.unobserve(marquee);
      }
    }, { threshold: 0.1 });
    marqueeObserver.observe(marquee);
  }

  /* --- Count-up animation for leadership metrics ----------- */
  function animateCount(el, target, duration) {
    const unit = el.querySelector('.metric-unit');
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      // Update only the text node, preserve the unit span
      if (unit) {
        el.firstChild.textContent = current;
      } else {
        el.textContent = current;
      }

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const metricsRow = document.querySelector('.metrics-row');
  if (metricsRow) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      counterObserver.unobserve(metricsRow);
      metricsRow.querySelectorAll('.metric-num[data-count]').forEach(el => {
        animateCount(el, parseInt(el.dataset.count, 10), 1400);
      });
    }, { threshold: 0.2 });
    counterObserver.observe(metricsRow);
  }

});
