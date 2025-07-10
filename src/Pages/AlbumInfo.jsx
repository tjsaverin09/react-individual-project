import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../compononents/Nav";

const AlbumInfo = () => {
  const { name, artist } = useParams();
  const [albumInfo, setAlbumInfo] = useState(null);
  const [dataReady, setDataReady] = useState(false);

  async function fetchAlbumInfo() {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=01a9bc49bbc9abed2dd1966234ac875e&artist=${artist}&album=${encodeURIComponent(
        name
      )}&format=json`
    );
    console.log(data);
    setAlbumInfo(data.album);
    setDataReady(true);
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
                  <figure className="album__image--wrapper">
                    <img
                      src={albumInfo.image[3]["#text"]}
                      alt={`${albumInfo.name} by ${albumInfo.artist}`}
                      className="album__image"
                    />
                  </figure> 
                  <p className="album__bio">
                    {/* Album bio:<span className="yellow">{`${albumInfo.wiki.summary || albumInfo.playcount}`}</span> */}
                  </p>
                </div>
                <div className="album__info">
                  <h2 className="album__title">{name}</h2>
                  <p className="album__artist">
                    Artist:<span className="yellow">{`${albumInfo.artist}`}</span>
                  </p>
                  <p className="album__name">Title:<span className="yellow">{`${albumInfo.name}`}</span></p>
                  <ol className="album__track-list">
                    Album track list:
                    {/* <li className="track__name">Track 1: <span className="yellow">{`${albumInfo.tracks.track[0].name || null}`}</span></li>
                    <li className="track__name">Track 2: <span className="yellow">{`${albumInfo.tracks.track[1].name || null}`}</span></li>
                    <li className="track__name">Track 3: <span className="yellow">{`${albumInfo.tracks.track[2].name || null}`}</span></li>
                    <li className="track__name">Track 4: <span className="yellow">{`${albumInfo.tracks.track[3].name || null}`}</span></li>
                    <li className="track__name">Track 5: <span className="yellow">{`${albumInfo.tracks.track[4].name || null}`}</span></li>
                    <li className="track__name">Track 6: <span className="yellow">{`${albumInfo.tracks.track[5].name || null}`}</span></li>
                    <li className="track__name">Track 7: <span className="yellow">{`${albumInfo.tracks.track[6].name || null}`}</span></li>
                    <li className="track__name">Track 8: <span className="yellow">{`${albumInfo.tracks.track[7].name || null}`}</span></li>
                    <li className="track__name">Track 9: <span className="yellow">{`${albumInfo.tracks.track[8].name || null}`}</span></li> */}
                  </ol>
                 
                </div>
              </div>
            ) : (
              "hi mom"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumInfo;
