import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import NavBar from "./Component/NavBar";
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard";


function App() {
  return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home} />          
          <Route path="/dashboard" exact component={Dashboard} />                     
        </Switch>
        <Footer/>
      </Router>
  );
}

export default App;