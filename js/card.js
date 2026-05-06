const container = document.getElementById("cardsContainer");
let cards = JSON.parse(localStorage.getItem("catCards")) || [];

if (cards.length === 0) {
  container.innerHTML = `
  <div class="empty-state">
    <h2>😿 No cats yet</h2>
    <p>Start swiping to find your purr-fect match!</p>
    <a href="index.html">😿 Go Swipe</a>
  </div>
  `;
}

function renderCards(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No cats found 😿</p>";
    return;
  }

  data.forEach((cat) => {
    const breed = cat.breeds && cat.breeds[0];
    if (!breed) return;

    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";

    wrapper.innerHTML = `
  <div class="cat-card">
    <div class="card-inner">

      <div class="card-front">
        <div class="image-wrapper">
          <img src="${cat.url}" alt="${breed.name}" />
        </div>
        <h3>${breed.name}</h3>
      </div>

      <div class="card-back">
        <p>🌍 ${breed.origin}</p>
        <p>😺 ${breed.temperament}</p>
        <p>⏳ ${breed.life_span} years</p>
        <button class="remove-btn" data-name="${breed.name}">❌ Remove</button>
      </div>

    </div>
  </div>
`;

    container.appendChild(wrapper);
  });
}

renderCards(cards);

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const name = e.target.dataset.name;

    cards = cards.filter((c) => c.breeds[0].name !== name);

    localStorage.setItem("catCards", JSON.stringify(cards));
    renderCards(cards);
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = cards.filter((cat) => {
    const breed = cat.breeds?.[0];
    if (!breed) return false;

    return (
      breed.name.toLowerCase().includes(value) ||
      breed.origin.toLowerCase().includes(value) ||
      breed.temperament.toLowerCase().includes(value)
    );
  });

  renderCards(filtered);
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
  renderCards(cards);
});

function updateLikeCount() {
  const cards = JSON.parse(localStorage.getItem("catCards")) || [];
  document.getElementById("likeCount").innerText = cards.length;
}

updateLikeCount();
