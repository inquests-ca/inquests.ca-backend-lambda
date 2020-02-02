console.log('Loading function');

import app from './app/app';

const awsServerlessExpress = require('aws-serverless-express')
const server = awsServerlessExpress.createServer(app)

const handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

exports.handler = handler;
