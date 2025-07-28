import React, { useState } from "react";
import MusicLogo from "../assets/Music-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

const Nav = () => {
  const params = useParams();
  console.log(params);
  const [searchId, setSearchId] = useState([]);
  const { searchTerm, handleChange, handleKeyDown, executeSearch } = useSearch();

  //this function
  function onSearch() {
    displayAlbumData(searchId);
  }

  async function displayAlbumData(searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
      console.warn("No search term provided");
      return;
    }
    try {
      const { data } = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(
          searchTerm
        )}&api_key=01a9bc49bbc9abed2dd1966234ac875e&format=json`
      );
      console.log("Search results:", data);

    } catch (error) {
      console.error("API call failed:", error);
    }
  }

   // This function lets you search when you press the enter key
  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

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
