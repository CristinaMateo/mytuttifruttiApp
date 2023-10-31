
let calories = [];
let fat = [];
let sugar = [];
let carbs = [];
let protein = [];
let nombre = [];





const cardTemplate = function (image, fruit) {
    return `<div class="card">
                <img src="${image}" alt="${fruit}" class="fruitimg">
                <p class="center">${fruit}</p>
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


const caloriesChart = document.getElementById('chart2');

new Chart(caloriesChart, {
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


}
      

