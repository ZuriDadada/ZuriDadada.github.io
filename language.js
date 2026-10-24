
(() => {
  const destinations = {
    "/zh-hans/": "zh-hans",
    "/zh-hant/": "zh-hant",
    "/en/": "en"
  };

  function saveLanguage(language) {
    try {
      localStorage.setItem("nodals-language", language);
    } catch (error) {
      // The site still works without saved preferences.
    }
  }

  // Remember the language of the page currently being viewed.
  const currentPath = window.location.pathname;
  if (destinations[currentPath]) {
    saveLanguage(destinations[currentPath]);
  }

  // Remember the new language when a language link is clicked.
  document.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const language = destinations[url.pathname];

    if (language) {
      saveLanguage(language);
    }
  }, true);
})();
