//ver usuarios registrados
document.getElementById('btConectado').addEventListener('click', () => {
    let user = firebase.auth().currentUser;
        if (user) {
            console.log(user.email + " " + user.uid);
            document.getElementById('lblConectado').innerHTML= user.email + " " + user.id;
            //konektatuta(user.email, user.uid);

        } else {
            console.log("Ez dago inor");
        // User is signed out
        // ...
        }

});

async function buscaLibros(buscaTemp){
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${buscaTemp}.json?api-key=` + myKey)
        let data = await response.json();
        arrPruebas = data.results.books;
        console.log(data);
        console.log(arrPruebas);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
    sortuLiburuak();
};
async function sortuLiburuak(){
    let elemSection = document.getElementById('cajaMadre');    
    let artBerria, rankBerria, nomBerria, weeksBerria, descBerria, urlBerria, imgBerria, btBerria, btFav;

    for (let i=0; i<arrPruebas.length; i++){
        artBerria = document.createElement('article');
        artBerria.className = "clsLibros";
        elemSection.appendChild(artBerria);

        rankBerria = document.createElement('h3');
        rankBerria.innerHTML = "#" + (arrPruebas[i].rank);
    
        nomBerria = document.createElement('h3');
        nomBerria.innerHTML = rankBerria.innerHTML + " " + arrPruebas[i].title;
        artBerria.appendChild(nomBerria);

        imgBerria = document.createElement('img');
        imgBerria.src = arrPruebas[i].book_image;
        imgBerria.className = "imgLibros";
        artBerria.appendChild(imgBerria);
        
        weeksBerria = document.createElement('p');
        weeksBerria.innerHTML = "Weeks on list: " + (arrPruebas[i].weeks_on_list);
        artBerria.appendChild(weeksBerria);
        
        descBerria = document.createElement('p');
        descBerria.innerHTML = (arrPruebas[i].description == "") ?
            "Sorry, description is not available.":
            "Description: " + arrPruebas[i].description;
        artBerria.appendChild(descBerria);

        btBerria = document.createElement('button');
        btBerria.className = "btn-bootstrap";
        //btBerria.id = arrPruebas[i].list_name;
        btBerria.name = "btAmazon";
        artBerria.appendChild(btBerria).innerHTML = arrPruebas[i].amazon_product_url;
        btBerria.textContent = "Amazon!"

        btFav = document.createElement('button');
        btFav.className = "btn-bootstrap";
        btFav.id = arrPruebas[i].title;
        btFav.name = "btFavoritos";
        btFav.textContent = "Favoritos";
        artBerria.appendChild(btFav);
    }
    localStorage.setItem("libros", JSON.stringify(arrPruebas));
    asignaBotonAmazon();
};
function asignaBotonAmazon (){
    let sBtAmazon = document.getElementsByName("btAmazon");
    let sBtFavoritos = document.getElementsByName("btFavoritos");
    for (let i=0; i<sBtAmazon.length; i++){
        sBtAmazon[i].addEventListener("click",function (){
            console.log("amazon");
            window.open(arrPruebas[i].amazon_product_url);
        })
    };
    for (let i=0; i<sBtFavoritos.length; i++){
        sBtFavoritos[i].addEventListener("click", function (){
        console.log("ok");
        favoritos(i);
        })
    };
};
let busca = localStorage.getItem("resultado");
buscaLibros(busca);

function favoritos(indice){
    let user = firebase.auth().currentUser;
    //let docId;
    let temp = JSON.parse(localStorage.getItem("libros"));
    console.log(temp[indice]);
    //console.log(JSON.parse(localStorage.getItem("libros"[libroFav])));
    if (user) {
        localStorage.setItem("loged", user.email);
        console.log(user.email + " " + user.uid);
        document.getElementById('lblConectado').innerHTML= user.email + " " + user.id;        
        db.collection("favoritos").add({
            name: user.email,
            libro: temp[indice]
        })
        
        .then((docref) => {
            console.log("okokokok");
        })
        .catch((error) =>{
            console.log("mekaguen la puta" + error);
        });

    } else {
        console.log("Ez dago inor");
        alert("Tienes ke iniciar sesión");
    // User is signed out
    // ...
    };
    //alert("Estamos en favoritos con: " + libroFav + " con: " + user.email + " " + user.uid);

};
document.getElementById('tempfavo').addEventListener('click', function abre(){
    window.open("favoritos.html", "_self");
});

