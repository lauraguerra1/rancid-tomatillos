import './Trailer.css'
import PropTypes from 'prop-types'

const Trailer = ({trailer}) => {
  return (
    <div className="frame-container" data-cy={trailer}>
      <iframe 
      src={trailer} 
      allowFullScreen
      title="Embedded youtube trailer"
      /> 
    </div>
  )
}

export default Trailer

Trailer.propTypes = {
  trailer: PropTypes.string.isRequired
}