import './MoviesBox.css';
import MovieCover from '../MovieCover/MovieCover';

const MoviesBox = ({movies}) => {

  const movieCovers = movies.map(movie => {
    const { average_rating, poster_path: cover, title} = movie;
    const movieRating = average_rating.toFixed(2);

    return (
      <div className='cover-containter' key={movie.id}>
        <MovieCover cover={cover} title={title} />
        <p className='rating'>🍅 {movieRating}</p>
      </div> 
    );
  });

  return (
    <div className='movie-container'>
      {movieCovers}
    </div>
  );
};

export default MoviesBox;
