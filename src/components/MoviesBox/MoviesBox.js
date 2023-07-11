import PropTypes from 'prop-types'
import './MoviesBox.css';
import MovieCover from '../MovieCover/MovieCover';
import { Link } from 'react-router-dom'

const MoviesBox = ({movies}) => {

  
  const movieCovers = movies.map(movie => {
    const { average_rating, poster_path: cover, title, id} = movie;
    const movieRating = average_rating.toFixed(2);
      
    return (
      <Link to={`${id}`} className='cover-container' key={id} >
        <MovieCover cover={cover} title={title} size={'mini-movie-cover'}/>
        <p className='rating'>🍅 {movieRating}</p>
      </Link> 
    );
  });

  return (
    <div className='movie-container'>
      {movieCovers}
    </div>
  );
};

export default MoviesBox;

// MoviesBox.propTypes = {
//   movies: PropTypes.arrayOf(PropTypes.shape({
//     "id": PropTypes.number.isRequired,
//     "poster_path": PropTypes.string.isRequired,
//     "backdrop_path": PropTypes.string.isRequired,
//     "title": PropTypes.string.isRequired,
//     "average_rating": PropTypes.number.isRequired,
//     "release_date": PropTypes.string.isRequired
//   }).isRequired).isRequired,
//   viewMovie: PropTypes.func.isRequired
// }
