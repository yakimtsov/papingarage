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
  const preloader = document.querySelector('.lds-ripple');

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
    optionElem.innerHTML = `Роботи які провели ${option}`;
    mileWorkElem.innerHTML = `Пробіг ${mileWork}`;

    ElemContainer.appendChild(manufacturerElem);
    ElemContainer.appendChild(modelElem);
    ElemContainer.appendChild(modElem);
    ElemContainer.appendChild(yearElem);
    ElemContainer.appendChild(numberElem);
    ElemContainer.appendChild(vinElem);
    ElemContainer.appendChild(mileElem);

    workContainer.appendChild(optionElem)
    workContainer.appendChild(mileWorkElem)
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
                addItemToContainer(manufacturerSel, modelSel, modSel, yearSel, numberSel, vinSel, mileSel)
            }
        )
    })
    
};

function fetchWorkData (){
    firebase.database().ref(`cars/options/`).once('value',
    function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                var optionSel = ChildSnapshot.val().option;
                var mileWorkSel = ChildSnapshot.val().mileWork;
                
                addItemToContainer(optionSel,mileWorkSel)
            }
        )
    })
}

const showPreloader = (show) => {
    if(show){
        preloader.style.display = 'inline-block'
    } else {
        preloader.style.display = 'none'
    }
}


const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');



const renderCarCards = () =>{
    showPreloader(true);
    FetchAllData();
    fetchWorkData();    
    showPreloader(false);
}

renderCarCards()