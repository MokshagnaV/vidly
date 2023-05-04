import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { pagination } from "../utils/pagination";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currPage: 1,
    pageSize: 4,
    selectedGenre: { name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount = () => {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  };

  handleDelete = (id) => {
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

  handleChangePage = (currPage) => {
    this.setState({ currPage });
  };

  handlePreviousPage = () => {
    const currPage = this.state.currPage - 1;
    if (currPage < 1) return;
    this.setState({ currPage });
  };

  handleNextPage = () => {
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const {
      currPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => selectedGenre.name === m.genre.name)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = pagination(sorted, pageSize, currPage);

    return { data: movies, totalCount: filtered.length };
  }

  render() {
    const { currPage, pageSize, selectedGenre, genres, sortColumn } =
      this.state;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-md-3 p-5">
          <ListGroup
            items={genres}
            itemOnSelect={this.handleChangeGenre}
            selectedItem={selectedGenre.name}
          />
        </div>
        <div className="col">
          <p>There are {totalCount} Movies in the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            currPage={currPage}
            pageSize={pageSize}
            totalItems={totalCount}
            handlePage={this.handleChangePage}
            goPrevPage={this.handlePreviousPage}
            goNextPage={this.handleNextPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
