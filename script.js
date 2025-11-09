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
    map: " <b>map()</b> creates a new array by applying a function to each element.",
    filter: " <b>filter()</b> returns elements that pass a test.",
    push: " <b>push()</b> adds an element to the end.",
    pop: " <b>pop()</b> removes the last element.",
    shift: " <b>shift()</b> removes the first element.",
    unshift: " <b>unshift()</b> adds an element to the beginning.",
    reduce: " <b>reduce()</b> reduces all elements into a single value.",
    concat: " <b>concat()</b> joins two or more arrays together.",
    slice: " <b>slice()</b> copies part of an array without changing it.",
    splice: " <b>splice()</b> adds or removes elements anywhere in the array.",
    indexOf: " <b>indexOf()</b> finds the first position of a given element.",
    includes: " <b>includes()</b> checks if an array contains a value.",
    reverse: " <b>reverse()</b> flips the order of array elements.",
    sort: " <b>sort()</b> arranges elements in order (default is alphabetical).",
    find: " <b>find()</b> returns the first element that matches a test.",
    findIndex: " <b>findIndex()</b> returns the position of the first match.",
    every: " <b>every()</b> checks if all elements pass a test.",
    some: " <b>some()</b> checks if at least one element passes a test."
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
    case "concat":
      result = arr.concat([99, 100]);
      break;
    case "slice":
      result = arr.slice(1, 4);
      break;
    case "splice":
      arr.splice(2, 1, 99);
      result = arr;
      break;
    case "indexOf":
      result = arr.indexOf(3);
      break;
    case "includes":
      result = arr.includes(3);
      break;
    case "reverse":
      result = arr.reverse();
      break;
    case "sort":
      result = arr.sort((a, b) => a - b);
      break;
    case "find":
      result = arr.find(x => x > 3);
      break;
    case "findIndex":
      result = arr.findIndex(x => x > 3);
      break;
    case "every":
      result = arr.every(x => x > 0);
      break;
    case "some":
      result = arr.some(x => x > 4);
      break;
  }

  renderArray(Array.isArray(result) ? result : [result]);
  originalSpan.textContent = JSON.stringify(originalArray);
  resultSpan.textContent = JSON.stringify(result);
  explanationDiv.innerHTML = getExplanation(method);
  speak(getExplanation(method).replace(/<[^>]*>/g, ""));
});

resetBtn.addEventListener("click", () => {
  arrayInput.value = JSON.stringify([1, 2, 3, 4, 5]);
  originalSpan.textContent = "";
  resultSpan.textContent = "";
  explanationDiv.innerHTML = "";
  renderArray([1, 2, 3, 4, 5]);
});

renderArray(originalArray);
