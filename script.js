import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwggm1jCtUulRNqc9-SM1Gqc1R2igfquA",
  authDomain: "tuttifrutti-e61e9.firebaseapp.com",
  projectId: "tuttifrutti-e61e9",
  storageBucket: "tuttifrutti-e61e9.appspot.com",
  messagingSenderId: "987528388916",
  appId: "1:987528388916:web:85e4bd8e69695e2b438561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Auth
const auth = getAuth(app);
const user = auth.currentUser;
//Initialize DDBB
const db = getFirestore(app);

//Initialize cloudstore
const storage = getStorage();

const signUpForm = document.getElementById('form1');
const loginForm = document.getElementById('form2');
const logout = document.getElementById('log-out');
const userData = document.getElementById('user-data');

function validateEmail(email) {
  let mailformat = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; //letras y numeros guiones y dos o 4 letras al final
  return mailformat.test(email);
}

function validateUser(user1) {
  let mailformat = /^[A-Za-z0-9_-]{1,8}$/; // de 1 a 8 caracteres, alfanumérico
  return mailformat.test(user1);
}

function validatePassword(password) {
  let passFormat = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/; //una mayuscula, una minuscula, un numero y uncaracter especial
  return passFormat.test(password);
}

auth.onAuthStateChanged(user => {
  if (user) {
    console.log('Usuario autenticado:', user.email);
  } else {
    console.log('No hay usuario autenticado');
    
  }
});

//SignUp function
signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const signUpEmail = document.getElementById('email').value;
  const signUpPassword = document.getElementById('pass').value;
  const signUpUser = document.getElementById('signup-user').value;
  const usersRef = collection(db, "users");
  const signUpImg = document.getElementById('signup-picture').files[0];
  const storageRef = ref(storage, signUpImg.name);
  let publicImageUrl;

  if (!validateEmail(signUpEmail)) {
    alert("Not a valid email address.");
    return;
  }

  if (!validateUser(signUpUser)) {
    alert("Not a valid username.");
    return;
  }

  if (!validatePassword(signUpPassword)) {
    alert("Password must include at least a number, an uppercase and a lowercase letter. Minimum of 8 char.");
    return;
  }

  try {
    //Create auth user
    await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        console.log('User registered')
        const user = userCredential.user;

        signUpForm.reset();
        
      })
    //Upload file to cloud storage
    await uploadBytes(storageRef, signUpImg).then(async (_snapshot) => {
      console.log('Uploaded a blob or file!')
      publicImageUrl = await getDownloadURL(storageRef);
    })
    //Create document in DB
    await setDoc(doc(usersRef, signUpEmail), {
      username: signUpUser,
      email: signUpEmail,
      favoriteFruits: 0,
      profile_picture: publicImageUrl
    })
  } catch (error) {
    console.log('Error: ', error)
  }

});

//Login function
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const loginEmail = document.getElementById('email2').value;
  const loginPassword = document.getElementById('pass3').value;
  //Call the collection in the DB
  const docRef = doc(db, "users", loginEmail);
  //Search a document that matches with our ref
  const docSnap = await getDoc(docRef);
  console.log('docSnap:', docSnap);

  if (!validateEmail(loginEmail)) {
    alert("Not a valid email address.");
    return;
  }

  if (!validatePassword(loginPassword)) {
    alert("Not a valid password.");
    return;
  }

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      console.log('User authenticated')
      const user = userCredential.user;
      loginForm.reset();
    }).then(() => {
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        userData.innerHTML = `<p id ="username">${docSnap.data().username}</p>
                              <img src=${docSnap.data().profile_picture} alt='User profile picture'>`
      } else {
        console.log("An error ocurred.");
        alert("Not a current user.")
      }
    })
    .catch((error) => {
      document.getElementById('msgerr').innerHTML = 'Invalid user or password';
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error code: ' + errorCode);
      console.log('Error message: ' + errorMessage);
    });
    
})

//Logout function
logout.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('Logout user')
    location.reload();
  }).catch((error) => {
    console.log('Error: ', error)
  });
})
















//variables
let calories = [];
let fat = [];
let sugar = [];
let carbs = [];
let protein = [];
let nombre = [];
const fruitsNode = document.getElementById("frutas");
const api = 'https://www.fruityvice.com/api/fruit/all'
const enero = ["Hazelnut", "Blueberry", "Lingonberry", "Cranberry", 'Avocado', 'Papaya', 'Pear', 'Pineapple', 'Banana', 'Kiwi', 'Lemon', 'Tangerine', 'Mango', 'Apple', 'Orange', 'Pomelo', "Tomato", 'Pomegranate', 'Persimmon']
const febr =['Banana', 'Pomelo', 'Tomato','Persimmon', 'Pomegranate', 'Avocado', 'Kiwi', 'Lemon', 'Tangerine', 'Mango', 'Apple', 'Orange', 'Papaya', 'Pear', 'Pineapple',"Hazelnut", "Blueberry", "Lingonberry", "Cranberry"]
const marzo =['Pineapple', 'Banana', 'Pomelo', 'Avocado', 'Lemon', 'Strawberries', 'Mango', 'Apple', 'Orange', 'Papaya', 'Pear', 'Tomato', 'Kiwi',"Hazelnut", "Blueberry", "Lingonberry", "Cranberry"]
const abril =['Strawberry',"Hazelnut", "Blueberry", "Lingonberry", "Cranberry", 'Lemon', 'Mango', 'Banana', 'Orange', 'Papaya', 'Pineapple', 'Avocado', 'Plum', 'Apple', 'Kiwi', 'Pear', 'Pomelo']
const mayo =['Lemon', 'Mango', 'Melon', "Hazelnut", "Blueberry", "Lingonberry", "Cranberry",'Apricot', 'Cherry', 'Plum', 'Strawberry', 'Papaya', 'Banana','Avocado', 'Kiwi', 'Grapefruit', 'Pineapple', 'Apple', 'Orange', 'Pear', 'Lychee']
const jun =['Gooseberry', 'Apricot', 'Fig', 'Cherry', 'Plum', 'Raspberry', 'Strawberry', 'Lemon', 'Mango', "Hazelnut", "Blueberry", "Lingonberry", "Cranberry",'Peach', 'Melon', 'Banana', 'Lychee','Avocado', 'Apple', 'Orange', 'Pear', 'Pineapple', 'Watermelon', 'Kiwi']
const jul =['Apricot', 'Plum', 'Raspberry', 'Gooseberry',"Hazelnut", "Blueberry", "Lingonberry", "Cranberry", 'Fig', 'Cherry', 'Mango', 'Peach', 'Melon', 'Pear', 'Banana', 'Watermelon', 'Pineapple', 'Avocado', 'Kiwi', 'Lemon', 'Apple', 'Lychee']
const agos =['Pear', 'Banana', 'Watermelon', 'Grape', , 'Plum', 'Raspberry', 'Gooseberry', 'Fig', 'Mango', 'Peach', "Hazelnut", "Blueberry", "Lingonberry", "Cranberry",'Melon', 'Blackberry', 'Kiwi', 'Lemon', 'Apple', 'Pineapple', 'Apricot', 'Avocado', 'Cherry']
const sept =['Avocado', 'Raspberry', 'Fig', 'Kiwi',"Hazelnut", "Blueberry", "Lingonberry", "Cranberry", 'Mango', 'Apple', 'Melon', 'Pear', 'Banana', 'Grape', 'Peach', 'Blackberry', 'Pineapple', 'Watermelon', 'Plum', 'Pomegranate', 'Lemon', 'Tangerine']
const oct =['Avocado',"Hazelnut", "Blueberry", "Lingonberry", "Cranberry", 'Persimmon', 'Tangerine', 'Mango', 'Apple', 'Peach', 'Papaya', 'Pear', 'Pineapple', 'Banana', 'Grape', 'Pomegranate', 'Fig', 'Lemon', 'Orange']
const nov =['Avocado', 'Persimmon', 'Pomegranate', 'Kiwi', 'Mango', 'Apple', 'Papaya', 'Pear', "Hazelnut", "Blueberry", "Lingonberry", "Cranberry",'Pineapple', 'Banana', 'Lemon', 'Tangerine', 'Orange', 'Grape']
const dic =['Avocado', 'Persimmon', 'Pomegranate', 'Kiwi', 'Lemon', 'Papaya',"Hazelnut", "Blueberry", "Lingonberry", "Cranberry",  'Pear', 'Pineapple', 'Banana', 'Tomato', 'Tangerine', 'Apple', 'Orange', 'Mango', 'Grape']


//para abrir los forms de usuario
document.getElementById("signup-login").addEventListener("click", function(){
  document.getElementById("botones").style.display="none"
  document.getElementById("graficas").style.display="none"
  document.getElementById("general").style.display="none"
  document.getElementById("signup-login").style.display="none"
  document.getElementById("back").style.visibility="visible"
  document.getElementById("form1").style.display = "block"
  document.getElementById("form2").style.display = "block"
})

//para volver a la página inicial
document.getElementById("reload").addEventListener("click", function() {

  location.reload();
  
  });

  document.getElementById("back").addEventListener("click", function() {

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

function showIndvCard(fruit) {
  let tarjetaIndividual = indvcardTemplate(`./assets/${fruit.name}.jpg`, fruit.name, fruit.nutritions.calories, fruit.nutritions.fat, fruit.nutritions.sugar, fruit.nutritions.carbohydrates, fruit.nutritions.protein);
  fruitsNode.innerHTML = tarjetaIndividual;
}



//mostrar frutas de temporada
function comprobarMes(){
  let fecha = new Date (Date.now())
  let mes = fecha.getMonth()
  console.log(fecha)
  console.log(mes)
  let frutas = [];
  
  
  switch (mes) {
  case 0:
    console.log('Enero');
    frutas = enero
    break;
  case 1:
    console.log('Febrero');
    frutas = febr
    break;
    case 2:
    console.log('Marzo');
    frutas = marzo
    break;
    case 3:
    console.log('Abril');
    frutas =abril
    break;
    case 4:
    console.log('Mayo');
    frutas = mayo
    break;
    case 5:
    console.log('Junio');
    frutas = jun
    break;
    case 6:
    console.log('Julio');
    frutas = jul
    break;
    case 7:
    console.log('Agosto');
    frutas = agos
    break;
    case 8:
    console.log('Septiembre');
    frutas = sept
    break;
    case 9:
    console.log('Octubre');
    frutas =oct
    break;
  case 10:
    console.log('Noviembre');
    frutas = nov;
    break;
    case 11:
    console.log('Diciembre');
    frutas = dic
    break;

  }
  let ul = document.getElementById("frutTemp");
  ul.innerHTML = ''; // Limpiar la lista antes de añadir los nuevos elementos
  
  frutas.forEach(function(fruta) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(fruta));
    ul.appendChild(li);
  });
}




//para mostrar todas las frutas
async function getFruits() {
    let response = await fetch(api);
    let data = await response.json();
  
    let cards = ""
  
    for (let i = 0; i < data.length; i++) {
      cards += cardTemplate(`./assets/${data[i].name}.jpg`, data[i].name);
    }
    fruitsNode.innerHTML = cards;
  
    // Agregar controladores de eventos click a las tarjetas de frutas
    data.forEach(fruit => {
      document.getElementById(`card-${fruit.name}`).addEventListener("click", function() {
        showIndvCard(fruit);
        document.getElementById("reload").style.visibility = "visible"
      });
     
    });
  
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
comprobarMes()

  //cuando se busca una sola fruta
document.getElementById("searcher").addEventListener("submit", function(event) {   

  event.preventDefault();
  document.getElementById("graficas").style.display = "none";
  document.getElementById("temporada").style.display = "none";
  document.getElementById("reload").style.visibility = "visible"

  let fruitSearch = event.target.search.value;  

  
    fetch(`https://www.fruityvice.com/api/fruit/${fruitSearch}`)
                    .then(res => res.json())
                    .then(data => {

      let tarjetas = ""

   
     tarjetas+= indvcardTemplate(`./assets/${data.name}.jpg`, data.name, data.nutritions.calories, data.nutritions.fat, data.nutritions.sugar, data.nutritions.carbohydrates, data.nutritions.protein)
    
    fruitsNode.innerHTML = tarjetas
    });
 
 
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
      





