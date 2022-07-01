import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getDatabase, ref, set, onValue, get, update, push} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js';
import { firebaseConfig } from './secret.js';

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("ready!");

    const app = initializeApp(firebaseConfig);
    // Initialize Realtime Database and get a reference to the service
    
    const database = getDatabase(app);
    const userRef = ref(database);

    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        document.getElementById("items").innerHTML += "<div>" + JSON.stringify(data) + "<div/>"
     });

    document.getElementById("btn-insert").addEventListener("click", e => {
        console.log("Triggered");
        const insertRef = ref(database, "users/"+document.getElementById("id-insert").value);
        set(insertRef, {
            name: document.getElementById("name-insert").value
        });
    });
    document.getElementById("btn-up").addEventListener("click", e => {
        console.log("Triggered");
        const upRef = ref(database, "users/"+document.getElementById("id-up").value);
        update(upRef, {
            name: document.getElementById("name-up").value
        });
    });
    document.getElementById("btn-del").addEventListener("click", e => {
        console.log("Triggered");
        const delRef = ref(database, "users");
        const updates = {};
        updates[document.getElementById("id-del").value] = null;
        update(delRef, updates);
    });
});