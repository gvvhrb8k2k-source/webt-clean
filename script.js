gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initSmoothScroll() {
  if (!prefersReducedMotion && window.innerWidth > 768) {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.15,
      effects: true,
      smoothTouch: 0.1
    });
  }
}

function initHero() {
  const timeline = gsap.timeline({ delay: 0.15 });

  timeline
    .from(".logo", { y: -24, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".eyebrow", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.25)
    .from(".hero__title", { y: 70, opacity: 0, duration: 1.2, ease: "power4.out" }, 0.35)
    .from(".hero__text", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, 0.55)
    .from(".hero__image--detail", { y: 60, opacity: 0, duration: 1.4, ease: "power3.out" }, 0.45)
    .from(".hero__image--main", { y: 40, opacity: 0, duration: 1.4, ease: "power3.out" }, 0.65);

  gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  })
    .to(".hero__title", { x: prefersReducedMotion ? 0 : -180, opacity: 0.3 })
    .to(".hero__image--main", { y: "18vh" }, 0);
}

function initPanels() {
  document.querySelectorAll(".panel").forEach((panel) => {
    const copy = panel.querySelector(".panel__copy");
    const titleLines = panel.querySelectorAll(".panel__title span");
    const image = panel.querySelector(".panel__visual img");

    gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 75%",
        once: true
      }
    })
      .from(titleLines, {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out"
      })
      .from(copy.querySelectorAll(".eyebrow, .panel__text, .panel__link"), {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out"
      }, 0.25);

    if (!prefersReducedMotion) {
      gsap.fromTo(image,
        { y: "-8%" },
        {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }
  });
}

function initLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      gsap.to(window, {
        duration: prefersReducedMotion ? 0 : 1.2,
        scrollTo: { y: target, offsetY: 0 },
        ease: "power2.inOut"
      });
    });
  });
}

function init() {
  initSmoothScroll();
  initHero();
  initPanels();
  initLinks();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
