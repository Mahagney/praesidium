const { isUndefined } = require('lodash');

const configLoader = require('../loaders/config');

// Load .env in process.env
configLoader();

const {
  NODE_ENV,
  PORT,
  ACCESS_TOKEN_SECRET,
  // mail
  EMAIL,
  PASSWORD,
  // db
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  // aws
  AWS_KEY_PAIR_ID,
  AWS_PRIVATE_KEY_PATH,
  AWS_DISTRIBUTION,
  // s3
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
  // misc
  // Disabled due to nameing in process.env
  // eslint-disable-next-line camelcase
  npm_package_name,
  // Disabled due to nameing in process.env
  // eslint-disable-next-line camelcase
  npm_package_version,
} = process.env;

module.exports = {
  port: !isUndefined(PORT) ? parseInt(PORT, 10) : 3000,
  env: NODE_ENV,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  mail: {
    address: EMAIL,
    password: PASSWORD,
  },
  aws: {
    keyPairId: AWS_KEY_PAIR_ID,
    privateKeyPath: AWS_PRIVATE_KEY_PATH,
    distribution: AWS_DISTRIBUTION,
  },
  s3: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    bucketName: S3_BUCKET_NAME,
  },
  packageName: npm_package_name,
  packageVersion: npm_package_version,
  cors: {
    origin: ['http://localhost:3000', 'http://praesidium.s3-website.eu-central-1.amazonaws.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  },
  sequelize: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
};
