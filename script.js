document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. LIGHT / DARK THEME TOGGLE FUNCTIONALITY
  // ==========================================================================
  const themeToggleBtn = document.querySelector(".theme-toggle-btn") || document.getElementById("theme-toggle");

  // SVG Icons for Light/Dark Mode
  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  // Update Icon state
  const updateToggleIcon = (isLight) => {
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = isLight ? moonIcon : sunIcon;
    }
  };

  // Check initial theme state (Saved Preference or System Preference)
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const isInitiallyLight = savedTheme === "light" || (!savedTheme && prefersLight);

  if (isInitiallyLight) {
    document.body.classList.add("light-mode");
    document.documentElement.classList.add("light-mode");
    updateToggleIcon(true);
  } else {
    updateToggleIcon(false);
  }

  // Toggle Action Event Handler
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLightMode = document.body.classList.toggle("light-mode");
      document.documentElement.classList.toggle("light-mode", isLightMode);

      // Save user choice to LocalStorage
      localStorage.setItem("theme", isLightMode ? "light" : "dark");
      
      // Dynamic icon swap
      updateToggleIcon(isLightMode);
    });
  }

  // ==========================================================================
  // 2. DYNAMIC MOUSE LIGHTING EFFECT ON GLASS CARDS
  // ==========================================================================
  const glassCards = document.querySelectorAll(".glass-card");

  glassCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // ==========================================================================
  // 3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================================================
  // 4. ACTIVE NAVBAR LINK SWITCHING ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
});
