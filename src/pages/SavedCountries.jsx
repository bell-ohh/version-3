import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SavedCountries = () => {
    const [savedCountries, setSavedCountries] = useState([]);

    useEffect(() => {
        
        const storedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];
        setSavedCountries(storedCountries);
    }, []);

    const handleRemoveCountry = (countryName) => {
    
        const updatedCountries = savedCountries.filter((c) => c.name.common !== countryName);
        setSavedCountries(updatedCountries);
        localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
    };

    const handleClearAll = () => {
        
        setSavedCountries([]);
        localStorage.removeItem("savedCountries");
    };
console.log(savedCountries)
    return (
        <section className="saved-countries">
            <Link to="/" className="btn btn-light">Back Home</Link>
            <h2>Saved Countries</h2>

            {savedCountries.length > 0 ? (
                <>
                    <button className="btn clear-all" onClick={handleClearAll}>
                        Clear All
                    </button>
                    <div className="countries-list">
                        {savedCountries.map((country) => (
                            <div key={country.name.common} className="country-card">
                                <img src={country.flags.svg} alt={`${country.name.common} flag`} />
                                <h3>{country.name.common}</h3>
                                <button onClick={() => handleRemoveCountry(country.name.common)}>
                                    Remove
                                </button>
                                <Link to={`/country/${country.name.common}`} className="btn">
                                    View Country
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>No saved countries yet.</p>
            )}
        </section>
    );
};

export default SavedCountries;