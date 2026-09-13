/**
 * MAIN.JS
 * Renders content from services-data.js and projects-data.js, and wires
 * up navigation, the work filter, the project modal and small utilities.
 * No build step, no dependencies — safe to open straight in a browser.
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Hero entrance (single, one-time reveal)
     ------------------------------------------------------------------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    requestAnimationFrame(function () {
      hero.classList.add("is-ready");
    });
  }

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     ------------------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll-spy: highlight the current section in the nav
     ------------------------------------------------------------------- */
  var sections = ["about", "services", "work", "tools", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var navItems = document.querySelectorAll("[data-nav]");

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navItems.forEach(function (item) {
            item.classList.toggle("active", item.dataset.nav === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------------------
     Render: Services ledger
     ------------------------------------------------------------------- */
  var ledger = document.getElementById("ledger");
  if (ledger && typeof SERVICES !== "undefined") {
    var ledgerHTML = SERVICES.map(function (item, i) {
      var num = String(i + 1).padStart(2, "0");
      return (
        '<div class="ledger-row" role="listitem">' +
          '<span class="ledger-num">' + num + "</span>" +
          '<div class="ledger-content">' +
            "<h3>" + escapeHTML(item.title) + "</h3>" +
            "<p>" + escapeHTML(item.description) + "</p>" +
          "</div>" +
        "</div>"
      );
    }).join("");
    ledger.innerHTML = ledgerHTML;
  }

  /* ---------------------------------------------------------------------
     Render: Work filter chips + gallery cards
     ------------------------------------------------------------------- */
  var filterRow = document.getElementById("filterRow");
  var workGrid = document.getElementById("workGrid");
  var activeFilter = "All";

  function getCategories() {
    var cats = ["All"];
    PROJECTS.forEach(function (p) {
      if (cats.indexOf(p.category) === -1) cats.push(p.category);
    });
    return cats;
  }

  function renderFilters() {
    if (!filterRow) return;
    var cats = getCategories();
    filterRow.innerHTML = cats.map(function (cat) {
      var pressed = cat === activeFilter ? "true" : "false";
      return '<button class="filter-chip" data-filter="' + escapeHTML(cat) + '" aria-pressed="' + pressed + '">' + escapeHTML(cat) + "</button>";
    }).join("");

    filterRow.querySelectorAll(".filter-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.dataset.filter;
        filterRow.querySelectorAll(".filter-chip").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        applyFilter();
      });
    });
  }

  function applyFilter() {
    if (!workGrid) return;
    workGrid.querySelectorAll(".work-card").forEach(function (card) {
      var match = activeFilter === "All" || card.dataset.category === activeFilter;
      card.classList.toggle("is-hidden", !match);
    });
  }

  function renderWorkGrid() {
    if (!workGrid || typeof PROJECTS === "undefined") return;
    workGrid.innerHTML = PROJECTS.map(function (p, i) {
      return (
        '<button class="work-card" data-index="' + i + '" data-category="' + escapeHTML(p.category) + '">' +
          '<span class="work-card-media"><img src="' + p.image + '" alt="' + escapeHTML(p.title) + '" loading="lazy"></span>' +
          '<span class="work-card-body">' +
            '<span class="work-card-tag">' + escapeHTML(p.category) + "</span>" +
            "<h3>" + escapeHTML(p.title) + "</h3>" +
            "<p>" + escapeHTML(p.summary) + "</p>" +
          "</span>" +
        "</button>"
      );
    }).join("");

    workGrid.querySelectorAll(".work-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openModal(parseInt(card.dataset.index, 10));
      });
    });
  }

  renderFilters();
  renderWorkGrid();

  /* ---------------------------------------------------------------------
     Project modal
     ------------------------------------------------------------------- */
  var modal = document.getElementById("projectModal");
  var modalImage = document.getElementById("modalImage");
  var modalCategory = document.getElementById("modalCategory");
  var modalTitle = document.getElementById("modalTitle");
  var modalDescription = document.getElementById("modalDescription");
  var modalTags = document.getElementById("modalTags");
  var modalClose = document.getElementById("modalClose");
  var modalBackdrop = document.getElementById("modalBackdrop");
  var modalPrev = document.getElementById("modalPrev");
  var modalNext = document.getElementById("modalNext");

  var currentIndex = 0;
  var lastFocusedEl = null;

  function fillModal(index) {
    var p = PROJECTS[index];
    if (!p) return;
    modalImage.src = p.image;
    modalImage.alt = p.title;
    modalCategory.textContent = p.category;
    modalTitle.textContent = p.title;
    modalDescription.textContent = p.description;
    modalTags.innerHTML = p.tools.map(function (t) {
      return '<span class="chip">' + escapeHTML(t) + "</span>";
    }).join("");
  }

  function openModal(index) {
    currentIndex = index;
    lastFocusedEl = document.activeElement;
    fillModal(currentIndex);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + PROJECTS.length) % PROJECTS.length;
    fillModal(currentIndex);
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  }

  if (modal) {
    modalClose.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);
    modalPrev.addEventListener("click", function () { step(-1); });
    modalNext.addEventListener("click", function () { step(1); });
  }

  /* ---------------------------------------------------------------------
     Copy-to-clipboard for email / phone
     ------------------------------------------------------------------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.dataset.copy;
      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(function () { fallbackCopy(value, done); });
      } else {
        fallbackCopy(value, done);
      }
    });
  });

  function fallbackCopy(text, done) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* no-op */ }
    document.body.removeChild(textarea);
  }

  /* ---------------------------------------------------------------------
     Utility
     ------------------------------------------------------------------- */
  function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  }
})();
