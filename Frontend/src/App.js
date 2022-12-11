import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import NavBar from "./Component/NavBar";
import Category from "./Pages/Category";
import Home from "./Pages/Home"


function App() {
  return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home} />                     
          <Route path="/category/:category" exact component={Category} />    
        </Switch>
        <Footer/>
      </Router>
  );
}

export default App;