import React, { Fragment } from "react";

function replacer (key, value){
  if (value.__proto__ === Map.prototype) {
      return {
          _type: "map",
          map: [...value],
      }
  } else return value;
}

function reviver (key, value){
  if (value._type === "map") return new Map(value.map);
  else return value;
}

function serialize(obj){
  return JSON.stringify(obj, replacer)
}

function deserialize(obj){
  return JSON.parse(obj, reviver)
}

const ImportFromFile = (props) => {
  let fileReader;
  
  const handleFileRead = (e) => {
    const content = fileReader.result
    props.trigger(content)
  }

  const handleFileChosen = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <Fragment>
      <input 
        type="file"
        id="file"
        name="file"
        accept='.yip'
        style={{
          width: '0.1px',
          height: '0.1px',
          opacity: 0,
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,
        }}
        onChange={e => handleFileChosen(e.target.files[0])}
      />
      <label style={{cursor: 'pointer'}} for="file">{props.children}</label>
    </Fragment>
  )
}

const SaveToFile = (props) => {
  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([props.getText()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Mi Año ${new Date().getFullYear()}.yip`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div onClick={downloadFile} style={{cursor:'pointer'}}>
      {props.children}
    </div>
  )
}

export { SaveToFile, ImportFromFile, serialize, deserialize }