/* ============================================
   Kristen McKelvie Photography
   Shared JavaScript
   ============================================ */

/* Mark that JS is active — enables fade-up animations.
   Without JS, content stays visible (no .js-anim class). */
document.documentElement.classList.add("js-anim");

document.addEventListener("DOMContentLoaded", function () {

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("navLinks");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Fade-up on scroll ---- */
  var faders = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    faders.forEach(function (el) { io.observe(el); });

    /* Safety net: anything already in view (or above the fold)
       on load gets revealed immediately. */
    window.addEventListener("load", function () {
      faders.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) { el.classList.add("in"); }
      });
    });
  } else {
    faders.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- FAQ accordion ---- */
  var faqButtons = document.querySelectorAll(".faq-q");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = btn.nextElementSibling;
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (expanded) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---- Booking embed: detect if CloudSpot allows embedding ----
     A blocked or failed iframe is tricky: it often still fires a
     "load" event (on its own error page), so we can't trust load
     alone. Strategy: after the iframe loads, try to confirm it
     rendered real cross-origin content. A successful cross-origin
     embed THROWS on access (good). A same-origin blank/error page
     does NOT throw and reports about:blank (bad -> fallback).
     A hard timeout covers the case where nothing loads at all. */
  var bookingWrap = document.getElementById("booking-embed");
  if (bookingWrap) {
    var iframe = document.getElementById("booking-iframe");
    var fallback = document.getElementById("booking-fallback");
    var frameBox = bookingWrap.querySelector(".embed-frame");
    var settled = false;

    function showEmbed() {
      if (settled) { return; }
      settled = true;
      /* leave iframe visible, hide fallback */
      if (fallback) { fallback.style.display = "none"; }
    }
    function showFallback() {
      if (settled) { return; }
      settled = true;
      if (frameBox) { frameBox.style.display = "none"; }
      if (fallback) { fallback.style.display = "block"; }
    }

    if (iframe) {
      iframe.addEventListener("load", function () {
        try {
          /* Cross-origin success throws here -> embed is real */
          var href = iframe.contentWindow.location.href;
          /* Reached this line = same-origin = blank/error page */
          if (!href || href === "about:blank") {
            showFallback();
          } else {
            showEmbed();
          }
        } catch (e) {
          /* Cross-origin block on access = scheduler loaded OK */
          showEmbed();
        }
      });
      iframe.addEventListener("error", showFallback);

      /* Hard timeout: if nothing has settled in 7s, show fallback */
      setTimeout(function () {
        if (!settled) { showFallback(); }
      }, 7000);
    }
  }

});
