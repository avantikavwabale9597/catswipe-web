const container = document.getElementById("cardsContainer");
const cards = JSON.parse(localStorage.getItem("catCards")) || [];

if (cards.length === 0) {
  container.innerHTML = "<p>No liked cats yet 😿</p>";
}

cards.forEach((cat, index) => {
  const breed = cat.breeds && cat.breeds[0];
  if (!breed) return;

  const card = document.createElement("div");
  card.className = "cat-card";

  card.innerHTML = `
  <div class="card-inner"> 
    <div class="card-front">
      <img src="${cat.url}" alt="${breed.name}" />
      <h3>${breed.name}</h3>
    </div>
    
    <div class="card-back">
      <p>🌍 ${breed.origin}</p>
      <p>😺 ${breed.temperament}</p>
      <p>⏳ ${breed.life_span} years</p>
      <p class="screenshot-note">📸 You can take a screenshot of this card</p>
      <button class="remove-btn" data-index="${index}">❌ Remove</button>
      </div>
    </div>
  `;

  container.appendChild(card);
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.dataset.index;

    cards.splice(index, 1);
    localStorage.setItem("catCards", JSON.stringify(cards));

    location.reload();
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const allCards = document.querySelectorAll(".cat-card");

  allCards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
});

document.getElementById("sortSelect").addEventListener("change", function () {
  const value = this.value;

  if (value === "name") {
    cards.sort((a, b) => a.breeds[0].name.localeCompare(b.breeds[0].name));
  }

  if (value === "life") {
    cards.sort(
      (a, b) =>
        parseInt(a.breeds[0].life_span) - parseInt(b.breeds[0].life_span),
    );
  }

  localStorage.setItem("catCards", JSON.stringify(cards));
  location.reload();
});
