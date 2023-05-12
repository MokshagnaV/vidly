import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { pagination } from "../utils/pagination";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: { name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount = () => {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  };

  handleDelete = (id) => {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
    // this.setState({
    //   movies: this.state.movies.filter(
    //     (m) => m !== this.state.movies.find((m) => m._id === id)
    //   ),
    // });
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
    this.setState({ selectedGenre: genre, searchQuery: "", currPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery,
      selectedGenre: { name: "All Genres" },
      currPage: 1,
    });
  };

  getFilteredDate = () => {
    const { movies: data, selectedGenre, searchQuery } = this.state;

    let movies;
    if (searchQuery !== "") {
      movies = data.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      movies =
        selectedGenre && selectedGenre._id
          ? data.filter((m) => selectedGenre.name === m.genre.name)
          : data;
    }

    return movies;
  };

  getPagedData() {
    const { currPage, pageSize, sortColumn } = this.state;
    const filtered = this.getFilteredDate();

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
          <Link to={`movies/new`} className="btn btn-primary my-3">
            New Movie
          </Link>
          <p>There are {totalCount} Movies in the database</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
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
