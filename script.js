
let calories = [];
let fat = [];
let sugar = [];
let carbs = [];
let protein = [];
let nombre = [];





const cardTemplate = function (image, fruit) {
    return `<div class="card">
                <img src="${image}" alt="${fruit}" class="fruitimg">
                <h3 class="center">${fruit}</h3>
              </div>`;
  };

  const fruitsNode = document.getElementById("frutas");

  const api = 'https://www.fruityvice.com/api/fruit/all'


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

const indvcardTemplate = function (image, fruit, calories, fat, sugar, carbs, protein) {
  return `<div class="indvcard">
              <img src="${image}" alt="${fruit}" class="fruitimg">
              <h3 class="center">${fruit}</h3>
              <p class="details">Calories: ${calories}</p>
              <p class="details">Protein: ${protein}</p>
              <p class="details">Carbs: ${carbs}</p>
              <p class="details">Fat: ${fat}</p>
              <p class="details">Sugar: ${sugar}</p>
            </div>`;
};
  
document.getElementById("searcher").addEventListener("submit", function(event) {   

  event.preventDefault();
  document.getElementById("graficas").style.display = "none";
  document.getElementById("temporada").style.display = "none";

  let fruitSearch = event.target.search.value;  
  
  fetch(`https://www.fruityvice.com/api/fruit/${fruitSearch}`)
  .then(res => res.json())
  .then(data => {

      let tarjetas = ""

   
     tarjetas+= indvcardTemplate(`./assets/${data.name}.jpg`, data.name, data.nutritions.calories, data.nutritions.fat, data.nutritions.sugar, data.nutritions.carbohydrates, data.nutritions.protein)
    
    fruitsNode.innerHTML = tarjetas
    });


})
















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
      

