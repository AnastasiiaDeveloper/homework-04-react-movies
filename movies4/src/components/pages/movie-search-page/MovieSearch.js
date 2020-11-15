import React, { Component } from "react";
import { searchMovies } from "../../services/services";
import { NavLink } from "react-router-dom";
import SearchPanel from "./search-panel/SearchPanel";
import queryString from "query-string";
import styles from "./MovieSearch.module.css";
class MovieSearch extends Component {
  state = {
    query: "",
    searchMovieListResult: [],
  };

  async componentDidMount() {
    this.setState({
      searchMovieListResult: JSON.parse(localStorage.moviesList),
    });
    const query = queryString.parse(this.props.location.search).query;
    if (query) {
      this.setState({ query });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.query) {
      if (prevState.query !== this.state.query) {
        searchMovies(this.state.query).then((data) => {
          this.setState({ searchMovieListResult: data });
          localStorage.setItem("moviesList", JSON.stringify(data));
        });
      }
    }
  }

  handleChange = (e) => {
    console.log(e.target.value);
  };

  handleSubmit = async (value) => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${value}`,
    });
    this.setState({ query: value });
  };

  render() {
    const { searchMovieListResult } = this.state;
    return (
      <>
        <SearchPanel onHandleSubmit={this.handleSubmit} />
        <ul className={styles.list}>
          {searchMovieListResult.map((item) => (
            <li key={item.id}>
              <NavLink
                to={{
                  pathname: `/movie/${item.id}`,
                  state: { from: this.props.location },
                }}
                className={styles.link}
              >
                <p>{item.title || item.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MovieSearch;
