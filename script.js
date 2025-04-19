document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (cursor && cursorFollower) {
    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      setTimeout(function () {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 100);
    });
  }

  // Mobile navigation handling
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.querySelector("nav ul");

  // Add staggered animation delay to nav items
  navLinks.forEach((link, index) => {
    link.parentElement.style.setProperty("--i", index);

    // Close menu when clicking a link
    link.addEventListener("click", function () {
      if (navToggle) {
        navToggle.checked = false;
        navMenu.classList.remove("active");
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    const isClickInsideNav = e.target.closest("nav");
    const isToggleLabel = e.target.closest(".nav-toggle-label");

    if (navToggle && navToggle.checked && !isClickInsideNav && !isToggleLabel) {
      navToggle.checked = false;
      navMenu.classList.remove("active");
    }
  });

  // Sticky header
  const header = document.querySelector("header");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
      if (scrollIndicator) scrollIndicator.style.opacity = "0";
    } else {
      header.classList.remove("sticky");
      if (scrollIndicator) scrollIndicator.style.opacity = "0.7";
    }
  });

  // Active nav links
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
