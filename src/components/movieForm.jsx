import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as fakeMovieService from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class MovieForm extends Form {
  state = {
    data: {
      _id: undefined,
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genre: [],
    errors: "",
  };

  schema = {
    _id: Joi.string().optional(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(1).max(10).required(),
  };

  componentDidMount() {
    this.setState({ genre: getGenres() });

    const id = this.props.match.params.id;
    if (id !== "new") {
      const movie = fakeMovieService.getMovie(id);
      if (movie) {
        const data = {
          _id: movie._id,
          title: movie.title,
          genreId: movie.genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        };
        this.setState({ data });
      } else {
        return this.props.history.replace("/not-found");
      }
    }
  }

  onSubmit() {
    const movieDetails = { ...this.state.data };
    movieDetails.dailyRentalRate = parseInt(movieDetails.dailyRentalRate);
    movieDetails.numberInStock = parseInt(movieDetails.numberInStock);
    fakeMovieService.saveMovie(movieDetails);
    this.props.history.push("/movies");
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", this.state.genre)}
              {this.renderInput("numberInStock", "Stock", "number")}
              {this.renderInput("dailyRentalRate", "Rate")}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieForm;
