import { useState } from "react";
import axios from "axios";

export const useUploadForm = (url) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const[loading , setLoading] = useState(false)
  const uploadForm = async (formData) => {
    setProgress(0)
    setIsSuccess(false)
    setLoading(true)
    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
        console.log(progress);
        setProgress(progress);
        
      },
    });
    setIsSuccess(true)
    setLoading(false)
  };

  return { uploadForm, isSuccess, progress , loading };
};