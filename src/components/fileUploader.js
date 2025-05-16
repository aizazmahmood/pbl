import AWS from 'aws-sdk';
import React, { useState } from 'react';

const S3_BUCKET = 'aizazpbl';  
const REGION = 'us-east-1';             

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFile = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const params = {
      Bucket: S3_BUCKET,
      Key: selectedFile.name,
      Body: selectedFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Upload failed:", err);
        alert("Upload failed!");
      } else {
        console.log("Upload success:", data.Location);
        alert(`File uploaded successfully!\nURL: ${data.Location}`);
      }
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default FileUploader;