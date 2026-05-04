/* ============================================================
   Portfolio — script.js
   Scroll reveals, sticky nav, mobile menu
   ============================================================ */

/* --- Fit hero title to full container width -------------- */
function fitHeroTitle() {
  const title = document.querySelector('.hero-title');
  if (!title) return;
  // Let CSS handle sizing on mobile
  if (window.innerWidth <= 768) {
    title.style.fontSize = '';
    return;
  }
  const container = title.closest('.container') || title.parentElement;
  const pl = parseFloat(getComputedStyle(container).paddingLeft) || 0;
  const pr = parseFloat(getComputedStyle(container).paddingRight) || 0;
  const containerWidth = container.clientWidth - pl - pr;
  if (containerWidth <= 0) return;
  const spans = title.querySelectorAll('span');
  title.style.fontSize = '1rem';
  let low = 1, high = 300, mid;
  for (let i = 0; i < 20; i++) {
    mid = (low + high) / 2;
    title.style.fontSize = mid + 'rem';
    const maxSpanWidth = Math.max(...Array.from(spans.length ? spans : [title]).map(el => el.scrollWidth));
    if (maxSpanWidth <= containerWidth) low = mid;
    else high = mid;
  }
  title.style.fontSize = low + 'rem';
}

window.addEventListener('resize', fitHeroTitle);
document.fonts.ready.then(fitHeroTitle);

document.addEventListener('DOMContentLoaded', () => {
  fitHeroTitle();

  /* --- Sticky nav — hide on scroll down, show on scroll up -- */
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const scrollingDown = currentY > lastScrollY;

    // Always show at top of page
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

  /* --- Intersection Observer for reveal -------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* --- Smooth active nav link highlight -------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* --- Scroll hint fade ------------------------------------ */
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      scrollHint.style.opacity = window.scrollY > 60 ? '0' : '1';
    }, { passive: true });
  }

  /* --- See more / less toggle ------------------------------ */
  const seeMoreBtn   = document.getElementById('seeMoreBtn');
  const moreBrands   = document.getElementById('moreBrands');

  if (seeMoreBtn && moreBrands) {
    seeMoreBtn.addEventListener('click', () => {
      const expanded = moreBrands.classList.toggle('expanded');
      seeMoreBtn.setAttribute('aria-expanded', expanded);
      seeMoreBtn.childNodes[0].textContent = expanded ? 'See less ' : 'See more ';
    });
  }

});
