import PropTypes from 'prop-types'
import './SingleMovie.css';
import MovieCover from '../MovieCover/MovieCover';

const SingleMovie = ({selectedMovie}) => {
  console.log(selectedMovie)

  const {title, poster_path: cover, release_date: date, average_rating, tagline, overview, genres, budget, revenue, runtime} = selectedMovie;
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
};

export default SingleMovie;

SingleMovie.propTypes = {
  selectedMovie: PropTypes.shape({
    "id": PropTypes.number,
    "title": PropTypes.string.isRequired,
    "poster_path": PropTypes.string.isRequired,
    "backdrop_path": PropTypes.string,
    "release_date": PropTypes.string.isRequired,
    "overview": PropTypes.string.isRequired,
    "genres": PropTypes.arrayOf(PropTypes.string).isRequired,
    "budget": PropTypes.number.isRequired,
    "revenue": PropTypes.number.isRequired,
    "runtime": PropTypes.number.isRequired,
    "tagline": PropTypes.string.isRequired,
    "average_rating": PropTypes.number.isRequired
  }).isRequired
}
