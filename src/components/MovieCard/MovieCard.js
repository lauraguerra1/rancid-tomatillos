import './MovieCard.css';

const MovieCard = ({movie}) => {
  const { average_rating, poster_path: movieCover, title} = movie;
  const movieRating = average_rating.toFixed(2);
  return (
    <div className='cover-containter'>
      <img className='movie-cover' src={movieCover} alt={title} />
      <p className='rating'>🍅 {movieRating}</p>
    </div>
  ); 
};

export default MovieCard;
