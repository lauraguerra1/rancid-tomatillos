import PropTypes from 'prop-types'
import './ExitMovie.css'
import exitBanner from '../../images/exit-arrow.png'

const ExitMovie = ({viewAll}) => {
  return <img className='exit-movie' src={exitBanner} alt='old school theater banner with the title rancid tomatillos' onClick={viewAll}/>
};

export default ExitMovie;

ExitMovie.propTypes = {
  viewAll: PropTypes.func.isRequired
}