
(() => {
  const destinations = {
    "/zh-hans/": "zh-hans",
    "/zh-hant/": "zh-hant",
    "/en/": "en"
  };

  function normalizePath(path) {
    if (path === "/") return path;
    return path.endsWith("/") ? path : `${path}/`;
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem("nodals-language", language);
    } catch (error) {
      // The site still works without saved preferences.
    }
  }

  // Remember the language of the page currently being viewed.
  const currentPath = normalizePath(window.location.pathname);

  if (destinations[currentPath]) {
    saveLanguage(destinations[currentPath]);
  }

  // Set up the dropdown menu.
  const switcher = document.querySelector(".language-switcher");

  if (!switcher) return;

  const button = switcher.querySelector(".lang-toggle");
  const menu = switcher.querySelector(".language-menu");

  function setMenuOpen(open) {
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  }

  // Open or close the menu when the button is clicked.
  button.addEventListener("click", () => {
    setMenuOpen(menu.hidden);
  });

  // Close the menu when clicking anywhere outside it.
  document.addEventListener("pointerdown", event => {
    if (!switcher.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  // Close the menu with Escape and return focus to the button.
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !menu.hidden) {
      setMenuOpen(false);
      button.focus();
    }
  });

  // Save the selected language before navigating.
  menu.addEventListener("click", event => {
    const link = event.target.closest("a");

    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const language = destinations[normalizePath(url.pathname)];

    if (language) {
      saveLanguage(language);
    }

    setMenuOpen(false);
  });
})();
