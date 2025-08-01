import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <>
      <div id="home">
        <div className="container">
          <div className="home__top">
            <h2 className="home__top--left">Groove on!</h2>
            <h2 className="home__top--right">All The Hits!</h2>
          </div>
          <div className="container container__home">
            <div className="row">
              <div className="music__home">
                <p className="home__para">How are we feeling today?</p>
                <div className="home__icons">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-record-vinyl"
                  />
                  <FontAwesomeIcon className="icon" icon="fas fa-music" />
                  <FontAwesomeIcon className="icon" icon="fas fa-headphones" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
