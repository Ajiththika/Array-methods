const arrayInput = document.getElementById("arrayInput");
const methodSelect = document.getElementById("methodSelect");
const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");
const arrayVisual = document.getElementById("arrayVisual");
const resultSpan = document.getElementById("result");
const originalSpan = document.getElementById("original");
const explanationDiv = document.getElementById("explanation");

let originalArray = [1, 2, 3, 4, 5];

function renderArray(arr) {
  arrayVisual.innerHTML = "";
  arr.forEach((num, index) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = num;
    arrayVisual.appendChild(box);
    setTimeout(() => box.classList.add("animate"), 100 * index);
  });
}

function getExplanation(method) {
  const explanations = {
    map: "📘 <b>map()</b> creates a new array by applying a function to each element. Example: multiply all elements by 2.",
    filter: "📗 <b>filter()</b> returns a new array with only elements that pass a test (like even numbers).",
    push: "📙 <b>push()</b> adds an element to the end of the array.",
    pop: "📒 <b>pop()</b> removes the last element from the array.",
    shift: "📕 <b>shift()</b> removes the first element from the array.",
    unshift: "📔 <b>unshift()</b> adds an element to the beginning of the array.",
    reduce: "📓 <b>reduce()</b> applies a function to reduce all elements into a single value (like sum)."
  };
  return explanations[method];
}

runBtn.addEventListener("click", () => {
  let arr;
  try {
    arr = JSON.parse(arrayInput.value);
    if (!Array.isArray(arr)) throw new Error();
  } catch {
    alert("Please enter a valid array like [1,2,3,4,5]");
    return;
  }

  originalArray = arr.slice();
  let method = methodSelect.value;
  let result;

  switch (method) {
    case "map":
      result = arr.map(x => x * 2);
      break;
    case "filter":
      result = arr.filter(x => x % 2 === 0);
      break;
    case "push":
      arr.push(99);
      result = arr;
      break;
    case "pop":
      arr.pop();
      result = arr;
      break;
    case "shift":
      arr.shift();
      result = arr;
      break;
    case "unshift":
      arr.unshift(0);
      result = arr;
      break;
    case "reduce":
      result = arr.reduce((a, b) => a + b, 0);
      break;
  }

  renderArray(result);
  originalSpan.textContent = JSON.stringify(originalArray);
  resultSpan.textContent = JSON.stringify(result);
  explanationDiv.innerHTML = getExplanation(method);
});

resetBtn.addEventListener("click", () => {
  arrayInput.value = JSON.stringify([1,2,3,4,5]);
  originalSpan.textContent = "";
  resultSpan.textContent = "";
  explanationDiv.innerHTML = "";
  renderArray([1, 2, 3, 4, 5]);
});

renderArray(originalArray);
