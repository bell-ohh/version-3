import React from "react";
import { Routes, Route } from "react-router-dom";
import Country from "./Components/Country";
import SavedCountries from "./pages/SavedCountries";
import "/src/index.css"; 
import Countries from "./Components/Countries";
import Home from './pages/Home'
import Header from './Components/Header'

const App = () => {

  return (
    <>
<Header />
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/country/:name" element={<Country />} /> 
      <Route path="/savedCountries" element={<SavedCountries />} /> 
    </Routes>
    </>
  );
};

export default App;