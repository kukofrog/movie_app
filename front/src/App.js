// @flow
import React from 'react';
import './App.css';
import Movie from './Movie';


class App extends React.Component {

  state = {}

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie)=> {
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        synopsis={movie.synopsis} 
        key={movie.id}
       />
    });
    return movies;
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(res => res.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : 'loading...'}
      </div>
    );
  }
}

export default App;
