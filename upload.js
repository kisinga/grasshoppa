var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var NoRetry = require('azure-iot-common').NoRetry;

var connectionString = "HostName=GrasshoppaHackathon.azure-devices.net;DeviceId=grasshoppa;SharedAccessKey=whPeHubrYN3bvXyzLaVbbZHNPv4P5WaX2Sb2Q2AcvVg="

var client = Client.fromConnectionString(connectionString, Protocol);

connectToCloud = () => {
  client.setRetryPolicy(new NoRetry());
  client.open(function (err) {
    if (err) {
      console.log('Could not connect: ' + err);
    } else {
      console.log('Client connected');
    }
    client.close(function() {
      process.exit(0);
    });
  });

}
connectToCloud();