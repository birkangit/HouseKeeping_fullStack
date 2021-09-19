import React from "react";
import NavBar from "./component/navbar";
import Sidebar from "./component/sidebar";
import CardElement from "./component/card";
import ResultsTable from "./component/resultsTable";
import AddCard from "./component/addCard";
import "./App.css";
//test

function App() {
  return (
    <container>
      <div>
        <NavBar />
      </div>
      <div class="row g-0">
        <div class="col-xs-12 col-md-2 g-0">
          <Sidebar />
        </div>
        <div class="col-xs-12 col-md-10 g-0">
          <div class="row g-0">
            <header className="App-header">
              <CardElement />
              <AddCard />
            </header>
          </div>
          <div class="row g-0">
            <middle className="App-middle">
              <ResultsTable />
            </middle>
          </div>
          <div class="row g-0">
            <bottom className="App-bottom"></bottom>
          </div>
        </div>
      </div>
      <div class="row footer bg-dark g-0">
        <h4>- Footer -</h4>
      </div>
    </container>
  );
}

export default App;
