const contentRef = document.querySelector(".content");
const resetBtnRef = document.querySelector(".btn-cross");
const formRef = document.querySelector(".user-form");
const gameContainerRef = document.querySelector(".container");
const firstPlayerRef = document.getElementsByClassName("first-player");
const secondPlayerRef = document.getElementsByClassName("second-player");

const player1 = {
  symbol: "X",
};
const player2 = {
  symbol: "O",
};
let currentPlayerSymbol = player1.symbol;
let markup = "";

const WINNER = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

contentRef.addEventListener("click", onContentClick);
formRef.addEventListener("submit", onFormSubmit);
resetBtnRef.addEventListener("click", onResetBtnClick);

for (let i = 1; i <= 9; i += 1) {
  markup += `<div class="item" data-id="${i}"></div>`;
}
contentRef.insertAdjacentHTML("beforeend", markup);

player1.moves = JSON.parse(localStorage.getItem(player1.symbol)) || [];
player2.moves = JSON.parse(localStorage.getItem(player2.symbol)) || [];

if (player1.moves.length) {
  gameContainerRef.classList.remove("hidden");
  formRef.classList.add("hidden");
  resetBtnRef.classList.remove("hidden");

  [player1.name, player2.name] = JSON.parse(
    localStorage.getItem("playersName")
  );

  contentRef.insertAdjacentHTML(
    "beforebegin",
    createPlayersMarkup(player1.name, player2.name)
  );

  if (localStorage.getItem("currentPlayerSymbol") === player2.symbol) {
    currentPlayerSymbol = player2.symbol;
    firstPlayerRef[0].classList.toggle("active");
    secondPlayerRef[0].classList.toggle("active");
  }

  const children = [...contentRef.children];
  children.forEach((el) => {
    if (player1.moves.includes(Number(el.dataset.id))) {
      el.textContent = player1.symbol;
    } else if (player2.moves.includes(Number(el.dataset.id))) {
      el.textContent = player2.symbol;
    }
  });
}

function onContentClick(e) {
  if (e.target.textContent) {
    return;
  }

  e.target.textContent = currentPlayerSymbol;
  const position = e.target.dataset.id;

  if (currentPlayerSymbol === player1.symbol) {
    playerMove(player1.moves, player1.name, player1.symbol, position);
  } else {
    playerMove(player2.moves, player2.name, player2.symbol, position);
  }
  firstPlayerRef[0].classList.toggle("active");
  secondPlayerRef[0].classList.toggle("active");
}

function playerMove(playerMoves, playerName, playerSymbol, position) {
  playerMoves.push(Number(position));
  localStorage.setItem(playerSymbol, JSON.stringify(playerMoves));
  const isFinish = playerMoves.length < 3 ? false : isWinner(playerMoves);
  const isDraw = player1.moves.length + player2.moves.length === 9;
  setTimeout(() => {
    if (isFinish) {
      alert(`${playerName} Win!`);
      onResetBtnClick();
      return;
    }
    if (isDraw) {
      alert("Draw!");
      onResetBtnClick();
      return;
    }
  });
  currentPlayerSymbol =
    currentPlayerSymbol === player1.symbol ? player2.symbol : player1.symbol;
  localStorage.setItem("currentPlayerSymbol", currentPlayerSymbol);
}

function isWinner(playerMoves) {
  return WINNER.some((el) => el.every((item) => playerMoves.includes(item)));
}

function onResetBtnClick() {
  contentRef.innerHTML = markup;
  currentPlayerSymbol = player1.symbol;
  firstPlayerRef[0].classList.add("active");
  secondPlayerRef[0].classList.remove("active");
  player1.moves = [];
  player2.moves = [];
  localStorage.removeItem(player1.symbol);
  localStorage.removeItem(player2.symbol);
}

function onFormSubmit(e) {
  e.preventDefault();

  player1.name = e.currentTarget.elements[0].value;
  player2.name = e.currentTarget.elements[1].value;

  contentRef.insertAdjacentHTML(
    "beforebegin",
    createPlayersMarkup(player1.name, player2.name)
  );

  localStorage.setItem(
    "playersName",
    JSON.stringify([player1.name, player2.name])
  );

  e.currentTarget.classList.add("hidden");
  gameContainerRef.classList.remove("hidden");
  resetBtnRef.classList.remove("hidden");
}

function createPlayersMarkup(player1Name, player2Name) {
  return `<div>
      <p class="first-player active">${player1Name}</p>
      <p class="second-player">${player2Name}</p>
    </div>`;
}
