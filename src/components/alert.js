import React from 'react'

const Alert = ({ text, position = "50%", animation}) => (
    <div className="container">
        <div className={`box -${animation}`} style={{left: position}}>
            {text}
        </div>
    </div>
)

export default Alert