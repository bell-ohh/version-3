import React from "react";
import { Routes, Route } from "react-router-dom";
import Country from "./Components/Country";
import SavedCountries from "./pages/SavedCountries";
import "/src/index.css"; 
import Home from './pages/Home'
import Header from './Components/Header'
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyBmkYsTZ_zOBQW0snTsKs1J-kJMa8x8Lvc",
  authDomain: "countries-api-92488.firebaseapp.com",
  databaseURL: "https://countries-api-92488-default-rtdb.firebaseio.com",
  projectId: "countries-api-92488",
  storageBucket: "countries-api-92488.firebasestorage.app",
  messagingSenderId: "54375871250",
  appId: "1:54375871250:web:2f6c27d085b3fae324b9cb"
};



const App = () => {
const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);
  return (
    <>
<Header />
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/country/:name" element={<Country dataBase={dataBase} />} /> 
      <Route path="/savedCountries" element={<SavedCountries dataBase={dataBase}/>} /> 
    </Routes>
    </>
  );
};

export default App;