console.log('Loading function');

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const TABLE = 'Inquests';

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const done = (err, res) =>
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res.Items),
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://beta.inquests.ca"
      }
    });

  // TODO: add filters.
  var params = {
    TableName: TABLE
  };

  switch (event.httpMethod) {
    case 'GET':
      ddb.scan(params, done);
      break;
    // case 'POST':
    //   dynamo.putItem(JSON.parse(event.body), done);
    //   break;
    // case 'DELETE':
    //   dynamo.deleteItem(JSON.parse(event.body), done);
    //   break;
    // case 'PUT':
    //   dynamo.updateItem(JSON.parse(event.body), done);
    //   break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
