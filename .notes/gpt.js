class ThemeFacade {
  static selectors = [
    "html",
    "body",
    "header",
    "nav",
    "section",
    "article",
    ".card",
    ".table",
    "footer",
    ".font",
  ];
  static toggle(forceDark = null) {
    ThemeFacade.selectors.forEach(sel =>
      document.querySelectorAll(sel).forEach(el => {
        const toDark =
          forceDark === null
            ? !el.classList.contains("dark-theme")
            : !!forceDark;
        el.classList.toggle("dark-theme", toDark);
      })
    );
    const pressed = document.body.classList.contains("dark-theme");
    document
      .getElementById("darkFab")
      .setAttribute("aria-pressed", String(pressed));
  }
  static init() {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) ThemeFacade.toggle(true);
    document
      .getElementById("darkFab")
      .addEventListener("click", () => ThemeFacade.toggle());
  }
}
class ObserverFacade {
  static init() {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll(".slide-on-scroll").forEach(el => io.observe(el));
  }
}
class TiltFacade {
  static items = new Set();
  static handlePointer(e, el) {
    const r = el.getBoundingClientRect(),
      cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width,
      dy = (e.clientY - cy) / r.height;
    el.style.transform = `rotateX(${dy * 8}deg) rotateY(${-dx * 12}deg)`;
  }
  static reset(el) {
    el.style.transform = "rotateX(0) rotateY(0)";
  }
  static attach(el) {
    if (TiltFacade.items.has(el)) return;
    el.classList.add("tilt");
    el.addEventListener("pointermove", e => TiltFacade.handlePointer(e, el));
    el.addEventListener("pointerleave", () => TiltFacade.reset(el));
    TiltFacade.items.add(el);
  }
  static init() {
    document.querySelectorAll(".tilt").forEach(TiltFacade.attach);
  }
}
class MotionFacade {
  static init() {
    document.querySelectorAll("button, a").forEach(el => {
      el.addEventListener("pointerenter", () =>
        el.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-2px)" }],
          { duration: 140, fill: "forwards" }
        )
      );
      el.addEventListener("pointerleave", () =>
        el.animate(
          [{ transform: "translateY(-2px)" }, { transform: "translateY(0)" }],
          { duration: 140, fill: "forwards" }
        )
      );
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  ThemeFacade.init();
  ObserverFacade.init();
  TiltFacade.init();
  MotionFacade.init();
});
