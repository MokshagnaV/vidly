import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { pagination } from "../utils/pagination";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currPage: 1,
    pageSize: 4,
    selectedGenre: { name: "All Genres" },
  };

  componentDidMount = () => {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  };

  delMovie = (id) => {
    this.setState({
      movies: this.state.movies.filter(
        (m) => m !== this.state.movies.find((m) => m._id === id)
      ),
    });
  };

  handleLike = (movie) => {
    const movies = this.state.movies.map((m) => {
      if (m === movie) {
        m.liked = !m.liked;
      }
      return m;
    });
    //Mosh's Solution|
    // const movies = [...this.state.movies];
    // const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    // movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  changePage = (n) => {
    const currPage = n;
    this.setState({ currPage });
  };

  previousPage = () => {
    const currPage = this.state.currPage - 1;
    if (currPage < 1) return;
    this.setState({ currPage });
  };

  nextPage = () => {
    const currPage = this.state.currPage + 1;
    const totalPages = Math.ceil(
      this.state.movies.length / this.state.pageSize
    );
    if (currPage > totalPages) return;
    this.setState({ currPage });
  };

  handleChangeGenre = (genre) => {
    this.setState({ selectedGenre: genre, currPage: 1 });
  };

  render() {
    const {
      currPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      genres,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => selectedGenre.name === m.genre.name)
        : allMovies;
    const movies = pagination(filtered, pageSize, currPage);

    return (
      <div className="row">
        <div className="col-3 p-5">
          <ListGroup
            items={genres}
            itemOnSelect={this.handleChangeGenre}
            selectedItem={selectedGenre.name}
          />
        </div>
        <div className="col">
          <div className="row">
            <p>There are {filtered.length} Movies in the database</p>
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Qty in Stock</th>
                  <th scope="col">Rental Rate(daily)</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        onLike={() => this.handleLike(movie)}
                        liked={movie.liked}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.delMovie(movie._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currPage={currPage}
            pageSize={pageSize}
            totalItems={filtered.length}
            handlePage={this.changePage}
            goPrevPage={this.previousPage}
            goNextPage={this.nextPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
