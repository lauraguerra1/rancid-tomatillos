import './SingleMovie.css';
import MovieCover from '../MovieCover/MovieCover';

const SingleMovie = ({selectedMovie}) => {

  const {title, poster_path: cover, release_date: date, average_rating} = selectedMovie;
  const movieRating = average_rating.toFixed(2);

  return (
    <div className='movie-detail-container'>
      <MovieCover cover={cover} title={title} />
      <div className='details'>
        <h1>{title}</h1>
        <p>The world needed a hero. It got Black Adam.</p>
        <p>Action, Fantasy, Science Fiction</p>
        <p>🍅 {movieRating}</p>
        <p>Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.</p>
        <p>Released: {date}</p>
        <p>139 minutes</p>
        <p>Budget: 200000000</p>
        <p>Revenue: 384571691</p>
        
      </div>
    </div>
  );
};

export default SingleMovie;