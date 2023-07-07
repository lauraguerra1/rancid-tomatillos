import './MoviesBox.css';
import MovieCover from '../MovieCover/MovieCover';

const MoviesBox = ({movies, viewMovie}) => {

  const movieCovers = movies.map(movie => {
    const { average_rating, poster_path: cover, title, id} = movie;
    const movieRating = average_rating.toFixed(2);
      
    return (
      <div className='cover-container' key={id}>
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
