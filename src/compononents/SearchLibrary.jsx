import React, { useState, useEffect } from "react";
import MusicLogo from "../assets/Music-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate, useParams, Link } from "react-router-dom";

const SearchLibrary = () => {
  let navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataDisplayed, setDataDisplayed] = useState(false);
  const params = useParams();
  console.log(params);
  const [searchId, setSearchId] = useState([]);

  //this function
  function onSearch() {
    displayAlbumData(searchId);
  }

  async function displayAlbumData(searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
      console.warn("no search term provided");
      return;
    }
    try {
      const { data } = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=01a9bc49bbc9abed2dd1966234ac875e&format=json`
      );
      console.log("Album data:", data);
      setAlbums(data.results.albummatches.album);
      setLoading(false);
      setDataDisplayed(true);
    } catch (error) {
      console.error("API call failed", error);
    }
  }

  const pageState = (status) => {
    switch(status) {
      case 'content loading':
        return new Array(15).fill(0).map((_, index) => (
                  <div className="music__card">
                      <div className="music__card--skeleton"></div>                    
                  </div>
              )
            );
      case 'content displayed':
        return albums.slice(0, 15).map((album) => (
                  <div
                    className="music__card"
                    onClick={() => navigate(`${album.name}`)}
                  >
                    <figure className="music__img--wrapper">
                      <img
                        src={album.image[2]["#text"]}
                        alt={`${album.name} by ${album.artist}`}
                        className="album__cover"
                      />
                    </figure>
                    <div className="album__title">
                      Album: <span className="album">{album.name}</span>
                    </div>
                    <div className="artist__name">
                      Artist: <span className="artist">{album.artist}</span>
                    </div>
                  </div>));
        default:
          return <div className="music__loading">
                <p className="result__para">How are we feeling today?</p>
                <div className="result__icons">
                  <FontAwesomeIcon icon="fas fa-record-vinyl" />
                  <FontAwesomeIcon icon="fas fa-music" />
                  <FontAwesomeIcon icon="fas fa-headphones" />
                </div>
                </div>    
    }
  }

  // This function lets you search when you press the enter key
  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

  //Fetch Data on Initial Render with default search term
  useEffect(() => {
    displayAlbumData("");
  }, []);

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
              <button href="" className="nav__btn">
                Connect
              </button>
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
              value={searchId}
              onChange={(event) => setSearchId(event.target.value)}
              onKeyUp={(event) => onSearchKeyPress(event.key)}
            />
            <div className="search__icon--wrapper">
              <FontAwesomeIcon
                className="fa-magnifying-glass"
                icon="fa-solid fa-magnifying-glass"
                onClick={(event) => onSearch(event.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>
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
            <div className="music__list">
              {pageState}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchLibrary;
