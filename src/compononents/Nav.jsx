import React from "react";
import MusicLogo from "../assets/Music-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSearchContext } from "../hooks/SearchProvider";

const Nav = () => {
  const { searchTerm, handleChange, handleKeyDown, executeSearch } = useSearchContext();


  return (
    <>
      <nav>
        <div className="nav__row">
          <div className="nav__logo">
            <Link to="/" className="nav__logo--link">
              <img src={MusicLogo} alt="Logo" className="nav__logo--img" />
            </Link>
          </div>
          <div className="nav__links">
            <Link to="/" className="nav__link">
              Home
            </Link>
            <Link to="/" className="nav__link">
              Search library
            </Link>
            <Link to="https://badgerbadgerbadger.com/" target="_blank">
              <button className="nav__btn">Connect</button>
            </Link>
          </div>
        </div>
        <div className="search__menu">
          <h1 className="search__title">Find Your Jam</h1>
          <div className="search__input--wrapper">
            <input
              type="text"
              placeholder="Look up Artist or Album..."
              className="search__input"
              value={searchTerm}
              onChange={handleChange}
              onKeyUp={handleKeyDown}
            />
            <div className="search__icon--wrapper">
              <FontAwesomeIcon
                className="fa-magnifying-glass"
                icon="fa-solid fa-magnifying-glass"
                onClick={executeSearch}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
