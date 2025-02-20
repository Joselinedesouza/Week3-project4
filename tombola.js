let all_numbers = [];

const numbers = function () {
  for (let i = 1; i < 91; i++) {
    const tabella = document.getElementById("tabella").append(i);
    all_numbers.push(i);
  }
};
numbers();

const h1Title = function () {
  const theTitle = document.getElementById("theTitle");
  theTitle.innerText = h1Title;
};
