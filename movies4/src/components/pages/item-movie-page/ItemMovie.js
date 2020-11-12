import React, { Component } from "react";
import Cast from "./cast/Cast";
import Reviews from "./reviews/Reviews";
import { Route, NavLink, withRouter } from "react-router-dom";
import { getMovieById } from "../../services/services";
import styles from "./ItemMovie.module.css";
export const getIdFromProps = props => props.match.params.movieId;
class ItemMoviePage extends Component {
  state = {
    id: null,
    title: "",
    overview: "",
    userScore: "",
    genres: [],
    score: null,
    path: null
  };
  async componentDidMount() {
    const id = getIdFromProps(this.props);

    getMovieById(id).then(data =>
      this.setState({
        id: data.id,
        title: data.title,
        overview: data.overview,
        genres: data.genres,
        score: data.score,
        path: data.path
      })
    );
  }

  handleGoBack = () => {
    const { history, location } = this.props;
    if (location.state) {
      return history.push(location.state.from);
    } else {
      history.push("/");
    }
  };
  render() {
    const { id, title, overview, genres, score, path } = this.state;

    return (
      <>
        <button onClick={this.handleGoBack} className={styles.backBTN}>
          &larr; Back to all movies
        </button>
        <div className={styles.container}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${path}`}
            alt=""
            className={styles.poster}
          />
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <p>User score: {score} %</p>
            <p>{overview}</p>
            <h3>Genres:</h3>
            <ul>
              {genres.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
          <div className={styles.additional}>
            <h4>Additional information:</h4>
            <ul className={styles.additionalList}>
              <NavLink
                to={{
                  pathname: `/movie/${this.state.id}/credits`
                }}
                itemId={this.state.id}
                className={styles.additionalListLink}
                activeClassName={styles.additionalListLinkActive}
              >
                Cast
              </NavLink>
              <NavLink
                to={{
                  pathname: `/movie/${this.state.id}/reviews`
                }}
                className={styles.additionalListLink}
                activeClassName={styles.additionalListLinkActive}
              >
                Reviews
              </NavLink>
            </ul>
          </div>
        </div>
        <Route path={`${this.props.match.path}/credits`} component={Cast} />
        <Route path={`${this.props.match.path}/reviews`} component={Reviews} />
      </>
    );
  }
}

export default withRouter(ItemMoviePage);