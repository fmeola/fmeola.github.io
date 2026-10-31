(function () {
  var root = document.documentElement;
  var canonicalLink = document.querySelector('link[rel="canonical"]');
  var preferenceControls = document.querySelector("[data-preference-controls]");
  var langToggle = document.querySelector("[data-lang-toggle]");
  var themeToggle = document.querySelector("[data-theme-toggle]");

  function savePreference(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Preferences still work for this visit when browser storage is unavailable.
    }
  }

  function updateLabels() {
    var isEnglish = root.lang === "en";
    var isDark = root.getAttribute("data-theme") === "dark";

    if (langToggle) {
      langToggle.setAttribute("aria-label", isEnglish ? "Switch to Spanish" : "Cambiar a inglés");
    }
    if (themeToggle) {
      var label = isEnglish
        ? (isDark ? "Switch to light mode" : "Switch to dark mode")
        : (isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      themeToggle.setAttribute("aria-label", label);
    }
  }

  function updateMetadata() {
    var tags = document.querySelectorAll("meta[data-content-es]");
    for (var index = 0; index < tags.length; index++) {
      tags[index].setAttribute("content", tags[index].getAttribute("data-content-" + root.lang));
    }
    canonicalLink.setAttribute("href", canonicalLink.getAttribute("data-href-" + root.lang));
  }

  function updateLanguageUrl() {
    var url = new URL(window.location.href);
    url.pathname = new URL(canonicalLink.getAttribute("href")).pathname;
    url.searchParams.set("lang", root.lang);
    window.history.replaceState(window.history.state, "", url.href);
  }

  function updateSystemTheme(event) {
    if (root.getAttribute("data-theme-preference") === "auto") {
      root.setAttribute("data-theme", event.matches ? "dark" : "light");
      updateLabels();
    }
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = root.lang === "es" ? "en" : "es";
      root.setAttribute("data-lang", next);
      root.lang = next;
      savePreference("lang", next);
      updateMetadata();
      updateLabels();
      updateLanguageUrl();
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      root.setAttribute("data-theme-preference", next);
      savePreference("theme", next);
      updateLabels();
    });
  }

  if (window.matchMedia) {
    var systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    systemTheme.addEventListener("change", updateSystemTheme);
    updateSystemTheme(systemTheme);
  }

  updateMetadata();
  updateLanguageUrl();
  updateLabels();
  if (preferenceControls) {
    preferenceControls.hidden = false;
  }
})();
