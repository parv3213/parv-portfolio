// Simple/Technical variant persistence.
// - Click a [data-variant-link="simple|technical"] pill: store choice, navigate.
// - On load: if user has a stored choice that disagrees with the current page, redirect.
(function () {
  var KEY = 'portfolio-variant';
  var here = location.pathname;
  var onSimple = here.indexOf('/simple/') !== -1;
  var stored;
  try { stored = localStorage.getItem(KEY); } catch (e) { stored = null; }

  // Auto-route: only redirect from the top-level index pages (root or /simple/).
  // Deep links to specific pages (work/resume/contact) stay put.
  var isIndex = /\/(simple\/)?(index\.html)?$/.test(here);
  if (isIndex && stored) {
    if (stored === 'simple' && !onSimple) { location.replace('simple/index.html'); return; }
    if (stored === 'technical' && onSimple) { location.replace('../index.html'); return; }
  }

  // Click handlers on toggle links.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-variant-link]');
    if (!a) return;
    try { localStorage.setItem(KEY, a.getAttribute('data-variant-link')); } catch (e) {}
    // let the browser follow the href normally
  });
})();
