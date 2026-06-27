/* ============================================================
   Unity 6.3 Docs — micro-juice
   Scroll-reveal nhẹ cho section (h2/h3) + grid cards.
   Tương thích navigation.instant qua document$ (Material/RxJS).
   Tôn trọng prefers-reduced-motion.
   ============================================================ */
(function () {
  function setup() {
    var reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    var targets = document.querySelectorAll(
      ".md-content .md-typeset h2, " +
        ".md-content .md-typeset h3, " +
        ".md-content .md-typeset .grid.cards > ul > li"
    );
    if (!targets.length) return;

    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("u-reveal-in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    targets.forEach(function (el) {
      el.classList.add("u-reveal");
      io.observe(el);
    });
  }

  // Material instant navigation: re-run mỗi lần đổi trang.
  if (typeof window.document$ !== "undefined" && window.document$.subscribe) {
    window.document$.subscribe(setup);
  } else if (document.readyState !== "loading") {
    setup();
  } else {
    document.addEventListener("DOMContentLoaded", setup);
  }
})();
