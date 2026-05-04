let lastCat = null;

document.getElementById("like").onclick = () => {
  saveFavourite(window.currentCat);
  updateLikeCount();
  animateSwipe("right");
};

document.getElementById("dislike").onclick = () => {
  animateSwipe("left");
};

function animateSwipe(direction) {
  const card = document.getElementById("catCard");

  lastCat = window.currentCat;

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
  if (!lastCat) return;

  displayCat(lastCat);
  lastCat = null;
}
function saveFavourite(cat) {
  if (!cat || !cat.id) return;

  let cards = JSON.parse(localStorage.getItem("catCards")) || [];

  const exists = card.some((c) => c.id === cat.id);

  if (!exists) {
    cards.push(cat);
    localStorage.setItem("catCards", JSON.stringify(cards));
  }
}

function updateLikeCount() {
  const cards = JSON.parse(localStorage.getItem("catCards")) || [];
  document.getElementById("likeCount").innerText = cards.length;
}

updateLikeCount();
