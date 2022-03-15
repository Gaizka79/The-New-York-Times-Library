
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

     /*   rankBerria = document.createElement('h5');
        rankBerria.innerHTML = "#" + (arrPruebas[i].rank);
        artBerria.appendChild(rankBerria);
    
        nomBerria = document.createElement('h5');
        nomBerria.innerHTML = (arrPruebas[i].title);
        artBerria.appendChild(nomBerria);*/

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



/*******   Link sortzeko kodigoa
let linkBerria = document.createElement('a');
linkBerria.setAttribute("href", "http://www.google.es");
let linkBerriaTexto = document.createTextNode("Google");
linkBerria.appendChild(linkBerriaTexto);
*************************************************/




async function apicombined(){
    try {
        let response = await fetch("https://api.nytimes.com/svc/books/v3/lists.json?list=Combined%20Print%20and%20E-Book%20Fiction&api-key=" + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        console.log(data);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
};
async function apiHardcover(){
    try {
        let response = await fetch("https://api.nytimes.com/svc/books/v3/lists.json?list=sports&api-key=" + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        console.log(data);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
};
async function apiFiction(){
    try {
        let response = await fetch("https://api.nytimes.com/svc/books/v3/lists.json?list=Combined%20Print%20Fiction&api-key=" + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        console.log(data);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
};


async function apiEducation(){
    try {
        let response = await fetch("https://api.nytimes.com/svc/books/v3/lists.json?list=Education&api-key=" + myKey)
        let data = await response.json();
        //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
        console.log(data);
    } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        alert(error);
    };
};



/*********  COMENTARIOS ***********************
  





***********************/