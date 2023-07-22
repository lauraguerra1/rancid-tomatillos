import './ExitMovie.css'
import exitBanner from '../../images/exit-arrow.png'
import {Link} from 'react-router-dom'

const ExitMovie = () => {
  return (
    <Link to="/rancid-tomatillos" className='exit-movie'>
      <img className='exit-movie-img' src={exitBanner} alt='return to page with all movies' />
    </Link>
  );
};

export default ExitMovie;
