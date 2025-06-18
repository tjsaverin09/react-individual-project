import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./compononents/Nav";
import SearchLibrary from "./compononents/SearchLibrary";

function App() {
  return (
    <Router>
      <>
      <Nav />
      <SearchLibrary />
        <Routes>
          <Route path=":id"></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
