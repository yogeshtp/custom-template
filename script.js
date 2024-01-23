let dynamicTemplate = document.getElementById("template");
let submitBtn = document.getElementById("submit-template");
let dynamicGreet = document.getElementById("dymaicGreet");
let form = document.forms[0];

let dynamicText = "";
const regex = /{{\s*([^{}]+)\s*}}/g;
let matches = [];

submitBtn.addEventListener("click", function () {
  dynamicText = dynamicTemplate.value;
  matches = [];
  let match;
  while ((match = regex.exec(dynamicText)) !== null) {
    matches.push(match[1].trim());
  }
  console.log(matches);
  createInputs(matches.length, matches);
});

function createInputs(numberOfInputs, arr) {
  form.innerHTML = "";
  for (let i = 0; i < numberOfInputs; i++) {
    let label = document.createElement("label");
    label.for = `input-${i}`;
    label.textContent = `${arr[i]}`;
    let input = document.createElement("input");
    input.type = "text";
    input.id = `input-${i}`;
    input.placeholder = `Input ${matches[i]}`;
    form.append(label, input);
  }

  let formSubmit = document.createElement("button");
  formSubmit.type = "submit";
  formSubmit.textContent = "execute";
  form.append(formSubmit);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputValues = [];
  let formInput = form.querySelectorAll('input[type="text"]');
  formInput.forEach(function (input) {
    inputValues.push(input.value);
  });
  console.log(inputValues);
  let dynamicGreetResult = dynamicText.replace(
    /{{\s*([^{}]+)\s*}}/g,
    function (match, key) {
      let index = matches.indexOf(key);
      return inputValues[index] || match;
    }
  );
  dynamicGreet.textContent = dynamicGreetResult;
  console.log(dynamicGreetResult);
});
