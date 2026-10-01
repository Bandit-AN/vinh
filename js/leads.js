/* =========================================================
   LEADS — sends every form submission to the Google Sheet.
   Both the contact form (main.js) and the coaching
   application (apply.js) go through VFSLeads.send().
   ========================================================= */
(function () {
  "use strict";

  // Google Apps Script web-app URL (see apps-script/README.md).
  const LEADS_ENDPOINT = "";
  // Which form types go to the sheet. Anything else (or everything, while
  // LEADS_ENDPOINT is empty) opens a pre-filled email to CONTACT_EMAIL instead.
  const SHEET_TYPES = ["application"];
  const CONTACT_EMAIL = "vophucvinh582@gmail.com";
  const ATTR_KEY = "vfs-attribution";

  /* ---------- Ad attribution: remember where the visitor first came from ---------- */
  const store = {
    get() { try { return JSON.parse(sessionStorage.getItem(ATTR_KEY)); } catch (e) { return null; } },
    set(v) { try { sessionStorage.setItem(ATTR_KEY, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  const params = new URLSearchParams(location.search);
  const fromUrl = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach((k) => {
    if (params.get(k)) fromUrl[k] = params.get(k);
  });
  if (!store.get() || Object.keys(fromUrl).length) {
    store.set({ ...fromUrl, landing_page: location.href, referrer: document.referrer });
  }

  /**
   * Send a lead to the sheet.
   * @param {"application"|"contact"} type
   * @param {object} data  flat key/value answers
   * @returns {Promise<"sent"|"email">}
   */
  async function send(type, data) {
    const payload = {
      lead_type: type,
      ...data,
      ...(store.get() || {}),
      lang: document.documentElement.lang,
      page: location.href,
      submitted_at: new Date().toISOString()
    };

    if (!LEADS_ENDPOINT || !SHEET_TYPES.includes(type)) {
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join("\n");
      const name = data.full_name || `${data.first_name || ""} ${data.last_name || ""}`.trim();
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`New ${type} — ${name}`)}&body=${encodeURIComponent(body)}`;
      return "email";
    }

    // Apps Script doesn't send CORS headers: post as text/plain with no-cors.
    // The response is opaque, so a resolved fetch counts as sent; a network error throws.
    await fetch(LEADS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    return "sent";
  }

  window.VFSLeads = { send };
})();
