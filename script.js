const numbers = document.getElementsByClassName("number");
const input = document.getElementById("operations");
const buttons = document.getElementsByClassName("btn");
let operBand, operDot, operEqual;
reset();

document.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) equals();
  if (e.keyCode === 27 || e.keyCode === 8) allClear();
});

Array.from(buttons).forEach((element) => {
  element.addEventListener("click", () => {
    pressBoton(element);
  });
});

function pressBoton(element) {
  //When an operator has been executed
  if (operEqual && input.value !== "") {
    allClear();
    //operEqual = false;
  }

  //What action will be executed
  if (element.id === "AC") allClear();
  else if (element.id === "C") clear(1);
  else if (element.id === "=") equals();
  else if (element.className.includes("operator") && !operBand)
    btnOperation(element);
  else if (element.className.includes("number")) {
    input.value += element.id;
    operBand = false;
  }
}

function allClear() {
  reset();
  return (input.value = "");
}

function clear(num) {
  return (input.value = input.value.substr(0, input.textLength - num));
}

function equals() {
  if (input.value !== "") {
    input.value = parseFloat(eval(input.value));
    operEqual = true;
    operBand = false;
  }
}

function btnOperation(element) {
  operBand = true;
  input.value += element.id;
  let iv = input.value.substr(input.textLength - 2, 1); //index, num of elements
  let ivi = input.value.substr(input.textLength - 1);

  //if (operDot && ivi === ".") clear(1);
  if (!operDot && ivi === ".") operDot = true;

  //can't repeat operations
  if (iv === "+" || iv === "-" || iv === "*" || iv === "/" || iv === ".") {
    clear(2);
    input.value += element.id;
  }
  //can't reapt dot operator
  if (ivi === "+" || ivi === "-" || ivi === "*" || ivi === "/" || ivi !== ".") {
    operDot = false;
  }
  operBand = false;
}

function reset() {
  (operBand = false), (operEqual = false), (operDot = false);
}
