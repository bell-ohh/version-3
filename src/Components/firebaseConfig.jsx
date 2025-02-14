import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBmkYsTZ_zOBQW0snTsKs1J-kJMa8x8Lvc",
    authDomain: "countries-api-92488.firebaseapp.com",
    databaseURL: "https://countries-api-92488-default-rtdb.firebaseio.com",
    projectId: "countries-api-92488",
    storageBucket: "countries-api-92488.firebasestorage.app",
    messagingSenderId: "54375871250",
    appId: "1:54375871250:web:2f6c27d085b3fae324b9cb"
  };


const app = initializeApp(firebaseConfig);


export const dataBase = getDatabase(app);
