/* =========================================================
   COACHING LANDING PAGE (coaching.html)
   VSL video, copy (EN/VI) and results photos are set here.
   The application popup itself is js/apply.js.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- VSL video ----------
     Paste ONE of these:
       VSL_YOUTUBE_ID: the part after "v=" in a YouTube link (unlisted videos work)
       VSL_VIDEO_URL:  a direct .mp4 link
     While both are empty, a placeholder shows. */
  const VSL_YOUTUBE_ID = "";
  const VSL_VIDEO_URL = "";

  /* ---------- Results proof (shown in this order) ---------- */
  const RESULTS = [
    "assets/img/results/huu-tinh.jpg",
    "assets/img/results/tran-lam.jpg",
    "assets/img/results/khuong-nguyen.jpg",
    "assets/img/results/anh-trung.jpg",
    "assets/img/results/duc-xuong.jpg",
    "assets/img/results/anh-minh.jpg",
    "assets/img/results/r16.jpg",
    "assets/img/results/r12.jpg",
    "assets/img/results/r13.jpg",
    "assets/img/results/r14.jpg",
    "assets/img/results/r15.jpg",
    "assets/img/results/r17.jpg"
  ];

  /* ---------- Copy ---------- */
  const COPY = {
    en: {
      "meta.title": "1-on-1 Online Coaching with Vinh — VFS Private Training",
      "hero.eyebrow": "1-on-1 online coaching with Vinh",
      "hero.title": "Build the body you want, coached 1-on-1 by Vinh, <span class=\"gold\">wherever you live.</span>",
      "hero.sub": "A training and nutrition plan built around your goals and your schedule, from the coach behind 200+ transformations at VFS.",
      "vsl.ph": "[VSL video goes here]",
      "cta.short": "Apply",
      "cta.main": "Apply now",
      "cta.note": "12 questions · about 3 minutes",
      "cta.results": "I want results like these",
      "proof.members": "members transformed",
      "proof.custom": "personalized training & nutrition",
      "proof.certs": "certified coaching team",
      "res.eyebrow": "Client results",
      "res.title": "Real people. <span class=\"gold\">Real results.</span>",
      "res.lead": "Members who trained with Vinh's team. Tap any photo to see it full size.",
      "about.eyebrow": "Your coach",
      "about.role": "Founder & CEO",
      "about.title": "He's been where <span class=\"gold\">you are.</span>",
      "about.body": "Vinh started lifting at 13 and went from 100kg to 70kg in three months. Training changed his body, his health and his mindset. After returning from Canada with deep knowledge and real-world experience, he founded VFS Private Training in 2022 to help others do the same, and now coaches clients 1-on-1 online.",
      "how.eyebrow": "How it works",
      "how.title": "Three steps to start",
      "how.1t": "Apply in 3 minutes",
      "how.1": "Answer 12 quick questions about your training, your goals and your schedule.",
      "how.2t": "Vinh reviews it",
      "how.2": "If it looks like a good fit, Vinh or our team reaches out to talk through your goals.",
      "how.3t": "Start your plan",
      "how.3": "Get training and nutrition built for you, with ongoing guidance from your coach.",
      "final.title": "Change starts with <span class=\"gold\">YOU</span>",
      "final.sub": "Applications take about 3 minutes, and Vinh reviews every one.",
      "final.disclaimer": "Results vary and depend on your consistency, effort and individual circumstances.",
      "footer.site": "Visit the main website"
    },
    vi: {
      "meta.title": "Coaching Online 1:1 cùng Vinh — VFS Private Training",
      "hero.eyebrow": "Coaching online 1:1 cùng Vinh",
      "hero.title": "Thay đổi vóc dáng cùng Vinh, kèm 1:1, <span class=\"gold\">dù bạn ở bất cứ đâu.</span>",
      "hero.sub": "Lộ trình tập luyện và dinh dưỡng thiết kế theo mục tiêu và lịch của bạn, từ HLV đứng sau hơn 200 hành trình thay đổi tại VFS.",
      "vsl.ph": "[Video VSL đặt tại đây]",
      "cta.short": "Đăng ký",
      "cta.main": "Đăng ký ngay",
      "cta.note": "12 câu hỏi · khoảng 3 phút",
      "cta.results": "Tôi muốn kết quả như vậy",
      "proof.members": "hội viên đã thay đổi",
      "proof.custom": "tập luyện & dinh dưỡng cá nhân hoá",
      "proof.certs": "đội ngũ HLV có chứng chỉ",
      "res.eyebrow": "Kết quả học viên",
      "res.title": "Người thật. <span class=\"gold\">Kết quả thật.</span>",
      "res.lead": "Học viên đã tập cùng đội ngũ của Vinh. Chạm vào ảnh để xem kích thước đầy đủ.",
      "about.eyebrow": "HLV của bạn",
      "about.role": "Founder & CEO",
      "about.title": "Anh ấy từng ở <span class=\"gold\">vị trí của bạn.</span>",
      "about.body": "Vinh bắt đầu tập từ năm 13 tuổi và giảm từ 100kg xuống 70kg trong 3 tháng. Tập luyện đã thay đổi vóc dáng, sức khỏe và tinh thần của anh. Sau khi trở về từ Canada với kiến thức chuyên sâu và kinh nghiệm thực tế, anh thành lập VFS Private Training năm 2022 để giúp mọi người làm được điều tương tự, và hiện đang coaching online 1:1.",
      "how.eyebrow": "Quy trình",
      "how.title": "Ba bước để bắt đầu",
      "how.1t": "Đăng ký trong 3 phút",
      "how.1": "Trả lời 12 câu hỏi ngắn về việc tập luyện, mục tiêu và lịch của bạn.",
      "how.2t": "Vinh xem xét",
      "how.2": "Nếu phù hợp, Vinh hoặc đội ngũ sẽ liên hệ để trao đổi về mục tiêu của bạn.",
      "how.3t": "Bắt đầu lộ trình",
      "how.3": "Nhận giáo án tập luyện và dinh dưỡng riêng, cùng sự đồng hành của HLV.",
      "final.title": "Thay đổi bắt đầu từ <span class=\"gold\">BẠN</span>",
      "final.sub": "Đơn đăng ký mất khoảng 3 phút, và Vinh xem xét từng đơn.",
      "final.disclaimer": "Kết quả khác nhau ở mỗi người và phụ thuộc vào sự kiên trì, nỗ lực và hoàn cảnh cá nhân.",
      "footer.site": "Xem website chính"
    }
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const LANG_KEY = "vfs-lang";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------- Language (no popup on the ad page: URL → saved → browser) ---------- */
  function applyLang(lang) {
    const t = COPY[lang] || COPY.en;
    document.documentElement.lang = lang;
    document.title = t["meta.title"];
    $$("[data-i18n]").forEach((el) => { el.textContent = t[el.dataset.i18n]; });
    $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t[el.dataset.i18nHtml]; });
    $$(".lang-toggle button").forEach((b) => {
      const on = b.dataset.setLang === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on);
    });
    document.dispatchEvent(new CustomEvent("vfs:lang", { detail: lang }));
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-set-lang]");
    if (!b) return;
    store.set(LANG_KEY, b.dataset.setLang);
    applyLang(b.dataset.setLang);
  });
  const urlLang = new URLSearchParams(location.search).get("lang");
  if (urlLang && COPY[urlLang]) store.set(LANG_KEY, urlLang);
  const browserLang = (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
  applyLang(store.get(LANG_KEY) || browserLang);

  /* ---------- VSL ---------- */
  const vsl = $("#vsl");
  if (VSL_YOUTUBE_ID) {
    vsl.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(VSL_YOUTUBE_ID)}?rel=0&modestbranding=1&playsinline=1"
      title="Vinh's coaching video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  } else if (VSL_VIDEO_URL) {
    vsl.innerHTML = `<video src="${VSL_VIDEO_URL}" controls playsinline preload="metadata" poster="assets/img/gallery/stage-1.jpg"></video>`;
  }

  /* ---------- Results grid + lightbox ---------- */
  $("#vslResults").innerHTML = RESULTS.map((src, i) =>
    `<button class="vsl-result" data-i="${i}" aria-label="Transformation ${i + 1}"><img src="${src}" alt="Client before and after ${i + 1}" loading="lazy" /></button>`
  ).join("");

  const lb = $("#lightbox");
  const lbImg = $("img", lb);
  let idx = 0;
  const show = (i) => { idx = (i + RESULTS.length) % RESULTS.length; lbImg.src = RESULTS[idx]; };
  const openLb = (i) => { show(i); lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); };
  const closeLb = () => { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); };
  $("#vslResults").addEventListener("click", (e) => { const b = e.target.closest(".vsl-result"); if (b) openLb(+b.dataset.i); });
  $(".lightbox__close", lb).addEventListener("click", closeLb);
  $(".lightbox__prev", lb).addEventListener("click", () => show(idx - 1));
  $(".lightbox__next", lb).addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  /* ---------- Sticky mobile CTA after the first CTA scrolls away ---------- */
  const bar = $("#mobileCta");
  const firstCta = $(".vsl-hero .vsl-cta");
  const onScroll = () => bar.classList.toggle("is-visible", firstCta.getBoundingClientRect().bottom < 0);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  $("#year").textContent = new Date().getFullYear();
})();
