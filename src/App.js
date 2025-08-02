import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useContext } from "react";
import Home from "./Pages/Home";
import AlbumInfo from "./Pages/AlbumSpotlight";
import Footer from "./compononents/Footer";
import Nav from "./compononents/Nav";
import SearchLibrary from "./compononents/SearchLibrary";
import { SearchProvider } from "./hooks/SearchProvider";

const ApiContext = createContext();

function App() {
  return (
    <Router>
      <SearchProvider>
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/:searchLibrary" element={<SearchLibrary />}></Route>
            <Route
              path="/:searchLibray/:artist/:albumName"
              element={<AlbumInfo />}
            ></Route>
          </Routes>
          <Footer />
        </>
      </SearchProvider>
    </Router>
  );
}

export const useApiData = () => {
  return useContext(ApiContext);
};

export default App;
