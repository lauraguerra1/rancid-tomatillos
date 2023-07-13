import PropTypes from 'prop-types'
import './MoviesBox.css';
import MovieCover from '../MovieCover/MovieCover';
import Form from '../Form/Form';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

const MoviesBox = ({movies, loading}) => {
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    setFilteredMovies(movies)
    return () => setFilteredMovies(movies)
  }, [movies])

  const resetMovies = () => {
    setFilteredMovies(movies)
  }
  const filterMovies = (title, rating) => {
    const splitRating = JSON.parse(rating)
    const [ min, max ] = splitRating
    setFilteredMovies(movies.filter(movie => {
      const titleIncluded = movie.title.toLowerCase().includes(title.toLowerCase())
      const ratingIsGreater = movie['average_rating'] >= parseInt(min) 
      const ratingIsSmaller = movie['average_rating'] <= parseInt(max)

      return titleIncluded && ratingIsGreater && ratingIsSmaller ? true : false
    }))
  }
  
  const movieCovers = filteredMovies.map(movie => {
    const { average_rating, poster_path: cover, title, id} = movie;
    const movieRating = average_rating.toFixed(2);
      
    return (
      <Link to={`${id}`} className='cover-container' key={id}>
        <MovieCover cover={cover} title={title} size={'mini-movie-cover'}/>
        <p className='rating'>🍅 {movieRating}</p>
      </Link> 
    );
  });

  return (
    <>
      {!loading && <Form resetMovies={resetMovies} filterMovies={filterMovies}/>}
      <div className='movie-container'>
        {movieCovers}
        {!filteredMovies.length && !loading && <p style={{color: 'red'}}>Sorry, no movies to display! Try a different search</p>}
      </div>
    </>
  );
};

export default MoviesBox;

MoviesBox.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    "id": PropTypes.number.isRequired,
    "poster_path": PropTypes.string.isRequired,
    "backdrop_path": PropTypes.string.isRequired,
    "title": PropTypes.string.isRequired,
    "average_rating": PropTypes.number.isRequired,
    "release_date": PropTypes.string.isRequired
  }).isRequired).isRequired,
}
