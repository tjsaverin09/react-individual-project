import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AlbumCoverPlaceholder from "../assets/AlbumCoverPlaceholder.png"



const SearchLibrary = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataDisplayed, setDataDisplayed] = useState(false);

  async function displayAlbumData(term) {
    if (!term || term.trim() === "") {
      console.warn("no search term provided");
      setAlbums([]);
      setDataDisplayed(false);
      setLoading(true);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${term}&api_key=01a9bc49bbc9abed2dd1966234ac875e&format=json`
      );
      console.log("Album data:", data);
      setLoading(false);
      setAlbums(data.results.albummatches.album);
      setDataDisplayed(true);
    } catch (error) {
      console.error("API call failed", error);
    }
  }

    //Fetch Data on Initial Render with default search term
  useEffect(() => {
    displayAlbumData(searchTerm);
  }, [searchTerm]);

  //conditional function based on loading content or albums
  function pageState() {
    if (loading) {
      return new Array(50).fill(0).map((_, index) => (
        <div className="music__card" key={index}>
          <div className="music-card__img--skeleton"></div>
          <div className="music-card__title--skeleton"></div>
          <div className="music-card__artist--skeleton"></div>
        </div>
      ));
    } else if (dataDisplayed && albums.length > 0) {
      return albums.slice(0, 50).map((album, index) => {
        const albumKey = `${album.artist}-${album.name}-${index}`;

        return (
          <div
            className="music__card"
            key={albumKey}
            onClick={() => navigate(`${album.artist}/${album.name}`)}
          >
            <figure className="music__img--wrapper">
              <img
                src={album.image[2]["#text"] || AlbumCoverPlaceholder}
                alt={`${album.name} by ${album.artist}`}
                className="album__cover"
              />
            </figure>

            <>
              <div className="album__moniker">
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
          <p className="search__library--para">You have <em>phenomenal</em> taste!</p>
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




  return (
    <>
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
            <div className="music__list">{pageState()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchLibrary;
