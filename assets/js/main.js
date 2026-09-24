document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  // Accordion (about page)
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var head = item.querySelector(".accordion-head");
    if (!head) return;
    head.addEventListener("click", function () {
      var wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item").forEach(function (el) {
        el.classList.remove("open");
      });
      if (!wasOpen) item.classList.add("open");
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // Back to top
  var backTop = document.querySelector(".back-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) backTop.classList.add("show");
      else backTop.classList.remove("show");
    });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Simple counter animation
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var started = false;
    var run = function () {
      if (started) return;
      started = true;
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 60));
      var timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + (el.getAttribute("data-suffix") || "");
      }, 25);
    };
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) run(); });
      }, { threshold: 0.4 });
      obs.observe(el);
    } else {
      run();
    }
  });
});
