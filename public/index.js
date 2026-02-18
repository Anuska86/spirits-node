document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards-container");

  if (!container) {
    console.log("No cards container found. We must be on the Home page!");
    return;
  }

  try {
    const response = await fetch("/api");

    // Check if the server actually returned a 200 OK
    if (!response.ok) {
      throw new Error(`Ghostly error: ${response.status}`);
    }

    const cardsData = await response.json();

    // Ensure cardsData is an array before calling render
    if (Array.isArray(cardsData)) {
      renderCards(cardsData);
    } else {
      console.error("Data received is not an array:", cardsData);
    }
  } catch (err) {
    console.log("Error fetching the api data", err);
    container.innerHTML = `<p class="error-msg">The spirits are silent. (Could not load sightings)</p>`;
  }

  function renderCards(cardsData) {
    // Using .map and .join is cleaner and faster than += inside forEach
    container.innerHTML = cardsData
      .map(
        (card) => `
      <article class="sighting-card" aria-labelledby="title-${card.id}">
        <p class="card-details">${card.timeStamp}, ${card.location}</p>
        <h3 id="title-${card.id}">${card.title}</h3>
        <div class="sighting-text-wrapper">
          <p class="sighting-text">${card.text}</p>
        </div>
        <button class="read-more-btn" aria-expanded="false">Read in full</button>
      </article>
    `,
      )
      .join("");
  }

  // Handle expand/collapse using event delegation
  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("read-more-btn")) return;

    const button = e.target;
    const sightingCard = button.closest(".sighting-card");
    const isExpanded = sightingCard.classList.toggle("expanded");

    button.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    button.textContent = isExpanded ? "Show less" : "Read in full";
  });
});
