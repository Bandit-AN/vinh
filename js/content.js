/* =========================================================
   CONTENT — edit coaches, case studies and plans here.
   Every text field has an `en` and `vi` version.
   Anything wrapped in [brackets] is a placeholder to replace.
   ========================================================= */

window.VFS_CONTENT = {
  /* ---------- Coaches ----------
     `bio` is a placeholder — the current site lists names and roles only. */
  coaches: [
    {
      name: "Nguyễn Hoàng Long",
      role: { en: "Head Coach", vi: "Head Coach" },
      photo: "assets/img/coaches/nguyen-hoang-long.png",
      bio: { en: "[Bio: specialties, years coaching, certifications]", vi: "[Giới thiệu: chuyên môn, số năm kinh nghiệm, chứng chỉ]" },
      lead: true
    },
    {
      name: "Trần Quang Lâm",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/tran-quang-lam.png",
      bio: { en: "[Bio: specialties & focus]", vi: "[Giới thiệu: chuyên môn & thế mạnh]" }
    },
    {
      name: "Đình Khang",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/dinh-khang.png",
      bio: { en: "[Bio: specialties & focus]", vi: "[Giới thiệu: chuyên môn & thế mạnh]" }
    },
    {
      name: "Tống Anh Khoa",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/tong-anh-khoa.png",
      bio: { en: "[Bio: specialties & focus]", vi: "[Giới thiệu: chuyên môn & thế mạnh]" }
    },
    {
      name: "Quách Hiếu Trung",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/quach-hieu-trung.png",
      bio: { en: "[Bio: specialties & focus]", vi: "[Giới thiệu: chuyên môn & thế mạnh]" }
    },
    {
      name: "Võ Phạm Xuân Hoàng",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/vo-pham-xuan-hoang.png",
      bio: { en: "[Bio: specialties & focus]", vi: "[Giới thiệu: chuyên môn & thế mạnh]" }
    },
    {
      name: "Lê Anh Dũng",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/le-anh-dung.png",
      bio: { en: "[Bio: specialties & focus]", vi: "[Giới thiệu: chuyên môn & thế mạnh]" }
    }
  ],

  /* ---------- Case studies ----------
     Goal + before/after weight are transcribed from the transformation photos
     on the current site. Name, duration, coach and quote are placeholders. */
  cases: [
    {
      photo: "assets/img/results/t9.jpg",
      goal: { en: "Fat loss · better health markers", vi: "Giảm mỡ · cải thiện bệnh lý" },
      before: "110kg", after: "95kg", change: "−15kg",
      name: "[Member name]", weeks: "[__ weeks]", coach: "[Coach]",
      quote: { en: "[One-line quote from the member about their experience]", vi: "[Một câu chia sẻ của học viên về trải nghiệm]" }
    },
    {
      photo: "assets/img/results/t7.jpg",
      goal: { en: "Fat loss · lean, toned build", vi: "Giảm mỡ · body săn chắc" },
      before: "82kg", after: "70kg", change: "−12kg",
      name: "[Member name]", weeks: "[__ weeks]", coach: "[Coach]",
      quote: { en: "[One-line quote from the member about their experience]", vi: "[Một câu chia sẻ của học viên về trải nghiệm]" }
    },
    {
      photo: "assets/img/results/t11.jpg",
      goal: { en: "Recomposition · same weight, new body", vi: "Tái cấu trúc cơ thể · cùng cân nặng" },
      before: "85kg", after: "85kg", change: { en: "Recomp", vi: "Recomp" },
      name: "[Member name]", weeks: "[__ weeks]", coach: "[Coach]",
      quote: { en: "[One-line quote from the member about their experience]", vi: "[Một câu chia sẻ của học viên về trải nghiệm]" }
    }
  ],

  /* All transformation photos shown in the scrolling strip */
  results: [
    "assets/img/results/t1.jpg",
    "assets/img/results/t2.jpg",
    "assets/img/results/t3.jpg",
    "assets/img/results/t4.jpg",
    "assets/img/results/t5.jpg",
    "assets/img/results/t6.jpg",
    "assets/img/results/t8.jpg",
    "assets/img/results/t10.jpg"
  ],

  /* ---------- Membership plans (prices from vfsprivatetraining.com) ---------- */
  plans: [
    {
      name: "Beginner",
      price: "560.000",
      term: { en: "30 sessions · 10 weeks", vi: "Gói 30 buổi · 10 tuần" },
      gift: { en: "🎁 Gift: 1 fish cake, 1 pumpkin cake + 1 item of your choice", vi: "🎁 Tặng 1 Chả cá, 1 Bánh bí + 1 phần bất kỳ" }
    },
    {
      name: "Intermediate",
      price: "440.000",
      term: { en: "64 sessions · 24 weeks", vi: "Gói 64 buổi · 24 tuần" },
      gift: { en: "🎁 Gift: fish cake, pumpkin cake, cacao loaf + 2 items of your choice", vi: "🎁 Tặng Chả cá, Bánh bí, Cacao Loaf + 2 món bất kỳ" },
      featured: true
    },
    {
      name: "Advance Member",
      price: "350.000",
      term: { en: "144 sessions · 44 weeks", vi: "Gói 144 buổi · 44 tuần" },
      gift: { en: "🎁 Gift: fish cake, pumpkin cake, cacao loaf + 2 items of your choice", vi: "🎁 Tặng Chả cá, Bánh bí, Cacao Loaf + 2 món bất kỳ" }
    }
  ],

  /* Perks included in every plan */
  perks: {
    en: [
      "Dedicated coach, program & personalized nutrition",
      "1 free stretch therapy session",
      "Free daily snacks (yogurt, corn milk…)",
      "Towel & locker",
      "Free parking",
      "Only 3–5 members per time slot"
    ],
    vi: [
      "HLV trực tiếp, lịch tập & dinh dưỡng cá nhân hoá",
      "1 buổi therapy giãn cơ miễn phí",
      "Snacks mỗi ngày miễn phí (sữa chua, sữa bắp…)",
      "Khăn, locker",
      "Giữ xe miễn phí",
      "Chỉ 3–5 học viên trong 1 khung giờ"
    ]
  }
};
