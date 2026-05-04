const API_KEY =
  "live_sUjYrcrKdXeosAvbIE2BQJIof0ZBrWnTmsjnssKsodNBGdacVzNYDc1wgvScV22v";

const API_URL = "https://api.thecatapi.com/v1/images/search?has_breeds=1";

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
    console.error("Daily cat error:", err);
  }
}

function displayDaily(cat) {
  if (!cat) return;

  const breed = cat.breeds && cat.breeds[0];

  document.getElementById("dailyImg").src = cat.url;
  document.getElementById("dailyName").innerText = breed?.name || "Mystery Cat";

  document.getElementById("dailyFact").innerText = breed
    ? `Purrfect Fact 🐾: ${breed.temperament}`
    : "This mysterious cat has secrets 😼";
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

    data.forEach((cat) => {
      const breed = cat.breeds && cat.breeds[0];
      if (!breed) return;

      const card = document.createElement("div");
      card.className = "cat-profile";

      card.innerHTML = `
        <img src="${cat.url}" />
        <h4>${breed.name}</h4>
        <p>🌍 ${breed.origin}</p>
        <p class="mini-fact">😺 ${breed.temperament}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Recommendations error:", err);
  }
}
loadDailyCat();
loadRecommendations();
