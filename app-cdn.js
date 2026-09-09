const spreads = [
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/01.jpg",
    sy: "ماما قالت: «يلا. وين المفتاح؟»\nسامي قاعد. تحتو شي قاسي.",
    en: "Mama said, \"Let's go. Where are the keys?\"\nSami sat. Something hard under him.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/02.jpg",
    sy: "سامي قال: «ما بعرف.»\nجيب البيجاما رنّ.",
    en: "Sami said, \"I don't know.\"\nThe pajama pocket rang.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/03.jpg",
    sy: "تحت الطاولة؟\nبسّة. فتافيت. ما في مفتاح.",
    en: "Under the table?\nA kitty. Crumbs. No key.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/04.jpg",
    sy: "ورا البرداية؟\nسامي صار برداية.",
    en: "Behind the curtain?\nSami became a curtain.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/05.jpg",
    sy: "عالبلكون؟\nسامي نبش بشتلة البندورة.",
    en: "On the balcony?\nSami dug in the tomato plant.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/06.jpg",
    sy: "بالطنجرة؟\nغطا عراس سامي. ريحة طبيخ.",
    en: "In the pot?\nA lid on Sami's head. Smell of stew.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/07.jpg",
    sy: "ماما قالت: «سامي. عن جد.»\nسامي هزّ راسو. رنّ.",
    en: "Mama said, \"Sami. For real.\"\nSami shook his head. It rang.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/08.jpg",
    sy: "سامي ركض عالبلاط.\nزلق.",
    en: "Sami ran on the tiles.\nHe slipped.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/09.jpg",
    sy: "وقع.\nالمفتاح طلع من الجيب. رنّ.",
    en: "He fell.\nThe keys came out of the pocket. They rang.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/10.jpg",
    sy: "سامي قال: «بجيبي.»\nصوتو واطي.",
    en: "Sami said, \"In my pocket.\"\nHis voice was low.",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/11.jpg",
    sy: "ردّ المفتاح. عليه تراب بندورة.\nسامي قال: «بجيبي. أنا.»",
    en: "He gave the keys back. Tomato dirt on them.\nSami said, \"In my pocket. Me.\"",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/kenanrahmani/sham-kids-keys-flipbook@main/public/spreads/12.jpg",
    sy: "ماما مسحتو. ما زعلت.\n«يلا.» هالمرة سامي قال.",
    en: "Mama wiped it. She didn't get mad.\n\"Let's go.\" This time, Sami said it.",
  },
];

const pageEl = document.getElementById("page");
const art = document.getElementById("art");
const sy = document.getElementById("sy");
const en = document.getElementById("en");
const cur = document.getElementById("cur");
const total = document.getElementById("total");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dots = document.getElementById("dots");
const langToggle = document.getElementById("langToggle");
const stage = document.getElementById("stage");

let i = 0;
let busy = false;
let mode = "both"; // both | en | sy

total.textContent = String(spreads.length);

function renderDots() {
  dots.innerHTML = "";
  spreads.forEach((_, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Page ${idx + 1}`);
    if (idx === i) b.setAttribute("aria-current", "true");
    b.addEventListener("click", () => go(idx, idx > i ? 1 : -1));
    dots.appendChild(b);
  });
}

function paint() {
  const s = spreads[i];
  art.src = s.src;
  art.alt = `Spread ${i + 1}`;
  sy.textContent = s.sy;
  en.textContent = s.en;
  cur.textContent = String(i + 1);
  prevBtn.disabled = i === 0;
  nextBtn.disabled = i === spreads.length - 1;
  renderDots();
}

function go(next, dir) {
  if (busy) return;
  next = Math.max(0, Math.min(spreads.length - 1, next));
  if (next === i) return;
  busy = true;
  const outClass = dir >= 0 ? "flip-out-next" : "flip-out-prev";
  pageEl.classList.remove("flip-in");
  pageEl.classList.add(outClass);
  window.setTimeout(() => {
    i = next;
    paint();
    pageEl.classList.remove(outClass);
    void pageEl.offsetWidth;
    pageEl.classList.add("flip-in");
    busy = false;
  }, 260);
}

prevBtn.addEventListener("click", () => go(i - 1, -1));
nextBtn.addEventListener("click", () => go(i + 1, 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    go(i + 1, 1);
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    go(i - 1, -1);
  }
});

let touchX = null;
let touchY = null;
stage.addEventListener(
  "touchstart",
  (e) => {
    touchX = e.changedTouches[0].clientX;
    touchY = e.changedTouches[0].clientY;
  },
  { passive: true }
);
stage.addEventListener(
  "touchend",
  (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    touchY = null;
    if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) go(i + 1, 1);
    else go(i - 1, -1);
  },
  { passive: true }
);

// Pointer drag (mouse + pen) for desktop swipe feel
let dragX = null;
stage.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "touch") return;
  if (e.target.closest("button")) return;
  dragX = e.clientX;
});
stage.addEventListener("pointerup", (e) => {
  if (dragX == null) return;
  const dx = e.clientX - dragX;
  dragX = null;
  if (Math.abs(dx) < 50) return;
  if (dx < 0) go(i + 1, 1);
  else go(i - 1, -1);
});

langToggle.addEventListener("click", () => {
  if (mode === "both") mode = "sy";
  else if (mode === "sy") mode = "en";
  else mode = "both";
  document.body.classList.toggle("sy-only", mode === "sy");
  document.body.classList.toggle("en-only", mode === "en");
  langToggle.textContent =
    mode === "both" ? "EN + SY" : mode === "sy" ? "SY only" : "EN only";
  langToggle.setAttribute("aria-pressed", mode !== "both" ? "true" : "false");
});

// Prefetch remaining spreads after first paint
paint();
window.setTimeout(() => {
  spreads.forEach((s, idx) => {
    if (idx === 0) return;
    const img = new Image();
    img.src = s.src;
  });
}, 200);
