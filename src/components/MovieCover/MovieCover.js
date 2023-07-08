import PropTypes, { string } from 'prop-types'
import './MovieCover.css';

const MovieCover = ({cover, title, size}) => {
  return (
      <img className={`movie-cover ${size}`} src={cover} alt={title} />
  ); 
};

export default MovieCover;

MovieCover.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
}