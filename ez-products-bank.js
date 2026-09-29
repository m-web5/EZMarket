/* ez-products-bank.js — EZ Market extra product bank (80 products per category, 8 pages x 9)
   window.EZ_BANK.fill(catKey, existing, target) -> existing + generated products (no duplicate names)
   window.EZ_QUERY_EXTRA[name] -> precise English photo query, consumed by ez-media.js (real photos) */
(function(){
  "use strict";
  /* [Arabic name, English photo query, emoji, price SAR, store] */
  var B = {
    electronics:[
      ["سماعة أذن بلوتوث","bluetooth earbuds","🎧",129,"متجر الصوتيات"],["باور بانك 20000 مللي أمبير","power bank 20000mAh","🔌",119,"متجر الإكسسوارات"],
      ["كاميرا مراقبة منزلية","wifi home security camera","📷",189,"متجر الكاميرات"],["راوتر واي فاي 6","wifi 6 router","🖥️",259,"متجر الشبكات"],
      ["طابعة ليزر مكتبية","laser printer office","🖥️",699,"متجر الحواسيب"],["قرص تخزين خارجي 1TB","external hard drive 1TB","💻",279,"متجر الحواسيب"],
      ["فلاشة USB 128GB","usb flash drive 128GB","🔌",45,"متجر الإكسسوارات"],["ميكروفون USB للبث","usb condenser microphone","🎧",229,"متجر الصوتيات"],
      ["كاميرا ويب Full HD","full hd webcam","📷",149,"متجر الكاميرات"],["ستاند لابتوب ألمنيوم","aluminum laptop stand","💻",89,"متجر الإكسسوارات"],
      ["تلفزيون ذكي 50 بوصة","50 inch smart tv 4k","🖥️",1599,"متجر الشاشات"],["ساوند بار منزلي","soundbar home theater","🔊",549,"متجر الصوتيات"],
      ["يد تحكم ألعاب لاسلكية","wireless game controller","🎮",219,"متجر الألعاب"],["نظارة واقع افتراضي","vr headset","🎮",1199,"متجر الألعاب"],
      ["بروجيكتور منزلي صغير","mini portable projector","🖥️",699,"متجر الشاشات"],["لوحة رسم رقمية","graphics drawing tablet","💻",329,"متجر الحواسيب"],
      ["حامل شاشة مزدوج","dual monitor arm desk mount","🖥️",199,"متجر الإكسسوارات"],["كابل HDMI 4K","hdmi cable 4k braided","🔌",35,"متجر الإكسسوارات"]],
    phones:[
      ["شاومي ريدمي نوت 13","Xiaomi Redmi Note 13 smartphone","📱",849,"متجر الهواتف"],["هواوي نوفا 12","Huawei nova smartphone","📱",1099,"متجر الهواتف"],
      ["أونر ماجيك 6","Honor Magic smartphone","📱",2499,"متجر الهواتف"],["سامسونج جالاكسي A55","Samsung Galaxy A55","📱",1499,"متجر الهواتف"],
      ["آيباد ميني","iPad mini tablet","📲",2299,"بلو تك"],["ساعة ذكية للأطفال","kids gps smartwatch","⌚",199,"متجر الإكسسوارات"],
      ["غطاء حماية للهاتف","phone case protective","📱",39,"متجر الإكسسوارات"],["لاصقة حماية شاشة زجاجية","tempered glass screen protector","📱",25,"متجر الإكسسوارات"],
      ["حامل هاتف مكتبي","phone desk stand holder","📱",35,"متجر الإكسسوارات"],["سوار ذكي لللياقة","fitness band tracker","⌚",149,"متجر الإكسسوارات"],
      ["سماعة أذن ألعاب للجوال","mobile gaming earbuds","🎧",99,"متجر الصوتيات"],["كابل شحن سريع Type-C","usb-c fast charging cable","🔌",29,"متجر الإكسسوارات"],
      ["شاحن سيارة سريع","car phone charger usb","🔌",49,"متجر الإكسسوارات"],["ستاند شحن مغناطيسي","magsafe charging stand","🔌",119,"متجر الإكسسوارات"],
      ["عصا سيلفي بلوتوث","selfie stick tripod bluetooth","📷",59,"متجر الإكسسوارات"],["ذاكرة ميكرو SD 256GB","micro sd card 256GB","🔌",79,"متجر الإكسسوارات"],
      ["قلم لمس للأجهزة اللوحية","tablet stylus pen","📲",89,"متجر الإكسسوارات"],["ساعة ذكية بشاشة AMOLED","amoled smartwatch","⌚",449,"بلو تك"]],
    fashion:[
      ["بنطال جينز رجالي","men slim fit jeans","👔",159,"متجر الأزياء"],["ثوب رجالي صيفي","men white thobe","👔",189,"متجر الأزياء"],
      ["عباءة نسائية عصرية","women modern abaya black","👗",299,"متجر الموضة"],["حجاب شيفون","chiffon hijab scarf","👗",45,"متجر الموضة"],
      ["حذاء كلاسيكي جلد","men leather oxford shoes","👟",329,"متجر الأحذية"],["صندل نسائي مريح","women comfortable sandals","👟",119,"متجر الأحذية"],
      ["ساعة يد كلاسيكية","classic wristwatch leather strap","⌚",259,"متجر الإكسسوارات"],["حزام جلد رجالي","men leather belt","👔",79,"متجر الإكسسوارات"],
      ["حقيبة ظهر عملية","casual backpack","👜",149,"متجر الإكسسوارات"],["قبعة كاب رياضية","baseball cap","🧢",49,"متجر الأزياء"],
      ["تيشيرت بولو","men polo shirt","👕",85,"متجر الأزياء"],["هودي قطني","cotton hoodie","🧥",139,"متجر الأزياء"],
      ["فستان سهرة","women evening gown","👗",459,"متجر الموضة"],["طقم بيجامة قطن","cotton pajama set","👕",99,"متجر الأزياء"],
      ["شنطة كتف نسائية","women shoulder bag","👜",179,"متجر الإكسسوارات"],["قفازات وشال شتوي","winter gloves scarf set","🧤",69,"متجر الأزياء"],
      ["حذاء كاجوال أطفال","kids casual sneakers","👟",99,"متجر الأحذية"],["محفظة جلد رجالية","men leather wallet","👜",89,"متجر الإكسسوارات"]],
    home:[
      ["طقم فناجين قهوة","coffee cup set porcelain","☕",99,"متجر المنزل"],["ماكينة قهوة إسبريسو","espresso machine home","☕",899,"متجر الأجهزة"],
      ["قلاية هوائية 5 لتر","air fryer","🍳",349,"متجر الأجهزة"],["محضر طعام متعدد","food processor","🍳",279,"متجر الأجهزة"],
      ["طقم سكاكين مطبخ","kitchen knife set block","🍳",149,"متجر المطبخ"],["مجموعة حافظات طعام","food storage containers set","🍳",79,"متجر المطبخ"],
      ["مكواة بخار","steam iron","🧹",129,"متجر الأجهزة"],["مخدة طبية","memory foam pillow","🛏️",89,"متجر المنزل"],
      ["لحاف شتوي","winter duvet comforter","🛏️",249,"متجر المنزل"],["ستارة بلاك آوت","blackout curtains living room","🏠",139,"متجر المنزل"],
      ["سجادة صالون","living room area rug","🏠",349,"متجر المنزل"],["رف تخزين خشبي","wooden storage shelf","🪑",199,"متجر المنزل"],
      ["مرآة جدارية ديكور","decorative wall mirror","🏠",159,"متجر المنزل"],["فازة زهور زجاج","glass flower vase","🏠",49,"متجر المنزل"],
      ["طقم مناشف قطن","cotton bath towels set","🛏️",119,"متجر المنزل"],["ميزان مطبخ رقمي","digital kitchen scale","🍳",45,"متجر المطبخ"],
      ["منقي هواء منزلي","home air purifier","💨",599,"متجر الأجهزة"],["كرسي مكتب مريح","ergonomic office chair","🪑",549,"متجر المنزل"]],
    beauty:[
      ["غسول وجه لطيف","gentle face cleanser","🧴",59,"متجر الجمال"],["واقي شمس SPF50","sunscreen spf 50 tube","🧴",69,"متجر الجمال"],
      ["أحمر شفاه مطفي","matte lipstick","💄",49,"متجر الجمال"],["ماسكارا كثيفة","volumizing mascara","💄",55,"متجر الجمال"],
      ["باليت ظلال عيون","eyeshadow palette","💄",99,"متجر الجمال"],["كريم أساس","foundation makeup bottle","💄",89,"متجر الجمال"],
      ["زيت أرغان للشعر","argan hair oil","🌿",65,"متجر الجمال"],["شامبو بالكيراتين","keratin shampoo bottle","💇",75,"متجر الجمال"],
      ["ماسك طين للوجه","clay face mask","🌿",55,"متجر الجمال"],["عطر نسائي زهري","women floral perfume bottle","🌸",289,"متجر العطور"],
      ["بخور وعود فاخر","oud incense bakhoor","🌸",199,"متجر العطور"],["جهاز تنظيف الوجه","facial cleansing brush device","🧴",229,"متجر الجمال"],
      ["طلاء أظافر مجموعة","nail polish set","💄",59,"متجر الجمال"],["مقص وأدوات عناية","grooming kit trimmer","💇",149,"متجر الجمال"],
      ["ماكينة حلاقة كهربائية","electric shaver men","💇",249,"متجر الجمال"],["كريم يدين مرطب","hand cream tube","🧴",35,"متجر الجمال"],
      ["لوشن جسم بالشيا","shea body lotion","🧴",65,"متجر الجمال"],["سيروم هيالورونيك","hyaluronic acid serum","🧴",95,"متجر الجمال"]],
    sports:[
      ["كرة قدم احترافية","professional soccer ball","⚽",119,"متجر الرياضة"],["حقيبة رياضية","sports duffel gym bag","👜",129,"متجر الرياضة"],
      ["حبل قفز رياضي","jump rope fitness","🏋️",29,"متجر الرياضة"],["أشرطة مقاومة","resistance bands set","🏋️",59,"متجر الرياضة"],
      ["جهاز مشي كهربائي","home treadmill","🏋️",1599,"متجر الرياضة"],["دراجة ثابتة","stationary exercise bike","🚲",1199,"متجر الرياضة"],
      ["خوذة دراجة","bicycle helmet","🚵",149,"متجر الرياضة"],["ساعة رياضية GPS","gps running watch","⌚",599,"متجر الرياضة"],
      ["شنطة ماء ظهر للجري","running hydration vest","🥤",139,"متجر الرياضة"],["مضرب تنس","tennis racket","⚽",249,"متجر الرياضة"],
      ["كرة سلة","basketball","⚽",99,"متجر الرياضة"],["خيمة تخييم 4 أشخاص","camping tent 4 person","🏕️",449,"متجر الرياضة"],
      ["كيس نوم","sleeping bag outdoor","🏕️",189,"متجر الرياضة"],["مجموعة دمبل قابلة للتعديل","adjustable dumbbell","🏋️",499,"متجر الرياضة"],
      ["سجادة تمارين سميكة","thick exercise mat","🧘",79,"متجر الرياضة"],["ملابس رياضية رجالية","men sportswear set","👕",139,"متجر الرياضة"],
      ["نظارة سباحة","swimming goggles","🏊",39,"متجر الرياضة"],["قفازات ملاكمة","boxing gloves","🥊",149,"متجر الرياضة"]],
    kids:[
      ["مجموعة ليغو مدينة","lego city building set","🧱",199,"كيدز وورلد"],["سيارة تحكم عن بعد","remote control car toy","🚗",149,"كيدز وورلد"],
      ["دمية باربي","fashion doll toy","🧸",89,"كيدز وورلد"],["طقم أدوات مطبخ للأطفال","kids play kitchen set","🍳",139,"كيدز وورلد"],
      ["عربة أطفال خفيفة","lightweight baby stroller","🚼",599,"كيدز وورلد"],["سرير أطفال متنقل","portable baby crib","🛏️",449,"كيدز وورلد"],
      ["حقيبة مدرسية","kids school backpack","👜",99,"كيدز وورلد"],["ألوان مائية للأطفال","kids watercolor paint set","🎨",39,"كيدز وورلد"],
      ["كتاب قصص مصور","children picture book","📚",35,"كيدز وورلد"],["بازل خشبي 100 قطعة","wooden jigsaw puzzle kids","🧩",59,"كيدز وورلد"],
      ["دب محشو كبير","large teddy bear plush","🧸",119,"كيدز وورلد"],["مسبح أطفال قابل للنفخ","inflatable kids pool","🏊",129,"كيدز وورلد"],
      ["سكوتر أطفال","kids kick scooter","🛴",179,"كيدز وورلد"],["زجاجة رضاعة","baby feeding bottle set","🍼",49,"كيدز وورلد"],
      ["ملابس مواليد قطن","newborn cotton bodysuit set","👕",79,"كيدز وورلد"],["لعبة روبوت تعليمي","educational robot toy","🤖",249,"كيدز وورلد"],
      ["خيمة لعب للأطفال","kids play tent","🏕️",99,"كيدز وورلد"],["جهاز بيانو صغير","kids toy piano keyboard","🎹",129,"كيدز وورلد"]],
    auto:[
      ["مقعد سيارة مريح","car seat cover","🚗",199,"متجر السيارات"],["إطارات سيارة","car tires","🚗",399,"متجر السيارات"],
      ["مضخة إطارات محمولة","portable tire inflator","💨",159,"متجر السيارات"],["كابلات تشغيل البطارية","jumper cables","🔌",79,"متجر السيارات"],
      ["غطاء سيارة واقٍ","car cover","🚗",149,"متجر السيارات"],["منظف داخلي للسيارة","car interior cleaner","🧽",39,"متجر السيارات"],
      ["ممسحة زجاج سيارة","car wiper blades","🚗",59,"متجر السيارات"],["عطر سيارة","car air freshener","🌸",25,"متجر السيارات"],
      ["حصيرة أرضية للسيارة","car floor mats","🚗",129,"متجر السيارات"],["ستارة شمسية للزجاج","car windshield sun shade","🚗",35,"متجر السيارات"],
      ["كشاف LED للسيارة","led work light car","💡",89,"متجر السيارات"],["جهاز تتبع GPS","gps tracker car","📍",199,"متجر السيارات"],
      ["شاحن USB للسيارة","car usb charger","🔌",29,"متجر السيارات"],["زيت محرك 5W-30","engine oil 5w30","🛢️",149,"متجر السيارات"],
      ["منظم صندوق السيارة","car trunk organizer","🚗",69,"متجر السيارات"],["مرآة رؤية خلفية إضافية","car rear view mirror","🚗",79,"متجر السيارات"],
      ["شنطة إسعاف للسيارة","car first aid kit emergency","🚗",89,"متجر السيارات"],["قفل مقود السيارة","steering wheel lock","🔒",99,"متجر السيارات"]],
    tools:[
      ["دريل كهربائي لاسلكي","cordless drill","🪛",349,"متجر الأدوات"],["مطرقة فولاذية","steel claw hammer","🔧",39,"متجر الأدوات"],
      ["متر قياس ليزر","laser distance measure","🔧",129,"متجر الأدوات"],["سلم ألمنيوم قابل للطي","folding aluminum ladder","🪜",349,"متجر الأدوات"],
      ["مجموعة كماشات","pliers set","🔧",89,"متجر الأدوات"],["ماكينة لحام صغيرة","inverter welding machine","🔥",599,"متجر الأدوات"],
      ["صندوق أدوات كبير","large tool box","🛠️",149,"متجر الأدوات"],["مسدس غراء حراري","hot glue gun","🔧",45,"متجر الأدوات"],
      ["مثقاب خرسانة","rotary hammer drill","🪛",499,"متجر الأدوات"],["جلاخة زاوية","angle grinder","🪚",259,"متجر الأدوات"],
      ["طقم براغي وصواميل","screws nuts bolts assortment kit","🔩",59,"متجر الأدوات"],["نظارات وقفازات حماية","safety glasses gloves work","🧤",49,"متجر الأدوات"],
      ["ميزان مياه","spirit level tool","🔧",35,"متجر الأدوات"],["مقص تقليم أشجار","pruning shears garden","🌿",65,"متجر الأدوات"],
      ["جهاز رش ضغط عالي","pressure washer","💨",699,"متجر الأدوات"],["مصباح عمل LED","led work light stand","💡",99,"متجر الأدوات"],
      ["مسطرة ومنقلة هندسية","engineer ruler square","📏",29,"متجر الأدوات"],["ضاغط هواء صغير","small air compressor","💨",449,"متجر الأدوات"]],
    deals:[
      ["سماعة رأس لاسلكية مخفّضة","wireless headphones sale","🎧",199,"متجر الصوتيات"],["ساعة ذكية عرض خاص","smartwatch deal","⌚",249,"بلو تك"],
      ["حذاء رياضي بخصم","sneakers discount","👟",179,"متجر الأحذية"],["خلاط عصير عرض","blender juicer","🍳",149,"متجر الأجهزة"],
      ["سيروم عرض العناية","face serum skincare","🧴",59,"متجر الجمال"],["ميزان ذكي للجسم","smart body scale","🏋️",99,"متجر الرياضة"],
      ["لعبة تركيب عرض","building toy set","🧩",79,"كيدز وورلد"],["كاميرا سيارة عرض","car dash camera","📷",179,"متجر السيارات"],
      ["مجموعة عدة يدوية","hand tool set","🛠️",129,"متجر الأدوات"],["حقيبة يد بخصم","women tote handbag","👜",149,"متجر الإكسسوارات"],
      ["مكنسة روبوت ذكية","robot vacuum cleaner","🧹",899,"متجر الأجهزة"],["شاشة ألعاب منحنية","curved gaming monitor","🖥️",999,"متجر الشاشات"],
      ["عطر رجالي عرض","men perfume bottle","🌸",199,"متجر العطور"],["طقم أسرّة قطن عرض","cotton bedding set","🛏️",199,"متجر المنزل"],
      ["دراجة كهربائية للأطفال","kids electric bike","🚲",699,"كيدز وورلد"],["مروحة تبريد محمولة","portable cooling fan","💨",79,"متجر الأجهزة"],
      ["ثلاجة صغيرة مكتبية","mini fridge","🏠",449,"متجر الأجهزة"],["جهاز تدليك محمول","handheld massager","💆",129,"متجر الجمال"]]
  };
  /* variants: name suffix, price factor, photo-query modifier */
  var V = [["",1,""],[" — نسخة بريميوم",1.35,"premium"],[" — نسخة اقتصادية",0.75,"budget affordable"],[" — الإصدار الجديد",1.15,"new model 2025"]];
  var TINT = ["--primary-tint","--accent-tint","--sale-tint"], BADGE = [null,"sale","new",null,"best",null,"sale",null,null,"new"];
  window.EZ_QUERY_EXTRA = window.EZ_QUERY_EXTRA || {};

  function gen(cat){
    var out = [], bases = B[cat] || [], n = 0;
    V.forEach(function(v, vi){
      bases.forEach(function(b, bi){
        var seed = (bi * 7 + vi * 13 + cat.length * 5) % 10;
        var price = Math.max(9, Math.round(b[3] * v[1] / 5) * 5 - (b[3] * v[1] < 100 ? 1 : 0));
        var sale = BADGE[seed] === "sale" || (vi === 2 && seed % 2 === 0);
        var name = b[0] + v[0];
        window.EZ_QUERY_EXTRA[name] = (b[1] + " " + v[2]).trim();
        out.push({name:name, store:b[4], price:price, oldPrice:sale ? Math.round(price * 1.25 / 5) * 5 : null,
          rating:Math.round((4.0 + ((seed * 3 + bi + vi) % 10) / 11) * 10) / 10, reviews:20 + ((bi * 53 + vi * 91 + seed * 37) % 800),
          emoji:b[2], tint:TINT[(bi + vi) % 3], badge:sale ? "sale" : (BADGE[seed] || null), stock:(bi + vi) % 7 === 3 ? "low" : "in"});
      });
    });
    return out;
  }
  /* register queries for all categories up-front (so every page's photos resolve) */
  Object.keys(B).forEach(gen);

  window.EZ_BANK = {
    cats:Object.keys(B),
    fill:function(cat, existing, target){
      var list = (existing || []).slice(), seen = {};
      list.forEach(function(p){ seen[p.name] = 1; });
      gen(cat).forEach(function(p){ if(list.length < target && !seen[p.name]){ seen[p.name] = 1; list.push(p); } });
      return list;
    },
    get:gen
  };
})();
