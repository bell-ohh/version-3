import React, { useState, useEffect } from "react";
import { set, ref, get, remove } from "firebase/database";


const SavedCountries = ({ dataBase }) => {
  const [savedCountries, setSavedCountries] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  
  useEffect(() => {
    const fetchSavedCountries = async () => {
      const snapshot = await get(ref(dataBase, "savedCountries"));
      if (snapshot.exists()) {
        setSavedCountries(Object.values(snapshot.val())); 
      } else {
        setSavedCountries([]); 
      }
    };

    fetchSavedCountries();
  }, [dataBase]);


  useEffect(() => {
    const fetchProfile = async () => {
      const snapshot = await get(ref(dataBase, "userProfile"));
      if (snapshot.exists()) {
        setProfile(snapshot.val());
      }
    };

    fetchProfile();
  }, [dataBase]);

  
  const removeCountry = async (countryName) => {
    try {
      await remove(ref(dataBase, `savedCountries/${countryName}`));
      setSavedCountries((prev) => prev.filter((c) => c.name.common !== countryName)); 
    } catch (error) {
      console.error("Error removing country:", error);
    }
  };


  const handleProfileSubmit = (e) => {
    e.preventDefault();
    set(ref(dataBase, "userProfile"), profile)
      .then(() => console.log("Profile saved!"))
      .catch((error) => console.error("Error saving profile:", error));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="saved-countries-container">
      <div className="greeting">{profile.name && <p>Hello, {profile.name}!</p>}</div>

      <h2>Saved Countries</h2>
      <button className="btn" onClick={handleBack}>
        Back to Countries
      </button>

      
      <div className="saved-countries-list">
        {savedCountries.length > 0 ? (
          <ul>
            {savedCountries.map((country) => {
              const { name, population, region, capital, flags } = country;
              const flagUrl = flags?.png; 

              return (
                <li key={name.common}>
                  <div className="country-card">
                    <img
                      src={flagUrl}
                      alt={`Flag of ${name.common}`}
                      className="country-flag"
                    />
                    <div className="country-info">
                      <h3>{name.common}</h3>
                      <p><strong>Population:</strong> {population}</p>
                      <p><strong>Region:</strong> {region}</p>
                      <p><strong>Capital:</strong> {capital ? capital[0] : "N/A"}</p>
                    </div>
                    <button
                      className="btn remove-btn"
                      onClick={() => removeCountry(name.common)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No saved countries yet!</p>
        )}
      </div>

      
      <div className="profile-form">
        <h3>My Profile</h3>
        <form onSubmit={handleProfileSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </label>
          <label>
            Country
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleProfileChange}
            />
          </label>
          <label>
            Bio
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
            />
          </label>
          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default SavedCountries;
