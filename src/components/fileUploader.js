import React, { useState } from 'react';
import AWS from 'aws-sdk';

const S3_BUCKET = 'summipbl'; 
const REGION = 'us-east-1'; 

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

const uploadFile = (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: file.name,
    Body: file,
    ACL: 'public-read'
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Upload Error", err);
    } else {
      console.log("Upload Success", data.Location);
      alert(`File uploaded successfully!\nURL: ${data.Location}`);
    }
  });
};
