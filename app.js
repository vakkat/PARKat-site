const DEFAULT_LANG = "el";

function getI18N() {
  // Works whether I18N is global const or attached to window
  if (typeof I18N !== "undefined") return I18N;
  if (typeof window !== "undefined" && window.I18N) return window.I18N;
  return null;
}

function applyI18n(lang) {
  const dict = getI18N();
  if (!dict || !dict[lang]) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = dict[lang][key];

    if (typeof val === "undefined") return;

    // safer default
    el.textContent = val;
  });
}

function setLang(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  localStorage.setItem("parkat_lang", lang);

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = (lang === "el") ? "EN" : "ΕΛ";

  applyI18n(lang);
}

function initLang() {
  const saved = localStorage.getItem("parkat_lang");
  setLang(saved || DEFAULT_LANG);

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = localStorage.getItem("parkat_lang") || DEFAULT_LANG;
      setLang(current === "el" ? "en" : "el");
    });
  }
}

window.addEventListener("DOMContentLoaded", initLang);
