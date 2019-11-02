import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import marked from '../node_modules/marked/lib/marked';
import '../node_modules/highlight.js/styles/dracula.css';
import './App.css';

import Alert from './components/alert';
import FileHeader from './components/fileHeader'

const App = () => {
  const input = useRef(null)
  const [markup, setMarkup] = useState('')
  const [message, setMessage] = useState('')
  const [isTextNotSaved, setIsTextNotSaved] = useState(false)

  useEffect(() => {
    const marked = localStorage.getItem('file')
    setMarkup(marked || '')
  }, [])

  const handleChange = e => {
    setIsTextNotSaved(markup !== '')
    setMarkup(e.target.value);
  }

  import('highlight.js').then((hljs) => {
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  })

  const getMarkup = () => ({ __html: marked(markup) })

  const toggleMessage = (text) => {
    setMessage(text)
    const container = document.querySelector('.container');
    container.classList.toggle('saved');
    setTimeout(() => {
      container.classList.toggle('saved');
    }, 3000);
  }

  const createFile = () => {
    console.log('create File!');
    setMarkup('')
    setIsTextNotSaved(false)
    input.current.focus();
  }

  const saveLocalStorage = () => {
    setIsTextNotSaved(false)
    localStorage.setItem('file', markup)
    toggleMessage("Salvo!")
  }

  const removeLocalStorage = () => {
    setIsTextNotSaved(false)
    localStorage.removeItem('file')
    setMarkup('')
    toggleMessage("Removido!")
  }

  return (
    <>
      <div className="App">
        <div className="item">
          <FileHeader isTextNotSaved={isTextNotSaved} theme="dark">
            newFile.md
          </FileHeader>
          <textarea value={markup} onChange={handleChange} className="textarea" ref={input} autoFocus />
        </div>
        <div className="item">
          <FileHeader isTextNotSaved={isTextNotSaved} theme="light">
            Live Preview
          </FileHeader>
          <div className="result" dangerouslySetInnerHTML={getMarkup()}></div>
        </div>
        <Alert text={message} />
      </div>
      <div className="btns">
        <button className="btn btn-add" onClick={() => createFile()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button className="btn btn-save" onClick={() => saveLocalStorage()}>
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button className="btn btn-remove" onClick={() => removeLocalStorage()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </>
  );
}

export default App;
