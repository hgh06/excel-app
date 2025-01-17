import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../Button/Button';
import '../UploadPage/Upload.css';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(false);
    setFile(acceptedFiles[0]);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError(false);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);

    // You can add more fields if needed, e.g., formData.append("userId", userId);

    try {
      // Send FormData via fetch (or axios) to the server
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error uploading the file");
    } finally {
      setIsSubmitting(false);
      setFile(null);
    }
  };

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
  });

  return (
    <div className='upload-container'>
      <div className='container-elem'>
        <div className='upload-component' {...getRootProps()}>
          <input {...getInputProps()} />
          <div className='uplolad-txt'>
            {file ? file.name : 'Drag and drop your images here.'}
          </div>
        </div>
      </div>
      <div className='container-elem'>
        <Button onclick={handleSubmit} title={'Submit'} />
      </div>
    </div>
  )
  // const [file, setFile] = useState<File | null>(null);
  // const [uploading, setUploading] = useState(false);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files ? event.target.files[0] : null;
  //   if (selectedFile) {
  //     // Validate that the file is an Excel file (either .xls or .xlsx)
  //     const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
  //     if (fileExtension === "xlsx" || fileExtension === "xls") {
  //       setFile(selectedFile);
  //     } else {
  //       alert("Please upload a valid Excel file (.xlsx, .xls).");
  //     }
  //   }
  // };



  // return (
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <input
  //           type="file"
  //           accept=".xlsx, .xls" // Accept only Excel files
  //           onChange={handleFileChange}
  //         />
  //       </div>

  //       <div>
  //         {file && (
  //           <p>
  //             Selected file: <strong>{file.name}</strong>
  //           </p>
  //         )}
  //       </div>

  //       <div>
  //         <button type="submit" disabled={uploading}>
  //           {uploading ? "Uploading..." : "Upload File"}
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
}

export default Upload;
