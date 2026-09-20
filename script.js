"use strict";

/* MENU MOBILE */

const menuButton = document.querySelector(".menu-toggle");
const navigationMenu = document.querySelector(".nav-menu");

if (menuButton && navigationMenu) {
  const closeMenu = () => {
    navigationMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Apri il menu");
  };

  menuButton.addEventListener("click", () => {
    const menuIsOpen = navigationMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
    menuButton.setAttribute(
      "aria-label",
      menuIsOpen ? "Chiudi il menu" : "Apri il menu"
    );
  });

  navigationMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navigationMenu.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
      closeMenu();
    }
  });
}

/* ANNO AUTOMATICO */

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ANIMAZIONI ALLO SCORRIMENTO */

const animatedElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  animatedElements.forEach((element) => {
    element.classList.add("visible");
  });
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  animatedElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* GESTIONE IMMAGINI MANCANTI */

const imageFallbacks = [
  {
    image: document.querySelector(".hero-photo"),
    wrapper: document.querySelector(".hero-photo-wrapper")
  },
  {
    image: document.querySelector(".portrait-frame img"),
    wrapper: document.querySelector(".about-portrait")
  }
];

imageFallbacks.forEach(({ image, wrapper }) => {
  if (image && wrapper) {
    image.addEventListener("error", () => {
      wrapper.classList.add("image-unavailable");
    });
  }
});


/* AVVISO PRIVACY — SOLO MEMORIA LOCALE TECNICA */

const privacyBanner = document.getElementById("privacy-banner");
const privacyDismiss = document.getElementById("privacy-dismiss");
const privacyStorageKey = "studioDiericoPrivacyNoticeV1";

if (privacyBanner && privacyDismiss) {
  let alreadyDismissed = false;

  try {
    alreadyDismissed = window.localStorage.getItem(privacyStorageKey) === "dismissed";
  } catch (_) {
    alreadyDismissed = false;
  }

  if (!alreadyDismissed) {
    privacyBanner.hidden = false;
  }

  privacyDismiss.addEventListener("click", () => {
    privacyBanner.hidden = true;

    try {
      window.localStorage.setItem(privacyStorageKey, "dismissed");
    } catch (_) {
      // Se la memoria locale non è disponibile, il banner viene semplicemente chiuso.
    }
  });
}
