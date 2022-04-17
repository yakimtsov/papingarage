import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {getDatabase, ref, set, } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

    const firebaseConfig = {
        apiKey: "AIzaSyCXatu95mISPoqCzsUCbX-hVYkKPoRcIYg",
        authDomain: "papingarage-97b0d.firebaseapp.com",
        databaseURL: "https://papingarage-97b0d-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "papingarage-97b0d",
        storageBucket: "papingarage-97b0d.appspot.com",
        messagingSenderId: "773525137856",
        appId: "1:773525137856:web:b773457beabcd922484025"
      };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    firebase.initializeApp(firebaseConfig)


submitData.addEventListener('click', (e) => {
    e.preventDefault()
    var manufacturer = document.getElementById('manufacturer').value;
    var model = document.getElementById('model').value;
    var mod = document.getElementById('mod').value;
    var year = document.getElementById('year').value;
    var number = document.getElementById('number').value;
    var vin = document.getElementById('vin').value;
    var mile = document.getElementById('mile').value;
    
//add data
    if(vin){
        set(ref(database, `cars/${vin}`), {
            manufacturer: manufacturer,
            model: model,
            mod: mod,
            year:year,
            number:number,
            vin:vin,
            mile:mile,
        }).then(() => {
            
            window.location.href = 'check.html'
        })
        .catch((error) => {
            alert(error);
        });
    }
});
SubmitWork.addEventListener('click', (e) => {
    e.preventDefault()

    var vinWork = document.getElementById('vinWork').value;
    var option = document.getElementById('work').value;
    var mileWork = document.getElementById('mile-work').value;
//add data
        set(ref(database, `cars/${vinWork}/options/${mileWork}`),{
            vinWork:vinWork,
            option:option,
            mileWork:mileWork,
        });
    
});

