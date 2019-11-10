import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ text, position = "50%", animation}) => (
    <div className="container">
        <div className={`box -${animation}`} style={{left: position}}>
            {text}
        </div>
    </div>
)

Alert.propTypes = {
    animation: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    position: PropTypes.string,
}

export default Alert