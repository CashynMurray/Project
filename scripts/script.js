document.addEventListener("DOMContentLoaded", () => {
    const tips = [
      "Match the hatch to catch more trout.",
      "Use a longer leader in clear water.",
      "Fish early morning or late evening.",
      "Cast upstream and let the fly drift naturally."
    ];
  
    const tipEl = document.getElementById("random-tip");
    if (tipEl) {
      const tip = tips[Math.floor(Math.random() * tips.length)];
      tipEl.textContent = `Tip: ${tip}`;
    }

    const form = document.getElementById("share-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const name = document.getElementById("name").value;
        const river = document.getElementById("river").value;
        const state = document.getElementById("state").value;
        const story = document.getElementById("story").value;
        const image = document.getElementById("image").value;
  
        const entry = { name, river, state, story, image };
        const entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
  
        document.getElementById("submit-msg").textContent = `Thanks, ${name}! Your story was submitted.`;
        form.reset();
      });
    }

    const container = document.getElementById("locations-container");
    if (container) {
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.forEach(entry => {
        const card = document.createElement("div");
        card.innerHTML = `
          <h3>${entry.river}, ${entry.state}</h3>
          ${entry.image ? `<img src="${entry.image}" alt="Photo of ${entry.river}" loading="lazy" style="max-width:100%; height:auto;">` : ''}
          <p>${entry.story}</p>
          <p><em>- ${entry.name}</em></p>
          <button class="delete-btn">Delete</button>
        `;
        container.appendChild(card);
  
        card.querySelector(".delete-btn").addEventListener("click", () => {
          const newEntries = entries.filter(e =>
            !(e.name === entry.name && e.river === entry.river && e.state === entry.state && e.story === entry.story)
          );
          localStorage.setItem("entries", JSON.stringify(newEntries));
          location.reload();
        });
      });
    }
  });