//let myKey = config.MY_KEY;
let sBtAmazon;
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
async function buscaLibros(buscaTemp){
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${buscaTemp}.json?api-key=` + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
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
    let artBerria, rankBerria, nomBerria, weeksBerria, descBerria, urlBerria, imgBerria, btBerria;

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
        //descBerria.innerHTML = "Description: " + (arrPruebas[i].description);
        //descBerria.innerHTML = arrPruebas[i].description.length<10 ? 
        descBerria.innerHTML = (arrPruebas[i].description == "") ?
            "Sorry, description is not available.":
            "Description: " + arrPruebas[i].description;
        artBerria.appendChild(descBerria);

        btBerria = document.createElement('button');
        btBerria.className = "btn-bootstrap";
        btBerria.id = arrPruebas[i].list_name;
        btBerria.name = "btAmazon";
        artBerria.appendChild(btBerria).innerHTML = arrPruebas[i].amazon_product_url;
        btBerria.textContent = "Amazon!"
    }
    asignaBotonAmazon();
};
function asignaBotonAmazon (){
    sBtAmazon = document.getElementsByName("btAmazon");
    for (let i=0; i<sBtAmazon.length; i++){
        sBtAmazon[i].addEventListener("click",function (){
            window.open(arrPruebas[i].amazon_product_url)
         //loadLiburak(sBtAmazon[i].id);
        });////poner el enlace
    };
};
let busca = localStorage.getItem("resultado");
buscaLibros(busca);



/*******   Link sortzeko kodigoa
let linkBerria = document.createElement('a');
linkBerria.setAttribute("href", "http://www.google.es");
let linkBerriaTexto = document.createTextNode("Google");
linkBerria.appendChild(linkBerriaTexto);
*************************************************/




/*********  COMENTARIOS ***********************
  





***********************/
/*   urlBerria= document.createElement('a');
        urlBerria.id = "gotoAmazon";
        urlBerria.setAttribute("href", arrPruebas[i].amazon_product_url);
        urlBerria.innerHTML = "Amazon";
        urlBerria.target = "_blank";
        //urlBerria.innerHTML = (arrPruebas[i].amazon_product_url);
        artBerria.appendChild(urlBerria);*/

                //btBerria.innerHTML = (arrPruebas[i].amazon_product_url);
        //btBerria.style.alignSelf = "center";
        //btBerria.textContent = "Amazon!";
        //btBerria.onclick = arrPruebas[i].amazon_product_url;