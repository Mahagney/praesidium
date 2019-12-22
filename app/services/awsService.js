const cfsign = require("aws-cloudfront-sign");

var signingParams = {
    keypairId: process.env.AWS_KEY_PAIR_ID,
    privateKeyPath: process.env.AWS_PRIVATE_KEY_PATH,
    expireTime: (new Date().getTime() + 999999999)
};

// Generating a signed URL
let getSignedUrl = (fileName) => {

    return cfsign.getSignedUrl(
        process.env.AWS_DISTRIBUTION + "/" + fileName,
        signingParams
    );
}

module.exports = { getSignedUrl }