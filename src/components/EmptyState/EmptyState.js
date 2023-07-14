import './EmptyState.css'
import PropTypes from 'prop-types'

const EmptyState = ({img, alt, warning}) => {
  return (
    <div className="empty-state-container">
      <p className='empty-state-warning'>
        {warning}
      </p>
      <img className='empty-state' src={img} alt={alt} />
    </div>
    )
}

export default EmptyState

EmptyState.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  warning: PropTypes.string.isRequired
}