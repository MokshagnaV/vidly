import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import { Redirect, Route, Switch } from "react-router-dom";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path={`/not-found`} component={NotFound} />
          <Route path="/movie/:id" exact component={MovieForm} />
          <Route path="/movies" exact component={Movies} />
          <Redirect from="/" to={`/movies`} exact />
          <Redirect to={`/not-found`} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
