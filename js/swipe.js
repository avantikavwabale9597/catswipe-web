document.getElementById("like").onclick = () => {
  saveFavourie(window.currentCat);
  animateSwipe("right");
};

document.getElementById("dislike").onclick = () => {
  animateSwipe("left");
};

function animateSwipe(direction) {
  const card = document.getElementById("catCard");
  card.style.transform =
    direction === "right"
      ? "translateX(400px) rotate(15deg)"
      : "translateX(-400px) rotate(-15deg)";

  setTimeout(() => {
    card.style.transform = "translateX(0)";
    loadCat();
  }, 300);
}

function saveFavourie(cat) {
  let cards = JSON.parse(localStorage.getItem("catCards")) || [];
  if (!cards.find((c) => c.id === cat.id)) {
    cards.push(cat);
  }
  localStorage.setItem("catCards", JSON.stringify(cards));
}
