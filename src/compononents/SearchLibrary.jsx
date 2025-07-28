import React, { useState, useEffect } from "react";
import MusicLogo from "../assets/Music-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SearchLibrary = () => {
  let navigate = useNavigate();
  const query = useQuery();
  const searchTerm = query.get("query");
  const { albumName } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataDisplayed, setDataDisplayed] = useState(false);
  const [searchId, setSearchId] = useState([]);
  const [loadedImages, setLoadedImages] = useState(new Set());

  //this function searchs the albums to display
  function onSearch() {
    displayAlbumData(searchId);
  }

  async function displayAlbumData(searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
      console.warn("no search term provided");
      return;
    }
    setLoading(true);
    setLoadedImages(new Set());
    try {
      const { data } = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=01a9bc49bbc9abed2dd1966234ac875e&format=json`
      );
      console.log("Album data:", data);
      setLoading(false);
      setAlbums(data.results.albummatches.album);
      setDataDisplayed(true);
    } catch (error) {
      console.error("API call failed", error);
    }
  }

  function pageState() {
    if (loading) {
      return new Array(15).fill(0).map((_, index) => (
        <div className="music__card" key={index}>
          <div className="music-card__img--skeleton"></div>
          <div className="music-card__title--skeleton"></div>
          <div className="music-card__artist--skeleton"></div>
        </div>
      ));
    } else if (dataDisplayed && albums.length > 0) {
      return albums.slice(0, 15).map((album, index) => {
        const albumKey = `${album.artist}-${album.name}-${index}`;

        return (
          <div
            className="music__card"
            key={albumKey}
            onClick={() => navigate(`${album.artist}/${album.name}`)}
          >
            <figure className="music__img--wrapper">
              <img
                src={album.image[2]["#text"] || 'https://lastfm.freetls.fastly.net/i/u/64s/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg'}
                alt={`${album.name} by ${album.artist}`}
                className="album__cover"
              />
            </figure>

            <>
              <div className="album__title">
                Album: <span className="album">{album.name}</span>
              </div>
              <div className="artist__name">
                Artist: <span className="artist">{album.artist}</span>
              </div>
            </>
          </div>
        );
      });
    } else if (dataDisplayed && albums.length < 0) {
      return (
        <>
        oops sorry we made a booboo
        </>
      )
    }else {
      return (
        <div className="music__loading">
          <p className="search__library--para">How are we feeling today?</p>
          <div className="search__library--icons">
            <FontAwesomeIcon icon="fas fa-record-vinyl" />
            <FontAwesomeIcon icon="fas fa-music" />
            <FontAwesomeIcon icon="fas fa-headphones" />
          </div>
        </div>
      );
    }
  }

  function filterAlbums(filter) {
    console.log(filter);
    if (filter === "A-Z") {
      setAlbums(albums.slice().sort((a, b) => a.name.localeCompare(b.name)));
    }
    if (filter === "Z-A") {
      setAlbums(albums.slice().sort((a, b) => b.name.localeCompare(a.name)));
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
      {/* <nav>
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
      </nav> */}
      <section id="library">
        <div className="container">
          <div className="row">
            <div className="search__library--header">
              <h2 className="search__library--title">Groove On!</h2>
              <label htmlFor="filter" className="search__library--filter">
                Find alphabetically:
                <select
                  id="filter"
                  onChange={(event) => filterAlbums(event.target.value)}
                  defaultValue="DEFAULT"
                >
                  <option value="DEFAULT" disabled>
                    Sort
                  </option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </label>
            </div>
            <div className="music__list">{pageState() || searchTerm}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchLibrary;
