const buttons = document.querySelector(".calc-buttons");
const field = document.querySelector(".calc__text");
const response = document.querySelector(".calc__response");
let prop;

buttons.addEventListener("click", (e) => {
  const value = e.target.value;

  if (value) field.textContent += value;

  if (value == "C" || field.textContent.charAt(0) == "=") {
    field.textContent = "";
    response.textContent = "";
    response.style.cssText = `
  font-size:30px;
  top:30px
  `;
  }

  if (value == "+/-") {
    if (field.textContent.slice(0, -3).charAt(0) == "-") {
      field.textContent = field.textContent.slice(1, -3);
    } else {
      field.textContent = "-".concat(field.textContent.slice(0, -3));
    }
  }

  if (value == ".") {
    checkDote(value, field.textContent);
  }

  if (value == "+" || value == "-" || value == "*" || value == "/") {
    check();
  }

  if (value === "=") work(prop, field.textContent);
});


function work(pr, t) {
  const text = t.trim();

  const numberOne = Number(text.slice(0, text.lastIndexOf(pr)));
  const numberTwo = Number(
    text.slice(text.lastIndexOf(pr) + 1, text.length - 1)
  );

  response.style.cssText = `
  font-size:20px;
  top:0
  `;

  if (text.charAt(0) == "+") {
    response.textContent = text.slice(1, text.length);
  } else if (text.charAt(0) == "=") {
    field.textContent = "";
    response.textContent = "";
  } else {
    response.textContent = text;
  }
  

  switch (pr) {
    case "+":
      field.textContent = BigInt(numberOne + numberTwo);
      break;
    case "-":
      field.textContent = (numberOne - numberTwo).toString(2);
      break;
    case "*":
      field.textContent = BigInt(numberOne * numberTwo);
      break;
    case "/":
      field.textContent = numberOne / numberTwo;
      break;
    default:
      break;
  }
}

function check() {
  const text = field.textContent.trim();

  if (text[0] == "*" || text[0] == "/") field.textContent = "0".concat(text);

  if (
    text.at(-2) == "+" ||
    text.at(-2) == "-" ||
    text.at(-2) == "*" ||
    text.at(-2) == "/"
  ) {
    field.textContent = text.slice(0, -2).concat(text.at(-1));
  }

  prop = text.at(-1);

  const val = text.slice(0, text.lastIndexOf(prop));
  if (search(text.slice(0, text.lastIndexOf(prop) - 1))[0]) {
    console.log('1')
    work(search(val)[1], val.concat("="));
    field.textContent += prop;
  }
}

function checkDote(v, text) {
  const ind = text.lastIndexOf(v);

  if (!search(text)[2] && text.slice(0, ind).includes(".")) {
    field.textContent = field.textContent.slice(0, ind);
  } else if (
    search(text)[2] &&
    text.slice(search(text)[2], text.length - 1).includes(".")
  ) {
    field.textContent = text
      .slice(0, search(text)[2])
      .concat(text.slice(search(text)[2], text.length - 1));
  }
}

function search(text) {
  if (text.includes("+") && text.lastIndexOf("+") !== 0) {
    return [true, "+", text.indexOf("+")];
  } else if (text.includes("-") && text.lastIndexOf("-") !== 0) {
    return [true, "-",text.indexOf("-")];
  } else if (text.includes("*") && text.lastIndexOf("*") !== 0) {
    return [true, "*",text.indexOf("*")];
  } else if (text.includes("/") && text.lastIndexOf("/") !== 0) {
    return [true, "/",text.indexOf("/")];
  }
  return [];
}
