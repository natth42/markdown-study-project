import React from 'react'

const FileList = ({ markupList, markupId, selectFile }) => (
  <div className="listFiles">
    <ul className="fileList">
      {
        Object.keys(markupList).length > 0
        &&
        Object.keys(markupList).map((item, index) => (
          <li key={item} className={`fileNameList ${item === markupId ? 'selected' : ''}`} onClick={() => selectFile(item, index)}>
            {JSON.parse(markupList[item]).fileName}.md
          </li>
        ))
      }
    </ul>
  </div>
)

export default FileList