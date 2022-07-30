let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection");

  const displayCard = (toy) => {
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    const h2 = document.createElement("h2");
    h2.textContent = toy.name;
    toyCard.append(h2);
    const img = document.createElement("img");
    img.className = "toy-avatar";
    img.src = toy.image;
    toyCard.append(img);
    const p = document.createElement("p");
    p.innerText = `${toy.likes} Likes`;
    toyCard.append(p);
    const btn = document.createElement("btn");

    btn.addEventListener("click", () => {
      toy.likes += 1;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: toy.likes }),
      })
        .then((r) => r.json())
        .then((data) => {
          p.innerText = `${toy.likes} Likes`;
        });
    });

    btn.className = "like-btn";
    btn.id = toy.id;
    btn.innerText = "Like ❤️";
    toyCard.append(btn);
    toyCollection.append(toyCard);
  };

  fetch("http://localhost:3000/toys")
    .then((r) => r.json())
    .then((data) => {
      data.forEach(displayCard);
    });

  const toyForm = document.querySelector(".add-toy-form");

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then((data) => {
        displayCard(data);
        e.target.reset();
      });
  });

  const addBtn = document.querySelector("#new-toy-btn");

  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});