import React from 'react'
import '../App.css'

const FileHeader = ({ children, isTextNotSaved, theme }) => (
  <div className={`fileTab -${theme}`}>
    <div className={`fileName -${theme}`}>
      {children} {isTextNotSaved ? '*' : ''}
    </div>
  </div>
)

export default FileHeader