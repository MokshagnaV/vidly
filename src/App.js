import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import Login from "./components/login";
import "./App.css";

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
          <Route path="/login" exact component={Login} />
          <Redirect from="/" to={`/movies`} exact />
          <Redirect to={`/not-found`} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
