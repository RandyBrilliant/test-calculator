const screen = document.querySelector(".display");

let temporary = "0";
let total = 0;
let previousOperator = "";

screen.innerText="0";

// Event Bubbling
const button = document.querySelector(".button");

// Memberikan event listener
button.addEventListener('click', function(event) {
  checkNumber(event.target.innerText);
})

// This function is to re render the calculator display
function rerender() {
  screen.innerText = temporary;
}

function checkNumber(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

// Handle number to be shown at calculator display
function handleNumber(value) {
  if (temporary == "0") {
    temporary = value;
  } else {
    temporary = temporary + value;
  }
}

function handleSymbol(value) {
  if (value == "AC") {
    temporary = "0";
    previousOperator = null;
    total = 0;
  } else if (value == "<--") {
    if (temporary.length == 1) {
      temporary = "0";
    } else {
      temporary = temporary.substring(0, temporary.length - 1);
    }
  } else if (value == "=") {
    if (previousOperator === null) {
      return;
    }
    mathematicOperation(parseInt(temporary));
    temporary = "" + total;
    previousOperator = null;
    total = 0;
  } else {
    handleMathematics(value);
  }
}

function handleMathematics(value) {
  const integerTemporary = parseInt(temporary);
  if (total == 0) {
    total = integerTemporary;
  } else {
    // Kita bakalan menghitung angka tersebut.
    mathematicOperation(integerTemporary);
  }

  temporary = "0";
  previousOperator = value;
}

function mathematicOperation(number) {
  if (previousOperator == "+") {
    total = total + number;
  } else if (previousOperator == "-") {
    total = total - number;
  } else if (previousOperator == "X") {
    total = total * number;
  } else {
    total = total / number;
  }
}
