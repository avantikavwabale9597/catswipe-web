const API_KEY =
  "live_sUjYrcrKdXeosAvbIE2BQJIof0ZBrWnTmsjnssKsodNBGdacVzNYDc1wgvScV22v";
const API_URL = "https://api.thecatapi.com/v1/images/search?has_breeds=1";
const factBox = document.getElementById("catFact");

async function loadCat() {
  const res = await fetch(API_URL, {
    headers: { "x-api-key": API_KEY },
  });
  const data = await res.json();

  const cat = data[0];
  document.getElementById("catImage").src = cat.url;

  const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

  document.getElementById("breedName").textContent =
    cat.breeds[0]?.name || "Mystery Cat";

  if (breed) {
    factBox.innerHTML = `
        <strong>Origin:</strong> ${breed.origin} 🌍 <br>
        <strong>Temperament:</strong> ${breed.temperament} <br>
        <strong>Life Span:</strong> ${breed.life_span} years ⏳ `;
  } else {
    factBox.textContent = "💡 This cat keeps its secrets 😼";
  }
  window.currentCat = cat;
}

loadCat();
