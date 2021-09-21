import React, { useState } from "react";
import NavBar from "./component/navbar";
import Sidebar from "./component/sidebar";
import CardElement from "./component/card";
import ResultsTable from "./component/resultsTable";
import AddCard from "./component/addCard";

//test
const App = () => {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="grid-container">
        <div className={isActive ? "sidebar_small" : "sidebar"}>
          <button
            onClick={toggleClass}
            className={isActive ? "sidebar-button-after" : "sidebar-button"}
          >
            <i
              className={
                isActive ? "bi bi-list icon-size" : "bi bi-list icon-size2"
              }
            ></i>
          </button>
          <Sidebar />
        </div>
        <div className={isActive ? "main-content_large" : "main-content"}>
          <div className="row g-0">
            <div className="col-xs-12 col-md-12 g-0">
              <div className="row g-0">
                <header className="App-header">
                  <AddCard />
                </header>
              </div>
              <div className="row g-0">
                <middle className="App-middle">
                  <ResultsTable />
                </middle>
              </div>
              <div className="row g-0">
                <bottom className="App-bottom"></bottom>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row footer bg-dark g-0 footer-index">
        <h4>- Footer -</h4>
      </div>
    </>
  );
};

export default App;
