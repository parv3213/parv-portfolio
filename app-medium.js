(function () {
  const KEY = "parv-dark";
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = saved === "1" || (saved === null && prefersDark);
  if (dark) document.body.setAttribute("data-dark", "1");

  function syncToggle(isDark) {
    const btn = document.querySelector(".mode-toggle");
    if (btn) btn.textContent = isDark ? "Light" : "Dark";
  }
  syncToggle(dark);

  document.addEventListener("click", (e) => {
    const t = e.target.closest(".mode-toggle");
    if (!t) return;
    const on = document.body.getAttribute("data-dark") === "1";
    const next = !on;
    document.body.setAttribute("data-dark", next ? "1" : "0");
    localStorage.setItem(KEY, next ? "1" : "0");
    syncToggle(next);
  });
})();
