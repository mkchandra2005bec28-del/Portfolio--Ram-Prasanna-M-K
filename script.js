document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // 1. Light / dark theme (remembers the choice)
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  document.getElementById('theme-btn').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // 2. Mobile menu
  const menu = document.getElementById('menu');
  document.getElementById('menu-btn').addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // 3. Highlight the nav link of the section in view
  const links = menu.querySelectorAll('a');
  const sections = document.querySelectorAll('main section[id]');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // 4. Fade sections in once as they scroll into view
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section').forEach(s => { s.classList.add('reveal'); reveal.observe(s); });

  // 5. Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
