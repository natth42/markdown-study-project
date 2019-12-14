import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'

const FileHeader = ({ children, isTextNotSaved, theme }) => (
  <div className={`item fileTab -${theme}`}>
    <div className={`fileName -${theme}`}>
      {children} {isTextNotSaved ? '*' : ''}
    </div>
  </div>
)

FileHeader.propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  isTextNotSaved: PropTypes.bool
}

export default FileHeader