import React from 'react'

const RoundButton = ({children, btnStyle, onClick}) => (
    <button className={`btn ${btnStyle}`} onClick={onClick}>
        {children}
    </button>
)

export default RoundButton