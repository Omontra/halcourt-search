/* Concept A — Editorial Coastal | minimal vanilla JS
   - mobile menu toggle
   - sticky header scrolled state
   - heart / save toggle
   - gentle reveal-on-scroll (respects reduced motion)            */
(function () {
  "use strict";

  /* ---- mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.hidden = open;
    });
    // close when a link is tapped
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.hidden = true;
      }
    });
  }

  /* ---- sticky header scrolled state ---- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- save / heart toggle ---- */
  document.querySelectorAll(".heart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!on));
    });
  });

  /* ---- reveal on scroll ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".stays__rail .card, .concierge, .kitchen__inner, .story, .post, .list-cta__inner, .intro__statement"
  );
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("is-in"); });
    return;
  }
  targets.forEach(function (t, i) {
    t.classList.add("reveal");
    t.style.transitionDelay = (Math.min(i % 4, 3) * 70) + "ms";
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  targets.forEach(function (t) { io.observe(t); });
})();
