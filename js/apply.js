/* =========================================================
   1-ON-1 ONLINE COACHING APPLICATION — popup form
   Open it from any element with [data-apply], or link to #apply.
   Questions (both languages) live in APPLY_STEPS below.
   ========================================================= */
(function () {
  "use strict";

  // Paste a form endpoint (Formspree, Google Apps Script, CRM webhook…) to receive applications.
  // While empty, submitting opens a pre-filled email to APPLY_EMAIL.
  const APPLY_ENDPOINT = "";
  const APPLY_EMAIL = "vophucvinh582@gmail.com";
  const DRAFT_KEY = "vfs-apply-draft";

  /* ---------- Copy ---------- */
  const UI = {
    en: {
      title: "Vinh's 1-on-1 Bodybuilding Coaching Application",
      intro: "Vinh's coaching is for people ready to take their training, nutrition, and physique seriously. Fill out this application so Vinh can learn where you're at and whether coaching is a good fit.",
      time: "12 questions · about 3 minutes",
      start: "Start application",
      next: "Next",
      back: "Back",
      submit: "Submit application",
      sending: "Sending…",
      hintChoice: "Tap an answer to continue",
      hintText: "Press Ctrl/⌘ + Enter to continue",
      placeholder: "Your answer",
      required: "Please answer to continue.",
      invalidEmail: "Please enter a valid email.",
      agree: "I agree",
      doneTitle: "Application submitted",
      doneText: "Vinh will review your answers and reach out if it looks like a good fit. Please check your phone regularly for a message from Vinh or someone from our team.",
      close: "Close",
      error: "Something went wrong. Please message us on Zalo: 0898 462 618.",
      of: "of"
    },
    vi: {
      title: "Đơn đăng ký Coaching 1:1 cùng Vinh",
      intro: "Chương trình coaching của Vinh dành cho những ai sẵn sàng nghiêm túc với việc tập luyện, dinh dưỡng và vóc dáng. Hãy điền đơn này để Vinh hiểu rõ bạn đang ở đâu và coaching có phù hợp với bạn không.",
      time: "12 câu hỏi · khoảng 3 phút",
      start: "Bắt đầu",
      next: "Tiếp",
      back: "Quay lại",
      submit: "Gửi đơn đăng ký",
      sending: "Đang gửi…",
      hintChoice: "Chọn một đáp án để tiếp tục",
      hintText: "Nhấn Ctrl/⌘ + Enter để tiếp tục",
      placeholder: "Câu trả lời của bạn",
      required: "Vui lòng trả lời để tiếp tục.",
      invalidEmail: "Vui lòng nhập email hợp lệ.",
      agree: "Tôi đồng ý",
      doneTitle: "Đã gửi đơn đăng ký",
      doneText: "Vinh sẽ xem câu trả lời của bạn và liên hệ nếu phù hợp. Vui lòng kiểm tra điện thoại thường xuyên để nhận tin nhắn từ Vinh hoặc đội ngũ của chúng tôi.",
      close: "Đóng",
      error: "Gửi không thành công. Vui lòng nhắn Zalo: 0898 462 618.",
      of: "/"
    }
  };

  /* ---------- Questions ----------
     type: choice (auto-advances) | text | agree | contact */
  const APPLY_STEPS = [
    {
      id: "country", type: "choice",
      q: { en: "What country are you currently living in?", vi: "Bạn hiện đang sống ở quốc gia nào?" },
      options: [
        { en: "USA / Canada", vi: "Mỹ / Canada" },
        { en: "Vietnam", vi: "Việt Nam" },
        { en: "Australia", vi: "Úc" },
        { en: "Europe", vi: "Châu Âu" },
        { en: "Other", vi: "Khác" }
      ]
    },
    {
      id: "experience", type: "choice",
      q: { en: "What best describes your current training experience?", vi: "Kinh nghiệm tập luyện hiện tại của bạn?" },
      options: [
        { en: "Just starting out", vi: "Mới bắt đầu" },
        { en: "Less than 1 year", vi: "Dưới 1 năm" },
        { en: "1–3 years", vi: "1–3 năm" },
        { en: "More than 3 years", vi: "Trên 3 năm" }
      ]
    },
    {
      id: "goal", type: "choice",
      q: { en: "What is your main goal right now?", vi: "Mục tiêu chính của bạn hiện tại là gì?" },
      options: [
        { en: "Build muscle", vi: "Tăng cơ" },
        { en: "Lose body fat", vi: "Giảm mỡ" },
        { en: "Body recomposition", vi: "Tăng cơ giảm mỡ (recomp)" },
        { en: "Prepare for a bodybuilding competition", vi: "Chuẩn bị thi đấu thể hình" },
        { en: "Improve my training and nutrition overall", vi: "Cải thiện tập luyện và dinh dưỡng nói chung" },
        { en: "Other", vi: "Khác" }
      ]
    },
    {
      id: "days", type: "choice",
      q: { en: "How many days per week are you currently training?", vi: "Hiện tại bạn tập bao nhiêu ngày mỗi tuần?" },
      options: [
        { en: "0–1", vi: "0–1" },
        { en: "2–3", vi: "2–3" },
        { en: "4–5", vi: "4–5" },
        { en: "6 or more", vi: "6 trở lên" }
      ]
    },
    {
      id: "struggle", type: "text",
      q: { en: "What have you struggled with most in reaching your physique goals?", vi: "Điều gì khiến bạn gặp khó khăn nhất khi theo đuổi mục tiêu vóc dáng?" }
    },
    {
      id: "routine", type: "text",
      q: { en: "What does your current training and nutrition routine look like?", vi: "Lịch tập và chế độ dinh dưỡng hiện tại của bạn như thế nào?" }
    },
    {
      id: "whyVinh", type: "text",
      q: { en: "Why do you want to work with Vinh specifically?", vi: "Vì sao bạn muốn làm việc cùng Vinh?" }
    },
    {
      id: "achieve", type: "text",
      q: { en: "What would you like to achieve in the next 6–12 months?", vi: "Bạn muốn đạt được điều gì trong 6–12 tháng tới?" }
    },
    {
      id: "start", type: "choice",
      q: { en: "If your application is approved, when would you be ready to start the online fitness coaching program?", vi: "Nếu đơn được duyệt, khi nào bạn sẵn sàng bắt đầu chương trình coaching online?" },
      options: [
        { en: "Immediately", vi: "Ngay lập tức" },
        { en: "Within 2–4 weeks", vi: "Trong 2–4 tuần" },
        { en: "In 1–3 months", vi: "Trong 1–3 tháng" },
        { en: "Just exploring options", vi: "Chỉ đang tìm hiểu" }
      ]
    },
    {
      id: "invest", type: "choice",
      q: { en: "If Vinh believes you're a good fit, are you willing and financially able to invest in 1-on-1 coaching?", vi: "Nếu Vinh thấy bạn phù hợp, bạn có sẵn sàng và đủ khả năng tài chính để đầu tư vào coaching 1:1 không?" },
      options: [
        { en: "Yes, I'm ready to invest in my health", vi: "Có, tôi sẵn sàng đầu tư cho sức khỏe" },
        { en: "I'm not in a good financial position to invest", vi: "Hiện tại tôi chưa đủ điều kiện tài chính" }
      ]
    },
    {
      id: "acknowledge", type: "agree",
      q: { en: "Important acknowledgement", vi: "Xác nhận quan trọng" },
      body: {
        en: "I understand that results vary and depend on my consistency, effort, and individual circumstances. Coaching does not guarantee a specific physique or result.",
        vi: "Tôi hiểu rằng kết quả khác nhau ở mỗi người và phụ thuộc vào sự kiên trì, nỗ lực và hoàn cảnh cá nhân. Coaching không đảm bảo một vóc dáng hay kết quả cụ thể."
      }
    },
    {
      id: "contact", type: "contact",
      q: { en: "Contact information", vi: "Thông tin liên hệ" },
      fields: [
        { name: "firstName", type: "text", autocomplete: "given-name", label: { en: "First name", vi: "Tên" } },
        { name: "lastName", type: "text", autocomplete: "family-name", label: { en: "Last name", vi: "Họ" } },
        { name: "email", type: "email", autocomplete: "email", label: { en: "Email address", vi: "Email" } },
        { name: "phone", type: "tel", autocomplete: "tel", label: { en: "Phone number", vi: "Số điện thoại" } }
      ]
    }
  ];

  /* ---------- State ---------- */
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || null; } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    clear() { try { localStorage.removeItem(DRAFT_KEY); } catch (e) { /* ignore */ } }
  };
  const draft = store.get() || {};
  let answers = draft.answers || {};
  let step = draft.step || 0;        // 0 = intro, 1..N = questions, N+1 = done
  const N = APPLY_STEPS.length;

  const lang = () => (document.documentElement.lang === "vi" ? "vi" : "en");
  const u = (k) => UI[lang()][k];
  const pick = (v) => (v && typeof v === "object" ? v[lang()] || v.en : v);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const save = () => store.set({ answers, step: Math.min(step, N) });

  /* ---------- DOM ---------- */
  const modal = document.getElementById("applyModal");
  const body = modal.querySelector(".apply__body");
  const bar = modal.querySelector(".apply__progress span");
  let lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    if (step > N) { step = 0; answers = {}; }
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    render();
  }
  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (location.hash === "#apply") history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }
  function go(to) {
    step = Math.max(0, Math.min(to, N + 1));
    save();
    render();
  }

  /* ---------- Render ---------- */
  function render() {
    bar.style.width = `${step > N ? 100 : (Math.max(0, step - 1) / N) * 100}%`;
    modal.querySelector(".apply__close").setAttribute("aria-label", u("close"));

    if (step === 0) return renderIntro();
    if (step > N) return renderDone();

    const s = APPLY_STEPS[step - 1];
    const head = `
      <p class="apply__count">${step} ${u("of")} ${N}</p>
      <h2 class="apply__q" id="applyQ">${esc(pick(s.q))}</h2>`;
    let html = "";

    if (s.type === "choice") {
      html = `${head}
        <div class="apply__options" role="radiogroup" aria-labelledby="applyQ">
          ${s.options.map((o, i) => {
            const val = o.en;
            const on = answers[s.id] === val;
            return `<button type="button" class="apply__opt${on ? " is-on" : ""}" role="radio" aria-checked="${on}" data-val="${esc(val)}">
              <kbd>${String.fromCharCode(65 + i)}</kbd><span>${esc(pick(o))}</span></button>`;
          }).join("")}
        </div>
        <p class="apply__hint">${u("hintChoice")}</p>`;
    } else if (s.type === "text") {
      html = `${head}
        <textarea class="apply__text" rows="4" placeholder="${u("placeholder")}" aria-labelledby="applyQ">${esc(answers[s.id] || "")}</textarea>
        <p class="apply__hint apply__hint--desk">${u("hintText")}</p>`;
    } else if (s.type === "agree") {
      html = `${head}
        <p class="apply__ack">${esc(pick(s.body))}</p>
        <label class="apply__check"><input type="checkbox" ${answers[s.id] ? "checked" : ""} /> <span>${u("agree")}</span></label>`;
    } else if (s.type === "contact") {
      const c = answers.contact || {};
      html = `${head}
        <div class="apply__fields">
          ${s.fields.map((f) => `
            <label><span>${esc(pick(f.label))}</span>
              <input name="${f.name}" type="${f.type}" autocomplete="${f.autocomplete}" ${f.type === "tel" ? 'inputmode="tel"' : ""} value="${esc(c[f.name] || "")}" required />
            </label>`).join("")}
        </div>`;
    }

    const isLast = step === N;
    html += `
      <p class="apply__err" role="alert"></p>
      <div class="apply__nav">
        <button type="button" class="btn btn--ghost btn--sm apply__back">← ${u("back")}</button>
        ${s.type === "choice" ? "" : `<button type="button" class="btn btn--gold apply__next">${isLast ? u("submit") : u("next") + " →"}</button>`}
      </div>`;
    swap(html);
  }

  function renderIntro() {
    swap(`
      <div class="apply__intro">
        <img src="assets/img/brand/logo.png" alt="" class="apply__logo" />
        <h2 class="apply__title" id="applyQ">${u("title")}</h2>
        <p class="apply__lead">${u("intro")}</p>
        <button type="button" class="btn btn--gold apply__next">${u("start")} →</button>
        <p class="apply__hint">${u("time")}</p>
      </div>`);
  }

  function renderDone() {
    swap(`
      <div class="apply__intro">
        <div class="apply__tick" aria-hidden="true">✓</div>
        <h2 class="apply__title" id="applyQ">${u("doneTitle")}</h2>
        <p class="apply__lead">${u("doneText")}</p>
        <button type="button" class="btn btn--ghost apply__closebtn">${u("close")}</button>
      </div>`);
  }

  function swap(html) {
    body.classList.remove("is-in");
    body.innerHTML = html;
    void body.offsetWidth; // restart the fade-in
    body.classList.add("is-in");
    const first = body.querySelector("textarea, input, .apply__opt.is-on, .apply__opt, .apply__next, .apply__closebtn");
    if (first && !(matchMedia("(hover: none)").matches && /TEXTAREA|INPUT/.test(first.tagName))) first.focus({ preventScroll: true });
  }

  /* ---------- Step logic ---------- */
  function showErr(msg) { const e = body.querySelector(".apply__err"); if (e) e.textContent = msg; }

  function commit() {
    const s = APPLY_STEPS[step - 1];
    if (s.type === "text") {
      const v = body.querySelector(".apply__text").value.trim();
      answers[s.id] = v;
      if (!v) return showErr(u("required"));
    } else if (s.type === "agree") {
      const v = body.querySelector(".apply__check input").checked;
      answers[s.id] = v;
      if (!v) return showErr(u("required"));
    } else if (s.type === "contact") {
      const inputs = [...body.querySelectorAll(".apply__fields input")];
      answers.contact = Object.fromEntries(inputs.map((i) => [i.name, i.value.trim()]));
      const bad = inputs.filter((i) => !i.value.trim() || !i.checkValidity());
      inputs.forEach((i) => i.classList.toggle("is-invalid", bad.includes(i)));
      if (bad.length) {
        bad[0].focus();
        return showErr(bad[0].type === "email" && bad[0].value.trim() ? u("invalidEmail") : u("required"));
      }
      return submit();
    } else if (!answers[s.id]) {
      return showErr(u("required"));
    }
    go(step + 1);
  }

  async function submit() {
    const btn = body.querySelector(".apply__next");
    btn.disabled = true;
    btn.textContent = u("sending");
    const payload = { ...answers, ...answers.contact, lang: lang(), submittedAt: new Date().toISOString() };
    delete payload.contact;

    if (APPLY_ENDPOINT) {
      try {
        const res = await fetch(APPLY_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(res.status);
      } catch (err) {
        btn.disabled = false;
        btn.textContent = u("submit");
        return showErr(u("error"));
      }
    } else {
      const lines = APPLY_STEPS.filter((s) => s.type !== "contact")
        .map((s) => `${s.q.en}\n→ ${s.type === "agree" ? "Agreed" : answers[s.id]}`);
      const c = answers.contact;
      const text = `Name: ${c.firstName} ${c.lastName}\nEmail: ${c.email}\nPhone: ${c.phone}\n\n${lines.join("\n\n")}`;
      window.location.href = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent("Coaching application — " + c.firstName + " " + c.lastName)}&body=${encodeURIComponent(text)}`;
    }
    store.clear();
    go(N + 1);
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-apply]");
    if (trigger) { e.preventDefault(); open(); return; }
    if (!modal.classList.contains("is-open")) return;

    if (e.target === modal || e.target.closest(".apply__close, .apply__closebtn")) return close();
    if (e.target.closest(".apply__back")) return go(step - 1);
    if (e.target.closest(".apply__next")) return step === 0 ? go(1) : commit();

    const opt = e.target.closest(".apply__opt");
    if (opt) {
      const s = APPLY_STEPS[step - 1];
      answers[s.id] = opt.dataset.val;
      body.querySelectorAll(".apply__opt").forEach((b) => {
        const on = b === opt;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-checked", on);
      });
      save();
      setTimeout(() => go(step + 1), 260); // brief pause so the selection is visible
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") return close();
    const s = APPLY_STEPS[step - 1];
    const typing = /TEXTAREA|INPUT/.test(document.activeElement.tagName) && document.activeElement.type !== "checkbox";

    // A, B, C… picks an option on choice steps
    if (s && s.type === "choice" && !typing && /^[a-z]$/i.test(e.key) && !e.metaKey && !e.ctrlKey) {
      const btn = body.querySelectorAll(".apply__opt")[e.key.toUpperCase().charCodeAt(0) - 65];
      if (btn) btn.click();
    }
    // Enter continues (Ctrl/⌘+Enter inside a textarea)
    if (e.key === "Enter") {
      if (document.activeElement.tagName === "TEXTAREA" && !(e.metaKey || e.ctrlKey)) return;
      if (document.activeElement.tagName === "BUTTON") return;
      const next = body.querySelector(".apply__next");
      if (next) { e.preventDefault(); next.click(); }
    }
  });

  // Keep typed text when switching language or closing mid-question
  body.addEventListener("input", (e) => {
    const s = APPLY_STEPS[step - 1];
    if (!s) return;
    if (s.type === "text") answers[s.id] = e.target.value;
    if (s.type === "contact") answers.contact = { ...(answers.contact || {}), [e.target.name]: e.target.value };
    save();
  });

  document.addEventListener("vfs:lang", () => { if (modal.classList.contains("is-open")) render(); });

  // Direct link: yoursite/#apply opens the application
  const fromHash = () => { if (location.hash === "#apply") open(); };
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
