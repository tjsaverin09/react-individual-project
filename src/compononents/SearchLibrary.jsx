import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const SearchLibrary = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState()
  const [albumCover, setAlbumCover] = useState([])

  async function displayAlbumData(searchTerm) {
    const { data } = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=01a9bc49bbc9abed2dd1966234ac875e&format=json`)
    console.log('Album data:', data);
    setAlbums(data.results.albummatches.album);
    setLoading(false);
    // error in this code:
    setAlbumCover(data.results.albummatches.album.image.length > 2 ? album.image[2]["#text"] : "https://lastfm.freetls.fastly.net/i/u/174s/710d5f1abe58c7a83492a86d0235d2b9.png")
  }

  useEffect(() => {
    displayAlbumData("mf doom");
  }, [])

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
            { loading ? <><div className="music__list"></div>
          <div className="music__loading">
            <p className="result__para">How are we feeling today?</p>
            <FontAwesomeIcon icon="fas fa-spinner" />
          </div> </> : albums.map((album) => (
            <div className="music__card">
            <figure className="music__img--wrapper">
            <img
              src={albumCover}
              alt="{album.name} by {album.artist}"
              className="album__cover"
            />
          </figure>
          <div className="album__title">Album: <span className="album">{album.name}</span></div>
          <div className="artist__name">
            Artist: <span className="artist">{album.artist}</span>
          </div></div>))             
            }
          
        </div>
      </div>
    </section>
  );
};

export default SearchLibrary;
