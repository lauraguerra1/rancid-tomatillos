import './MoviesBox.css';
import MovieCard from '../MovieCard/MovieCard';

const MoviesBox = ({movieData}) => {
  const movies = movieData.movies;

  const movieCovers = movies.map(movie => {
    return <MovieCard movie={movie} key={movie.id} />;
  });

  return (
    <div className='movie-container'>
      {movieCovers}
    </div>
  );
};

export default MoviesBox;
