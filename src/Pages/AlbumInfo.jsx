import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../compononents/Nav";
import styles from "../AlbumInfo.module.css";

const AlbumInfo = () => {
  const { name } = useParams();
  const [albumInfo, setAlbumInfo] = useState([]);
  const [dataReady, setDataReady] = useState("");

  async function fetchAlbumInfo() {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=01a9bc49bbc9abed2dd1966234ac875e&artist=Prince&album=1999&format=json`
    );
    console.log(data);
    setAlbumInfo(data.album.tracks.track);
    setDataReady(true);
  }

  useEffect(() => {
    fetchAlbumInfo();
  }, []);

  return (
    <>
      <Nav />
      <div classname={styles}>
        <div className="album__info">
          <div className="container">
            <div className="row">
              <div>{name}</div>
              {dataReady
                ? albumInfo.slice(0, 1).map((album) => (
                    <div className="album__details">
                      <div className="album__info">
                        <figure className="album__cover--wrapper">
                          <img src={album.image} alt="" />
                        </figure>
                        <p className="album__artist">
                          Artist:{`${album.artist}`}
                        </p>
                        <p className="album__name">
                          Title:{`${album.name}`}
                        </p>
                        <p className="album__bio">
                          Album bio:{`${album.wiki}`}
                        </p>
                      </div>
                    </div>
                  ))
                : "hi mom"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumInfo;
