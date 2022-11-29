import React, { useEffect, useState } from 'react'

function Modal({ file, sizeConvertor }) {
    
    const [time, setTime] = useState(false)
    useEffect(() => {
        setTime(false)
        setTimeout(() => setTime(true), 3000)
        return
    }, [file])
    return (
        <section className='modal' style={time ? { opacity: 0 } : { opacity: 1 }}>
            {file ? <div className='fileDescription'>
                <h4>Your File Has Been Successfully Uploaded</h4>
                < span > <strong>file name</strong> : {file?.name.length > 20 ? file?.name.substring(0, 25) + "..." : file?.name}</span >
                <span><strong>size :</strong> {sizeConvertor(file?.size)}</span>
                <span><strong>file type :</strong> {file?.type}</span>
            </div >
                : ""
            }
        </section>
    )

}

export default Modal