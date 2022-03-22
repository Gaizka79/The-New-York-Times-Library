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
let user = firebase.auth().currentUser;

document.getElementById("btDibuja").addEventListener('click', () => {
    let user = firebase.auth().currentUser;
    document.getElementById('lblConectado').innerHTML= user.email;
    if (user) {
        //alert(user.email);
        console.log(user.email);
        db.collection("favoritos")
        .where("name", "==", user.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().libro);
                let arrTemp = doc.data().libro;
                pintaFavo(arrTemp);
            })
            
        })
        .catch((error) => {
            console.log(error);
        });
    }
});
function pintaFavo(gogokoenak){
    let elemSection = document.getElementById('cajaFavoritos');    
    let artBerria, rankBerria, nomBerria, weeksBerria, descBerria, urlBerria, imgBerria, btBerria, btFav;

    artBerria = document.createElement('article');
    artBerria.className = "clsLibros";
    elemSection.appendChild(artBerria);

    rankBerria = document.createElement('h3');
    rankBerria.innerHTML = "#" + (gogokoenak.rank);

    nomBerria = document.createElement('h3');
    nomBerria.innerHTML = rankBerria.innerHTML + " " + gogokoenak.title;
    artBerria.appendChild(nomBerria);

    imgBerria = document.createElement('img');
    imgBerria.src = gogokoenak.book_image;
    imgBerria.className = "imgLibros";
    artBerria.appendChild(imgBerria);
    
    weeksBerria = document.createElement('p');
    weeksBerria.innerHTML = "Weeks on list: " + (gogokoenak.weeks_on_list);
    artBerria.appendChild(weeksBerria);
    
    descBerria = document.createElement('p');
    descBerria.innerHTML = (gogokoenak.description == "") ?
        "Sorry, description is not available.":
        "Description: " + gogokoenak.description;
    artBerria.appendChild(descBerria);

    btBerria = document.createElement('button');
    btBerria.className = "btn-bootstrap";
    btBerria.name = "btAmazon";
    artBerria.appendChild(btBerria).innerHTML = gogokoenak.amazon_product_url;
    btBerria.textContent = "Amazon!"
};