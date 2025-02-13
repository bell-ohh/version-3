import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async () => {
    const url = 'https://restcountries.com/v3.1/all';
    const response = await fetch(url);
    const countries = await response.json();
    setCountries(countries);
    console.log(countries);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const saveCountry = (country) => {
    const savedCountries = JSON.parse(localStorage.getItem('savedCountries')) || [];
    

    const isAlreadySaved = savedCountries.some(savedCountry => savedCountry.name.common === country.name.common);

    if (isAlreadySaved) {
      console.log(`${country.name.common} is already saved.`);
      return; 
    }


    savedCountries.push(country);
    localStorage.setItem('savedCountries', JSON.stringify(savedCountries));

    console.log(`${country.name.common} has been saved.`);
  };

  return (
    <>
      <section className="grid">
        {countries.map((country) => {
          const { name, population, region, capital, flags } = country;
          return (
            <article key={name.official} className="country-card">
              <img
                src={flags.png}
                alt={`Flag of ${name.official}`}
                className="country-flag"
              />
              <div className="country-info">
                <h3>{name.official}</h3>
                <div className="details">
                  <h4>Population: <span>{population}</span></h4>
                  <h4>Region: <span>{region}</span></h4>
                  <h4>Capital: <span>{capital}</span></h4>
                </div>
                <div className="buttons">
                  <button onClick={() => saveCountry(country)} className="save-btn">
                    Save Country
                  </button>
                  <Link to={`country/${name.common}`} className="btn">Country Page</Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Countries;
