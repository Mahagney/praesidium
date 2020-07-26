const awsSDK = require('aws-sdk');
const cfsign = require('aws-cloudfront-sign');
const fs = require('fs');

const { aws: awsConfig, s3: s3Config } = require('../../config');

const signingParams = {
  keypairId: awsConfig.keyPairId,
  privateKeyPath: awsConfig.privateKeyPath,
  expireTime: new Date().getTime() + 999999999,
};

// Generating a signed URL
const getSignedUrl = (fileName) => {
  if (!fileName) return '';

  return cfsign.getSignedUrl(`${awsConfig.distribution}/${fileName}`, signingParams);
};

const uploadFileToS3 = (fileNameParam, fileDirectoryPath, pathInBucket) => {
  awsSDK.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  });
  const s3 = new awsSDK.S3();
  const fileName = fileNameParam.replace(/\s/g, '');
  return new Promise((resolve, reject) => {
    fs.readFile(fileDirectoryPath.toString(), (err, data) => {
      if (err) {
        reject(err);
      }
      s3.putObject(
        {
          Bucket: `${s3Config.bucketName}/${pathInBucket}`,
          Key: fileName,
          Body: data,
        },
        (s3error) => {
          fs.unlink(fileDirectoryPath.toString(), (error) => {
            // eslint-disable-next-line no-console
            if (error) console.log(error);
          });
          if (s3error) reject(s3error);
          resolve({
            response: 'succesfully uploaded',
            path: `${pathInBucket}/${fileName}`,
          });
        },
      );
    });
  });
};

module.exports = { getSignedUrl, uploadFileToS3 };
