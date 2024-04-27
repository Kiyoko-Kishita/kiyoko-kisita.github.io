let currentInput = ''; // 現在の入力値を保持する変数
let currentOperator = ''; // 現在の演算子を保持する変数
let firstOperand = ''; // 最初のオペランドを保持する変数
let isResultDisplayed = false; // 計算結果が表示されているかどうかを示すフラグ
let isPositive = true; // 正負を示すフラグ

// ディスプレイに数字を追加する関数
function appendNumber(number) {
  if (isResultDisplayed) {
      clearResult();
      isResultDisplayed = false;
  }
  currentInput += number; // 数字を入力値に追加
  updateResult(currentInput); // 結果を更新
}

// ディスプレイに小数点を追加する関数
function appendDecimal() {
  if (!currentInput.includes('.')) {
      appendNumber('.');
  }
}

// ディスプレイに演算子を追加する関数
function appendOperator(operator) {
  if (isResultDisplayed) {
      firstOperand = currentInput;
      isResultDisplayed = false;
  } else {
      firstOperand = currentInput;
  }
  currentOperator = operator; // 演算子を設定
  currentInput = ''; // 入力値をクリア
}

// ディスプレイをクリアする関数
function clearResult() {
  currentInput = ''; // 入力値をクリア
  updateResult('0'); // ディスプレイをゼロにリセット
  isResultDisplayed = false;
}

// 結果を更新する関数
function updateResult(value) {
  document.getElementById('result').innerText = value; // 結果を表示する
}

// =ボタンを押した時の計算を実行する関数
function calculateResult() {
  let result;
  const secondOperand = currentInput;
  switch (currentOperator) {
      case '+':
          result = parseFloat(firstOperand) + parseFloat(secondOperand);
          break;
      case '-':
          result = parseFloat(firstOperand) - parseFloat(secondOperand);
          break;
      case '*':
          result = parseFloat(firstOperand) * parseFloat(secondOperand);
          break;
      case '/':
          result = parseFloat(firstOperand) / parseFloat(secondOperand);
          break;
      default:
          return;
  }
  updateResult(result.toString()); // 結果を更新
  currentInput = result.toString(); // 入力値を計算結果に設定
  firstOperand = ''; // 最初のオペランドをクリア
  currentOperator = ''; // 演算子をクリア
  isResultDisplayed = true; // 計算結果が表示されたことを示す
}

// ％ボタンを押した時の計算を実行する関数
function calculatePercentage() {
  if (!isResultDisplayed) {
      currentInput = parseFloat(currentInput) / 100; // 入力値をパーセンテージに変換
      updateResult(currentInput); // 結果を更新
  }
}

// +/-切り替えボタンを押した時の計算を実行する関数
function toggleSign() {
  if (!isResultDisplayed) {
      currentInput = parseFloat(currentInput) * -1; // 入力値の符号を反転
      updateResult(currentInput); // 結果を更新
  }
}
 // ページを前のページに戻る関数
 function goBack() {
  window.history.back();
}