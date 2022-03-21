let myKey = config.MY_KEY;  //NYT
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