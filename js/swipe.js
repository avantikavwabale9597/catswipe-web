let lastCat = null;

document.getElementById("like").onclick = () => {
  saveFavourite(window.currentCat);
  updateLikeCount();
  animateSwipe("right");
};

document.getElementById("dislike").onclick = () => {
  animateSwipe("left");
};

let swipeHistory = [];

function animateSwipe(direction) {
  const card = document.getElementById("catCard");

  swipeHistory.push(window.currentCat);

  card.style.transform =
    direction === "right"
      ? "translateX(400px) rotate(15deg)"
      : "translateX(-400px) rotate(-15deg)";

  setTimeout(() => {
    card.style.transform = "translateX(0)";
    loadCat();
  }, 300);
}
function undoSwipe() {
  if (swipeHistory.length === 0) return;

  const last = swipeHistory.pop();
  displayCat(last);

  const card = document.getElementById("catCard");
  card.style.transform = "scale(0.9)";
  setTimeout(() => (card.style.transform = "scale(1)"), 150);
}

function saveFavourite(cat) {
  if (!cat || !cat.id) return;

  let cards = JSON.parse(localStorage.getItem("catCards")) || [];

  const exists = cards.some((c) => c.id === cat.id);

  if (!exists) {
    cards.push(cat);
    localStorage.setItem("catCards", JSON.stringify(cards));
    updateLikeCount();
  }
}

function updateLikeCount() {
  const cards = JSON.parse(localStorage.getItem("catCards")) || [];
  document.getElementById("likeCount").innerText = cards.length;
}

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};

updateLikeCount();
