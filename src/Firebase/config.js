// utilisation de Firebase dans React \o/

// on import firebase
import firebase from 'firebase/app'
// on aura besoin de firestore, qui appartient à firebase
import 'firebase/firestore'
// et on arura besoin de l'auth de firebase
import 'firebase/auth'
// l'import pour le stockage d'image (ah, le petit plus t'as vu ? )
import 'firebase/storage'


// notre config dont on aura besoin avec la configuration (on reçoit ce truc depuis firebase après avoir crée un projet)
const firebaseConfig = {
    apiKey: "AIzaSyC45gVTksZ5rqHcBGC5lo8NCElpxLDmpDU",
    authDomain: "variante-trello.firebaseapp.com",
    projectId: "variante-trello",
    storageBucket: "variante-trello.appspot.com",
    messagingSenderId: "113213518233",
    appId: "1:113213518233:web:0bc47664fd2874b25e6308"
};

// on lance firebase avec la methode initializeApp avec la configuration juste au dessus
firebase.initializeApp(firebaseConfig)

// on export les differents services. 
// 
// time, sera un timestamp propre à firestore
export const time = firebase.firestore.Timestamp
// fire, est la base de données directement
export const fire = firebase.firestore()
// l'auth sera le servide d'authentification
export const auth = firebase.auth()
// storage sera notre fonction dans l'application pour up des images (obviously)
export const storage = firebase.storage()