/* Concept C — Light & Airy Modern
   Minimal vanilla JS: mobile menu toggle, save/heart toggle, search demo. */
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });

    // Close after choosing a link
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      });
    });
  }

  /* ---- Save / heart toggle ---- */
  document.querySelectorAll(".heart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var saved = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!saved));
    });
  });

  /* ---- Search (demo only) ---- */
  var search = document.getElementById("search");
  if (search) {
    // keep depart on/after arrive
    var arrive = document.getElementById("arrive");
    var depart = document.getElementById("depart");
    if (arrive && depart) {
      arrive.addEventListener("change", function () {
        if (arrive.value) depart.min = arrive.value;
      });
    }
    search.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = search.querySelector(".search__submit span");
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = "Searching…";
        setTimeout(function () { btn.textContent = orig; }, 1400);
      }
    });
  }
})();
