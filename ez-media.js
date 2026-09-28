/* ez-media.js — EZ Market shared product-media engine
   1) Replaces the emoji in every product slot (cards, cart, seller, related...) with a real photo
   2) Product page: multi-image gallery (thumbnails, slide/fade transitions, arrows, swipe, keyboard)
   3) Magnifier lens whenever the mouse hovers a product image
   Each product name maps to a precise English photo query in EZ_QUERY (add new products there).
   If an image fails to load, it falls back to another source, then to the emoji tile (never a broken image). */
(function(){
  "use strict";

  /* emoji -> up to 4 single-word photo keywords (first = main image, others = extra gallery angles) */
  var KW = {
    "📱":["smartphone","mobile","phone","tablet"], "📲":["smartphone","phone","mobile","app"],
    "💻":["laptop","notebook","computer","workspace"], "🖥️":["monitor","computer","display","desktop"],
    "🎧":["headphones","earphones","headset","audio"], "🎮":["headset","gaming","gamepad","controller"],
    "⌚":["smartwatch","wristwatch","watch","wearable"], "📷":["camera","photography","lens","vintage"],
    "🔊":["speaker","bluetooth","audio","music"], "⌨️":["keyboard","keys","typing","computer"],
    "🖱️":["mouse","computer","wireless","desk"], "🔌":["charger","cable","usb","adapter"],
    "🧴":["skincare","lotion","cosmetics","moisturizer"], "💄":["lipstick","makeup","cosmetics","beauty"],
    "🌸":["perfume","fragrance","flowers","bottle"], "💇":["hairdryer","haircare","salon","hairbrush"],
    "🌿":["herbal","natural","plants","skincare"],
    "👟":["sneakers","shoes","running","footwear"], "👗":["dress","fashion","clothing","woman"],
    "🧥":["jacket","coat","outerwear","winter"], "👔":["shirt","formal","tie","menswear"],
    "👕":["tshirt","clothing","fashion","cotton"], "👜":["handbag","bag","purse","leather"],
    "🕶️":["sunglasses","glasses","eyewear","fashion"], "🧤":["gloves","winter","scarf","accessories"],
    "🍳":["cookware","pan","kitchen","cooking"], "🧹":["broom","cleaning","vacuum","housekeeping"],
    "🧽":["sponge","cleaning","dishes","kitchen"], "☕":["coffee","mug","espresso","cup"],
    "🛏️":["bed","bedding","bedroom","pillow"], "🪑":["chair","furniture","armchair","interior"],
    "🏠":["interior","livingroom","decor","home"], "💡":["lamp","lighting","bulb","desklamp"],
    "🧩":["puzzle","toy","educational","kids"], "🧸":["teddy","plush","toy","kids"],
    "🚼":["stroller","baby","infant","nursery"], "🎨":["paint","art","crayons","drawing"],
    "🖌️":["paintbrush","brush","painting","art"],
    "🚗":["car","automobile","interior","driving"], "🚲":["bicycle","bike","cycling","road"],
    "🚵":["mountainbike","bicycle","cycling","trail"], "🏋️":["dumbbells","gym","fitness","weights"],
    "🧘":["yoga","mat","fitness","exercise"], "⚽":["soccer","football","ball","sports"],
    "🥤":["smoothie","bottle","cup","drink"], "🧃":["juice","drink","bottle","beverage"],
    "🚰":["waterbottle","thermos","bottle","steel"],
    "🛠️":["tools","toolbox","workshop","hardware"], "🔧":["wrench","spanner","tools","mechanic"],
    "🪛":["screwdriver","tools","screws","workshop"], "🪚":["saw","woodworking","tools","carpentry"],
    "🔩":["bolts","screws","hardware","nuts"], "🧱":["bricks","construction","cement","building"],
    "💨":["fan","compressor","airpump","tool"], "🔥":["heater","stove","grill","fire"],
    "🏷️":["shopping","sale","store","retail"]
  };

  /* Arabic product name -> precise English photo query (real product photos matched to each product) */
  var EZ_QUERY = {
    /* electronics */
    "سماعة بلوتوث إلغاء ضوضاء":"wireless noise cancelling over-ear headphones black",
    "سماعة بلوتوث لاسلكية بخاصية إلغاء الضوضاء":"wireless noise cancelling over-ear headphones black",
    "هاتف ذكي كاميرا مزدوجة 128GB":"smartphone dual camera android phone",
    "لابتوب رفيع للأعمال i7":"slim business laptop silver ultrabook",
    "ساعة ذكية جيل 5":"smartwatch black wrist",
    "شاشة كمبيوتر 27 بوصة 4K":"27 inch 4K computer monitor desk",
    "شاشة كمبيوتر 27 بوصة":"27 inch computer monitor desk",
    "كاميرا فورية كلاسيكية":"instant film camera classic polaroid",
    "مكبر صوت لاسلكي محمول":"portable bluetooth speaker",
    "جهاز تابلت 10 بوصة":"tablet 10 inch touchscreen",
    "لوحة مفاتيح ميكانيكية":"mechanical keyboard rgb",
    "ماوس لاسلكي مريح":"ergonomic wireless mouse",
    "شاحن سريع 65 واط":"65W fast usb-c charger adapter",
    "سماعة رأس للألعاب":"gaming headset with microphone",
    /* phones */
    "آيفون 15 برو 256GB":"iPhone 15 Pro titanium",
    "سامسونج جالاكسي S24":"Samsung Galaxy S24 smartphone",
    "ساعة ذكية رياضية":"sports smartwatch fitness tracker",
    "جهاز لوحي 11 بوصة":"11 inch tablet with stylus",
    "سماعة أذن لاسلكية":"true wireless earbuds charging case",
    "شاحن لاسلكي سريع":"wireless charging pad phone",
    "سماعة أذن رياضية مقاومة للماء":"waterproof sport wireless earbuds",
    /* fashion */
    "قميص رجالي قطني":"men cotton dress shirt",
    "فستان صيفي نسائي":"women summer dress floral",
    "حذاء رياضي خفيف":"lightweight running sneakers white",
    "حقيبة يد جلدية":"leather handbag women",
    "جاكيت شتوي":"winter jacket puffer coat",
    "سترة شتوية دافئة":"warm winter puffer jacket",
    "نظارة شمسية عصرية":"trendy sunglasses",
    /* home */
    "طقم أواني طهي 10 قطع":"stainless steel cookware set pots pans",
    "خلاط كهربائي متعدد":"electric blender kitchen",
    "مكنسة كهربائية لاسلكية":"cordless stick vacuum cleaner",
    "طقم شراشف قطن":"cotton bed sheets set bedroom",
    "إبريق قهوة كهربائي":"electric kettle coffee",
    "مصباح ديكور خشبي":"wooden decorative table lamp",
    "مصباح مكتب ذكي":"led desk lamp modern",
    /* beauty */
    "سيروم فيتامين C":"vitamin C serum dropper bottle",
    "طقم مكياج كامل":"makeup set palette brushes lipstick",
    "عطر فاخر 100مل":"luxury perfume bottle 100ml",
    "عطر رجالي فاخر":"men luxury cologne perfume bottle",
    "مجفف شعر احترافي":"professional hair dryer",
    "مكواة شعر احترافية":"hair straightener flat iron",
    "كريم مرطب للوجه":"face moisturizer cream jar",
    "فرشاة مكياج طقم":"makeup brush set",
    /* sports */
    "دراجة هوائية جبلية":"mountain bike",
    "حذاء جري احترافي":"professional running shoes",
    "سجادة يوغا مانعة انزلاق":"yoga mat rolled",
    "طقم أوزان منزلية":"home dumbbell set weights",
    "زجاجة رياضية حرارية":"insulated stainless steel sports water bottle",
    "زجاجة مياه رياضية":"sports water bottle",
    "قفازات تمرين":"gym workout gloves",
    /* kids */
    "مكعبات بناء تعليمية":"colorful wooden building blocks toy",
    "دراجة أطفال 3 عجلات":"kids tricycle three wheel bike",
    "دمية تفاعلية ناطقة":"interactive talking plush toy",
    "طقم سيارات صغيرة":"toy cars set die-cast",
    "كرسي أطفال للسيارة":"child car seat",
    "لوح رسم مغناطيسي":"magnetic drawing board kids",
    "لعبة تركيب تعليمية":"educational puzzle toy kids",
    /* auto */
    "حامل هاتف للسيارة":"car phone holder dashboard mount",
    "طقم عناية وتلميع":"car wax polish detailing kit",
    "كاميرا داش كام HD":"dash cam car camera",
    "أضواء LED أمامية":"LED car headlight bulbs",
    "مكنسة سيارة صغيرة":"handheld car vacuum cleaner",
    /* tools */
    "طقم أدوات صيانة":"tool kit set toolbox",
    "مفك كهربائي متعدد":"cordless electric screwdriver",
    "طقم مفكات يدوية":"screwdriver set hand tools",
    "منشار كهربائي دائري":"circular saw power tool",
    "طقم مفاتيح ربط":"wrench spanner set",
    "مضخة هواء كهربائية":"electric air pump compressor",
    "خرطوم ري حديقة":"garden hose watering"
  };
  var EZ_QUERY_KEYS = Object.keys(EZ_QUERY);

  /* ordered fallback: real-photo search thumbnail -> keyword photo -> (nothing: emoji tile stays, no broken image) */
  function photoChain(query, kw, w, h, seed){
    var q = encodeURIComponent(query);
    return [
      "https://tse" + (1 + seed % 4) + ".mm.bing.net/th?q=" + q + "&w=" + w + "&h=" + h + "&c=7&rs=1&p=0",
      "https://loremflickr.com/" + w + "/" + h + "/" + encodeURIComponent(kw) + "?lock=" + seed
    ];
  }
  /* try each URL in order; call onFail only when all failed */
  function loadChain(img, urls, onFail){
    var i = 0;
    img.onerror = function(){ i++; if(i < urls.length){ img.src = urls[i]; } else { img.onerror = null; if(onFail) onFail(); } };
    img.src = urls[0];
  }
  function findQuery(name){
    if(!name) return null;
    if(EZ_QUERY[name]) return EZ_QUERY[name];
    var best = null;
    EZ_QUERY_KEYS.forEach(function(k){
      if(name.indexOf(k) > -1 || (name.length > 7 && k.indexOf(name) > -1)){ if(!best || k.length > best.length) best = k; }
    });
    return best ? EZ_QUERY[best] : null;
  }

  function hash(str){ var h = 7; for(var i = 0; i < str.length; i++){ h = (h * 31 + str.charCodeAt(i)) % 9973; } return h; }
  function normEmoji(t){ return (t || "").replace(/\uFE0F/g, "").trim(); }
  var KWN = {}; Object.keys(KW).forEach(function(k){ KWN[normEmoji(k)] = KW[k]; });

  var VARIANTS = ["", " close up", " side view", " product photo white background"];
  function photoSet(emoji, name, w, h, count){
    var kws = KWN[normEmoji(emoji)], q = findQuery(name);
    if(!kws && !q) return null;
    var kw = kws ? kws[0] : "product", base = hash(name || emoji) % 80 + 1, out = [];
    for(var i = 0; i < count; i++){
      var query = (q || (kws ? kws.slice(0, 2).join(" ") : "product")) + VARIANTS[i % VARIANTS.length];
      out.push(photoChain(query, kws ? kws[i % kws.length] : kw, w, h, base + i * 7));
    }
    return out;
  }

  /* ---------- styles ---------- */
  var css = [
    ".ez-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0;transform:scale(1.06);transition:opacity .6s ease,transform 1s cubic-bezier(.22,.61,.36,1);z-index:1}",
    ".ez-photo.ez-in{opacity:1;transform:scale(1)}",
    ".product-media,.thumb,.gallery-main{position:relative}",
    ".thumb{overflow:hidden}",
    ".product-media .fav-btn,.product-media .badge{z-index:4}",
    ".tile.ez-has,.product-card:hover .product-media .tile.ez-has{transform:none!important}",
    ".ez-zoomable{cursor:crosshair}",
    ".ez-lens{position:absolute;z-index:3;border-radius:50%;pointer-events:none;border:3px solid #fff;",
    " box-shadow:0 10px 30px rgba(0,0,0,.35),0 0 0 1px rgba(0,0,0,.12);background-repeat:no-repeat;background-color:#fff;",
    " opacity:0;transform:scale(.4);transition:opacity .22s ease,transform .32s cubic-bezier(.34,1.56,.64,1)}",
    ".ez-lens.on{opacity:1;transform:scale(1)}",
    /* gallery */
    ".ez-stage{position:absolute;inset:0;overflow:hidden}",
    ".ez-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:translateX(var(--ez-dx,28px)) scale(1.04);",
    " transition:opacity .55s ease,transform .7s cubic-bezier(.22,.61,.36,1);will-change:transform,opacity}",
    ".ez-slide.cur{opacity:1;transform:none}",
    ".ez-slide.out{opacity:0;transform:translateX(calc(var(--ez-dx,28px) * -1)) scale(.98)}",
    ".ez-arrow{position:absolute;top:50%;z-index:5;width:40px;height:40px;margin-top:-20px;border-radius:50%;border:0;background:rgba(255,255,255,.92);",
    " color:#222;font-size:1.3rem;line-height:1;box-shadow:0 4px 14px rgba(0,0,0,.2);opacity:0;transition:opacity .25s,transform .2s;cursor:pointer}",
    ".gallery-main:hover .ez-arrow{opacity:1}.ez-arrow:hover{transform:scale(1.1)}",
    ".ez-prev{inset-inline-start:12px}.ez-next{inset-inline-end:12px}",
    ".ez-count{position:absolute;bottom:12px;inset-inline-start:12px;z-index:5;background:rgba(0,0,0,.55);color:#fff;font-size:.74rem;padding:3px 10px;border-radius:99px}",
    ".gallery-main .badge{z-index:5}",
    ".gallery-thumbs button.ez-th{padding:0;overflow:hidden;position:relative;transform:translateY(8px);opacity:0;animation:ezUp .5s ease forwards;transition:border-color .2s,transform .25s,box-shadow .25s}",
    ".gallery-thumbs button.ez-th:hover{transform:translateY(-3px);box-shadow:0 6px 16px rgba(0,0,0,.18)}",
    ".gallery-thumbs button.ez-th img{width:100%;height:100%;object-fit:cover;display:block}",
    ".gallery-thumbs button.ez-th.active{border-color:var(--primary);box-shadow:0 0 0 2px var(--primary-tint,#fde)}",
    "@keyframes ezUp{to{transform:none;opacity:1}}",
    "@media (prefers-reduced-motion:reduce){.ez-photo,.ez-slide,.ez-lens{transition:none}.ez-photo{transform:none}}"
  ].join("\n");
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- magnifier lens ---------- */
  function attachLens(box, opts){
    if(box._ezLens) return; box._ezLens = true;
    var size = opts.size, zoom = opts.zoom, lens = null;
    box.classList.add("ez-zoomable");
    function srcNow(){ return opts.src ? opts.src() : ""; }
    box.addEventListener("pointerenter", function(e){
      if(e.pointerType !== "mouse") return;
      var s = srcNow(); if(!s) return;
      lens = document.createElement("div"); lens.className = "ez-lens";
      lens.style.width = lens.style.height = size + "px";
      lens.style.backgroundImage = "url('" + s + "')";
      box.appendChild(lens); move(e); requestAnimationFrame(function(){ lens && lens.classList.add("on"); });
    });
    function move(e){
      if(!lens) return;
      var r = box.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      lens.style.left = (x - size / 2) + "px"; lens.style.top = (y - size / 2) + "px";
      lens.style.backgroundSize = (r.width * zoom) + "px " + (r.height * zoom) + "px";
      lens.style.backgroundPosition = (size / 2 - x * zoom) + "px " + (size / 2 - y * zoom) + "px";
    }
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", function(){
      if(!lens) return; var l = lens; lens = null; l.classList.remove("on");
      setTimeout(function(){ l.remove(); }, 260);
    });
  }

  /* ---------- product slots (cards, cart, seller, related...) ---------- */
  var SLOT = ".product-media .tile, .product-media, .cart-item .thumb, .saved-card .thumb, .low-stock-item .thumb, .prod-cell .thumb";
  function ownText(el){
    var t = ""; for(var n = el.firstChild; n; n = n.nextSibling){ if(n.nodeType === 3) t += n.nodeValue; } return t;
  }
  function slotName(el){
    var c = el.closest(".product-card,.cart-item,.saved-card,.low-stock-item,tr,.prod-cell") || el.parentNode;
    var n = c && c.querySelector(".product-name,.name,.info b,.info,b"); return n ? n.textContent.trim().slice(0, 60) : "";
  }
  function enhanceSlot(el){
    if(el._ezDone) return;
    if(el.matches(".product-media") && el.querySelector(".tile")) return;        /* .tile handles it */
    if(el.querySelector(".ez-photo,.product-photo")){ el._ezDone = true; hookLens(el); return; }
    var emoji = ownText(el).trim(); if(!emoji || !KWN[normEmoji(emoji)]) return;
    el._ezDone = true;
    var big = el.matches(".product-media,.tile");
    var urls = photoSet(emoji, slotName(el), big ? 600 : 160, big ? 600 : 160, 1); if(!urls) return;
    var img = new Image(); img.className = "ez-photo"; img.alt = slotName(el); img.loading = "lazy"; img.decoding = "async";
    img.onload = function(){ requestAnimationFrame(function(){ img.classList.add("ez-in"); }); };
    el.appendChild(img); el.classList.add("ez-has"); hookLens(el);
    loadChain(img, urls[0], function(){ img.remove(); el.classList.remove("ez-has"); });
  }
  function hookLens(el){
    var box = el.matches(".tile") ? el.closest(".product-media") : (el.matches(".product-media") ? el : null);
    if(!box) return;
    attachLens(box, { size: 110, zoom: 2.2, src: function(){
      var i = box.querySelector(".ez-photo.ez-in,.product-photo"); return i ? (i.currentSrc || i.src) : "";
    }});
  }

  /* ---------- product page gallery ---------- */
  function buildGallery(){
    var main = document.getElementById("gallery-main"), thumbs = document.querySelector(".gallery-thumbs");
    if(!main || !thumbs || main._ezG) return; main._ezG = true;
    var eEl = document.getElementById("gallery-emoji");
    var emoji = eEl ? eEl.textContent.trim() : "🎧";
    var titleEl = document.querySelector(".pdp-title"), name = titleEl ? titleEl.textContent.trim() : emoji;
    var big = photoSet(emoji, name, 900, 900, 4), small = photoSet(emoji, name, 200, 200, 4);
    if(!big) return;
    if(eEl) eEl.style.display = "none";
    var stage = document.createElement("div"); stage.className = "ez-stage"; main.appendChild(stage);
    var slides = big.map(function(u, i){
      var im = new Image(); im.className = "ez-slide"; im.alt = ""; im.decoding = "async";
      stage.appendChild(im);
      loadChain(im, u, function(){ im.dataset.bad = "1"; im.style.display = "none"; if(!stage.querySelector(".ez-slide:not([data-bad])")){ stage.remove(); if(eEl) eEl.style.display = ""; } });
      return im;
    });
    var prev = document.createElement("button"), next = document.createElement("button"), count = document.createElement("span");
    prev.className = "ez-arrow ez-prev"; prev.innerHTML = "&#8250;"; prev.setAttribute("aria-label", "السابقة");
    next.className = "ez-arrow ez-next"; next.innerHTML = "&#8249;"; next.setAttribute("aria-label", "التالية");
    count.className = "ez-count"; main.appendChild(prev); main.appendChild(next); main.appendChild(count);
    thumbs.innerHTML = "";
    var btns = small.map(function(u, i){
      var b = document.createElement("button"); b.type = "button"; b.className = "ez-th"; b.style.animationDelay = (i * 80) + "ms";
      var ti = new Image(); ti.alt = ""; b.appendChild(ti); loadChain(ti, u, function(){ ti.remove(); }); b.addEventListener("click", function(){ go(i); });
      b.addEventListener("mouseenter", function(){ if(matchMedia("(hover:hover)").matches) go(i); });
      thumbs.appendChild(b); return b;
    });
    var cur = -1;
    function go(i, dir){
      i = (i + slides.length) % slides.length; if(i === cur) return;
      var d = dir || (cur < 0 || i > cur ? 1 : -1); main.style.setProperty("--ez-dx", (28 * d) + "px");
      slides.forEach(function(s, k){ s.classList.toggle("out", k === cur); if(k !== i) s.classList.remove("cur"); });
      slides[i].classList.remove("out"); requestAnimationFrame(function(){ slides[i].classList.add("cur"); });
      btns.forEach(function(b, k){ b.classList.toggle("active", k === i); });
      count.textContent = (i + 1) + " / " + slides.length; cur = i;
    }
    prev.addEventListener("click", function(){ go(cur - 1, -1); });
    next.addEventListener("click", function(){ go(cur + 1, 1); });
    main.tabIndex = 0;
    main.addEventListener("keydown", function(e){ if(e.key === "ArrowRight") go(cur - 1, -1); if(e.key === "ArrowLeft") go(cur + 1, 1); });
    var sx = null;                                                         /* touch swipe */
    main.addEventListener("touchstart", function(e){ sx = e.touches[0].clientX; }, { passive: true });
    main.addEventListener("touchend", function(e){
      if(sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
      if(Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
    go(0, 1);
    attachLens(main, { size: 170, zoom: 2.6, src: function(){ return slides[cur] ? slides[cur].currentSrc || slides[cur].src : ""; } });
  }

  /* ---------- run + watch for dynamically rendered cards ---------- */
  var queued = false;
  function scan(){
    queued = false; buildGallery();
    document.querySelectorAll(SLOT).forEach(enhanceSlot);
  }
  function queue(){ if(!queued){ queued = true; requestAnimationFrame(scan); } }
  function start(){
    scan();
    new MutationObserver(queue).observe(document.body, { childList: true, subtree: true });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
