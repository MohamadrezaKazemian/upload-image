import './App.scss';
import { useState } from 'react';
import Modal from './Modal';
import { useUploadForm } from './useUploadForm';
function App() {
  const [file, setFile] = useState(null) //saving the choosen file

  const { isSuccess, uploadForm, progress, loading } = useUploadForm(
    "https://httpbin.org/post"
  );


  //this function would convert byte to other size types (using for file size)
  const fileSizeIEC = (a, b, c, d, e) => {
    return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2)
      + ' ' + (e ? 'KMGTPEZY'[--e] + 'iB' : 'Bytes')
    //KiB,MiB,GiB,TiB,PiB,EiB,ZiB,YiB

  }


  //preventing default behavior of the browser
  const handleOndragOver = event => {
    event.preventDefault();
  }
  //handle drag and drop upload behavior
  const handleOndrop = event => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    setFile(event.dataTransfer.files[0])
  }
  const handleUpload = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);
    return await uploadForm(formData);
  };


  return (
    <section className='layout'>
      {file ? <Modal file={file} sizeConvertor={fileSizeIEC} /> : ""}
      <input type={'file'} id="uploadInput" hidden onChange={(e) => handleUpload(e)} />
      <div className='filePreview' onDragOver={handleOndragOver} onDrop={handleOndrop}>
        {file?.type?.match('image.*') ?
          <img src={URL.createObjectURL(file)} alt={"uploaded file"} rel={"noreferrer"} />
          : file == null || undefined ? "Preview(drag and drop)" : file?.name}
        {file ?
          <a href={URL.createObjectURL(file)} target={"_blank"} rel={"noreferrer"} id={"downloadIcon"} download>
            <img src={require('./assets/icons/download.svg').default} alt={"download icon"} />
          </a> : ""}
      </div>
      {file ?
        <div className='fileDescription'>
          <span><strong>file name :</strong> {file?.name.length > 20 ? file?.name.substring(0, 25) + "..." : file?.name}</span>
          <span><strong>size :</strong> {fileSizeIEC(file?.size)}</span>
          <span><strong>file type :</strong> {file?.type}</span>
        </div>
        : ""}
      <label htmlFor={'uploadInput'} className={"uploadBtn"}>Click to Upload!</label>
      {file ?
        <>
          <button className='uploadBtn' onClick={handleSubmit} >
            {loading ? <span className='lds-dual-ring'></span> : ""}
            Send File
          </button>
          {progress === 0 ? "" : isSuccess ? "your file has been sent" : Math.round(progress) + "%"}
        </> : ""}

    </section>
  );
}

export default App;
