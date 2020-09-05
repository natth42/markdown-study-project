import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import marked from 'marked'
import { v4 } from 'node-uuid'
import '../node_modules/highlight.js/styles/dracula.css'
import './App.css'

import Alert from './components/alert'
import FileHeader from './components/fileHeader'
import FileList from './components/fileList'
import RoundButton from './components/roundButton'

const App = () => {
  const clearMarkup = () => ({
    fileName: 'NewFile',
    value: '',
    id: v4()
  })
  const input = useRef(null)
  const [markup, setMarkup] = useState({...clearMarkup()})
  const [markupList, setMarkupList] = useState([])
  const [message, setMessage] = useState('')
  const [isTextNotSaved, setIsTextNotSaved] = useState(false)

  useEffect(() => {
    const items = {...localStorage};
    setMarkupList(items)
    selectFile(Object.keys(items).map((m) => m)[0], 0)
  }, [])

  const handleChange = (input) => (e) => {
    setIsTextNotSaved(e.target.value !== '')
    setMarkup({...markup, [input]: e.target.value});
  }

  import('highlight.js').then((hljs) => {
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  })

  const getMarkup = () => {
    if(!markup.value)
      return

    return (
      { __html: marked(markup.value) }
    )
  }

  const toggleMessage = (text) => {
    setMessage(text)
    const container = document.querySelector('.container');
    container.classList.toggle('saved');
    setTimeout(() => {
      container.classList.toggle('saved');
    }, 3000);
  }

  const newFile = () => {
    setMarkup({...clearMarkup()})
    setIsTextNotSaved(false)
    input.current.focus()
  }

  const createFile = () => {
    newFile()
  }

  const saveLocalStorage = () => {
    setIsTextNotSaved(false)
    const newFile = {
      value: markup.value,
      fileName: markup.fileName
    }
    if(!Object.keys(markupList).includes(markup.id)){
      setMarkupList([...markupList, markup.id])
    }
    localStorage.setItem(markup.id, JSON.stringify(newFile))
    toggleMessage("Salvo!")
  }

  const removeLocalStorage = () => {
    localStorage.removeItem(markup.id)
    setMarkupList(markupList.filter((item) => item !== markup.id))
    newFile()
    toggleMessage("Removido!")
  }

  const selectFile = (item, position) => {
    const { fileName, value } = JSON.parse(localStorage.getItem(item))
    setMarkup({
      id: item,
      value,
      fileName
    })
  }

  return (
    <div className="cont">
      <FileList markupList={markupList} markupId={markup.id} selectFile={selectFile} />
      <header className="header">
        <FileHeader isTextNotSaved={isTextNotSaved} theme="dark">
          <textarea className="fileNameInput" value={markup.fileName} onChange={handleChange('fileName')} />
        </FileHeader>
        <FileHeader theme="light">
          Live Preview
        </FileHeader>
      </header>
      <main className="main-content">
        <textarea value={markup.value} onChange={handleChange('value')} className="textarea item" ref={input} autoFocus />
        <div className="result item" dangerouslySetInnerHTML={getMarkup()}></div>
      </main>
      <Alert text={message} position="65%" animation="jump" />
      <div className="btns">
        <RoundButton btnStyle="btn-add" onClick={() => createFile()}>
          <FontAwesomeIcon icon={faPlus} />
        </RoundButton>
        <RoundButton btnStyle="btn-save" onClick={() => saveLocalStorage()}>
          <FontAwesomeIcon icon={faSave} />
        </RoundButton>
        <RoundButton btnStyle="btn-remove" onClick={() => removeLocalStorage()}>
          <FontAwesomeIcon icon={faTimes} />
        </RoundButton>
      </div>
    </div>
  );
}

export default App;
