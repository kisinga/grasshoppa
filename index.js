
var solar = require('easybotics-ina219');
var mains = require('easybotics-ina219');


mains.init(undefined, 3);
solar.init();

solar.calibrate32V1A(function () {

})

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
  
}

function readFromMains(){

}

function read(){

}
// setInterval(()=>{
//   ina219.calibrate32V1A(function () {
  
//     ina219.getBusVoltage_V(function (volts) {
    
//       console.log("Voltage: " + volts);
//       ina219.getCurrent_mA(function (current){
        
//         console.log("Current (mA): " + current + "\n\n");
//       });	
//     });
//   });
// }, 2000) 

