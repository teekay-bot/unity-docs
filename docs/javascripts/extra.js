/* ============================================================
   Unity 6.3 Docs — micro-juice
   1) Scroll-reveal nhẹ cho section (h2/h3) + grid cards.
   2) Dock đối xứng cho top nav: hover một tab thì đẩy CẢ tab
      bên trái lẫn bên phải ra (giảm dần theo khoảng cách).
   Tương thích navigation.instant qua document$ (Material/RxJS).
   Tôn trọng prefers-reduced-motion.
   ============================================================ */
(function () {
  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ---------- 1) Scroll-reveal ---------- */
  function setupReveal() {
    if (reduceMotion() || !("IntersectionObserver" in window)) return;

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

  /* ---------- 2) Dock đối xứng cho top nav ---------- */
  function setupDock() {
    var list = document.querySelector(".md-tabs__list");
    if (!list || list.dataset.dockBound) return;
    list.dataset.dockBound = "1";

    var items = Array.prototype.slice.call(
      list.querySelectorAll(".md-tabs__link")
    );
    if (items.length < 2) return;

    function clear() {
      items.forEach(function (el) {
        el.style.transform = "";
      });
    }

    items.forEach(function (link, idx) {
      link.addEventListener("mouseenter", function () {
        if (reduceMotion()) return;
        items.forEach(function (other, j) {
          if (j === idx) {
            // tab đang hover: để CSS :hover lo phần scale
            other.style.transform = "";
            return;
          }
          var dist = j - idx; // âm = bên trái, dương = bên phải
          var dir = dist < 0 ? -1 : 1;
          // hàng xóm sát đẩy nhiều nhất, xa thì giảm dần
          var mag = Math.max(0, 0.55 - (Math.abs(dist) - 1) * 0.28);
          other.style.transform = mag
            ? "translateX(" + dir * mag + "em)"
            : "";
        });
      });
    });

    // rời khỏi cả thanh tab → trả về vị trí cũ
    list.addEventListener("mouseleave", clear);
  }

  function setup() {
    setupReveal();
    setupDock();
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
