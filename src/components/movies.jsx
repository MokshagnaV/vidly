import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { pagination } from "../utils/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currPage: 1,
    pageSize: 4,
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

  render() {
    const count = this.state.movies.length;
    const { currPage, pageSize, movies: allMovies } = this.state;

    const movies = pagination(allMovies, pageSize, currPage);

    if (count === 0) {
      return <h2>No movies available</h2>;
    }
    return (
      <React.Fragment>
        <div className="row">
          <h4>There are {count} Movies in the database</h4>
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
          totalItems={count}
          handlePage={this.changePage}
          goPrevPage={this.previousPage}
          goNextPage={this.nextPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
