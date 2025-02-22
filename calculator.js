const numButtons = document.querySelectorAll(".num");
const funcButtons = document.querySelectorAll(".func");

const resultBox = document.querySelector("#result");
console.log(resultBox);
let firstNum = "";
let secondNum = "";
let resultNum = 0;
let operation = "";
let isSecond = false;
let isFinished = false;

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const writeResult = () => {
  if (isFinished) {
    resultBox.value = `${firstNum} ${operation} ${secondNum} = ${resultNum}`;
  } else {
    console.log(firstNum);
    resultBox.value = `${firstNum} ${operation} ${secondNum}`;
  }
};

const deleteOperation = () => {
  if (isFinished) {
    firstNum = "";
    secondNum = "";
    resultNum = 0;
    operation = "";
    isSecond = false;
    isFinished = false;
  } else if (isSecond) {
    if (secondNum.length >= 1) {
      secondNum = secondNum.substring(0, secondNum.length - 1);
    } else {
      operation = "";
      isSecond = false;
    }
  } else {
    firstNum = firstNum.substring(0, firstNum.length - 1);
  }
};

const addValue = (value) => {
  if (isFinished) {
    deleteOperation();
  }
  if (!isSecond) {
    firstNum += value;
  } else {
    secondNum += value;
  }
  writeResult();
};

const addOperator = (value) => {
  if (firstNum === "") {
    return;
  }
  if (value == "c") {
    deleteOperation();
  } else if (value == "=") {
    if (firstNum === "" || secondNum === "") {
      return;
    }
    if (secondNum[secondNum.length - 1] == ".") {
      addValue("0");
    }
    isFinished = true;
    resultNum = operations[operation](Number(firstNum), Number(secondNum));
  } else if (value == ".") {
    if (
      firstNum[firstNum.length - 1] == "." ||
      secondNum[secondNum.length - 1] == "." ||
      firstNum === ""
    ) {
    } else {
      addValue(".");
    }
  } else {
    if (firstNum[firstNum.length - 1] == ".") {
      addValue("0");
    }
    operation = value;
    isSecond = true;
  }
  writeResult();
};

numButtons.forEach((item) =>
  item.addEventListener("click", () => addValue(item.value))
);

funcButtons.forEach((item) =>
  item.addEventListener("click", () => addOperator(item.value))
);
