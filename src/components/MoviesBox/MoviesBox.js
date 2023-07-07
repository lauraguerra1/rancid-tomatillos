import './MoviesBox.css';
import MovieCard from '../MovieCard/MovieCard';

const MoviesBox = ({movieData}) => {
  const movies = movieData.movies;
  console.log(movies)

  const movieCovers = movies.map(movie => {
    return <MovieCard movie={movie} />;
  });

  return (
    <div className='movie-container'>
      {movieCovers}
    </div>
  );

};

export default MoviesBox;