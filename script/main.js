const firebaseConfig = {
    apiKey: "AIzaSyCXatu95mISPoqCzsUCbX-hVYkKPoRcIYg",
    authDomain: "papingarage-97b0d.firebaseapp.com",
    databaseURL: "https://papingarage-97b0d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "papingarage-97b0d",
    storageBucket: "papingarage-97b0d.appspot.com",
    messagingSenderId: "773525137856",
    appId: "1:773525137856:web:b773457beabcd922484025"
  };

  firebase.initializeApp(firebaseConfig);

  function addItemToContainer (manufacturer, model, mod, year, number, vin, mile, option, mileWork){
    const containerCheck = document.getElementById('list');
    let ElemContainer = document.createElement("div");
    ElemContainer.classList.add('carsCard');
    let manufacturerElem = document.createElement("p");
    let modelElem = document.createElement("p");
    let modElem = document.createElement("p");
    let yearElem = document.createElement("p");
    let numberElem = document.createElement("p");
    let vinElem = document.createElement("p");
    let mileElem = document.createElement("p");
    let workContainer = document.createElement('div')
    workContainer.classList.add("workContainer");
    let  optionElem = document.createElement('p');
    let mileWorkElem = document.createElement('p');

    manufacturerElem.innerHTML = `Марка автомобіля: ${manufacturer}`;
    modelElem.innerHTML = `Модель автомобіля: ${model}`;
    modElem.innerHTML = `Двигун: ${mod}`;
    yearElem.innerHTML = `Рік випуску автомобіля: ${year}`;
    numberElem.innerHTML = `Державний номер: ${number}`;
    vinElem.innerHTML = `Vin code: ${vin}`;
    mileElem.innerHTML = `Пробіг автомобіля: ${mile}`;
    optionElem.innerText = `Роботи які провели:\n\n${option}`;
    mileWorkElem.innerHTML = `Пробіг ${mileWork}`;

    ElemContainer.append(manufacturerElem, modelElem, modElem, yearElem, numberElem, vinElem, mileElem);
    workContainer.append(optionElem, mileWorkElem)
    ElemContainer.append(workContainer)

    containerCheck.append(ElemContainer)

}

function FetchAllData(){
    firebase.database().ref(`cars/`).once('value',
    function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                var manufacturerSel = ChildSnapshot.val().manufacturer;
                var modelSel = ChildSnapshot.val().model;
                var modSel = ChildSnapshot.val().mod;
                var yearSel = ChildSnapshot.val().year;
                var numberSel = ChildSnapshot.val().number;
                var vinSel = ChildSnapshot.val().vin;
                var mileSel = ChildSnapshot.val().mile;
                
    firebase.database().ref(`cars/${vinSel}/options/`).once('value',
    function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                var optionSel = ChildSnapshot.val().option;
                var mileWorkSel = ChildSnapshot.val().mileWork;
                addItemToContainer(manufacturerSel, modelSel, modSel, yearSel, numberSel, vinSel, mileSel,optionSel,mileWorkSel)
            }
        )
    })
    })
}) 
};



const formId = document.getElementById('formId')
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

const handlerSubmit = (e) => {
    e.preventDefault()

    const vin = search.value
    console.log(vin)
}

formId.addEventListener('submit', handlerSubmit)

// const renderCarCards = () =>{
//     showPreloader(true);
//     FetchAllData();  
//     showPreloader(false);
// }

// renderCarCards()

const preloader = document.querySelector('.lds-ripple');

const showPreloader = (show) => {
    if(show){
        preloader.style.display = 'inline-block'
    } else {
        preloader.style.display = 'none'
    }
}