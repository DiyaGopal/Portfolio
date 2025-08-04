// Portfolio Website JavaScript

// DOM elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const scrollUp = document.getElementById('scroll-up');
const contactForm = document.getElementById('contact-form');
const loading = document.getElementById('loading');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => loading?.classList?.add('hidden'), 800);
  initScrollAnimations();
  initCounters();
  initSkillsAnimation();
});

// Nav menu toggle
navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

// Close nav menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

// Scroll Effects
window.addEventListener('scroll', () => {
  header.classList.toggle('blur-header', window.scrollY >= 50);
  scrollUp.classList.toggle('show-scroll', window.scrollY >= 350);

  const current = getCurrentSection();
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Get current section on scroll
function getCurrentSection() {
  let current = 'home';
  sections.forEach(section => {
    const top = section.offsetTop;
    if (scrollY >= top - 60) current = section.id;
  });
  return current;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact Form Submit
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value,
    };

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    try {
      // Uncomment and change URL if backend exists
      const res = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      });

      await new Promise(resolve => setTimeout(resolve, 1500)); // simulate delay
      alert("Message sent successfully!");
      this.reset();
    } catch (err) {
      alert("Failed to send message.");
    }

    submitBtn.innerHTML = '<span>Send Message</span>';
    submitBtn.disabled = false;
  });
}

// Scroll animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Skill bar animation
function initSkillsAnimation() {
  const section = document.querySelector('.about__skills');
  if (!section) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.skills__percentage').forEach(bar => bar.classList.add('animate'));
      observer.unobserve(section);
    }
  }, { threshold: 0.5 });

  observer.observe(section);
}

// Animated counters (if used)
function initCounters() {
  const counters = document.querySelectorAll('.about__number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const end = parseInt(counter.dataset.target || "0");
        let count = 0;
        const step = Math.ceil(end / 100);

        const update = () => {
          count += step;
          if (count < end) {
            counter.textContent = count;
            setTimeout(update, 20);
          } else {
            counter.textContent = end;
          }
        };
        update();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('selected-theme', getCurrentTheme());
}
function getCurrentTheme() {
  return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
}
const savedTheme = localStorage.getItem('selected-theme');
if (savedTheme) document.body.classList[savedTheme === 'dark' ? 'add' : 'remove']('dark-theme');

// Image error fallback
document.addEventListener('error', e => {
  if (e.target.tagName === 'IMG') {
    e.target.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
  }
}, true);

console.log("Portfolio loaded.");
