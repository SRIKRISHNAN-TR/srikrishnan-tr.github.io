/* ==========================================================================
   SRIKRISHNAN TR — PORTFOLIO JAVASCRIPT
   Extracted from the Canva Code export and restructured for self-hosting.

   HOW TO EDIT LINKS
   -----------------
   All functional URLs live in PORTFOLIO_DATA.links at the top of this file.
   Update a value here; the page picks it up automatically through [data-link]
   attributes in index.html.

   HOW TO EDIT COUNTERS
   --------------------
   PORTFOLIO_DATA.counters controls the animated stat numbers in the About
   section. Each entry has:
     value    – the final number the counter animates to
     decimals – decimal places to show (0 for integers, 2 for "8.00")
     suffix   – string appended after the number (e.g. "+")
   ========================================================================== */

/* --------------------------------------------------------------------------
   PORTFOLIO DATA — EDIT LINKS AND COUNTER TARGETS HERE
   -------------------------------------------------------------------------- */
const PORTFOLIO_DATA = {
  links: {
    /* ── Contact ── */
    email:   "mailto:srikrishnan310@gmail.com",
    linkedin: "https://www.linkedin.com/in/srikrishnan-tr/",
    github:   "https://github.com/SRIKRISHNAN-TR/",

    /* ── Project GitHub repos ── */
    project1Github: "https://github.com/SRIKRISHNAN-TR/Pg_Recon",
    project2Github: "https://github.com/SRIKRISHNAN-TR/ai-interview-agent.git",

    /* ── project2Demo: set to the live URL when the AI Interview Agent is
       deployed. While null the "Live Demo" button stays hidden. ── */
    project2Demo: null,

    project3Github: "https://github.com/SRIKRISHNAN-TR/MediAuth.git",
    project4Github: "https://github.com/SRIKRISHNAN-TR/BestShop.git",
    project5Github: "https://github.com/SRIKRISHNAN-TR/Academic_Green_KPI_Dashboard.git",

    /* ── Certification verification ── */
    salesforceVerify: "https://sforce.co/verifycerts"
  },

  counters: {
    /* value: the number the counter animates to
       decimals: decimal places (0 = integer)
       suffix: string appended after the number */
    projects:      { value: 4,    decimals: 0, suffix: "+" },
    internships:   { value: 3,    decimals: 0, suffix: ""  },
    certifications:{ value: 3,    decimals: 0, suffix: ""  },
    cgpa:          { value: 8,    decimals: 2, suffix: ""  }
  }
};

/* --------------------------------------------------------------------------
   LINK WIRING
   Any element with [data-link] gets its href set from PORTFOLIO_DATA.links.
   If the URL is null or missing, the element is hidden (handles project2Demo).
   -------------------------------------------------------------------------- */
document.querySelectorAll("[data-link]").forEach(link => {
  const url = PORTFOLIO_DATA.links[link.dataset.link];
  if (url && (url.startsWith("https://") || url.startsWith("mailto:"))) {
    link.href  = url;
    link.hidden = false;
  } else {
    link.hidden = true;
  }
});

/* --------------------------------------------------------------------------
   LUCIDE ICONS
   Replaces <i data-lucide="..."> placeholders with inline SVG.
   -------------------------------------------------------------------------- */
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

/* --------------------------------------------------------------------------
   SCROLL EFFECTS
   • Adds .scrolled to <header> after 20 px scroll (blur + border).
   • Drives the --ribbon-y custom property for parallax on both ribbons.
   Throttled via requestAnimationFrame to avoid layout thrash.
   -------------------------------------------------------------------------- */
const nav           = document.getElementById("site-nav");
const ribbons       = document.querySelectorAll(".ribbon");
const reduceMotion  = window.matchMedia("(prefers-reduced-motion: reduce)");
let   scrollScheduled = false;

function updateScrollEffects() {
  nav.classList.toggle("scrolled", window.scrollY > 20);

  if (!reduceMotion.matches) {
    ribbons.forEach((ribbon, index) => {
      ribbon.style.setProperty(
        "--ribbon-y",
        `${Math.min(window.scrollY * (index ? 0.035 : 0.065), 110)}px`
      );
    });
  }

  scrollScheduled = false;
}

window.addEventListener("scroll", () => {
  if (!scrollScheduled) {
    requestAnimationFrame(updateScrollEffects);
    scrollScheduled = true;
  }
}, { passive: true });

updateScrollEffects(); // run once on load

/* --------------------------------------------------------------------------
   REVEAL ON SCROLL
   IntersectionObserver adds .visible to .reveal elements as they enter the
   viewport (threshold 8 %). Once visible, the element is unobserved.
   -------------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* --------------------------------------------------------------------------
   ANIMATED STAT COUNTERS
   Runs once when the .stats grid enters the viewport (threshold 30 %).
   Respects prefers-reduced-motion: counts jump to the final value instantly.
   -------------------------------------------------------------------------- */
let countersStarted = false;
const stats = document.querySelector(".stats");

if (stats) {
  const counterObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || countersStarted) return;
    countersStarted = true;
    counterObserver.disconnect();

    document.querySelectorAll("[data-counter]").forEach(element => {
      const target = PORTFOLIO_DATA.counters[element.dataset.counter];
      if (!target) return;

      const format = value =>
        value.toFixed(target.decimals || 0) + (target.suffix || "");

      /* Skip animation if reduced motion is preferred */
      if (reduceMotion.matches) {
        element.textContent = format(target.value);
        return;
      }

      const start    = performance.now();
      const duration = 1100; // ms

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        element.textContent = format(target.value * eased);
        if (progress < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    });
  }, { threshold: 0.3 });

  counterObserver.observe(stats);
}

