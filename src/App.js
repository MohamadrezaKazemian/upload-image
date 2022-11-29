import './App.scss';
import { useEffect, useState } from 'react';
function App() {
  //this function would convert byte to other size types
  const fileSizeIEC = (a, b, c, d, e) => {
    return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2)
      + ' ' + (e ? 'KMGTPEZY'[--e] + 'iB' : 'Bytes')
    //KiB,MiB,GiB,TiB,PiB,EiB,ZiB,YiB

  }
  
  const [file, setFile] = useState(null) //saving the choosen file

  const handleUpload = (e) => {
    setFile(e.target.files[0])
  }
  return (
    <section className='layout'>
      <input type={'file'} id="uploadInput" hidden onChange={(e) => handleUpload(e)} />
      <div className='filePreview'>
        {file?.type?.match('image.*') ? <img src={URL.createObjectURL(file)} /> : file === null ? "Preview" : file?.name}
        {file ? <a href={URL.createObjectURL(file)} target={"_blank"} id={"downloadIcon"} download><img src={require('./assets/icons/download.svg').default} /></a> : ""}
      </div>
      {file ? <div className='fileDescription'>
        <span><strong>file name</strong> : {file?.name.length > 10 ? file?.name.substring(0, 25) + "..." : file?.name}</span>
        <span><strong>size :</strong> {fileSizeIEC(file?.size)}</span>
        <span><strong>file type :</strong> {file?.type}</span>
      </div>
        : ""}
      <label htmlFor={'uploadInput'} className={"uploadBtn"}>Click to Upload!</label>

    </section>
  );
}

export default App;
