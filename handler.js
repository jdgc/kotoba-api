'use strict';

const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.main = async (event, context) => {
  console.log(`recieved request: ${event.body}`)
  const body = JSON.parse(event.body);
  const word = body.word;
  
  if (!word) {
    return { statusCode: 400, body: JSON.stringify('bad request') }
  }
  
  const params = {
    TableName: 'wordsTable',
    Key: {
      'word': word
    }
  };

  try {
    const data = await DynamoDB.get(params).promise();
    return { statusCode: 200, body: JSON.stringify(data.Item) };
  } catch (error) {
    return {
      statusCode: 400,
      error: ''
    };
  }
};
