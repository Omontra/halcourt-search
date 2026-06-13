/* Taylor Made Salcombe — Concept B — Cinematic Dark
   Minimal vanilla JS: nav scroll state, mobile menu, save toggles, search demo. */
(function () {
  "use strict";

  /* --- Nav: solidify on scroll --- */
  var nav = document.getElementById("nav");
  function setNavState() {
    nav.dataset.state = window.scrollY > 40 ? "scrolled" : "top";
  }
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });

  /* --- Mobile menu toggle --- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });
    // close on link tap
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      });
    });
  }

  /* --- Save / heart toggles --- */
  document.querySelectorAll(".save").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!on));
    });
  });

  /* --- Search: demo handler (no backend) --- */
  var search = document.getElementById("search");
  if (search) {
    search.addEventListener("submit", function (e) {
      e.preventDefault();
      var stays = document.getElementById("stays");
      if (stays) stays.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* --- Newsletter: prevent reload for the demo --- */
  document.querySelectorAll(".newsletter").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type=email]");
      if (input && input.value) {
        form.innerHTML = '<p style="color:var(--gold-soft);font-size:14px;margin:0;">Thank you — you’re on the list.</p>';
      }
    });
  });
})();
