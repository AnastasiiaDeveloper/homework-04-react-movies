import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getMoviesHits } from "../../services/services";
import styles from "./TrendingToday.module.css";

class TrendingToday extends Component {
  state = {
    hits: []
  };
  async componentDidMount() {
    getMoviesHits().then(data => this.setState({ hits: data }));
  }
  render() {
    return (
      <>
        <h2 className={styles.title}>Trending today</h2>
        <ul className={styles.list}>
          {this.state.hits.map(item => (
            <li key={item.id}>
              <NavLink
                to={{
                  pathname: `/movie/${item.id}`,
                  state: { from: "/" }
                }}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                <p> {item.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default TrendingToday;