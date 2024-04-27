// メモリストの初期化
let memoList = [];

// メモを追加する関数
function addMemo() {
  const memoInput = document.getElementById("memoInput");
  const memo = memoInput.value.trim();

  // メモが空欄の場合はアラートを表示して処理を終了
  if (memo === "") {
    alert("メモを入力してください。");
    return;
  }

  const imageInput = document.getElementById("imageInput");
  const image = imageInput.files[0];

  if (image) {
    // 画像が選択された場合は画像をBase64形式に変換してメモリストに追加
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      const imageDataURL = reader.result;
      memoList.push({ memo: memo, image: imageDataURL });
      saveMemoList(memoList); // メモリストをローカルストレージに保存
      displayMemoList(); // メモリストを表示
    };
  } else {
    // 画像が選択されなかった場合はメモだけをメモリストに追加
    memoList.push({ memo: memo, image: null });
    saveMemoList(memoList); // メモリストをローカルストレージに保存
    displayMemoList(); // メモリストを表示
  }

  // 入力フォームをクリア
  memoInput.value = "";
  imageInput.value = "";
}

// メモリストをローカルストレージに保存する関数
function saveMemoList(memoList) {
  localStorage.setItem("memoList", JSON.stringify(memoList));
}

// ローカルストレージからメモリストを取得する関数
function getMemoList() {
  return JSON.parse(localStorage.getItem("memoList")) || [];
}

// メモリストを表示する関数
function displayMemoList() {
  const memoListElement = document.getElementById("memoList");
  memoListElement.innerHTML = "";

  memoList.forEach((memoObj, index) => {
    const li = document.createElement("li");
    li.textContent = memoObj.memo;

    // 画像がある場合は表示
    if (memoObj.image) {
      const img = document.createElement("img");
      img.src = memoObj.image;
      img.style.maxWidth = "100px";
      img.style.maxHeight = "100px";
      li.appendChild(img);
    }

    // 削除ボタンを追加
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.onclick = function () {
      deleteMemo(index);
    };
    li.appendChild(deleteButton);

    memoListElement.appendChild(li);
  });
}

// メモを削除する関数
function deleteMemo(index) {
  memoList.splice(index, 1);
  saveMemoList(memoList); // メモリストをローカルストレージに保存
  displayMemoList(); // メモリストを表示
}

// メモを検索する関数
function searchMemo() {
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput.value.trim().toLowerCase();

  if (keyword === "") {
    alert("検索キーワードを入力してください。");
    return;
  }

  // ローカルストレージからメモリストを取得して、キーワードに一致するメモをフィルタリング
  memoList = getMemoList().filter((memoObj) =>
    memoObj.memo.toLowerCase().includes(keyword)
  );
  displayMemoList(); // メモリストを表示
}

// 検索結果をリセットする関数
function resetSearch() {
  memoList = getMemoList(); // メモリストをローカルストレージから取得
  displayMemoList(); // メモリストを表示
}

// ページロード時にメモリストを表示
memoList = getMemoList(); // メモリストをローカルストレージから取得
displayMemoList(); // メモリストを表示

 // ページを前のページに戻る関数
 function goBack() {
  window.history.back();
}
