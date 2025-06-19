import React from "react";

const SearchLibrary = () => {
  

  return (
    <section id="results">
      <div className="container">
        <div className="row">
          <div className="result__header">
            <h2 className="result__title">Groove On!</h2>
            <label htmlFor="filter" className="result__filter">
              Find alphabetically:
              <select 
              id="filter" 
              // onchange="filterAlbums(event)"
              >
                <option value="" disabled defaultValue>
                  Sort:
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </label>
          </div>
          <div className="music__list"></div>
          <div className="music__loading">
            <p className="result__para">How are we feeling today?</p>
            <i className="fa-solid fa-spinner music__loading--spinner"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchLibrary;
