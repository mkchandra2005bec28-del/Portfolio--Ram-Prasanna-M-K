
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // 1. Light / dark theme
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.setAttribute('data-theme', savedTheme);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  // 2. Mobile navigation menu
  const menu = document.getElementById('menu');
  const menuBtn = document.getElementById('menu-btn');

  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }

  // 3. Highlight the navigation link for the visible section
  if (menu && 'IntersectionObserver' in window) {
    const links = menu.querySelectorAll('a');
    const sections = document.querySelectorAll('main section[id]');

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            const isActive =
              link.getAttribute('href') === '#' + entry.target.id;

            link.classList.toggle('active', isActive);
          });
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px'
    });

    sections.forEach(section => navObserver.observe(section));
  }

  // 4. Reveal sections while scrolling
  const sectionsToReveal = document.querySelectorAll('.section');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    sectionsToReveal.forEach(section => {
      section.classList.add('reveal');
      revealObserver.observe(section);
    });
  } else {
    // Show all sections in browsers without IntersectionObserver
    sectionsToReveal.forEach(section => {
      section.classList.add('show');
    });
  }

  // 5. Automatically update the footer year
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
