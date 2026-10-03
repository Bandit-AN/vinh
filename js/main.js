/* =========================================================
   VFS PRIVATE TRAINING — behaviour
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Settings ---------- */
  // Where leads go is set in js/leads.js
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

  /* ---------- Render: case studies ---------- */
  function renderCases() {
    $("#cases").innerHTML = DATA.cases.map((c, i) => `
      <article class="case reveal">
        <button class="case__img" data-lightbox="case" data-index="${i}" aria-label="${esc(c.name)}">
          <img src="${c.photo}" alt="${esc(c.name)} — before and after" loading="lazy" />
        </button>
        <div class="case__body">
          ${c.goal ? `<div class="case__meta"><span class="chip">${esc(pick(c.goal))}</span></div>` : ""}
          <h3>${esc(c.name)}</h3>
          ${c.before ? `
          <div class="case__row">
            <div><small>${t("res.before")}</small><b>${c.before}</b></div>
            <div><small>${t("res.after")}</small><b>${c.after}</b></div>
            <div><small>${t("res.change")}</small><b class="gold">${esc(pick(c.change))}</b></div>
          </div>` : ""}
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
          <a href="#contact" class="btn btn--gold" style="margin-top:12px">${t("team.cta")}</a>
        </div>
      </div>` : "";

    $("#team").innerHTML = rest.map((c) => `
      <article class="coach reveal">
        <div class="coach__photo"><img src="${c.photo}" alt="${esc(c.name)}" loading="lazy" /></div>
        <div class="coach__body">
          <h3>${esc(c.name)}</h3>
          <span class="coach__role">${esc(pick(c.role))}</span>
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

  /* ---------- Render: VHS Meal menu ---------- */
  const MENU_PREVIEW = 12;
  let menuCat = "all";
  let menuOpen = false;
  // "All" tab: take one dish from each category in turn, so similar-looking dishes
  // (5 fish cakes, 3 sous-vide chicken…) don't sit next to each other.
  function mixedMenu() {
    const groups = {};
    DATA.meals.forEach((m) => (groups[m.cat] = groups[m.cat] || []).push(m));
    const lists = Object.values(groups);
    const out = [];
    for (let i = 0; out.length < DATA.meals.length; i++) lists.forEach((l) => l[i] && out.push(l[i]));
    return out;
  }
  function renderMeals() {
    const items = menuCat === "all" ? mixedMenu() : DATA.meals.filter((m) => m.cat === menuCat);
    const shown = menuOpen || menuCat !== "all" ? items : items.slice(0, MENU_PREVIEW);
    $("#menuGrid").innerHTML = shown.map((m) => `
      <figure class="dish">
        <div class="dish__img"><img src="${m.photo}" alt="${esc(m.name)}" loading="lazy" /></div>
        <figcaption>${esc(m.name)}</figcaption>
      </figure>`).join("");
    $$(".menu-tabs button").forEach((b) => b.setAttribute("aria-selected", b.dataset.cat === menuCat));
    const more = $("#menuMore");
    more.parentElement.hidden = menuCat !== "all";
    more.textContent = t(menuOpen ? "cafe.less" : "cafe.more");
  }
  $$(".menu-tabs button").forEach((b) => b.addEventListener("click", () => {
    menuCat = b.dataset.cat;
    renderMeals();
  }));
  $("#menuMore").addEventListener("click", () => {
    menuOpen = !menuOpen;
    renderMeals();
    if (!menuOpen) $("#meals").scrollIntoView();
  });

  /* ---------- Country dropdown: US & Vietnam first, then A–Z ---------- */
  const COUNTRIES = "AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB UM UY UZ VU VE VG VI WF EH YE ZM ZW".split(" ");
  function renderCountries() {
    const sel = $("#countrySelect");
    const current = sel.value;
    let names;
    try { names = new Intl.DisplayNames([lang], { type: "region" }); } catch (e) { names = { of: (c) => c }; }
    const opt = (code) => `<option value="${code}">${esc(names.of(code))}</option>`;
    const rest = COUNTRIES.map((c) => [c, names.of(c)]).sort((a, b) => a[1].localeCompare(b[1], lang));
    sel.innerHTML =
      `<option value="">${t("form.countryPick")}</option>` +
      opt("US") + opt("VN") +
      `<option disabled>──────────</option>` +
      rest.map(([c]) => opt(c)).join("");
    sel.value = current;
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
    renderMeals();
    renderCountries();
    observeReveals();
    document.dispatchEvent(new CustomEvent("vfs:lang", { detail: lang }));
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
    const fields = $$("[required]", form);
    const bad = fields.filter((f) => !f.value.trim() || !f.checkValidity());
    fields.forEach((f) => f.classList.toggle("is-invalid", bad.includes(f)));
    if (bad.length) { bad[0].focus(); return; }

    const f = Object.fromEntries(new FormData(form));
    const btn = $("button[type=submit]", form);
    btn.disabled = true;
    try {
      await window.VFSLeads.send("contact", {
        full_name: f.name.trim(),
        phone: f.phone.trim(),
        email: f.email.trim(),
        country: $("#countrySelect").selectedOptions[0].textContent,
        service: $("#serviceSelect").selectedOptions[0].textContent,
        website: f.website // honeypot — real visitors leave this empty
      });
    } catch (err) {
      alert(lang === "vi" ? "Gửi không thành công. Vui lòng gọi 0898 462 618." : "Something went wrong. Please call 0898 462 618.");
      return;
    } finally {
      btn.disabled = false;
    }
    form.classList.add("is-sent");
    form.reset();
  });

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  // ?lang=en or ?lang=vi in the URL picks the language and skips the popup (handy for shared links)
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl && I18N[fromUrl]) store.set(LANG_KEY, fromUrl);
  const saved = store.get(LANG_KEY);
  applyLang(saved || DEFAULT_LANG);
  if (!saved) openLangModal();
})();
