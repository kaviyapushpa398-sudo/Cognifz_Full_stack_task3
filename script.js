/* ================================================================
   script.js — Lumina Creative Agency
   ================================================================ */

/* ─── Custom Cursor ──────────────────────────────────────────── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  if (dot) {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  }
  // Ring lags slightly behind for a trailing effect
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ─── Navbar — Scroll State ──────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── Mobile Hamburger Menu ──────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  // Prevent body scroll when menu is open
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu when any mobile link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Scroll Reveal (IntersectionObserver) ───────────────────── */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // Animate once only
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ─── Contact Form Submission ────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn     = this.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');

    // Validate basic required fields
    const inputs = this.querySelectorAll('[required]');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'rgba(255,80,80,0.5)';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });
    if (!valid) return;

    // Simulate async submit
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      this.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      success.style.display = 'block';

      // Auto-hide success message after 5s
      setTimeout(() => {
        success.style.display = 'none';
      }, 5000);
    }, 1400);
  });
}

/* ─── Smooth Scroll for All Anchor Links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href   = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ─── Active Nav Link on Scroll ──────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.lm-nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
