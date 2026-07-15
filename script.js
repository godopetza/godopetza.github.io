document.addEventListener("DOMContentLoaded", function () {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.querySelector("nav ul");

  function setNavOpen(open) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navMenu.classList.toggle("open", open);
  }

  navToggle?.addEventListener("click", function () {
    setNavOpen(this.getAttribute("aria-expanded") !== "true");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  document.addEventListener("click", function (e) {
    const insideNav = e.target.closest("nav");
    if (navToggle?.getAttribute("aria-expanded") === "true" && !insideNav) {
      setNavOpen(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  // Sticky header + back-to-top
  const header = document.querySelector("header");
  const scrollTop = document.querySelector(".scroll-top");

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("sticky", y > 60);
    if (scrollTop) scrollTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active nav link based on section in view
  const sections = document.querySelectorAll("main section[id]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id
            )
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  // Scroll reveal
  const revealTargets = document.querySelectorAll(
    ".section-header, .feature-card, .project-card, .about-text, .about-facts, .stack-group, .service-card, .contact-info, .contact-form, .hero-text, .hero-image"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".projects-grid .project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");
      const filter = this.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.style.display = show ? "flex" : "none";
      });
    });
  });
});
