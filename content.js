// content.js
// Appends " -ai" to Google search queries when needed.

(function () {
  const AI_TOKEN = "-ai";

  function hasAi(q) {
    if (!q) return false;
    return q.toLowerCase().includes(AI_TOKEN.toLowerCase());
  }

  function appendAiToQuery(q) {
    if (!q) return AI_TOKEN;
    q = q.trim();
    if (hasAi(q)) return q;
    return q + " " + AI_TOKEN;
  }

  function handleInitialUrl() {
    try {
      const url = new URL(location.href);
      const q = url.searchParams.get("q");
      if (q && !hasAi(q)) {
        const newQ = appendAiToQuery(q);
        url.searchParams.set("q", newQ);
        // Replace to avoid adding history entry and to reload the results page
        location.replace(url.href);
      }
    } catch (e) {
      // ignore
    }
  }

  function attachFormListeners() {
    const input = document.querySelector('input[name="q"]');
    if (!input) return;

    const form = input.form || document.querySelector('form[role="search"]') || input.closest("form");

    function ensureAppend() {
      try {
        const val = input.value;
        if (!hasAi(val)) {
          input.value = appendAiToQuery(val);
        }
      } catch (e) {
        // ignore
      }
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        ensureAppend();
      }, true);
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        ensureAppend();
      }
    }, true);
  }

  // Observe DOM to attach listeners when input appears
  const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('input[name="q"]')) {
      attachFormListeners();
      obs.disconnect();
    }
  });
  observer.observe(document, { childList: true, subtree: true });

  // Handle initial load (search results page with q= param)
  handleInitialUrl();

  // For SPA behavior: periodically check the URL q param and patch if needed.
  // (If Google changes their frontend a lot, you can increase logic complexity.)
  function checkUrlChange() {
    try {
      const url = new URL(location.href);
      const q = url.searchParams.get("q") || "";
      if (q && !hasAi(q)) {
        const newQ = appendAiToQuery(q);
        url.searchParams.set("q", newQ);
        location.replace(url.href);
      }
    } catch (e) {
      // ignore
    }
  }

  setInterval(checkUrlChange, 500);
})();