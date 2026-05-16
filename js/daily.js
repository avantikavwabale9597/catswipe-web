const API_KEY =
  "live_sUjYrcrKdXeosAvbIE2BQJIof0ZBrWnTmsjnssKsodNBGdacVzNYDc1wgvScV22v";

const API_URL = "https://api.thecatapi.com/v1/images/search?has_breeds=1";

let recommendationCats = [];
let dailyCatData = null;

function getTodayKey() {
  return new Date().toDateString();
}

async function loadDailyCat() {
  try {
    const today = getTodayKey();
    const saved = JSON.parse(localStorage.getItem("dailyCat"));

    if (saved && saved.date === today) {
      displayDaily(saved.cat);
      return;
    }

    const res = await fetch(API_URL, {
      headers: { "x-api-key": API_KEY },
    });

    const data = await res.json();
    const cat = data[0];

    localStorage.setItem("dailyCat", JSON.stringify({ date: today, cat }));

    displayDaily(cat);
  } catch (err) {
    console.error(err);
  }
}

function displayDaily(cat) {
  if (!cat) return;

  dailyCatData = cat;

  const breed = cat.breeds && cat.breeds[0];

  document.getElementById("dailyImg").src = cat.url;
  document.getElementById("dailyName").innerText = breed?.name || "Mystery Cat";

  document.getElementById("dailyFact").innerText = breed
    ? `Purrfect Fact 🐾: ${breed.temperament}`
    : "This mysterious cat has secrets 😼";

  const container = document.querySelector(".daily-card");

  let btn = document.getElementById("dailyLikeBtn");

  if (!btn) {
    btn = document.createElement("button");
    btn.id = "dailyLikeBtn";
    btn.className = "like-btn";
    btn.innerText = "❤️ Add";
    container.appendChild(btn);
  }
}

function getPreferredTraits() {
  const cards = JSON.parse(localStorage.getItem("catCards")) || [];

  const origins = {};
  const temperaments = {};

  cards.forEach((cat) => {
    const breed = cat.breeds?.[0];
    if (!breed) return;

    origins[breed.origin] = (origins[breed.origin] || 0) + 1;

    breed.temperament.split(",").forEach((temp) => {
      temp = temp.trim();

      temperaments[temp] = (temperaments[temp] || 0) + 1;
    });
  });

  return { origins, temperaments };
}

function getMatchScore(cat, prefs) {
  const breed = cat.breeds?.[0];

  if (!breed) return 0;

  let score = 0;
  if (prefs.origins[breed.origin]) {
    score += 40;
  }

  breed.temperament.split(",").forEach((temp) => {
    if (prefs.temperaments[temp.trim()]) {
      score += 10;
    }
  });

  return Math.min(score, 100);
}

async function loadRecommendations() {
  try {
    const res = await fetch(API_URL + "&limit=4", {
      headers: { "x-api-key": API_KEY },
    });

    const data = await res.json();
    const container = document.getElementById("recommendations");

    if (!container) return;

    container.innerHTML = "";
    recommendationCats = data;

    const prefs = getPreferredTraits();

    data.forEach((cat, index) => {
      const breed = cat.breeds && cat.breeds[0];
      if (!breed) return;

      const card = document.createElement("div");
      card.className = "cat-profile";

      card.innerHTML = `
        <img src="${cat.url}" />
        <h4>${breed.name}</h4>
        <p>${breed.origin}</p>
        <button class="like-btn" data-index="${index}">❤️ Add</button>
        <p>🔥 Match: ${getMatchScore(cat, prefs)}%</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("like-btn")) {
    const index = e.target.dataset.index;

    let cat;

    if (index !== undefined) {
      cat = recommendationCats[index];
    } else {
      cat = dailyCatData;
    }

    if (!cat) return;

    saveFavourite(cat);
    updateLikeCount();

    e.target.innerText = "✅ Added";
  }

  if (e.target.id === "dailyLikeBtn") {
    if (!dailyCatData) return;

    saveFavourite(dailyCatData);
    updateLikeCount();

    e.target.innerText = "✅ Added";
  }
});

function saveFavourite(cat) {
  if (!cat || !cat.id) return;

  let cards = JSON.parse(localStorage.getItem("catCards")) || [];

  const exists = cards.some((c) => c.id === cat.id);

  if (!exists) {
    cards.push(cat);
    localStorage.setItem("catCards", JSON.stringify(cards));
  }
}

function updateLikeCount() {
  const cards = JSON.parse(localStorage.getItem("catCards")) || [];
  const el = document.getElementById("likeCount");
  if (el) el.innerText = cards.length;
}

updateLikeCount();
loadDailyCat();
loadRecommendations();
