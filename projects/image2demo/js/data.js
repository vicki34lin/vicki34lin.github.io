/**
 * 作品集資料
 *
 * 每筆資料結構：
 * {
 *   id:      唯一識別碼（數字）
 *   title:   作品標題
 *   inputs:  輸入圖片路徑陣列（一張或多張）
 *   prompt:  使用的 prompt 文字
 *   tags:    關鍵字標籤陣列（可省略）
 *   outputs: 生成結果圖片路徑陣列
 * }
 */
const portfolioData = [
  {
    id: 1,
    title: "Sailors' Open 2026 網球球員資料卡",
    inputs: [
      "assets/input/input-1.jpg"
    ],
    prompt: `請根據我上傳的人像照片與個人資料，生成一張一頁式個人網球資料卡。比例 9:16 直式，風格為高級雜誌內頁 × 網球球齡簡介 × 資訊圖表。
參考內容如下： 我是 Vicki Lin，為了公司的 Sailors' Open 2026 網球賽開始勤練網球，在這之前只有大學曾經上過一學期的網球初級，這次重新拿起網球拍後球齡三個月，常出沒在彩虹河濱公園、道南河濱公園。教練是 Jason Lin。
2026.01 成立公司網球社，建立基礎
2026.02 報名 Sailors Open
2026.06 賽事開打
過去四週：
- 練球 12+ 小時
- 擊球 1000+`,
    tags: ["個人品牌"],
    outputs: [
      "assets/output/output-1.jpg"
    ]
  },
  {
    id: 2,
    title: "個人髮型分析指南",
    inputs: [
      "assets/input/input-2.jpg"
    ],
    prompt: `請根據我上傳的人像照片，製作一張高質感「個人髮型分析」圖卡。圖卡請保留主角原本五官、臉型與真實特徵，透過左右或並排對比方式，展示不同髮型套用在主角身上的效果，清楚區分「最適合」、「普通」與「不建議」髮型，讓人一眼看出哪些髮型最修飾臉型、提升氣質與整體顏值。可比較長髮、短髮、瀏海、捲髮、直髮、層次剪裁、綁髮造型等。版面設計需乾淨時尚、像專業造型顧問報告，整體以視覺呈現為主，只使用簡短標籤，不要加入長段文字。圖片成果需要高解析度，資訊清楚，適合社群分享。`,
    tags: ["形象顧問"],
    outputs: [
      "assets/output/output-2.jpg"
    ]
  },
  {
    id: 3,
    title: "個人品牌圖卡 — Vicki Lin",
    inputs: [
      "assets/input/input-3.jpg"
    ],
    prompt: `請根據我上傳的人像照片與個人資料，生成一張一頁式個人品牌圖卡。比例 9:16 直式，風格為高級雜誌內頁 × 個人品牌簡介 × 資訊圖表。色系使用奶油白、裸米色、淺灰、黑色與少量香檳金。人物照片作為大幅主視覺，占版面約 45%～60%，呈現自然、專業、親切、有個人品牌感的形象。 圖卡內容包含：我是誰、我的關鍵字、我在乎的事、我喜歡的溝通方式、和我合作的小提醒、我不喜歡的事、我的能量來源、我的日常偏好，以及一句代表我的標語。 文字全部使用繁體中文，內容精簡、有質感、有溫度。版面要像高級雜誌人物專題頁，每區清楚分隔，有留白，可使用細線、小圖示、編號與資訊卡片。整體視覺要清爽、現代、專業、可直接分享或列印。

避免：簡體字、亂碼、過多文字、過度磨皮、過度年輕化、卡通化、AI假臉、履歷表感。

文字內容如下：
Vicki Lin
把複雜變清楚，把想法變產品，把團隊帶向更聰明的工作方式

我是誰
Garena／Sea Group Web Development 團隊主管，帶領前端、後端、PM、QA，打造遊戲內與營運相關的網頁產品。熱衷把 AI 落地到團隊工作流中，提升協作效率與產出品質。
我的關鍵字
AI 實踐｜產品落地｜需求拆解｜團隊協作｜效率優化｜跨職能溝通｜創意企劃
我在乎的事
清楚的目標、可驗證的成果、有效率的協作，以及能被複用的方法。
我在乎的不只是把事情做完，而是讓團隊越做越聰明。
我喜歡的溝通方式
先結論、再背景；先問題、再選項；先對齊目標、再討論細節。
喜歡具體案例、明確假設、風險提醒與可行方案。
和我合作的小提醒
可以放心提出想法，但請帶著初步思考一起來。
我重視 ownership、主動同步、主動補位，也欣賞願意嘗試新工具、持續優化做法的人。
我不喜歡的事
模糊不清卻一路往前做、資訊不透明、只丟問題不想方案、風險太晚暴露，以及明明可以改善卻一直沿用低效舊流程。
我的能量來源
把模糊想法整理成清楚方向，並看著它變成可使用的產品、工具或流程。
也喜歡把 AI、遊戲、工具與日常需求串成有趣又實用的解法。
我的日常偏好
偏好有結構的工作節奏：清楚目標、明確優先級、可追蹤進度，以及能沉澱成文件、Checklist 或流程的知識。
更短的極簡版標語可以用這句：讓想法落地，讓團隊升級。`,
    tags: ["個人品牌"],
    outputs: [
      "assets/output/output-3.jpg"
    ]
  },
  {
    id: 4,
    title: "妝容分析指南 — 清冷文藝感",
    inputs: [
      "assets/input/input-4.jpg"
    ],
    prompt: `請根據我上傳的人像照片，製作一張高質感「妝容分析指南」資訊圖表，圖片需要專業，整體為中文版本，風格乾淨時尚、像美妝雜誌專欄。以上傳的圖片也就是原人物五官要基礎，保留真實長相與辨識度，不過度修圖。版面採視覺優先設計，重點用圖像呈現，文字精簡，不要長段落，成果圖片要適合社群分享。`,
    tags: ["形象顧問"],
    outputs: [
      "assets/output/output-4.jpg"
    ]
  },
  {
    id: 5,
    title: "個人色彩分析 — 淡柔夏日型",
    inputs: [
      "assets/input/input-5.jpg"
    ],
    prompt: `請根據我上傳的人像照片，幫我製作一張高質感個人色彩分析圖卡。請保留主角原本五官、膚色、臉型與真實特徵，透過左右或並排對比方式，展示不同服裝顏色穿在主角身上的效果，清楚區分「適合色」與「不適合色」，讓人一眼看出哪些顏色最襯膚色、提升氣色與整體質感。版面設計需乾淨時尚、像專業形象顧問報告，整體以視覺呈現為主，只使用簡短標籤（例如：推薦、普通、避免），不要加入長段文字。產出的圖片需要高解析度，專業且資訊清楚，適合社群分享。`,
    tags: ["形象顧問"],
    outputs: [
      "assets/output/output-5.jpg"
    ]
  },
  {
    id: 6,
    title: "餵兔兔的快樂時光",
    inputs: [
      "assets/input/input-6.JPG"
    ],
    prompt: `請先觀察照片中出現的每個元素，並針對這些內容加入有意義的手繪風註解。
【照片中的物件】
人、兔子
【繪製規則】
・使用像白色筆畫上去的細手繪線條
・線條要有隨手一筆畫出的感覺，略微粗細不均、自然隨性
・沿著物體外輪廓加上手繪描邊
・可搭配箭頭、虛線，讓畫面有視線引導感
【文字規則】
・使用手寫感的中文文字
・句子要短，像自言自語一樣自然
・語氣偏日記感、隨手記下心情的感覺，帶一點情緒與生活感
【文字內容生成規則】
・動物：描述外觀
例如：毛茸茸、可愛
・空間：描述氛圍與感受
例如：很放鬆、好喜歡這裡、空氣很舒服
・整體畫面：最後加一句總結式的小感想
例如：今天也太幸福了、這一刻很喜歡、好想停在這裡
【裝飾元素】
・可適度加入蒸氣、閃亮亮、小愛心、小表情符號等手繪裝飾
・不要加太多，保留一些留白，讓畫面看起來輕鬆舒服
【成品風格】
・整體要像 Instagram 限時動態的手寫塗鴉風
・也像雜誌上隨手寫下的靈感筆記
・氛圍要時髦、可愛、自然，不要太刻意`,
    tags: ["手繪風格"],
    outputs: [
      "assets/output/output-6.png"
    ]
  },
  {
    id: 7,
    title: "韓漫劇照 — 機場接機",
    inputs: [
      "assets/input/input-7.jpg"
    ],
    prompt: `生成一張韓國漫畫風格的劇照。
人物請根據我上傳的人像照片，移除識別證等不需要的配件。
機場接機的畫面，迎接的人是正面走過來。

搭配的文字如下：
我換了三套衣服才出門。 最後還是穿回那套 —— 奶茶色的針織上衣，格紋西裝外套，咖啡色短裙，黑色褲襪，白鞋。站在鏡子前看了一眼，這樣就夠了。 下午兩點多，機場的接機大廳人來人往。我把車停好，找了個位置坐著等，看著入境閘口一批批旅客走出來，拖著行李，被人群接住。 然後看到他了。 我在心裡說，嗯，就是今天了嗎。 是確認，也是問句。確認的是我自己，問的是他。`,
    tags: ["韓漫風格", "場景生成"],
    outputs: [
      "assets/output/output-7.png"
    ]
  },
  {
    id: 8,
    title: "湖畔水彩插畫",
    inputs: [
      "assets/input/input-8.jpg"
    ],
    prompt: `A luminous impressionistic watercolor-style illustration of a young woman (as the photo I uploaded and preserve facial features) standing on a lakeside shore beneath a leafy tree in bright summer sunlight. She is shown in side face, facing the camera, with her face mostly obscured by angle and light. Her dark brown hair is loosely gathered into a messy low ponytail with soft wisps blowing in the breeze. She wears a flowing ankle-length white dress with sheer, airy fabric and loose sleeves, gently billowing as if caught by a warm wind. One hand rests behind her on a dark rock or tree-rooted boulder at the left edge, while her body leans slightly back in a relaxed, reflective pose. The foreground is filled with a dense cluster of wild cosmos flowers in exactly 2 main colors, vivid orange and golden yellow, with thin green stems and a few tiny white blossoms mixed in. A large tree trunk rises on the left, and an overhead canopy of fresh green leaves filters sparkling sunlight, creating dappled light, glowing highlights, and soft bokeh-like flecks across the scene. To the right, calm turquoise-blue water stretches into the distance with pale ripples and a hazy shoreline or low mountains far away. Use a high-key palette of fresh greens, aqua, white, yellow, and orange; soft painterly brushwork; airy atmosphere; romantic seasonal feeling; elegant composition; vertical framing; detailed flowers in the foreground; bright natural backlighting; and a serene, dreamlike mood.`,
    tags: ["藝術插畫", "場景生成"],
    outputs: [
      "assets/output/output-8.png"
    ]
  },
  {
    id: 9,
    title: "花圃裡的小白兔",
    inputs: [
      "assets/input/input-9.JPEG"
    ],
    prompt: `請生成一張照片，並為寵物加上有手繪風格的註解，照片內容需要寵物和空間場景，要形容空間的氛圍，並且為心情進行總結，整體文字風格要可愛一點，帶有一些日系雜誌的筆記風格。`,
    tags: ["手繪風格"],
    outputs: [
      "assets/output/output-9.png",
      "assets/output/output-9-2.png"
    ]
  }
];
