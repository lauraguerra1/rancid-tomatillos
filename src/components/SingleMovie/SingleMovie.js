import PropTypes from 'prop-types'
import './SingleMovie.css';
import MovieCover from '../MovieCover/MovieCover';
import Trailer from '../Trailer/Trailer';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getMovieVideos, getSingleMovie } from '../../apiCalls';


const SingleMovie = ({fetchApi, setError}) => {
  const [singleMovie, setSingleMovie] = useState(null);
  const [movieVideos, setMovieVideos] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const {id} = useParams()

  useEffect(() => {
    fetchApi(getSingleMovie, setSingleMovie, id)
    fetchApi(getMovieVideos, setMovieVideos, id)

    return () => {
      setError('')
    }
  }, [])

  useEffect(() => {
    if(movieVideos.length) {
      const trailerKey = movieVideos.find(video => video.type === 'Trailer').key
      setTrailer(`https://www.youtube.com/embed/${trailerKey}`)
    }
  }, [movieVideos])

  if(singleMovie) {
    const {title, poster_path: cover, release_date: date, average_rating, tagline, overview, genres, budget, revenue, runtime} = singleMovie;
    const movieRating = average_rating.toFixed(2);
    const genre = genres.map((item, i) => i < genres.length - 1 ? `${item},` : item)
    

    return (
      <div className='trailer-detail-container'>
        <div className='movie-detail-container'>
          <MovieCover cover={cover} title={title} size={'large-movie-cover'}/>
          <article className='details'>
            <h1>{title}</h1>
            <p><i>{tagline}</i></p>
            <p><b>{genre.join(' ')}</b></p>
            <p>🍅 {movieRating}</p>
            <p>{overview}</p>
            <p>Released: {date}</p>
            <p>{runtime} minutes</p>
            <p>Budget: ${budget}</p>
            <p>Revenue: ${revenue}</p>
          </article>
        </div>
        {trailer && <Trailer trailer={trailer} />}
      </div>
    );
  }
};

export default SingleMovie;

SingleMovie.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}
