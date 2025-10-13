// --- データ定義 (単語モード) ---
// 新しい単語リスト (ひらがな表記)
const words = [
  "あか", "あお", "うえ", "あい", "いえ", "えき", "くうこう", "き", "え", "かお",
  "いけ", "きかい", "かき", "いか", "かい", "あき", "さとう", "しお", "つくえ", "いす",
  "あし", "て", "くち", "せかい", "ざっし", "きって", "とけい", "かさ", "すし",
  "うさぎ", "ぞう", "した", "さかな", "にく", "いぬ", "ねこ", "ひこうき", "ふね",
  "ふうとう", "はがき", "はな", "どうぶつ", "ほし", "ひ", "ほね", "のど", "なべ",
  "おかね", "やま", "うみ", "くも", "ゆき", "め", "みみ", "ともだち", "きょうだい",
  "やさい", "くだもの", "たまご", "ぎゅうにゅう", "じしょ", "きょうしつ", "むし",
  "めがね", "くるま", "じてんしゃ", "でんしゃ", "かわ", "ひる", "よる", "ひらがな",
  "かんじ", "でんわ", "れいぞうこ", "おふろ", "くすり", "ぎんこう", "からだ", "みかん", "りんご"
];

// wordGroupsは不要になりました。プログラムが自動で判断します。

// --- データ定義 (かなモード) ---
// 濁音・半濁音・拗音を含む新しいかなマップ
const kanaMap = {
  a: { group: 'a', kana: 'あ' }, i: { group: 'a', kana: 'い' }, u: { group: 'a', kana: 'う' }, e: { group: 'a', kana: 'え' }, o: { group: 'a', kana: 'お' },
  ka: { group: 'a', kana: 'か' }, ki: { group: 'a', kana: 'き' }, ku: { group: 'a', kana: 'く' }, ke: { group: 'a', kana: 'け' }, ko: { group: 'a', kana: 'こ' },
  sa: { group: 'sa', kana: 'さ' }, shi: { group: 'sa', kana: 'し' }, su: { group: 'sa', kana: 'す' }, se: { group: 'sa', kana: 'せ' }, so: { group: 'sa', kana: 'そ' },
  ta: { group: 'sa', kana: 'た' }, chi: { group: 'sa', kana: 'ち' }, tsu: { group: 'sa', kana: 'つ' }, te: { group: 'sa', kana: 'て' }, to: { group: 'sa', kana: 'と' },
  na: { group: 'na', kana: 'な' }, ni: { group: 'na', kana: 'に' }, nu: { group: 'na', kana: 'ぬ' }, ne: { group: 'na', kana: 'ね' }, no: { group: 'na', kana: 'の' },
  ha: { group: 'na', kana: 'は' }, hi: { group: 'na', kana: 'ひ' }, fu: { group: 'na', kana: 'ふ' }, he: { group: 'na', kana: 'へ' }, ho: { group: 'na', kana: 'ほ' },
  ma: { group: 'ma', kana: 'ま' }, mi: { group: 'ma', kana: 'み' }, mu: { group: 'ma', kana: 'む' }, me: { group: 'ma', kana: 'め' }, mo: { group: 'ma', kana: 'も' },
  ya: { group: 'ma', kana: 'や' }, yu: { group: 'ma', kana: 'ゆ' }, yo: { group: 'ma', kana: 'よ' },
  ra: { group: 'rawa', kana: 'ら' }, ri: { group: 'rawa', kana: 'り' }, ru: { group: 'rawa', kana: 'る' }, re: { group: 'rawa', kana: 'れ' }, ro: { group: 'rawa', kana: 'ろ' },
  wa: { group: 'rawa', kana: 'わ' }, wo: { group: 'rawa', kana: 'を' }, n: { group: 'rawa', kana: 'ん' },
  ga: { group: 'a', kana: 'が' }, gi: { group: 'a', kana: 'ぎ' }, gu: { group: 'a', kana: 'ぐ' }, ge: { group: 'a', kana: 'げ' }, go: { group: 'a', kana: 'ご' },
  za: { group: 'sa', kana: 'ざ' }, ji: { group: 'sa', kana: 'じ' }, zu: { group: 'sa', kana: 'ず' }, ze: { group: 'sa', kana: 'ぜ' }, zo: { group: 'sa', kana: 'ぞ' },
  da: { group: 'sa', kana: 'だ' }, di: { group: 'sa', kana: 'ぢ' }, du: { group: 'sa', kana: 'づ' }, de: { group: 'sa', kana: 'で' }, do: { group: 'sa', kana: 'ど' },
  ba: { group: 'na', kana: 'ば' }, bi: { group: 'na', kana: 'び' }, bu: { group: 'na', kana: 'ぶ' }, be: { group: 'na', kana: 'べ' }, bo: { group: 'na', kana: 'ぼ' },
  pa: { group: 'na', kana: 'ぱ' }, pi: { group: 'na', kana: 'ぴ' }, pu: { group: 'na', kana: 'ぷ' }, pe: { group: 'na', kana: 'ぺ' }, po: { group: 'na', kana: 'ぽ' },
  kya: { group: 'a', kana: 'きゃ' }, kyu: { group: 'a', kana: 'きゅ' }, kyo: { group: 'a', kana: 'きょ' },
  gya: { group: 'a', kana: 'ぎゃ' }, gyu: { group: 'a', kana: 'ぎゅ' }, gyo: { group: 'a', kana: 'ぎょ' },
  sha: { group: 'sa', kana: 'しゃ' }, shu: { group: 'sa', kana: 'しゅ' }, sho: { group: 'sa', kana: 'しょ' },
  ja: { group: 'sa', kana: 'じゃ' }, ju: { group: 'sa', kana: 'じゅ' }, jo: { group: 'sa', kana: 'じょ' },
  cha: { group: 'sa', kana: 'ちゃ' }, chu: { group: 'sa', kana: 'ちゅ' }, cho: { group: 'sa', kana: 'ちょ' },
  dya: { group: 'sa', kana: 'ぢゃ' }, dyu: { group: 'sa', kana: 'ぢゅ' }, dyo: { group: 'sa', kana: 'ぢょ' },
  nya: { group: 'na', kana: 'にゃ' }, nyu: { group: 'na', kana: 'にゅ' }, nyo: { group: 'na', kana: 'にょ' },
  hya: { group: 'na', kana: 'ひゃ' }, hyu: { group: 'na', kana: 'ひゅ' }, hyo: { group: 'na', kana: 'ひょ' },
  bya: { group: 'na', kana: 'びゃ' }, byu: { group: 'na', kana: 'びゅ' }, byo: { group: 'na', kana: 'びょ' },
  pya: { group: 'na', kana: 'ぴゃ' }, pyu: { group: 'na', kana: 'ぴゅ' }, pyo: { group: 'na', kana: 'ぴょ' },
  mya: { group: 'ma', kana: 'みゃ' }, myu: { group: 'ma', kana: 'みゅ' }, myo: { group: 'ma', kana: 'みょ' },
  rya: { group: 'rawa', kana: 'りゃ' }, ryu: { group: 'rawa', kana: 'りゅ' }, ryo: { group: 'rawa', kana: 'りょ' }
};

// 逆引きマップを作成して、かな文字からローマ字キーを取得できるようにする
const kanaToRomajiMap = {};
for (const key in kanaMap) {
  kanaToRomajiMap[kanaMap[key].kana] = key;
}

const allKanas = Object.keys(kanaMap);

// --- 状態管理変数 ---
let availableWords = [];
let availableKanas = [];
let cardHistory = [];
let currentItem = ""; // 現在表示中のカード (単語モードではひらがな、かなモードではローマ字)
let isFlipped = false;
let currentMode = "word";

// --- モードと初期化 ---

function getMode() {
    const checkedRadio = document.querySelector('input[name="mode"]:checked');
    return checkedRadio ? checkedRadio.value : 'word';
}

function retry() {
    currentMode = getMode();
    cardHistory = [];
    currentItem = "";
    isFlipped = false;
    filterAvailableItems();
    document.getElementById("cardArea").innerHTML = "";
    updateCard();
}

// チェックボックスの状態に基づき、利用可能なリストを更新
function filterAvailableItems() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedGroups = Array.from(checkboxes).map(cb => cb.value);

    // 単語モードのフィルタリング（自動化）
    availableWords = words.filter(word => {
        const firstKana = word.charAt(0); // 単語の最初のかな文字を取得
        const romajiKey = kanaToRomajiMap[firstKana]; // かな文字からローマ字キーを取得
        if (romajiKey && kanaMap[romajiKey]) {
            const group = kanaMap[romajiKey].group; // ローマ字キーからグループを取得
            return selectedGroups.includes(group); // 選択されたグループに含まれているか判定
        }
        return false;
    });

    // かなモードのフィルタリング
    availableKanas = allKanas.filter(item => {
        return selectedGroups.includes(kanaMap[item].group);
    });
}

// --- カード操作 ---

function updateCard() {
    if (currentItem) {
        cardHistory.push(currentItem);
    }
    
    const selectedGroups = document.querySelectorAll('input[type="checkbox"]:checked');
    if (selectedGroups.length === 0) {
        document.getElementById("cardArea").innerHTML = "<p>チェックを入れてください</p>";
        document.getElementById("retry").style.display = "none";
        return;
    }

    let availableList = currentMode === "word" ? availableWords : availableKanas;
    let filtered = availableList.filter(item => !cardHistory.includes(item));

    if (filtered.length === 0) {
        document.getElementById("cardArea").innerHTML = `<p>${currentMode === "word" ? "すべての単語" : "すべてのかな"}を表示しました！</p>`;
        document.getElementById("retry").style.display = "inline-block";
        currentItem = "";
        return;
    }

    const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
    currentItem = randomItem;
    isFlipped = false;

    renderCard();
    document.getElementById("retry").style.display = "none";
}

function previousCard() {
    if (cardHistory.length === 0) {
        return;
    }
    currentItem = cardHistory.pop();
    isFlipped = false;
    renderCard();
    document.getElementById("retry").style.display = "none";
}

// カードをレンダリングする関数 (画像パスを修正)
function renderCard() {
    if (!currentItem) return;
    
    let baseName;
    let folder;
    let suffix = isFlipped ? `-roma.png` : `-kana.png`;
    
    if (currentMode === "word") {
        folder = 'tango';
        baseName = currentItem; // currentItemはひらがな単語 (例: "あか")
    } else { // kanaモード
        folder = 'hiragana';
        baseName = kanaMap[currentItem].kana; // currentItemはローマ字 (例: "a")、そこからかな文字を取得
    }

    const imagePath = `image/${folder}/${baseName}${suffix}`;

    document.getElementById("cardArea").innerHTML = `
        <img id="card" src="${imagePath}" alt="カード"
             onclick="flipCard()"
             onerror="this.style.border='3px solid red'; console.error('画像が読み込めません: ' + this.src);">
    `;
}

function flipCard() {
    if (!currentItem) return;
    isFlipped = !isFlipped;
    renderCard();
}

// --- キーボード操作のイベントリスナー ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        updateCard();
        e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
        previousCard();
        e.preventDefault();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        flipCard();
        e.preventDefault();
    }
});

// --- 初期化 ---
filterAvailableItems();
updateCard();
