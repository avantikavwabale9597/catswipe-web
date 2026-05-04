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

  displayCat(cat);
}
function displayCat(cat) {
  if (!cat) return;

  const img = document.getElementById("catImage");
  img.classList.add("fade-out");

  setTimeout(() => {
    window.currentCat = cat;

    img.src = cat.url;

    img.onload = () => {
      img.classList.remove("fade-out");
      img.classList.add("fade-in");
    };

    const breed = cat.breeds?.[0];

    document.getElementById("breedName").textContent =
      breed?.name || "Mystery Cat";

    if (breed) {
      factBox.innerHTML = `
      <strong>Origin:</strong> ${breed.origin} 🌍 <br>
      <strong>Temperament:</strong> ${breed.temperament} <br>
      <strong>Life Span:</strong> ${breed.life_span} years ⏳
    `;
    } else {
      factBox.textContent = "💡 This cat keeps its secrets 😼";
    }
  }, 200);
}
loadCat();
