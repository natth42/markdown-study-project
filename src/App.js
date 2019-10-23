import React, { useEffect, useState } from 'react';
import marked from '../node_modules/marked/lib/marked';
import '../node_modules/highlight.js/styles/dracula.css';
import './App.css';

import Alert from './components/alert';

const App = () => {
  const [markup, setMarkup] = useState('')

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

  const saveLocalStorage = () => {
    const container = document.querySelector('.container');
    localStorage.setItem('file', markup)
    container.classList.toggle('saved');
    setTimeout(() => {
      container.classList.toggle('saved');
    }, 3000);
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
        <Alert text="Salvo!" />
      </div>
      <button className="btn" onClick={() => saveLocalStorage()}>✔</button>
    </>
  );
}

export default App;
