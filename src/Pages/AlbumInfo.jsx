import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../compononents/Nav";
import styles from "../AlbumInfo.module.css";

const AlbumInfo = () => {
  const { name } = useParams();
  console.log(name);

  async function fetchAlbumInfo() {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=01a9bc49bbc9abed2dd1966234ac875e&artist=Cher&album=Believe&format=json`
    );
    console.log(data);
  }

  useEffect(() => {
    fetchAlbumInfo();
  }, []);

  return (
    <div classname={styles}>
      <Nav />
      <div className="container">
        <div className="row">
        <div>{name}</div>
        <button>Button</button>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfo;
