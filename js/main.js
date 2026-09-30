/* =========================================================
   VFS PRIVATE TRAINING — behaviour
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Settings ---------- */
  // Paste a form endpoint (Formspree, Google Apps Script, CRM webhook…) to receive leads.
  // While empty, the form falls back to opening a pre-filled email to CONTACT_EMAIL.
  const FORM_ENDPOINT = "";
  const CONTACT_EMAIL = "vophucvinh582@gmail.com";
  const DEFAULT_LANG = "vi";
  const LANG_KEY = "vfs-lang";

  const I18N = window.VFS_I18N;
  const DATA = window.VFS_CONTENT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  let lang = DEFAULT_LANG;

  /* ---------- Storage (can throw in private modes) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------- Helpers ---------- */
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || "";
  const pick = (v) => (v && typeof v === "object" ? v[lang] || v.en : v);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Values written as "[…]" in content.js are placeholders — highlight them.
  const val = (v) => {
    const s = pick(v);
    return /^\[.*\]$/.test(s) ? `<span class="ph">${esc(s)}</span>` : esc(s);
  };

  /* ---------- Render: case studies ---------- */
  function renderCases() {
    $("#cases").innerHTML = DATA.cases.map((c, i) => `
      <article class="case reveal">
        <button class="case__img" data-lightbox="case" data-index="${i}" aria-label="${esc(pick(c.goal))}">
          <img src="${c.photo}" alt="${esc(pick(c.goal))}: ${c.before} → ${c.after}" loading="lazy" />
        </button>
        <div class="case__body">
          <div class="case__meta"><span class="chip">${esc(pick(c.goal))}</span></div>
          <h3>${val(c.name)}</h3>
          <div class="case__row">
            <div><small>${t("res.before")}</small><b>${c.before}</b></div>
            <div><small>${t("res.after")}</small><b>${c.after}</b></div>
            <div><small>${t("res.change")}</small><b class="gold">${esc(pick(c.change))}</b></div>
          </div>
          <div class="case__row" style="grid-template-columns:1fr 1fr">
            <div><small>${t("res.duration")}</small><b>${val(c.weeks)}</b></div>
            <div><small>${t("res.coach")}</small><b>${val(c.coach)}</b></div>
          </div>
          <p class="case__quote">${val(c.quote)}</p>
        </div>
      </article>`).join("");

    $("#resultsStrip").innerHTML = DATA.results.map((src, i) => `
      <button data-lightbox="strip" data-index="${i}" aria-label="Transformation ${i + 1}">
        <img src="${src}" alt="Before and after transformation ${i + 1}" loading="lazy" />
      </button>`).join("");
  }

  /* ---------- Render: coaches ---------- */
  function renderCoaches() {
    const lead = DATA.coaches.find((c) => c.lead);
    const rest = DATA.coaches.filter((c) => !c.lead);

    $("#teamLead").innerHTML = lead ? `
      <div class="team-lead reveal">
        <img src="${lead.photo}" alt="${esc(lead.name)}" loading="lazy" />
        <div>
          <p class="eyebrow">${esc(pick(lead.role))}</p>
          <h2 style="font-size:clamp(32px,4vw,48px)">${esc(lead.name)}</h2>
          <span class="role">VFS Private Training</span>
          <p>${val(lead.bio)}</p>
          <a href="#contact" class="btn btn--gold" style="margin-top:12px">${t("team.cta")}</a>
        </div>
      </div>` : "";

    $("#team").innerHTML = rest.map((c) => `
      <article class="coach reveal">
        <div class="coach__photo"><img src="${c.photo}" alt="${esc(c.name)}" loading="lazy" /></div>
        <div class="coach__body">
          <h3>${esc(c.name)}</h3>
          <span class="coach__role">${esc(pick(c.role))}</span>
          <p>${val(c.bio)}</p>
        </div>
      </article>`).join("");
  }

  /* ---------- Render: plans ---------- */
  function renderPlans() {
    const perks = DATA.perks[lang] || DATA.perks.en;
    $("#plans").innerHTML = DATA.plans.map((p) => `
      <article class="plan ${p.featured ? "plan--featured" : ""} reveal">
        ${p.featured ? `<span class="plan__badge">${t("price.popular")}</span>` : ""}
        <span class="plan__name">${esc(p.name)}</span>
        <div class="plan__price"><strong>${p.price}</strong><span>${t("price.per")}</span></div>
        <p class="plan__term">${esc(pick(p.term))}</p>
        <ul>${perks.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="plan__gift">${esc(pick(p.gift))}</p>
        <a href="#contact" class="btn ${p.featured ? "btn--gold" : "btn--ghost"} btn--block" data-service="pt">${t("price.cta")}</a>
      </article>`).join("");
  }

  /* ---------- Language ---------- */
  function applyLang(next) {
    lang = I18N[next] ? next : DEFAULT_LANG;
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    const desc = $('meta[name="description"]');
    if (desc) desc.content = t("meta.desc");

    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$(".lang-toggle button").forEach((b) => {
      const on = b.dataset.setLang === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on);
    });

    renderCases();
    renderCoaches();
    renderPlans();
    observeReveals();
  }

  function setLang(next) {
    store.set(LANG_KEY, next);
    applyLang(next);
    closeLangModal();
  }

  const modal = $("#langModal");
  function openLangModal() {
    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");
    setTimeout(() => $(".lang-option", modal).focus(), 50);
  }
  function closeLangModal() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-set-lang]");
    if (btn) setLang(btn.dataset.setLang);
  });

  /* ---------- Reveal on scroll ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;
  function observeReveals() {
    $$(".reveal:not(.is-in)").forEach((el) => (io ? io.observe(el) : el.classList.add("is-in")));
  }

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const mobileCta = $("#mobileCta");
  const hero = $(".hero");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 20);
    mobileCta.classList.toggle("is-visible", y > hero.offsetHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
  }
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Pre-select service from any "Register" link ---------- */
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-service]");
    if (link) $("#serviceSelect").value = link.dataset.service;
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("img", lb);
  let lbList = [];
  let lbIndex = 0;
  function showLb(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    lbImg.src = lbList[lbIndex];
  }
  function openLb(list, i) {
    lbList = list;
    showLb(i);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $(".lightbox__close", lb).focus();
  }
  function closeLb() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }
  document.addEventListener("click", (e) => {
    const trg = e.target.closest("[data-lightbox]");
    if (!trg) return;
    const list = trg.dataset.lightbox === "case" ? DATA.cases.map((c) => c.photo) : DATA.results;
    openLb(list, +trg.dataset.index);
  });
  $(".lightbox__close", lb).addEventListener("click", closeLb);
  $(".lightbox__prev", lb).addEventListener("click", () => showLb(lbIndex - 1));
  $(".lightbox__next", lb).addEventListener("click", () => showLb(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
  });

  /* ---------- Lead form ---------- */
  const form = $("#leadForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bad = $$("[required]", form).filter((f) => !f.value.trim());
    if (bad.length) { bad[0].focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    data.serviceLabel = $("#serviceSelect").selectedOptions[0].textContent;
    data.lang = lang;

    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(res.status);
      } catch (err) {
        alert(lang === "vi" ? "Gửi không thành công. Vui lòng gọi 0898 462 618." : "Something went wrong. Please call 0898 462 618.");
        return;
      }
    } else {
      const body = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.serviceLabel}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website enquiry — " + data.name)}&body=${encodeURIComponent(body)}`;
    }
    form.classList.add("is-sent");
    form.reset();
  });

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  const saved = store.get(LANG_KEY);
  applyLang(saved || DEFAULT_LANG);
  if (!saved) openLangModal();
})();
