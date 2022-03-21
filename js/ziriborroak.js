async function favoritos(libroFav){
    let user = firebase.auth().currentUser;
    let docId;
        if (user) {
            console.log(user.email + " " + user.uid);
            document.getElementById('lblConectado').innerHTML= user.email + " " + user.id;

            db.collection("favoritos")
            .where("name", "==", user.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id + " xXx" + doc.data);
                    docId = doc.id;
                })
            })
            .catch((error) => {
                console.log("Usuario no encontrado" + error);
            });
            db.collection("favoritos").doc(docId).collection("libros").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log("nuevo " + doc.id);
                })
            });
            db.collection("favoritos").doc(docId).collection("libros").add({
                titulo: libroFav
            })
            /*
            db.collection("favoritos").add({
                name: user.email,
                //libro: libroFav
            })
            */
            .then((docref) => {
                console.log("okokokok");
            })
            .catch((error) =>{
                console.log("mekaguen la puta" + error);
            });

            console.log(docId);
            //konektatuta(user.email, user.uid);
            
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //var uid = user.uid;
        // ...
        } else {
            console.log("Ez dago inor");
            alert("Tienes ke iniciar sesión");
        // User is signed out
        // ...
        };
    alert("Estamos en favoritos con: " + libroFav + " con: " + user.email + " " + user.uid);

};