let myKey = config.MY_KEY;  //NYT
let arrGeneros = [];
let arrLibros = [];
let arrPruebas = [];
let arrLocalStorage1 = [];
let sBtExplore;
let sItxaron = document.getElementById("itxaroten");
let sSection = document.getElementsByTagName('section');
let sEmail = document.getElementById('email');
let sPassword = document.getElementById('password');
let sBtLoginRegistrado = document.getElementById('btLoginRegistrado');
let sBtLoginNuevo = document.getElementById('btLoginNuevo');
let sBtGoogle = document.getElementById('btGoogle');

const firebaseConfig = {
    apiKey: config.MY_Fb_API_KEY,
    authDomain: "library-da1cd.firebaseapp.com",
    projectId: "library-da1cd",
    storageBucket: "library-da1cd.appspot.com",
    messagingSenderId: "781486562828",
    appId: config.MY_Fb_APP_ID
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Crear usuario
/*const createUser = (user) => {
    db.collection("favoritos")//users
        .add(user)
        .then((docRef) => console.log("Document written with ID: ", docRef.id))
        .catch((error) => console.error("Error adding document: ", error));
};*/

sBtLoginNuevo.addEventListener('click', () => {
    console.log("Empezamos el alta");
    firebase
    .auth()
    .createUserWithEmailAndPassword(sEmail.value, sPassword.value)
    .then((userCredential) => {
        let user = userCredential.user;
        console.log("te damos de alta");
        console.log("user: " + user);
        document.getElementById('lblConect').innerHTML="Usuario: " + user.email;
        //konektatuta(user.email, user.uid);
        /*createUser({
            email: sEmail.value,
            password: sPassword.value,
            msg: "ke pasa wey"
        })*/
        // ..
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
        // ..
    });
});

//Hacer login de usuario registrado
sBtLoginRegistrado.addEventListener("click", () => {
    firebase.auth().signInWithEmailAndPassword(sEmail.value, sPassword.value)
    .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`Se ha logado ${user.email} ID:${user.uid}`)
        alert(`Se ha logado a: ${user.email} correctamente`);
        document.getElementById('lblConect').innerHTML="Usuario: " + user.email;
        //konektatuta(user.email, user.uid);
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert("Ha ocurrido el error: " + errorCode +
            " " + errorMessage);
    });
});
//Login con google
sBtGoogle.addEventListener('click', async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider)
    .then((result) => {
        console.log(result);
        //konektatuta(user.email, user.uid);
        //@type {firebase.auth.OAuthCredential} 
        let credential = result.credential;
        document.getElementById('lblConect').innerHTML="Usuario: " + result.user.email;
        console.log("Google ok");
        //document.getElementById('lblConect').innerHTML="Usuario: " + user.email;
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken;
        // The signed-in user info.
        let user = result.user;
    }).catch((error) => {
        console.log("Google error");
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("Error: " + errorCode + " " + errorMessage + " " + credential);
  });
});


let sUserIN = document.getElementById('userIN');
function konektatuta (izena, id){
    sUserIN.innerText = izena;
    localStorage.setItem("konektado", id);
};

function itxaron(){
    return new Promise(function(resolve){
        console.log("itxaroten ari naiz " + Date());
        setTimeout(resolve,300);
    });
};
function waitingBai(){
    document.body.style = "cursor: wait";
    sSection.clear;
    document.getElementById('cajaPadre').style.backgroundColor = 'black';
    sItxaron.style.visibility = "visible";
    sItxaron.style.display = "block";
};
function waitingEz(){
    sItxaron.style.visibility = "hidden";
    sItxaron.style.display = "none";
    document.getElementById('cajaPadre').style.backgroundColor = '#90e0ef';
    document.body.style = "cursor: default";
};
async function deituAPI(){
    waitingBai();
    await itxaron();
    try {
        let response = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=' + myKey)
        let data = await response.json();
        arrGeneros = data.results;
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
        return;
    }
    finally {
        waitingEz();
    }
    sortuArticle();
};
function sortuArticle (){
    let elemSection = document.getElementById('cajaPadre');    
    let artBerria, nomBerria, fechaBerria, ultimoBerria, frecuenciaBerria, btBerria;

    for (let i=0; i<arrGeneros.length; i++){
        artBerria = document.createElement('article');
        artBerria.className = "clsFichas";
        elemSection.appendChild(artBerria);
    
        nomBerria = document.createElement('h2');
        artBerria.appendChild(nomBerria);
        nomBerria.innerHTML = (arrGeneros[i].display_name);
        
        fechaBerria = document.createElement('p');
        artBerria.appendChild(fechaBerria);
        fechaBerria.innerHTML = "Oldest: " + (arrGeneros[i].oldest_published_date);
        
        ultimoBerria = document.createElement('p');
        artBerria.appendChild(ultimoBerria);
        ultimoBerria.innerHTML = "Newest: " + (arrGeneros[i].newest_published_date);

        frecuenciaBerria= document.createElement('p');
        artBerria.appendChild(frecuenciaBerria);
        frecuenciaBerria.innerHTML = "Updated: " + (arrGeneros[i].updated);

        btBerria = document.createElement('button');
        btBerria.className = "btn-bootstrap";
        btBerria.id = arrGeneros[i].list_name;
        btBerria.name = "btExplore";
        artBerria.appendChild(btBerria).innerHTML = "Explore!";
    }
    asignaBoton();
};
function asignaBoton (){
    sBtExplore = document.getElementsByName("btExplore");
    for (let i=0; i<sBtExplore.length; i++){
        sBtExplore[i].addEventListener("click",function (){
         loadLiburak(sBtExplore[i].id);
        });
    };
};
async function loadLiburak(genero){
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${genero}.json?api-key=` + myKey)
        let data = await response.json();
        arrPruebas = data.results.books;
        console.log(data);
        console.log(arrPruebas);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    } finally{
        //waitingEz();
    };
    localStorage.setItem("resultado", genero);
    window.open("libros.html", "_self");
}
deituAPI();

document.getElementById('btLogOut').addEventListener('click', () => {
    firebase.auth().signOut();
    console.log("Loged out!");
    document.getElementById('lblConect').innerHTML="Sin usuarios activos";
});


/*async function sacaLibros(genero){
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists.json?list=${genero}&api-key=` + myKey)
        let data = await response.json();

        arrLibros = data;
        console.log(data);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
};*/


//ver usuarios registrados
/*
document.getElementById('NorDago').addEventListener('click', () => {
    let user = firebase.auth().currentUser;
        if (user) {
            console.log(user.email + " " + user.id);
            konektatuta(user.email, user.uid);
   
        } else {
            console.log("Ez dago inor");

        }

});*/



//Logout
/*
document.getElementById('itxiSaioa').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log("Ta luegiiiiii");
        konektatuta("inor ez", "");
      }).catch((error) => {
          alert("Failllllll");
          alert(error);
        // An error happened.
      });
});
function logOut(){
    firebase.auth().signOut().then(() => {
        console.log("Ta luegiiiiii");
        //konektatuta("inor ez", "");
      }).catch((error) => {
          alert("Failllllll");
          alert(error);
    });
}*/