let myKey = "R2R5OEtmCsXRuTaPQ8M9WYRzRfo7UCM2"
async function buscaLibros(buscaTemp){
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${buscaTemp}.json?api-key=` + myKey)
        let data = await response.json();
        arrPruebas = data.results.books;
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
    sortuLiburuak();
};
function sortuLiburuak(){
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
        btBerria.name = "btAmazon";
        artBerria.appendChild(btBerria).innerHTML = arrPruebas[i].amazon_product_url;
        btBerria.textContent = "Amazon!"

        btFav = document.createElement('button');
        btFav.className = "btn-bootstrap";
        btFav.id = arrPruebas[i].title;
        btFav.name = "btFavoritos";
        btFav.textContent = "Favoritos";
        //artBerria.appendChild(btFav);
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
