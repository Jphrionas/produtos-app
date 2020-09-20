const { resolve } = require('path');
const dotenv = require('dotenv');

const nodeEnv = process.env.NODE_ENV || 'dev';
dotenv.config({ path: resolve(process.cwd(), `.env.${nodeEnv}`.replace(/\.$/, '')) })

const databaseConfig = require('./src/config/database');
console.log(databaseConfig)

module.exports = databaseConfig
