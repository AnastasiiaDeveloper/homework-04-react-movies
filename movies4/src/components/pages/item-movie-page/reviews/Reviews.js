import React, { Component } from "react";
import { getIdFromProps } from "../ItemMovie";
import { getReviews } from "../../../services/services";
import styles from "./Reviews.module.css"
class Reviews extends Component {
  state = {
    reviews: []
  };
  async componentDidMount() {
    const id = getIdFromProps(this.props);
    const data = await getReviews(id).then(data =>
      this.setState({ reviews: data})
    );

  }
  render() {
    return (
      <>
      {this.state.reviews.length > 0 ? (
        <ul className={styles.list}>
          {this.state.reviews.map(item => (
            <li>
              <h4>Author: {item.author} </h4> <p>{item.content}</p>
            </li>
          ))}
        </ul>
      ): (  <h4>No reviews yet!</h4>)}
      
    
      </>
    );
  }
}

export default Reviews;