import PropTypes from 'prop-types'
import './SingleMovie.css';
import MovieCover from '../MovieCover/MovieCover';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getSingleMovie } from '../../apiCalls';


const SingleMovie = ({fetchApi, setError}) => {
  const [singleMovie, setSingleMovie] = useState(null);
  const {id} = useParams()

useEffect(() => {
  fetchApi(getSingleMovie, setSingleMovie, id)

  return () => {
    setError('')
  }
}, [])
    
  if(singleMovie) {
    const {title, poster_path: cover, release_date: date, average_rating, tagline, overview, genres, budget, revenue, runtime} = singleMovie;
    const movieRating = average_rating.toFixed(2);
    const genre = genres.map((item, i) => i < genres.length - 1 ? `${item},` : item)
  
    return (
      <div className='movie-detail-container'>
        <MovieCover cover={cover} title={title} size={'large-movie-cover'}/>
        <div className='details'>
          <h1>{title}</h1>
          <p>{tagline}</p>
          <p>{genre.join(' ')}</p>
          <p>🍅 {movieRating}</p>
          <p>{overview}</p>
          <p>Released: {date}</p>
          <p>{runtime} minutes</p>
          <p>Budget: {budget}</p>
          <p>Revenue: {revenue}</p>
        </div>
      </div>
    );
  }
};

export default SingleMovie;

SingleMovie.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}
