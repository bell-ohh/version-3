import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Country = () => {
    const [country, setCountry] = useState([]);
    const { name } = useParams();
    const [views, setViews] = useState(0);

    useEffect(() => {
        
        const fetchCountryData = async () => {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
            const countryData = await response.json();
            setCountry(countryData);
        };

        fetchCountryData();

    }, [name]); 

    useEffect(() => {
        
        const storedViews = localStorage.getItem(name);
        console.log(storedViews);
        if (storedViews !== null) {
            const newViews = parseInt(storedViews) + 1;
            console.log(newViews);
            localStorage.setItem(name, newViews); 
            setViews(newViews); 
        }else{
const newViews = 0;
localStorage.setItem(name, newViews);
        }
    }, [name]);

    return (
        <>
            {country.length > 0 ? (
                <section className="country">
                    <Link to="/" className="btn btn Light">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back Home
                    </Link>

                    {country.map((c) => {
                        const { flags, name, population, region, subregion, capital, borders } = c;

                        return (
                            <article key={name.common}>
                                <div className="country-inner">
                                    <div className="flag">
                                        <img src={flags.png} alt={`${name.common} flag`} />
                                    </div>
                                    <div className="country-details">
                                        <div>
                                            <h2>{name.common}</h2>
                                            <h5>Population: <span>{population}</span></h5>
                                            <h5>Region: {region}</h5>
                                            <h5>Sub-Region: {subregion}</h5>
                                            <h5>Capital: {capital}</h5>
                                        </div>
                                        <div>
                                            <p>Total Views: {views} times</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3>Border Countries: </h3>
                                    <div className="borders">
                                        {borders?.map((border) => (
                                            <ul key={border}>
                                                <li>{border}</li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
            ) : (
                <p>Loading Country...</p>
            )}
        </>
    );
};

export default Country;
