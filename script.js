const cardTemplate = function (image, fruit) {
    return `<div class="card">
                <img src="${image}" alt="${fruit}" class="fruitimg">
                <p class="center">${fruit}</p>
              </div>`;
  };

  const fruitsNode = document.getElementById("frutas");


  fetch('https://www.fruityvice.com/api/fruit/all')
        .then(res => res.json())
        .then(elements => {

      let cards = ""

    for (let i = 0; i < elements.length; i++) {
     cards+= cardTemplate(`./assets/${elements[i].name}.jpg`, elements[i].name)
    }
    fruitsNode.innerHTML = cards
    });