// CUSTOM CURSOR
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let dotX = window.innerWidth/2, dotY = window.innerHeight/2;
let ringX = dotX, ringY = dotY;

document.addEventListener('mousemove', e => { dotX = e.clientX; dotY = e.clientY; });

(function loop() {
  ringX += (dotX - ringX) * 0.13;
  ringY += (dotY - ringY) * 0.13;
  cursorDot.style.left  = dotX + 'px';
  cursorDot.style.top   = dotY + 'px';
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .tilt-card, .service-card, .highlight-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// SCROLL PROGRESS
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// NAV SCROLL + ACTIVE SECTION
const mainNav  = document.getElementById('main-nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 130) current = sec.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
}, { passive: true });

// MOBILE MENU
const mobileBtn  = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// SCROLL REVEAL
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// HERO TITLE WORD-BY-WORD
const heroTitle = document.getElementById('hero-title');
if (heroTitle) {
  let delay = 100;
  const children = Array.from(heroTitle.childNodes);
  heroTitle.innerHTML = '';

  function makeWords(text, extraClass) {
    return text.trim().split(/\s+/).filter(Boolean).map(word => {
      const s = document.createElement('span');
      s.className = 'hero-word' + (extraClass ? ' ' + extraClass : '');
      s.textContent = word;
      s.style.animationDelay = delay + 'ms';
      delay += 65;
      return s;
    });
  }

  children.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      makeWords(node.textContent, '').forEach(s => {
        heroTitle.appendChild(s);
        heroTitle.appendChild(document.createTextNode(' '));
      });
    } else if (node.nodeName === 'SPAN') {
      const wrapper = document.createElement('span');
      wrapper.className = node.className;
      makeWords(node.textContent, '').forEach(s => {
        wrapper.appendChild(s);
        wrapper.appendChild(document.createTextNode(' '));
      });
      heroTitle.appendChild(wrapper);
    }
  });
}

// COUNTER ANIMATION
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(tick);
    }, 38);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-counter').forEach(el => counterObserver.observe(el));

// SKILLS WAVE
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.skill-tag').forEach((tag, i) => {
      setTimeout(() => tag.classList.add('revealed'), i * 80);
    });
    skillsObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });
const skillsContainer = document.getElementById('skills-container');
if (skillsContainer) skillsObserver.observe(skillsContainer);

// TIMELINE
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.timeline-line, .timeline-dot').forEach(el => el.classList.add('revealed'));
    timelineObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.timeline-entry').forEach(el => timelineObserver.observe(el));

// 3D TILT
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height/2) / r.height) * -8;
    const ry = ((e.clientX - r.left - r.width /2) / r.width)  *  8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// SPOTLIGHT GLOW
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.backgroundImage =
      `radial-gradient(circle 180px at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,0,128,0.05) 0%, transparent 80%)`;
  });
  card.addEventListener('mouseleave', () => { card.style.backgroundImage = ''; });
});

// MAGNETIC BUTTONS
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width /2) * 0.22;
    const y = (e.clientY - r.top  - r.height/2) * 0.22;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// HERO PARALLAX
const heroImgLayer = document.querySelector('.hero-img-layer');
if (heroImgLayer) {
  window.addEventListener('scroll', () => {
    heroImgLayer.style.transform = `translateY(${window.scrollY * 0.07}px)`;
  }, { passive: true });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
