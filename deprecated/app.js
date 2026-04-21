// Minimal dark-mode toggle + localStorage persistence
(function () {
  const KEY = "parv-dark";
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = saved === "1" || (saved === null && prefersDark);
  if (dark) document.body.setAttribute("data-dark", "1");

  document.addEventListener("click", (e) => {
    const t = e.target.closest(".mode-toggle");
    if (!t) return;
    const on = document.body.getAttribute("data-dark") === "1";
    document.body.setAttribute("data-dark", on ? "0" : "1");
    localStorage.setItem(KEY, on ? "0" : "1");
  });

  // Work page filter
  const chips = document.querySelectorAll(".strip .chip");
  if (chips.length) {
    const rows = [...document.querySelectorAll(".row-proj")];
    const ct = document.getElementById("ct");
    chips.forEach((c) =>
      c.addEventListener("click", () => {
        chips.forEach((x) => x.setAttribute("aria-pressed", "false"));
        c.setAttribute("aria-pressed", "true");
        const f = c.dataset.filter;
        let n = 0;
        rows.forEach((r) => {
          const ok = f === "all" || (r.dataset.tags || "").split(" ").includes(f);
          r.hidden = !ok;
          if (ok) n++;
        });
        if (ct) ct.textContent = n;
      })
    );
  }
})();
