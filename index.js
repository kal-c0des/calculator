const displayNum = document.getElementById("display-lower");
const displayUp = document.getElementById("display-upper");
const numBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const deleteBtn = document.getElementById("delete");

let firstArg = "";
let operator = null;
let secondArg = "";
let operatorClicked = false;
let deleteClicked = false;

function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return +num1 * +num2;
}

function divide(num1, num2) {
  if (num2 === "0") {
    return "ERR";
  } else {
    return +num1 / +num2;
  }
}

function calculate() {
  if (firstArg && operator && secondArg) {
    switch (operator) {
      case "+":
        firstArg = add(firstArg, secondArg);
        break;
      case "-":
        firstArg = subtract(firstArg, secondArg);
        break;
      case "*":
        firstArg = multiply(firstArg, secondArg);
        break;
      case "/":
        firstArg = divide(firstArg, secondArg);
        break;
    }
    displayNum.innerText = firstArg;
    displayUp.innerText = "";
    operator = null;
    secondArg = "";
  }
}

function handleNumber(number) {
  if (operator === null) {
    firstArg += number;
    displayNum.innerText = firstArg;
  } else {
    secondArg += number;
    displayNum.innerText = secondArg;
  }
}

function handleOperator(op) {
  if (operator !== null) {
    calculate();
  }
  operator = op;
  displayUp.innerText = firstArg + operator;
  displayNum.innerText = "";
}

function handleEquals() {
  calculate();
}

function handleClear() {
  firstArg = "";
  operator = null;
  secondArg = "";
  displayNum.innerText = "";
  displayUp.innerText = "";
}

function handleDelete() {
  if (operator === null) {
    // If operator is null, delete from firstArg
    firstArg = firstArg.slice(0, -1);
    displayNum.innerText = firstArg;
  } else {
    // Otherwise, delete from secondArg
    secondArg = secondArg.slice(0, -1);
    displayNum.innerText = secondArg;
  }
}

numBtn.forEach((number) => {
  number.addEventListener("click", () => {
    handleNumber(number.textContent);
  });
});

operatorBtn.forEach((operator) => {
  operator.addEventListener("click", () => {
    handleOperator(operator.textContent);
  });
});

equals.addEventListener("click", handleEquals);

clear.addEventListener("click", handleClear);

deleteBtn.addEventListener("click", handleDelete);
