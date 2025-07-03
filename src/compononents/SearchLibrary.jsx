import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom"

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
      
      // setLoading(false);
     
    } catch (error) {
      console.error("API call failed", error);
    }
  }

const SearchLibrary = () => {
  let navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [dataDisplayed, setDataDisplayed] = useState(false);

 setAlbums(data.results.albummatches.album);
 setDataDisplayed(true);
 
  useEffect(() => {
    displayAlbumData('');
  }, []);

  return (
    <>
    <Nav />
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
            { !dataDisplayed ? (
              <>
                <div className="music__loading">
                  <p className="result__para">How are we feeling today?</p>
                  <div className="result__icons">
                  <FontAwesomeIcon icon="fas fa-record-vinyl" />
                  <FontAwesomeIcon icon="fas fa-music" />
                  <FontAwesomeIcon icon="fas fa-headphones" />
                  </div>
                </div>
              </>
            ) : (
              albums.slice(0, 15).map((album) => (
                <div className="music__card" onClick={() => navigate(`${album.name}`)}>
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default SearchLibrary;
