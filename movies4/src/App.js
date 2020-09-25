import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import './App.css'

class App extends Component {
  state = {
    api_key: '4520e037e8319a1a5d11f7e9fb65a740',
  }

  getTrendingMovies = async() => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.state.api_key}`
    const response = await fetch(url)
    const json = await response.json()
    const movies = json.results
    this.setState({ movies })
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  render() {
    return (
      <>
        <header>
          <button>Home</button>
          <button>Movies</button>
        </header>
        <main>
          <h1>Trending today</h1>
          <MovieList movies={this.state.movies} />
        </main>
      </>
    )
  }
}

const MovieList = props => (
  // в случае маршрутизации помещаем всю разметку в корневой тэг <Router></Router>
  <Router>
    {/* сама разметка, которую ты будешь видеть на экране */}
    <ul>
      {
        props.movies ?
          props.movies.map(movie =>
            <li>
              <Link to={`/movies/${movie.id}`}>
                {movie.original_title}
              </Link>
            </li>) :
          <></>
      }
    </ul>

    {/* какая ссылка за какой компонент отвечает */}
    <Switch>
      <Route path="/movies/:movieId">
        <MovieDetailsPage movies={props.movies} />
      </Route>
    </Switch>
  </Router>
)

const MovieDetailsPage = props => {
  // получаем значение из адресной строки
  const { movieId } = useParams()

  const movie = props.movies ?
    props.movies.find(movie => movie.id == movieId) :
    null

  const getMovieDetails = async movieId => {
    const api_key = '4520e037e8319a1a5d11f7e9fb65a740'
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
    const response = await fetch(url)
    const json = await response.json()
    return json
  }

  const movieDetails = getMovieDetails(movieId)

  // we can set 'w500'
  const moviePosterUrl = movie ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : null
  const movieYear = movie ? movie.release_date.substring(0, 4) : null

  return movie ? (
    <>
      <img src={moviePosterUrl} style={{float: "left"}} />
      <h1>{movie.original_title} ({movieYear})</h1>
      {
        movieDetails ?
          <h2>{movieDetails.vote_average}</h2>
            :
          <></>
      }
    </>
  )
    :
  <h1>
    There is no additional info about such movie
  </h1>
}

export default App