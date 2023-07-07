import PropTypes, { string } from 'prop-types'
import './MovieCover.css';

const MovieCover = ({cover, title}) => {
  return (
      <img className='movie-cover' src={cover} alt={title} />
  ); 
};

export default MovieCover;

MovieCover.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}