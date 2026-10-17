(function () {
  var root = document.documentElement;
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

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = root.lang === "es" ? "en" : "es";
      root.setAttribute("data-lang", next);
      root.lang = next;
      savePreference("lang", next);
      updateLabels();
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      savePreference("theme", next);
      updateLabels();
    });
  }

  updateLabels();
})();
