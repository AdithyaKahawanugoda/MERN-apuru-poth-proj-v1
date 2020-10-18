import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDvm4iz76al3GpzAVZS-K2_T5whlLiBAAs",
  authDomain: "apurubook-storeage.firebaseapp.com",
  databaseURL: "https://apurubook-storeage.firebaseio.com",
  projectId: "apurubook-storeage",
  storageBucket: "apurubook-storeage.appspot.com",
  messagingSenderId: "233384509500",
  appId: "1:233384509500:web:6bae9550c30cfb15798339",
  measurementId: "G-H1VEHXZYZF",
};

firebase.initializeApp(config);

export default firebase;
