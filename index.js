const displayNum = document.getElementById("display");
const numBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const divides = document.querySelector(".divs");
const times = document.querySelector(".times");

let firstArg = "";
let operator = null;
let secondArg = "";
let total = "";

function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === "0") {
    return "ERR";
  } else {
    return num1 / num2;
  }
}

function updateDisplay() {
  document.getElementById("display").value = "";
}

// clear
const clearAll = (e) => {
  firstArg = "";
  secondArg = "";
  operator = "";
  total = "";
  displayNum.innerText = "";
};

// all the maths
const maths = (firstArg, operator, secondArg) => {
  let total;
  let num1 = parseFloat(firstArg);
  let num2 = parseFloat(secondArg);

  if (operator === "+") {
    total = add(num1, num2);
  } else if (operator === "-") {
    total = subtract(num1, num2);
  } else if (operator === "*") {
    total = multiply(num1, num2);
  } else if (operator === "/") {
    total = divide(num1, num2);
  }
  if (total.toString().length < 10) {
    displayNum.innerText = total;
  } else {
    displayNum.innerText = total.toFixed(5);
  }
};

const display = (e) => {
  if (!operator) {
    firstArg += e.target.textContent;
    displayNum.innerText = firstArg;
  } else if (firstArg && operator) {
    secondArg += e.target.textContent;
    displayNum.innerText = secondArg;
  } else if (!operator && firstArg) {
    operator += e.target.textContent;
    displayNum.innerText = operator;
  } else if (operator) {
    operator = "";
    operator += e.target.textContent;
  }
};

const calculate = (e) => {
  if (firstArg && secondArg && operator) {
    if (e.target.classList.contains("equals")) {
      maths();
      firstArg = total;
    } else if (e.target.classList.contains("operator")) {
      maths();
      firstArg = total;
      secondArg = "";
    }
  }
};

// event listeners
clear.addEventListener("click", clearAll);
plus.addEventListener("click", calculate);
minus.addEventListener("click", calculate);
times.addEventListener("click", calculate);
divides.addEventListener("click", calculate);

numBtn.forEach((number) => {
  number.addEventListener("click", display);
});

operatorBtn.forEach((operator) => {
  operator.addEventListener("click", display);
});

equals.addEventListener("click", function (e) {
  if (displayNum.value === "") {
    displayNum.value = "";
  } else {
    let total = eval(displayNum.value);
    displayNum.innerText = displayNum.value;
    displayNum.value = total;
  }
});
