let myKey = config.MY_KEY;
let arrGeneros = [];
let arrLibros = [];
let arrPruebas = [];
let sBtExplore;
let sAbierto;

function itxaron(){
    return new Promise(function(resolve){
        console.log("itxaroten ari naiz " + Date());
        setTimeout(resolve,4000);
    });
};
function waitingBai(){
    sAbierto = document.getElementById("itxaroten");
    sAbierto.style.visibility = "visible";
    sAbierto.style.display = "block";
};
function waitingEz(){
    sAbierto.style.visibility = "hidden";
    sAbierto.style.display = "none";
};
async function deituAPI(){
    waitingBai();
    await itxaron();
    try {
        let response = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=' + myKey)
        let data = await response.json();
        arrGeneros = data;
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        //console.log(data);
        //console.log(arrGeneros);
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

    for (let i=0; i<arrGeneros.results.length; i++){
        artBerria = document.createElement('article');
        artBerria.className = "clsFichas";
        elemSection.appendChild(artBerria);
    
        nomBerria = document.createElement('h2');
        artBerria.appendChild(nomBerria);
        nomBerria.innerHTML = (arrGeneros.results[i].display_name);
        
        fechaBerria = document.createElement('p');
        artBerria.appendChild(fechaBerria);
        fechaBerria.innerHTML = "Oldest: " + (arrGeneros.results[i].oldest_published_date);
        
        ultimoBerria = document.createElement('p');
        artBerria.appendChild(ultimoBerria);
        ultimoBerria.innerHTML = "Newest: " + (arrGeneros.results[i].newest_published_date);

        frecuenciaBerria= document.createElement('p');
        artBerria.appendChild(frecuenciaBerria);
        frecuenciaBerria.innerHTML = "Updated: " + (arrGeneros.results[i].updated);

        btBerria = document.createElement('button');
        btBerria.className = "btn-bootstrap";
        btBerria.id = arrGeneros.results[i].list_name;
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
    //alert(genero);
    waitingBai();
    itxaron();
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${genero}.json?api-key=` + myKey)
        //let response = await fetch("https://api.nytimes.com/svc/books/v3/lists.json?list=Manga&api-key=" + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        arrPruebas = data.results.books;
        console.log(data);
        console.log(arrPruebas);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    } finally{
        waitingEz();
    };
    window.open("libros.html", "_self");
}


async function sacaLibros(genero){
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists.json?list=${genero}&api-key=` + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        arrLibros = data;
        console.log(data);
    } catch (error) {
        console.log("Ha ocurrido un JODIDO error: " + error);
        alert(error);
    };
};
deituAPI();

/***************************************************\
 *               BIGARREN HORRIALDEA                *
 *                    libros.html                   *
\***************************************************/
/*

async function nyt(){
    try {
        let response = await fetch("https://api.nytimes.com/svc/books/v3/lists/current/manga.json?api-key=" + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        arrPruebas = data.results;
        console.log(data);
        console.log(arrPruebas);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
};



async function apiManga(){
    try {
        let response = await fetch("https://api.nytimes.com/svc/books/v3/lists/current/travel.json?api-key=" + myKey)
        //let response = await fetch("https://api.nytimes.com/svc/books/v3/lists.json?list=Manga&api-key=" + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        arrPruebas = data.results.books;
        console.log(data);
        console.log(arrPruebas);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
};
async function sortuLiburuak(){
    let elemSection = document.getElementById('cajaMadre');    
    //let artBerria, nomBerria, fechaBerria, ultimoBerria, frecuenciaBerria, btBerria;
    let artBerria, rankBerria, nomBerria, weeksBerria, descBerria, urlBerria, imgBerria, btBerria;

    for (let i=0; i<arrPruebas.length; i++){
        artBerria = document.createElement('article');
        artBerria.className = "clsLibros";
        elemSection.appendChild(artBerria);

        rankBerria = document.createElement('h3');
        rankBerria.innerHTML = "#" + (arrPruebas[i].rank);
        //artBerria.appendChild(rankBerria);
    
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
        descBerria.innerHTML = "Description: " + (arrPruebas[i].description);
        artBerria.appendChild(descBerria);

        urlBerria= document.createElement('a');
        urlBerria.setAttribute("href", arrPruebas[i].amazon_product_url);
        urlBerria.innerHTML = "Amazon";
        urlBerria.target = "_blank";
        //urlBerria.innerHTML = (arrPruebas[i].amazon_product_url);
        artBerria.appendChild(urlBerria);

        btBerria = document.createElement('button');
        btBerria.className = "btn-bootstrap";
        btBerria.id = arrPruebas[i].list_name;
        btBerria.type = "image";
        //btBerria.src = 
        btBerria.name = "btExplore";
        artBerria.appendChild(btBerria).innerHTML = "Explore!";
        
    }
};

*/


//sBtExplore = document.addEventListener()

/*
sBtExplore.addEventListener('click', function(){
    sacaLibros(Manga);
}
)*/


//sBtExplore.addEventListener('click', alert("click"));

//let sBtExplore = document.getElementsByName('btExplore');





/*******   Link sortzeko kodigoa
let linkBerria = document.createElement('a');
linkBerria.setAttribute("href", "http://www.google.es");
let linkBerriaTexto = document.createTextNode("Google");
linkBerria.appendChild(linkBerriaTexto);
*************************************************/





/*********  COMENTARIOS ***********************
    fetch('https://api.nytimes.com/svc/books/v3/lists/names.json')
    .then(response => response.json())
    .then(json => console.log(json));






***********************/