
let calories = [];
let fat = [];
let sugar = [];
let carbs = [];
let protein = [];
let nombre = [];
const fruitsNode = document.getElementById("frutas");
const api = 'https://www.fruityvice.com/api/fruit/all'

//para volver a la página inicial
document.getElementById("reload").addEventListener("click", function() {

  location.reload();
  
  });

function generarGrafica(){
  const sugarchart = document.getElementById('chart1');
  
  new Chart(sugarchart, {
    type: 'bar',
    data: {
      labels: nombre,
      datasets: [{
        label: 'sugar in fruits',
        data: sugar,
        borderWidth: 1,
        backgroundColor: [
          'rgb(178, 208, 94)',
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
  
    }
  });
  
  
  const proteinChart = document.getElementById('chart2');
  
  new Chart(proteinChart, {
    type: 'bar',
    data: {
      labels: nombre,
      datasets: [{
        label: 'protein in fruits',
        data: protein,
        borderWidth: 1,
        backgroundColor: [
          'rgb(253, 181, 93)',
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
  
    }
  });
  
  
  
  const carbsChart = document.getElementById('chart3');
  
  new Chart(carbsChart, {
    type: 'bar',
    data: {
      labels: nombre,
      datasets: [{
        label: 'carbs in fruits',
        data: carbs,
        borderWidth: 1,
        backgroundColor: [
          'rgb(231, 225, 77)',
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
  
    }
  });
  
  
  const caloriesChart = document.getElementById('chart4');
  
  new Chart(caloriesChart, {
    type: 'bar',
    data: {
      labels: nombre,
      datasets: [{
        label: 'calories in fruits',
        data: calories,
        borderWidth: 1,
        backgroundColor: [
          'rgb(178, 208, 94)',
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
  
    }
  });
  
  }


const cardTemplate = function (image, fruit) {
    return `<div class="card" id="card-${fruit}">
                <img src="${image}" alt="${fruit}" class="fruitimg">
                <h3 class="center">${fruit}</h3>
              </div>`;
  };

const indvcardTemplate = function (image, fruit, calories, fat, sugar, carbs, protein) {
  return `<article class="indvcard">
              <img src="${image}" alt="${fruit}" class="fruitimg">
              <h3 class="center">${fruit}</h3>
              <p class="details">Calories: ${calories}</p>
              <p class="details">Protein: ${protein}</p>
              <p class="details">Carbs: ${carbs}</p>
              <p class="details">Fat: ${fat}</p>
              <p class="details">Sugar: ${sugar}</p>
            </article>`;
};


//para mostrar todas las frutas
  async function getFruits() {
    let response = await fetch(api);
    let data = await response.json();
  
        let cards = ""
  
      for (let i = 0; i < data.length; i++) {
       cards+= cardTemplate(`./assets/${data[i].name}.jpg`, data[i].name)
      }
      fruitsNode.innerHTML = cards
  
  
      for(let i = 0; i < data.length; i++){
          calories.push(data[i].nutritions.calories)
          fat.push(data[i].nutritions.fat)  
          sugar.push(data[i].nutritions.sugar)  
          carbs.push(data[i].nutritions.carbohydrates)  
          protein.push(data[i].nutritions.protein)
          nombre.push(data[i].name)  
    
        }
        generarGrafica()

  }
  

  
getFruits()


  //cuando se busca una sola fruta
document.getElementById("searcher").addEventListener("submit", function(event) {   

  event.preventDefault();
  document.getElementById("graficas").style.display = "none";
  document.getElementById("temporada").style.display = "none";
  document.getElementById("reload").style.visibility = "visible"

  let fruitSearch = event.target.search.value;  

  if(fruitSearch.value == undefined){
    alert("Not an existent fruit")
    location.reload()
  } else if(fruitSearch.value != undefined){

  
  fetch(`https://www.fruityvice.com/api/fruit/${fruitSearch}`)
  .then(res => res.json())
  .then(data => {

      let tarjetas = ""

   
     tarjetas+= indvcardTemplate(`./assets/${data.name}.jpg`, data.name, data.nutritions.calories, data.nutritions.fat, data.nutritions.sugar, data.nutritions.carbohydrates, data.nutritions.protein)
    
    fruitsNode.innerHTML = tarjetas
    });
 
  }
});



document.getElementById("filterForm").addEventListener("submit", function(event) {   

  event.preventDefault();
  
  document.getElementById("graficas").style.display = "none";
  document.getElementById("temporada").style.display = "none";

  let orderFilter = filterForm.filtro.value 

  if(orderFilter == "none"){
    location.reload()
  }else if(orderFilter != "none"){

  fetch(`https://www.fruityvice.com/api/fruit/order/${orderFilter}`)
  .then(res => res.json())
  .then(data => {

    let cards = ""
  
    for (let i = 0; i < data.length; i++) {
     cards+= cardTemplate(`./assets/${data[i].name}.jpg`, data[i].name)
    }
    fruitsNode.innerHTML = cards

  });
  }
  document.getElementById("reload").style.visibility = "visible"
});



document.getElementById("sortForm").addEventListener("submit", function(event) {   

  event.preventDefault();
  
  document.getElementById("graficas").style.display = "none";
  document.getElementById("temporada").style.display = "none";

  let sortFilter = document.getElementById("ordenar").value;

  if(sortFilter == "none"){
    location.reload()
  }else if(sortFilter != "none"){
    sortFruits(sortFilter);

  }
  document.getElementById("reload").style.visibility = "visible"
});

async function sortFruits(sortFilter) {
  let data = await fetch(api).then(res => res.json());
  if (sortFilter == "az") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortFilter == "za") {
    data.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortFilter == "caloriesup") {
    data.sort((a, b) => a.nutritions.calories - b.nutritions.calories);
  } else if (sortFilter == "caloriesdown") {
    data.sort((a, b) => b.nutritions.calories - a.nutritions.calories);
  }

  let cards = "";
  for (let i = 0; i < data.length; i++) {
    cards += cardTemplate(`./assets/${data[i].name}.jpg`, data[i].name);
  }
  fruitsNode.innerHTML = cards;
}
      

