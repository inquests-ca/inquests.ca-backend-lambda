console.log('Loading function');

const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)

const handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

exports.handler = handler;
