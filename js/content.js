/* =========================================================
   CONTENT — edit coaches, case studies and plans here.
   Every text field has an `en` and `vi` version.
   Anything wrapped in [brackets] is a placeholder to replace.
   ========================================================= */

window.VFS_CONTENT = {
  /* ---------- Coaches ---------- */
  coaches: [
    {
      name: "Nguyễn Hoàng Long",
      role: { en: "Head Coach", vi: "Head Coach" },
      photo: "assets/img/coaches/nguyen-hoang-long.png",
      lead: true
    },
    {
      name: "Trần Quang Lâm",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/tran-quang-lam.png"
    },
    {
      name: "Đình Khang",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/dinh-khang.png"
    },
    {
      name: "Tống Anh Khoa",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/tong-anh-khoa.png"
    },
    {
      name: "Quách Hiếu Trung",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/quach-hieu-trung.png"
    },
    {
      name: "Võ Phạm Xuân Hoàng",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/vo-pham-xuan-hoang.png"
    },
    {
      name: "Lê Anh Dũng",
      role: { en: "Personal Trainer", vi: "Huấn luyện viên" },
      photo: "assets/img/coaches/le-anh-dung.png"
    }
  ],

  /* ---------- Case studies (featured, top of Results) ----------
     `goal`, `before`, `after`, `change` are optional — add them when known. */
  cases: [
    { name: "Hữu Tình",      photo: "assets/img/results/huu-tinh.jpg" },
    { name: "Anh Minh",      photo: "assets/img/results/anh-minh.jpg" },
    { name: "Khương Nguyễn", photo: "assets/img/results/khuong-nguyen.jpg" }
  ],

  /* All other transformation photos, shown in the scrolling strip */
  results: [
    "assets/img/results/tran-lam.jpg",
    "assets/img/results/duc-xuong.jpg",
    "assets/img/results/anh-trung.jpg",
    "assets/img/results/r16.jpg",
    "assets/img/results/r12.jpg",
    "assets/img/results/r13.jpg",
    "assets/img/results/r14.jpg",
    "assets/img/results/r15.jpg",
    "assets/img/results/r17.jpg",
    "assets/img/results/t9.jpg",
    "assets/img/results/t7.jpg",
    "assets/img/results/t11.jpg",
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
  },

  /* ---------- VHS Meal menu (from vfsprivatetraining.com/vhs-meal) ----------
     cat: protein | rice | noodles | veg | bakery | snacks */
  meals: [
    { name: "Chả Cốm Gà", cat: "protein", photo: "assets/img/meals/cha-com-ga.jpg" },
    { name: "Chả Cá Thì Là", cat: "protein", photo: "assets/img/meals/cha-ca-thi-la.jpg" },
    { name: "Chả Cá Trứng Muối", cat: "protein", photo: "assets/img/meals/cha-ca-trung-muoi.jpg" },
    { name: "Chả Cá Phô Mai", cat: "protein", photo: "assets/img/meals/cha-ca-pho-mai.jpg" },
    { name: "Chả Cá Mozzarella", cat: "protein", photo: "assets/img/meals/cha-ca-mozzarella.jpg" },
    { name: "Trứng Ngâm Tương", cat: "protein", photo: "assets/img/meals/trung-ngam-tuong.jpg" },
    { name: "Ức Gà Sousvide Xá Xíu (150g)", cat: "protein", photo: "assets/img/meals/uc-ga-sousvide-xa-xiu-150g.jpg" },
    { name: "Ức Gà Sousvide Thảo Mộc (150g)", cat: "protein", photo: "assets/img/meals/uc-ga-sousvide-thao-moc-150g.jpg" },
    { name: "Ức Gà Sousvide Nguyên Vị (150g)", cat: "protein", photo: "assets/img/meals/uc-ga-sousvide-nguyen-vi-150g.jpg" },
    { name: "Cơm Nướng Cá Ngừ", cat: "rice", photo: "assets/img/meals/com-nuong-ca-ngu.jpg" },
    { name: "Cơm Thơm Bò", cat: "rice", photo: "assets/img/meals/com-thom-bo.jpg" },
    { name: "Cơm Thơm Cá", cat: "rice", photo: "assets/img/meals/com-thom-ca.jpg" },
    { name: "Cơm Thơm Gà", cat: "rice", photo: "assets/img/meals/com-thom-ga.jpg" },
    { name: "Xôi Gà Xá Xíu", cat: "rice", photo: "assets/img/meals/xoi-ga-xa-xiu.jpg" },
    { name: "Bibimbap Cá Ngừ", cat: "rice", photo: "assets/img/meals/bibimbap-ca-ngu.jpg" },
    { name: "Bibimbap Bò", cat: "rice", photo: "assets/img/meals/bibimbap-bo.jpg" },
    { name: "Nui Kem Chả", cat: "noodles", photo: "assets/img/meals/nui-kem-cha.jpg" },
    { name: "Pad Thái", cat: "noodles", photo: "assets/img/meals/pad-thai.jpg" },
    { name: "Bún Cá", cat: "noodles", photo: "assets/img/meals/bun-ca.jpg" },
    { name: "Miến Măng", cat: "noodles", photo: "assets/img/meals/mien-mang.jpg" },
    { name: "Phở Gà", cat: "noodles", photo: "assets/img/meals/pho-ga.jpg" },
    { name: "Phở Bò", cat: "noodles", photo: "assets/img/meals/pho-bo.jpg" },
    { name: "Hủ Tiếu Sườn", cat: "noodles", photo: "assets/img/meals/hu-tieu-suon.jpg" },
    { name: "Nui Gà", cat: "noodles", photo: "assets/img/meals/nui-ga.jpg" },
    { name: "Nui Cá", cat: "noodles", photo: "assets/img/meals/nui-ca.jpg" },
    { name: "Cơm Vịt Quay (Chay)", cat: "veg", photo: "assets/img/meals/com-vit-quay-chay.jpg" },
    { name: "Bibimbap Đậu Hũ (Chay)", cat: "veg", photo: "assets/img/meals/bibimbap-dau-hu-chay.jpg" },
    { name: "Cơm Trái Thơm (Chay)", cat: "veg", photo: "assets/img/meals/com-trai-thom-chay.jpg" },
    { name: "Miến Măng (chay)", cat: "veg", photo: "assets/img/meals/mien-mang-chay.jpg" },
    { name: "Khoai Đút Lò (Chay)", cat: "veg", photo: "assets/img/meals/khoai-dut-lo-chay.jpg" },
    { name: "Muffin Gà", cat: "bakery", photo: "assets/img/meals/muffin-ga.jpg" },
    { name: "Muffin Bò", cat: "bakery", photo: "assets/img/meals/muffin-bo.jpg" },
    { name: "Oatmeal Banana Cake", cat: "bakery", photo: "assets/img/meals/oatmeal-banana-cake.jpg" },
    { name: "Pumpkin Cake", cat: "bakery", photo: "assets/img/meals/pumpkin-cake.jpg" },
    { name: "Nutty Pumpkin Cake", cat: "bakery", photo: "assets/img/meals/nutty-pumpkin-cake.jpg" },
    { name: "Cinnamon Banana Loaf", cat: "bakery", photo: "assets/img/meals/cinnamon-banana-loaf.jpg" },
    { name: "Cacao Banana Loaf", cat: "bakery", photo: "assets/img/meals/cacao-banana-loaf.jpg" },
    { name: "Bagel Gà", cat: "bakery", photo: "assets/img/meals/bagel-ga.jpg" },
    { name: "Bagel Cá Hồi", cat: "bakery", photo: "assets/img/meals/bagel-ca-hoi.jpg" },
    { name: "Bagel Bò", cat: "bakery", photo: "assets/img/meals/bagel-bo.jpg" },
    { name: "Khoai Đút Lò", cat: "snacks", photo: "assets/img/meals/khoai-dut-lo.jpg" },
    { name: "Cảo Hoàng Kim", cat: "snacks", photo: "assets/img/meals/cao-hoang-kim.jpg" },
    { name: "Cảo Bắc Thảo", cat: "snacks", photo: "assets/img/meals/cao-bac-thao.jpg" },
    { name: "Kefir Yougurt (330ml)", cat: "snacks", photo: "assets/img/meals/kefir-yougurt-330ml.jpg" }
  ]
};
