/* ============================================================
   NIKITHA YEDUGANI — PORTFOLIO SCRIPTS
   script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── THEME TOGGLE ─────────────────────────────────────────── */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
  const progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ── NAVBAR SCROLL EFFECT ────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Active link
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ── HAMBURGER MENU ──────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* ── TYPING ANIMATION ────────────────────────────────────── */
  const phrases = [
    'Business Analyst',
    'Data Storyteller',
    'Power BI Developer',
    'Requirements Engineer',
    'Process Improvement Specialist',
    'Strategic Insights Analyst',
  ];

  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTimer = null;

    function type() {
      const phrase = phrases[phraseIdx];
      if (deleting) {
        charIdx--;
        typingEl.textContent = phrase.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          pauseTimer = setTimeout(type, 500);
          return;
        }
        pauseTimer = setTimeout(type, 40);
      } else {
        charIdx++;
        typingEl.textContent = phrase.slice(0, charIdx);
        if (charIdx === phrase.length) {
          deleting = true;
          pauseTimer = setTimeout(type, 1800);
          return;
        }
        pauseTimer = setTimeout(type, 80);
      }
    }

    setTimeout(type, 1000);
  }

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── ANIMATED COUNTERS ───────────────────────────────────── */
  const statItems = document.querySelectorAll('.stat-item');
  let countersStarted = false;

  function animateCounter(counterEl, target, duration = 1800) {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      counterEl.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else counterEl.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          statItems.forEach(item => {
            const target = parseInt(item.dataset.target, 10);
            const counterEl = item.querySelector('.counter');
            if (counterEl && !isNaN(target)) {
              animateCounter(counterEl, target);
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  const statsBanner = document.getElementById('stats');
  if (statsBanner) statsObserver.observe(statsBanner);

  /* ── SKILL BAR ANIMATION ─────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar-item');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.sb-fill');
          const pct = entry.target.dataset.pct;
          if (fill && pct) {
            setTimeout(() => { fill.style.width = pct + '%'; }, 150);
          }
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ── CONTACT FORM ────────────────────────────────────────── */
  window.handleSubmit = function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const success = document.getElementById('cfSuccess');
    btn.innerHTML = '<span>Sending…</span>';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
      btn.style.display = 'none';
      success.style.display = 'block';
      e.target.reset();
    }, 1400);
  };

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── SCROLL EVENT LISTENER ───────────────────────────────── */
  window.addEventListener('scroll', () => {
    updateProgress();
    updateNav();
  }, { passive: true });

  // Initial call
  updateProgress();
  updateNav();

  /* ── PROJECT CARD TILT EFFECT ─────────────────────────────  */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s, border-color 0.3s';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s, box-shadow 0.3s, border-color 0.3s';
    });
  });

})();
