/*
let sEmail = document.getElementById('email');
let sPassword = document.getElementById('password');
let sBtLogin = document.getElementById('btLogin');
let sGoogle = document.getElementById('google');

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";

const firebaseConfig = {
    apiKey: myFbApiKey,
    authDomain: myFbAuthDomain,
    projectId: myFbProjectId,
    storageBucket: myFbStorageBucket,
    messagingSenderId: myFbMessagingSenderId,
    appId: myAppId
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Crear usuario
const createUser = (user) => {
    db.collection("Library")
    .add(user)
    .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    localStorage.setItem('email', sEmail2.value);
    window.open("./game.html", "_self");
    })
    .catch((error) => console.error("Error adding document: ", error));
};

sBtLogin.addEventListener('click', () => {
    //localStorage.clear();
    let fecha = new Date();
    //localStorage.setItem('fechaPartida', fecha);
    firebase
    .auth()
    .createUserWithEmailAndPassword(sEmail.value, sPassword.value)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        createUser({
        //nombre: sEmail2.value,
        email: sEmail.value,
        sPassword: sPassword.value,
        fecha: fecha
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error: "+errorCode + ", " + errorMessage);
        });
    }); 
});

//Hacer login de usuario registrado
const addUser = (user) => {
  db.collection("users")
.add(user)
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    localStorage.setItem('email', sEmail2.value);
    window.open("./game.html", "_self");
})
.catch((error) => console.error("Error adding document: ", error));
};

sBot1.addEventListener("click", () => {
    localStorage.clear();
    firebase.auth().signInWithEmailAndPassword(sEmail1.value, sPassword1.value)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha logado ${user.email} ID:${user.uid}`)
      let fecha = new Date();
      localStorage.setItem('fechaPartida', fecha);
      localStorage.setItem('email', sEmail1.value);
      window.open("./game.html", "_self");
    })
    .catch((error) => {
      if (!error.message == "auth/user-not-found") {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage);
      } else {
        //let fecha= new Date;
        addUser({
          email: sEmail1.value,
          fecha: new Date(),
          aciertos: "0"
        });
      }         
    });
  });*/
// Acceso con GOOGLE
sGoogle.addEventListener("click", () => {
    localStorage.clear();
    let provider = new firebase.auth.GoogleAuthProvider(); //Google
    firebase.auth() //Login a través de Google
    .signInWithPopup(provider)
    .then((result) => { 
      /* @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      let fecha = new Date();
      localStorage.setItem('fechaPartida', fecha);
      localStorage.setItem('email', sEmail2.value);
      window.open("./game.html", "_self");
      
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
  });

//Validar email  
let reDNI = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function checkEmail(emailParaValidar){
  console.log(reDNI.test(emailParaValidar));
  if (!reDNI.test(emailParaValidar)) {
    alert(emailParaValidar + " ez dago ondo!!");
    return false;
  }
  console.log(emailParaValidar);
  return true;
};