import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Nav from "../compononents/Nav";

const AlbumSpotlight = () => {
  const { artist, albumName } = useParams();
  console.log(artist, albumName);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMagnified, setIsMagnified] = useState(false)
  const [tracks, setTracks] = useState([]);

  async function fetchAlbumInfo() {
    setLoading(true);
    setHasSearched(true);
    try {
      const { data } = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=01a9bc49bbc9abed2dd1966234ac875e&artist=${artist}&album=${encodeURIComponent(
          albumName
        )}&format=json`
      );
      setAlbumInfo(data.album);
      setDataReady(true);
      setTracks(data.album.tracks.track)
      console.log(tracks)
      console.log(data);
    } catch (error) {
      console.error("Error fetching album info:", error);
    } finally {
      setLoading(false);
    }
  }

  const toggleMagnify = () => {
    setIsMagnified(!isMagnified)
  }  

  useEffect(() => {
    fetchAlbumInfo();
  }, []);

  return (
    <>
      <Nav />
      <div id="album__spotlight">
        <div className="container">
          <div className="row">
            {albumInfo && dataReady ? (
              <div className="album__details">
                <div className="album__card">
                  <figure className="album__image--wrapper" onClick={toggleMagnify}>
                    <img
                      src={albumInfo.image[3]["#text"]}
                      alt={`${albumInfo.name} by ${albumInfo.artist}`}
                      className={isMagnified ? "magnified" : "album__image"}
                    />
                  </figure>
                  <p className="album__bio">
                    Album bio:
                    <span className="yellow">{`${
                      albumInfo.wiki.summary || "bio unavailable"
                    }`}</span>
                  </p> 
                </div>
                <div className="album__info">
                  <h2 className="album__title">{albumName}</h2>
                  <p className="album__artist">
                    Artist:
                    <span className="yellow">{`${albumInfo.artist}`}</span>
                  </p>
                  <p className="album__name">
                    Album title:<span className="yellow">{`${albumInfo.name}`}</span>
                  </p>
                  <ol className="album__track-list">
                    Track list:
                    {tracks && tracks.map((track, index) =>(
                      <li key={index}><span className="yellow">{track.name || "tracks unavailable"}</span></li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <>
                <div id="album__unavailable">
                  <div className="container">
                    <div className="row">
                      <div className="album__unavailable--details">
                        <h3>
                          Oops, seems like your music must've got lost in the
                          sauce
                        </h3>
                        <h3>
                          No worries, just try a different rhythym for the night
                        </h3>
                        <Link to="/">
                          <button className="album__unavailable--btn">
                            Back to home
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumSpotlight;
