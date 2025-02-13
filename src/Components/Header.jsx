import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Header = () => {
 
  return (
    <>
      <div className="header">

        <h1>Where in the World? </h1><div className="containerdiv">
        <Link to="/SavedCountries">
        <button className="icons2"><FontAwesomeIcon icon={faHeart} /> Saved Countries</button></Link>
          <div className="icons3"> <FontAwesomeIcon icon={faMoon} /> Dark Mode</div></div>
      </div>


    </>
  )
}

export default Header