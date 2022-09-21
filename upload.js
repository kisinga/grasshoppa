var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var NoRetry = require('azure-iot-common').NoRetry;
var readFromMains = require('readFromMains');
var readFromSolar = require('readFromSolar');

var connectionString = '' //value to be added here

var client = Client.fromConnectionString(connectionString, Protocol);


var sendMessage = (message) => {
  client.sendEvent(message, (err) => {
    if (err) {
      console.error('Could not send: ' + err.toString());
      process.exit(-1);
    } else {
      console.log('Message sent: ' + message.messageId);
    }
  });
}

client.setRetryPolicy(new NoRetry());
client.open((err) => {
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    //handle error
    client.on('error', function (err) {
      console.error(err.message);
      process.exit(-1);
    });

    var messageCounter = 0
    while(true){
    // Add call to read function
    var message = messageCounter % 2 == 0 ? readFromMains() : readFromSolar();

    message.properties.add('id', messageCounter)
    messageCounter ++;
    console.log('Sending message: ' + message.getData());

    //send message to the cloud.
    sendMessage(message);
  }
  }
});

