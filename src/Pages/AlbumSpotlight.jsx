import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AlbumCoverPlaceholder from "../assets/AlbumCoverPlaceholder.png";

const AlbumSpotlight = () => {
  const { artist, albumName } = useParams();
  console.log(artist, albumName);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMagnified, setIsMagnified] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

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
      setTracks(data.album.tracks.track);
      console.log(tracks);
      console.log(data);
    } catch (error) {
      console.error("Error fetching album info:", error);
    } finally {
      setLoading(false);
    }
  }

  const bio = albumInfo?.wiki?.summary || "content is unavailable";
  const trackList = albumInfo?.tracks || [];

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const toggleMagnify = () => {
    setIsMagnified(!isMagnified);
  };

  function spotlightPageState() {
    if (loading && hasSearched) {
    }
  }

  useEffect(() => {
    fetchAlbumInfo();
  }, []);

  return (
    <>
      <div id="album__spotlight">
        <div className="container">
          <div className="row">
            <div className="home__top">
              <h2 className="home__top--left">Groove on!</h2>
              <h2 className="home__top--right">All The Hits!</h2>
            </div>
            {albumInfo && dataReady ? (
              <div className="album__details">
                <div className="album__card">
                  <figure
                    className="album__image--wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ padding: "20px", border: "1px solid black" }}
                    onClick={toggleMagnify}
                  >
                    <img
                      src={albumInfo.image[3]["#text"] || AlbumCoverPlaceholder}
                      alt={`${albumInfo.name} by ${albumInfo.artist}`}
                      className={isMagnified ? "magnified" : "album__image"}
                    />
                    {isHovering && (
                      <p
                        style={{
                          marginTop: "10px",
                          color: "pink",
                          textAlign: "center",
                        }}
                      >
                        Click album cover to expand
                      </p>
                    )}
                  </figure>
                  <h4 className="album__bio">
                    Album bio:{" "}
                    <span className="yellow">{`${bio}`}</span>
                  </h4>
                </div>
                <div className="album__info">
                  <h2 className="album__title">{albumName}</h2>
                  <h4 className="album__artist">
                    Artist:{" "}
                    <span className="yellow">{`${albumInfo.artist}`}</span>
                  </h4>
                  <h4 className="album__name">
                    Album title:{" "}
                    <span className="yellow">{`${albumInfo.name}`}</span>
                  </h4>
                  <ol className="album__track-list">
                    Track list:
                    {tracks.length > 0 ? (
                      tracks.map((track, index) => (
                        <li className="track__name" key={index}>
                          <span className="yellow">{track.name}</span>
                        </li>
                      ))
                    ) : (
                      <li className="tracks__unavailable">
                        <span className="yellow">No tracks available</span>
                      </li>
                    )}
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
            <div className="albums__container">
              <div className="row">
              <span className="yellow" style={{ marginTop: "14px", fontFamily: "cursive" }}>this space will hold the albums related to the spotlighted albums</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumSpotlight;
