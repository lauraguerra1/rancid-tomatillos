import './MovieCover.css';

const MovieCover = ({cover, title}) => {
  return (
      <img className='movie-cover' src={cover} alt={title} />
  ); 
};

export default MovieCover;
