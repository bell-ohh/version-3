import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { set, ref, get } from "firebase/database";
import { dataBase } from "./firebaseConfig"; 

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [savedCountries, setSavedCountries] = useState(new Set()); 


  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const url = "https://restcountries.com/v3.1/all";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountryData();
  }, []);

  
  const isCountrySaved = (country) => {
    return savedCountries.has(country.cca3);
  };

  const saveCountry = async (country) => {
    if (!dataBase) {
      console.error("Firebase database is not initialized.");
      return;
    }

    const countryRef = ref(dataBase, `savedCountries/${country.cca3}`);

    try {
      const snapshot = await get(countryRef);
      if (snapshot.exists()) {
        console.log(`${country.name.common} is already saved.`);
        return; 
      }

      
      await set(countryRef, country);
      console.log(`${country.name.common} has been saved to Firebase.`);

      
      setSavedCountries((prevSavedCountries) => new Set(prevSavedCountries).add(country.cca3));
    } catch (error) {
      console.error("Error saving country:", error);
    }
  };

  return (
    <section className="grid">
      {countries.map((country) => {
        const { name, population, region, capital, flags, cca3 } = country;
        const uniqueKey = cca3 || name?.common || name?.official; 

        return (
          <article key={uniqueKey} className="country-card">
            <img
              src={flags?.png}
              alt={`Flag of ${name?.official || "Unknown"}`}
              className="country-flag"
            />
            <div className="country-info">
              <h3>{name?.official || "No Name"}</h3>
              <div className="details">
                <h4>Population: <span>{population?.toLocaleString() || "N/A"}</span></h4>
                <h4>Region: <span>{region || "N/A"}</span></h4>
                <h4>Capital: <span>{capital?.[0] || "N/A"}</span></h4>
              </div>
              <div className="buttons">
                <button 
                  onClick={() => saveCountry(country)} 
                  className="save-btn" 
                  disabled={isCountrySaved(country)} 
                >
                  {isCountrySaved(country) ? "Saved" : "Save Country"}
                </button>
                <Link to={`country/${name?.common || cca3}`} className="btn">Country Page</Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Countries;
