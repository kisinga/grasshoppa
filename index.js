var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var NoRetry = require('azure-iot-common').NoRetry;
var { read} = require('./read');

const fs = require('fs');

let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var connectionString =data.credential  //value to be added here

var client = Client.fromConnectionString(connectionString, Protocol);

// this uploads our json data to azure IOT and subsequrntly to PowerBI
var sendMessage = (message, id) => {
  client.sendEvent(new Message(
    message
  ), (err) => {
    if (err) {
      console.error('Could not send: ' + err.toString());
      process.exit(-1);
    } else {
      console.log('Message sent: ' + id);
    }
  });

}

function getMessage(messageCounter) {
  // Add call to read function
  var message = read();
  message = JSON.stringify(message);
  console.log(message)
  console.log('Sending message: ' + message + '\n\n');
  return message
}

client.setRetryPolicy(new NoRetry());
client.open((err) => {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    //handle error
    client.on('error', function (err) {
      console.error(err.mesgetMessageage);
      process.exit(-1);
    });

    var messageCounter = 0
    setInterval(() => {
      message = getMessage(messageCounter)
      //send message to the cloud.
      sendMessage(message, messageCounter);
      messageCounter++;

    }, 2000)

  }
});

