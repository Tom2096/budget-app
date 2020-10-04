import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyAL6yHZZSqIYOu486_Yk6P5FtnzfgDXRGs",
    authDomain: "budgetapp-9eca5.firebaseapp.com",
    databaseURL: "https://budgetapp-9eca5.firebaseio.com",
    projectId: "budgetapp-9eca5",
    storageBucket: "budgetapp-9eca5.appspot.com",
    messagingSenderId: "419770072715",
    appId: "1:419770072715:web:0f07cacc17fa21fc48de8e"
};
  
firebase.initializeApp(firebaseConfig);

export default firebase