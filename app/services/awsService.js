const awsSDK = require('aws-sdk');
const cfsign = require('aws-cloudfront-sign');
const fs = require('fs');

const signingParams = {
  keypairId: process.env.AWS_KEY_PAIR_ID,
  privateKeyPath: process.env.AWS_PRIVATE_KEY_PATH,
  expireTime: new Date().getTime() + 999999999
};

// Generating a signed URL
const getSignedUrl = (fileName) => {
  if (!fileName) return '';

  return cfsign.getSignedUrl(
    process.env.AWS_DISTRIBUTION + '/' + fileName,
    signingParams
  );
};

const uploadFileToS3 = (fileName, fileDirectoryPath, pathInBucket) => {
  awsSDK.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  });
  const s3 = new awsSDK.S3();

  return new Promise((resolve, reject) => {
    fs.readFile(fileDirectoryPath.toString(), (err, data) => {
      if (err) {
        reject(err);
      }
      s3.putObject(
        {
          Bucket: `${process.env.S3_BUCKET_NAME + '/' + pathInBucket}`,
          Key: fileName,
          Body: data
        },
        (s3error) => {
          fs.unlink(fileDirectoryPath.toString(), (error) => {
            if (error) console.log(error);
          });
          if (s3error) reject(s3error);
          resolve({
            response: 'succesfully uploaded',
            path: pathInBucket + '/' + fileName
          });
        }
      );
    });
  });
};

module.exports = { getSignedUrl, uploadFileToS3 };
