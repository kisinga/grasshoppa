
var ina = require('easybotics-ina219');

var solar = new ina()
var mains = new ina()
solar.init();
mains.init(undefined, 3);


mains.calibrate32V1A(function () {
  mains.getBusVoltage_V(function (volts) {
    
    console.log("Voltage: " + volts);
    mains.getCurrent_mA(function (current){
      
      console.log("Current (mA): " + current + "\n\n");
    });	
  });
})

solar.calibrate32V1A(function () {
  solar.getBusVoltage_V(function (volts) {
    
    console.log("Voltage: " + volts);
    solar.getCurrent_mA(function (current){
      
      console.log("Current (mA): " + current + "\n\n");
    });	
  });
})

function readFromSolar(){
  var reading = {
    voltage: 0, 
    current: 0
  }
  
  solar.getBusVoltage_V(function (volts) {
    console.log("Voltage: " + volts);
    solar.getCurrent_mA(function (current){
      console.log("Current (mA): " + current + "\n\n");
      reading.voltage = volts
      reading.current = current
    });	
  });
  return reading
}

function readFromMains(){
  var reading = {
    voltage: 0, 
    current: 0
  }
  
  mains.getBusVoltage_V(function (volts) {
    console.log("Voltage: " + volts);
    mains.getCurrent_mA(function (current){
      console.log("Current (mA): " + current + "\n\n");
      reading.voltage = volts
      reading.current = current
    });	
  });
  return reading
}

function read(){
  return results = {
    mains : readFromMains(),
    solar: readFromSolar()
  } 

}

module.exports = {
  readFromMains,readFromSolar
}


// setInterval(()=>{
//   console.log(read())
// }, 2000) 

