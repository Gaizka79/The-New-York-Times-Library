async function getFavoritos (){
    let user =await firebase.auth().currentUser;
    console.log("ok: " + user.email);
    if (user){
        console.log(user.email);
        db.collection("favoritos")
        .where("name", "==", user.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                pintaFavo(doc.data().libro);
                console.log(doc.id + " xXx " + doc.data);
                console.log(doc.id, " => ", doc.data);
                docId = doc.id;
            })
        })
        .catch((error) => {
            console.log("Usuario no encontrado" + error);
        });
    };
};
getFavoritos();

function pintaFavo(gogokoenak){
    let elemSection = document.getElementById('cajaMadre');    
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

    btFav = document.createElement('button');
    btFav.className = "btn-bootstrap";
    btFav.id = gogokoenak.title;
    btFav.name = "btFavoritos";
    btFav.textContent = "Favoritos";
    artBerria.appendChild(btFav);

};

