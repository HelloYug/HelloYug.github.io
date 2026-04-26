/*
 * Additive interaction layer for the education-grid.
 * Keeps existing navigation and data intact while enhancing motion and polish.
 */

(function () {
  "use strict";

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const touchMotionQuery = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 1024px)");
  const reduceMotion = reduceMotionQuery.matches;
  const revealSelector = [
    "#header .container > *",
    "section .section-title",
    ".about-me .row > *",
    ".interests .icon-box",
    ".edu-card-horizontal",
    ".edu-card-vertical",
    ".education-item .education-wrap",
    "#experience .icon-box",
    "#Publications .icon-box",
    "#skills .icon-box",
    "#links .icon-box",
    ".contact .info-box",
    ".contact-form",
    "#project-details .project-info",
    ".header",
    ".footer",
    ".pdf-page"
  ].join(",");
  const rippleSelector = [
    ".btn",
    ".mobile-nav-toggle",
    ".nav-menu a",
    ".mobile-nav a",
    ".social-links a",
    ".education-grid .education-wrap .education-links a",
    ".projects-grid .projects-wrap .projects-links a",
    ".view-letter",
    ".view-letter",
    ".view-letter",
    ".view-paper",
    ".view-paper",
    ".view-paper",
    ".btn-theme",
    ".close-btn"
  ].join(",");

  let revealObserver = null;
  let normalizeTimer = null;

  function isTouchMotion() {
    return touchMotionQuery.matches;
  }

  function getRevealMotionProfile() {
    return isTouchMotion()
      ? { delayStep: 45, maxStaggerItems: 4 }
      : { delayStep: 70, maxStaggerItems: 7 };
  }

  function syncMotionContext() {
    document.body.classList.toggle("ux-touch-motion", isTouchMotion());
    document.body.classList.toggle("ux-reduced-motion", reduceMotionQuery.matches);
  }

  function revealSectionElements(section) {
    if (!(section instanceof HTMLElement)) {
      return;
    }

    section.querySelectorAll(".ux-reveal").forEach(revealNode);
  }

  function revealActiveSectionElements() {
    revealSectionElements(document.querySelector("section.section-show"));
  }

  function scheduleActiveSectionReveal() {
    window.requestAnimationFrame(revealActiveSectionElements);
    window.setTimeout(revealActiveSectionElements, 420);
  }

  function isVisible(node) {
    if (!(node instanceof HTMLElement)) {
      return false;
    }

    if (node.classList.contains("projects-item")) {
      return false;
    }

    const style = window.getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }

    return true;
  }

  function getRevealNodes(root) {
    return Array.from((root || document).querySelectorAll(revealSelector)).filter(isVisible);
  }

  function applyRevealDelays(nodes) {
    const groupMap = new Map();
    const motionProfile = getRevealMotionProfile();

    nodes.forEach((node) => {
      const group =
        node.closest(".row, .education-container, .pdf-grid, .button-group") ||
        node.closest("#header .container, section .container, #project-details .container") ||
        node.parentElement;

      const groupKey = group || document.body;
      const currentOrder = groupMap.get(groupKey) || 0;
      groupMap.set(groupKey, currentOrder + 1);
      node.style.setProperty(
        "--ux-delay",
        `${Math.min(currentOrder, motionProfile.maxStaggerItems) * motionProfile.delayStep}ms`
      );
    });
  }

  function revealNode(node) {
    node.classList.add("ux-visible");
  }

  function observeRevealNodes(root) {
    const nodes = getRevealNodes(root).filter((node) => !node.dataset.uxObserved);

    if (!nodes.length) {
      return;
    }

    applyRevealDelays(nodes);

    nodes.forEach((node) => {
      node.dataset.uxObserved = "true";
      node.classList.add("ux-reveal");

      if (reduceMotion || !("IntersectionObserver" in window)) {
        revealNode(node);
        return;
      }

      revealObserver.observe(node);
    });
  }

  function toggleHeaderState() {
    const header = document.getElementById("header");
    if (!header) {
      return;
    }

    const shouldElevate = header.classList.contains("header-top") || window.scrollY > 20;
    header.classList.toggle("ui-scrolled", shouldElevate);
  }

  function scheduleProjectHeadingNormalization() {
    window.clearTimeout(normalizeTimer);
    normalizeTimer = window.setTimeout(normalizeProjectHeadings, 120);
  }

  function normalizeProjectHeadings() {
    const headings = Array.from(document.querySelectorAll(".projects-item center h4")).filter((heading) => {
      const parentItem = heading.closest(".projects-item");
      return parentItem && window.getComputedStyle(parentItem).display !== "none";
    });

    if (!headings.length) {
      return;
    }

    headings.forEach((heading) => {
      heading.style.minHeight = "";
    });

    if (window.innerWidth < 768) {
      return;
    }

    const rows = [];

    headings.forEach((heading) => {
      const top = Math.round(heading.getBoundingClientRect().top + window.scrollY);
      let row = rows.find((entry) => Math.abs(entry.top - top) < 20);

      if (!row) {
        row = { top, items: [] };
        rows.push(row);
      }

      row.items.push(heading);
    });

    rows.forEach((row) => {
      const maxHeight = Math.max.apply(
        null,
        row.items.map((item) => item.offsetHeight)
      );

      row.items.forEach((item) => {
        item.style.minHeight = `${maxHeight}px`;
      });
    });
  }

  function handleRipple(event) {
    if (reduceMotion) {
      return;
    }

    const target = event.target.closest(rippleSelector);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ui-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    target.appendChild(ripple);
    ripple.addEventListener(
      "animationend",
      function () {
        ripple.remove();
      },
      { once: true }
    );
  }

  function observeMutations() {
    if (!("MutationObserver" in window)) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      let shouldRefreshReveals = false;
      let shouldNormalizeProjects = false;
      let shouldRevealActiveSection = false;

      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.target instanceof HTMLElement &&
          mutation.target.matches("section") &&
          mutation.target.classList.contains("section-show")
        ) {
          shouldRefreshReveals = true;
          shouldRevealActiveSection = true;
        }

        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches && node.matches(revealSelector)) {
            shouldRefreshReveals = true;
          }

          if (node.querySelector && node.querySelector(revealSelector)) {
            shouldRefreshReveals = true;
          }

          if (
            node.matches(".pdf-page, .projects-item") ||
            (node.querySelector && node.querySelector(".pdf-page, .projects-item"))
          ) {
            shouldNormalizeProjects = true;
          }
        });
      });

      if (shouldRefreshReveals) {
        observeRevealNodes(document);
      }

      if (shouldRevealActiveSection) {
        scheduleActiveSectionReveal();
      }

      if (shouldNormalizeProjects) {
        scheduleProjectHeadingNormalization();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  function bindProjectFilterRefresh() {
    document.querySelectorAll("#projects-filters li").forEach((filter) => {
      filter.addEventListener("click", () => {
        scheduleProjectHeadingNormalization();
        window.setTimeout(scheduleProjectHeadingNormalization, 320);
      });
    });
  }

  function init() {
    syncMotionContext();

    if ("IntersectionObserver" in window && !reduceMotion) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealNode(entry.target);
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: isTouchMotion() ? 0.1 : 0.14,
          rootMargin: isTouchMotion() ? "0px 0px -3% 0px" : "0px 0px -8% 0px"
        }
      );
    }

    requestAnimationFrame(() => {
      document.body.classList.add("ux-ready");
      observeRevealNodes(document);
      scheduleActiveSectionReveal();
      toggleHeaderState();
      scheduleProjectHeadingNormalization();
    });

    window.addEventListener("scroll", toggleHeaderState, { passive: true });
    window.addEventListener("resize", scheduleProjectHeadingNormalization, { passive: true });
    window.addEventListener("load", () => {
      observeRevealNodes(document);
      scheduleActiveSectionReveal();
      scheduleProjectHeadingNormalization();
      toggleHeaderState();
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest(".nav-menu a, .mobile-nav a")) {
        window.setTimeout(() => {
          observeRevealNodes(document);
          scheduleActiveSectionReveal();
          scheduleProjectHeadingNormalization();
        }, 420);
      }
    });

    document.addEventListener("click", handleRipple);
    bindProjectFilterRefresh();
    observeMutations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();


