import React from 'react'

const Filter = () => {
  return (
    <section className="filter">
      <form className="form" id="form">
        <input type="search" name="search" id="search" placeholder="🔍 Search for Country" />
      </form>


      <div className="region-filter">
        <select name="select" id="select" className="select">
          <option value="Filter By Region">Filter By Region</option>
          <option value="Filter By Region">Africa</option>
          <option value="Filter By Region">North America</option>
          <option value="Filter By Region">Asia</option>
          <option value="Filter By Region">Europe</option>
          <option value="Filter By Region">South America</option>
          <option value="Filter By Region">Oceania</option>
        </select>
      </div>
    </section>
  )
}

export default Filter