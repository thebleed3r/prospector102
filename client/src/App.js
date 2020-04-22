import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Header from "./components/header.component"
import ProspectionList from "./components/exercices-list.component";
import EditProspection from "./components/edit-exercice.component";
import CreateProspection from "./components/create-exercice.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Header />
      <br/>
      <Route path="/" exact component={ProspectionList} />
      <Route path="/edit/:id" component={EditProspection} />
      <Route path="/create" component={CreateProspection} />
      </div>
    </Router>
  );
}

export default App;