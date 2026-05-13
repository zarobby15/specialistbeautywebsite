/* ─────────────────────────────────────────
   ZAROBBY — script.js · 2026 (Revised)
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── REVEAL ON SCROLL ── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if parent has .reveal
        const delay = parseFloat(entry.target.style.animationDelay || entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 1000);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  /* ── STICKY WA BUTTON SHOW/HIDE ── */
  const stickyWa = document.getElementById('stickyWa');
  stickyWa.style.opacity = '0';
  stickyWa.style.transform = 'scale(.8)';
  stickyWa.style.transition = 'opacity .35s ease, transform .35s ease';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      stickyWa.style.opacity = '1';
      stickyWa.style.transform = 'scale(1)';
    } else {
      stickyWa.style.opacity = '0';
      stickyWa.style.transform = 'scale(.8)';
    }
  }, { passive: true });

  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── HERO STAGGER ANIMATION on load ── */
  const heroLeft = document.querySelector('.hero-left.reveal');
  const heroRight = document.querySelector('.hero-right.reveal');
  setTimeout(() => {
    if (heroLeft) heroLeft.classList.add('visible');
  }, 100);
  setTimeout(() => {
    if (heroRight) heroRight.classList.add('visible');
  }, 350);

  /* ── STATS COUNTER ANIMATION ── */
  const statNums = document.querySelectorAll('.stat-num:not(.stat-free)');

  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/\d+/);
        if (match) {
          const target = parseInt(match[0]);
          const prefix = text.slice(0, text.indexOf(match[0]));
          const suffix = text.slice(text.indexOf(match[0]) + match[0].length);
          let start = 0;
          const duration = 1200;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = prefix + Math.floor(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
        statObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObs.observe(el));

  /* ── LAZY IFRAME LOADING ── */
  const iframes = document.querySelectorAll('iframe[loading="lazy"]');
  const iframeObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        if (!iframe.dataset.loaded) {
          iframe.dataset.loaded = 'true';
          iframeObs.unobserve(iframe);
        }
      }
    });
  }, { rootMargin: '200px' });

  iframes.forEach(iframe => iframeObs.observe(iframe));

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activeSectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href === `#${id}`) {
            link.style.color = 'var(--black)';
          } else if (!link.classList.contains('nav-cta')) {
            link.style.color = '';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => activeSectionObs.observe(section));

  /* ── WA BUTTON micro-bounce on hover ── */
  document.querySelectorAll('.btn-wa, .btn-price-wa').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'all .3s cubic-bezier(.34,1.56,.64,1)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'all .35s cubic-bezier(.25,.46,.45,.94)';
    });
  });

  /* ── PORTFOLIO CARD tilt effect (subtle, desktop only) ── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .5s ease, box-shadow .5s ease';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform .1s ease, box-shadow .3s ease';
      });
    });
  }

  /* ── WHY ITEMS stagger ── */
  const whyItems = document.querySelectorAll('.why-item');
  const whyObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(whyItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 60);
        whyObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  whyItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    whyObs.observe(el);
  });

  /* ── PROCESS STEPS stagger ── */
  const processSteps = document.querySelectorAll('.process-step-mini');
  const processObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(processSteps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        processObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  processSteps.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-12px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    processObs.observe(el);
  });

  /* ── PORT CATEGORY stagger ── */
  const portCats = document.querySelectorAll('.port-category');
  const portCatObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        portCatObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  portCats.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .65s ease, transform .65s ease';
    portCatObs.observe(el);
  });

});
