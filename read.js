
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
    voltage1: 0, 
    current1: 0,
    power1: 0
  }
  
  solar.getBusVoltage_V(function (volts) {
    console.log("Voltage: " + volts);
    solar.getCurrent_mA(function (current){
      console.log("Current (mA): " + current + "\n\n");
      reading.voltage1 = roundOff(volts)
      reading.current1 = roundOff(current)
      reading.power1= roundOff((volts * current)/1000)
    });	
  });
  return reading
}

function readFromMains(){
  var reading = {
    voltage2: 0, 
    current2: 0,
    power2: 0
  }
  
  mains.getBusVoltage_V(function (volts) {
    console.log("Voltage: " + volts);
    mains.getCurrent_mA(function (current){
      console.log("Current (mA): " + current + "\n\n");
      reading.voltage2 = roundOff(volts)
      reading.current2 = roundOff(current)
      reading.power2= roundOff((volts * current)/1000)
    });	
  });
  // make mains power constant
  reading.power2 = 2
  return reading
}
function roundOff(numero){
  return Math.round(numero *100)/100
}

function read(){
  var mains = readFromMains()
  var green = readFromSolar()
  return results = {
     ...mains,
    ...green, 
    price: roundOff(calculatePrice(green.power1, mains.power2))
  } 

}
// price calculation is dynamic and depends on the amount of power from green energy sources
// and the amount of power from fossil souces
function calculatePrice(greenPower, fossilpower){
  var ceilingPrice=26
  var minPrice=5
  var totalpower = greenPower + fossilpower
  var diff = ceilingPrice - minPrice
  var deduction = greenPower/totalpower*diff
  return ceilingPrice - deduction
}
// export our functions to be consumed by the module that uploads the 
// data to azure IOT
module.exports = {
  readFromMains,readFromSolar, read
}


setInterval(()=>{
  console.log(read())
}, 2000) 

