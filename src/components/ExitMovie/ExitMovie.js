import PropTypes from 'prop-types'
import './ExitMovie.css'
import exitBanner from '../../images/exit-arrow.png'

const ExitMovie = ({viewAll}) => {
  return (
    <button className='exit-movie' onClick={viewAll}>
      <img className='exit-movie-img' src={exitBanner} alt='return to page with all movies' />
    </button>
  );
};

export default ExitMovie;

ExitMovie.propTypes = {
  viewAll: PropTypes.func.isRequired
}