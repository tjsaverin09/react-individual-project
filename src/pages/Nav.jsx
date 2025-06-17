import React from "react";

const Nav = () => {
  return (
    <>
      <nav>
        <div className="nav__row">
          <div className="nav__logo">
            <a href="/" target="_blank" className="nav__logo--link">
              <img
                src="/public/finalProjectAssets/Music-Logo.png"
                alt=""
                className="nav__logo--img"
              />
            </a>
          </div>
          <div className="nav__links">
            <a href="" className="nav__link">
              Home
            </a>
            <a href="" className="nav__link">
              Search library
            </a>
            <button href="" className="nav__btn">
              Connect
            </button>
          </div>
        </div>
        <div className="search__menu">
          <h1 className="search__title">Find Your Jam</h1>
          <div className="search__input--wrapper">
            <input
              type="text"
              placeholder="Look up Artist or Album..."
              className="search__input"
              id="searchId"
              onchange="handleSearchChange(event)"
            />
            <div className="search__icon--wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
