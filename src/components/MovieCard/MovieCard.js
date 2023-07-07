import './MovieCard.css';

const MovieCard = ({movie}) => {
  const movieCover = movie.poster_path;
  const movieTitle = movie.title;
  console.log('cover', movieCover)
  return <img className='movie-cover' src={movieCover} alt={movieTitle} />
};

export default MovieCard;