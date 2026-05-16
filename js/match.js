const cats = [
  {
    type: "calm",
    name: "Ragdoll",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1200&auto=format&fit=crop",
    fact: "Ragdolls are gentle, calm and love cuddles.",
    percent: "94%",
  },

  {
    type: "energetic",
    name: "Bengal",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop",
    fact: "Bengals are active, playful and adventurous.",
    percent: "96%",
  },

  {
    type: "social",
    name: "Maine Coon",
    image:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1200&auto=format&fit=crop",
    fact: "Maine Coons are friendly and love attention.",
    percent: "91%",
  },

  {
    type: "independent",
    name: "Russian Blue",
    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1200&auto=format&fit=crop",
    fact: "Russian Blues are calm and enjoy personal space.",
    percent: "89%",
  },

  {
    type: "playful",
    name: "Abyssinian",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1200&auto=format&fit=crop",
    fact: "Abyssinians are curious and energetic.",
    percent: "95%",
  },

  {
    type: "lazy",
    name: "Persian",
    image:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1200&auto=format&fit=crop",
    fact: "Persians love relaxing and quiet environments.",
    percent: "90%",
  },
];
let selectedType = "";

const optionButtons = document.querySelectorAll(".option-btn");

optionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.querySelectorAll(".option-btn").forEach((b) => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    selectedType = btn.dataset.type;
  });
});
document.getElementById("findMatchBtn").addEventListener("click", () => {
  if (!selectedType) return;

  const match = cats.find((cat) => cat.type === selectedType);

  document.getElementById("matchImg").src = match.image;

  document.getElementById("matchName").innerText = `🐱 ${match.name}`;

  document.getElementById("matchPercent").innerText =
    `${match.percent} Compatibility Match`;
  document.getElementById("matchFact").innerText = match.fact;

  document.getElementById("matchResult").classList.remove("hidden");

  window.currentMatch = match;
});

document.getElementById("saveMatchBtn").addEventListener("click", () => {
  if (!window.currentMatch) return;

  let cards = JSON.parse(localStorage.getItem("catCards")) || [];

  const exists = cards.some(
    (c) => c.breeds?.[0]?.name === window.currentMatch.name,
  );

  if (!exists) {
    cards.push({
      id: window.currentMatch.name,
      url: window.currentMatch.image,
      breeds: [
        {
          name: window.currentMatch.name,
          origin: "Match Finder",
          temperament: window.currentMatch.fact,
          life_span: "12 - 16",
        },
      ],
    });

    localStorage.setItem("catCards", JSON.stringify(cards));

    showToast();
  }
});

function toggleDark() {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
}

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};
function showToast() {
  const toast = document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
