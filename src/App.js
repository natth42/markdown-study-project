import React, { useEffect, useState } from 'react';
import marked from '../node_modules/marked/lib/marked';
import '../node_modules/highlight.js/styles/dracula.css';
import './App.css';

import Alert from './components/alert';

const App = () => {
  const [markup, setMarkup] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const marked = localStorage.getItem('file')
    setMarkup(marked || '')
  }, [])

  const handleSubmit = e => {
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

  const saveLocalStorage = () => {
    localStorage.setItem('file', markup)
    toggleMessage("Salvo!")
  }

  const removeLocalStorage = () => {
    localStorage.removeItem('file')
    setMarkup('')
    toggleMessage("Removido!")
  }

  return (
    <>
      <div className="App">
        <div className="fileTab">
          <div className="fileName">
            newFile.md
          </div>
        </div>
        <textarea value={markup} onChange={handleSubmit} className="textarea" autoFocus />
        <div className="result" dangerouslySetInnerHTML={getMarkup()}></div>
        <Alert text={message} />
      </div>
      <button className="btn" onClick={() => saveLocalStorage()}>✔</button>
      <button className="btn" onClick={() => removeLocalStorage()}>✖</button>
    </>
  );
}

export default App;
