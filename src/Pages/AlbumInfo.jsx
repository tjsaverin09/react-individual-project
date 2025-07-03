import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../compononents/Nav";

const AlbumInfo = () => {
  const { name } = useParams();
  const [albumInfo, setAlbumInfo] = useState(null);
  const [dataReady, setDataReady] = useState(false);

  async function fetchAlbumInfo() {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=01a9bc49bbc9abed2dd1966234ac875e&artist=Prince&album=${encodeURIComponent(
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
                <div className="album__cover">
                  <figure className="album__image--wrapper">
                    <img
                      src={albumInfo.image[2]["#text"]}
                      alt={`${albumInfo.name} by ${albumInfo.artist}`}
                      className="album__image"
                    />
                  </figure>
                </div>
                <div className="album__info">
                  <h2 className="album__title">{name}</h2>
                  <p className="album__artist">
                    Artist:{`${albumInfo.artist}`}
                  </p>
                  <p className="album__name">Title:{`${albumInfo.name}`}</p>
                  <p className="album__bio">
                    Album bio:{`${albumInfo.wiki.summary}`}
                  </p>
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
