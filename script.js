// --- データ定義 (単語モード) ---
const words = [
  "ai", "ike", "aka", "ao", "eki", "ie", "e", "kao", "kuukou", "kikai",
  "ki", "kai", "aki", "kaki", "ue", "satou", "shio", "tsukue", "isu",
  "ashi", "kuchi", "te", "sekai", "kasa", "zasshi", "kitte", "tokei",
  "shita", "sushi", "zou", "usagi", "ika"
];

// 単語の分類データ
const wordGroups = {
  ai: ["a"], ike: ["a"], ika: ["a"], aka: ["a"], ao: ["a"], eki: ["a"],
  ie: ["a"], e: ["a"], kao: ["a"], kuukou: ["a"], kikai: ["a"],
  ki: ["a"], kai: ["a"], aki: ["a"], kaki: ["a"], ue: ["a"],
  ashi: ["sa"], usagi: ["sa"], kuchi: ["sa"], kasa: ["sa"],
  satou: ["sa"], shio: ["sa"], tsukue: ["sa"], isu: ["sa"],
  te: ["sa"], sekai: ["sa"], zasshi: ["sa"], kitte: ["sa"],
  tokei: ["sa"], shita: ["sa"], sushi: ["sa"],
  zou: ["sa"]
};

// --- データ定義 (かなモード) ---
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
  wa: { group: 'rawa', kana: 'わ' }, o_wo: { group: 'rawa', kana: 'を' }, n: { group: 'rawa', kana: 'ん' }
};
const allKanas = Object.keys(kanaMap); 

// --- 状態管理変数 ---
let availableWords = []; // 現在のチェックボックス設定で表示可能な単語リスト
let availableKanas = []; // 現在のチェックボックス設定で表示可能なかなリスト
let cardHistory = []; // 表示したカードの履歴 (currentItemを格納)
let currentItem = ""; // 現在表示中のカード (ローマ字)
let isFlipped = false; 
let currentMode = "word"; 

// --- モードと初期化 ---

function getMode() {
    const checkedRadio = document.querySelector('input[name="mode"]:checked');
    return checkedRadio ? checkedRadio.value : 'word';
}

// 履歴をリセットし、利用可能なリストを再構築
function retry() {
    currentMode = getMode();
    cardHistory = [];
    currentItem = "";
    isFlipped = false;
    
    // フィルタリング処理を実行して、利用可能リストを更新
    filterAvailableItems();
    
    document.getElementById("cardArea").innerHTML = "";
    updateCard(); // 最初のカードを表示
}

// チェックボックスの状態に基づき、availableItemsを更新
function filterAvailableItems() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedGroups = Array.from(checkboxes).map(cb => cb.value);

    // 単語モードのフィルタリング
    availableWords = words.filter(item => {
        return wordGroups[item] && wordGroups[item].some(g => selectedGroups.includes(g));
    });

    // かなモードのフィルタリング
    availableKanas = allKanas.filter(item => {
        return selectedGroups.includes(kanaMap[item].group);
    });
}

// --- カード操作 ---
 
// 次のカードを表示 (→ キー)
function updateCard() {
    // 現在のカードを履歴に保存 (最初のロード時を除く)
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
    let shownItems = cardHistory.slice(); // 履歴にあるアイテム

    // 既に表示されたものを除外
    let filtered = availableList.filter(item => !shownItems.includes(item));

    // 完了チェック
    if (filtered.length === 0) {
      document.getElementById("cardArea").innerHTML = `<p>${currentMode === "word" ? "すべての単語" : "すべてのかな"}を表示しました！</p>`;
      document.getElementById("retry").style.display = "inline-block";
      currentItem = ""; // カードを空にする
      return;
    }

    // 新しいカードの選択と状態更新
    const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
    currentItem = randomItem;
    isFlipped = false; // 常に表面から開始

    renderCard();
    document.getElementById("retry").style.display = "none";
}

// 前のカードに戻る (← キー)
function previousCard() {
    if (cardHistory.length === 0) {
        return; // 履歴が空の場合は何もしない
    }
    
    // 履歴の末尾から一つ前のカードを取り出す
    currentItem = cardHistory.pop();
    
    isFlipped = false; 
    renderCard();
    document.getElementById("retry").style.display = "none";
}

// カードをレンダリングする関数
function renderCard() {
    if (!currentItem) return;
    
    let baseName;
    let suffix; 
    let imagePath;

    if (currentMode === "word") {
        baseName = currentItem;
        suffix = isFlipped ? `B.png` : `A.png`;
        imagePath = `images/${baseName}${suffix}`;
    } else { 
        const kanaChar = kanaMap[currentItem].kana; 
        if (!isFlipped) {
            suffix = `-kana.png`;
        } else {
            suffix = `-roma.png`;
        }
        imagePath = `images/${kanaChar}${suffix}`;
    }

    document.getElementById("cardArea").innerHTML = `
        <img id="card" src="${imagePath}" alt="カード"
             onclick="flipCard()"
             onerror="this.style.border='3px solid red'; console.error('画像が読み込めません: ' + this.src);">
    `;
}

// カードを裏返す関数
function flipCard() {
    if (!currentItem) return;
    isFlipped = !isFlipped;
    renderCard();
}
 
// --- キーボード操作のイベントリスナー ---
document.addEventListener('keydown', (e) => {
    // 矢印右キー (→)
    if (e.key === 'ArrowRight') {
        updateCard();
        e.preventDefault(); // 画面スクロールを防ぐ
    } 
    // 矢印左キー (←)
    else if (e.key === 'ArrowLeft') {
        previousCard();
        e.preventDefault(); // 画面スクロールを防ぐ
    }
    // 矢印上/下キー (↑/↓) - カードを裏返す
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        flipCard();
        e.preventDefault(); // 画面スクロールを防ぐ
    }
});

// --- 初期化 ---
filterAvailableItems(); // 利用可能なリストを最初に計算
updateCard(); // 最初のカードを表示
