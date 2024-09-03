var io = require('socket.io-client');
const os = require('os');
const fs = require('fs');

var source="Sim101"
const PATH_TO_SOURCE= "C:\\Users\\"+os.userInfo().username+"\\Downloads\\SOURCE.txt";

fs.readFile(PATH_TO_SOURCE, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("new source :" ,data);
  source=data
});
var CommandName="InorCommand"
const ComputerWindowsPAth= "C:\\Users\\"+os.userInfo().username+"\\Documents\\NinjaTrader 8\\outgoing\\";

const MNQSimPathNinjaTrade = `${ComputerWindowsPAth}MNQ 09-24 Globex_${source}_position.txt`;
const MNQ_SEP_SimPathNinjaTrade = `${ComputerWindowsPAth}MNQ SEP24 Globex_${source}_position.txt`;

const ES_SimPathNinjaTrade = `${ComputerWindowsPAth}ES 09-24 Globex_${source}_position.txt`;
const ES__SEP_SimPathNinjaTrade = `${ComputerWindowsPAth}ES SEP24 Globex_${source}_position.txt`;

const NQSimPathNinjaTrade = `${ComputerWindowsPAth}NQ 09-24 Globex_${source}_position.txt`;
const NQ_SEP_SimPathNinjaTrade = `${ComputerWindowsPAth}NQ SEP24 Globex_${source}_position.txt`;

const MES_SimPathNinjaTrade = `${ComputerWindowsPAth}MES 09-24 Globex_${source}_position.txt`;
const MES__SEP_SimPathNinjaTrade = `${ComputerWindowsPAth}MES SEP24 Globex_${source}_position.txt`;


PATHS=[
  MNQSimPathNinjaTrade, MNQ_SEP_SimPathNinjaTrade,
  ES_SimPathNinjaTrade,ES__SEP_SimPathNinjaTrade
  ,NQSimPathNinjaTrade,NQ_SEP_SimPathNinjaTrade,
  MES_SimPathNinjaTrade,MES__SEP_SimPathNinjaTrade
]

var socket = io.connect("http://212.80.204.41:6789/", {
    reconnection: true
});

socket.on('connect', function (){
    console.log('connected to Hooli Server');
    socket.on('clientEvent', function (data) {
        console.log('Hey now Im connected, Rock and roll');
    });
    socket.on('disconnect', function () {

      console.log('Ooooooops call me please');


  });
});


PATHS.forEach(element => {
  fs.writeFile(element, "", function (err) {
    if (err) throw err;
    //console.log("It's saved!");
  });
});


let count =0;
fs.watch(MNQSimPathNinjaTrade,(event,filename)=>{
  
  count++;
    if(count%2==0){
          
          fs.readFile(MNQSimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND MNQ 09" )
          var myObject = {
            command: data,
            INS:"MNQ 09-24"
        }
          socket.emit(CommandName, myObject)
        });
    }
    
});

let count1 =0;
fs.watch(MNQ_SEP_SimPathNinjaTrade,(event,filename)=>{
  
  count1++;
    if(count1%2==0){
          
          fs.readFile(MNQ_SEP_SimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND MNQ SEP"  )
          var myObject = {
            command: data,
            INS:"MNQ SEP24"
        }
          socket.emit(CommandName, myObject)
         
        });
    }
    
});

let count2 =0;
fs.watch(ES_SimPathNinjaTrade,(event,filename)=>{
  
  count2++;
    if(count2%2==0){
          
          fs.readFile(ES_SimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND ES 09" )
          var myObject = {
            command: data,
            INS:"ES 09-24"
        }
          socket.emit(CommandName, myObject)
        });
    }
    
});
let count3 =0;
fs.watch(ES__SEP_SimPathNinjaTrade,(event,filename)=>{
  
  count3++;
    if(count3%2==0){
          
          fs.readFile(ES__SEP_SimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND ES SEP" )
          var myObject = {
            command: data,
            INS:"ES SEP24"
        }
          socket.emit(CommandName, myObject)
        });
    }
    
});

//,NQSimPathNinjaTrade,NQ_SEP_SimPathNinjaTrade,
//MES_SimPathNinjaTrade,MES__SEP_SimPathNinjaTrade

let count4 =0;
fs.watch(NQSimPathNinjaTrade,(event,filename)=>{
  
  count4++;
    if(count4%2==0){
          
          fs.readFile(NQSimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND NQ 09" , data)
          var myObject = {
            command: data,
            INS:"NQ 09-24"
        }
          socket.emit(CommandName, myObject)
        });
    }
    
});

let count5 =0;
fs.watch(NQ_SEP_SimPathNinjaTrade,(event,filename)=>{
  
  count5++;
    if(count5%2==0){
          
          fs.readFile(NQ_SEP_SimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND NQ SEP" )
          var myObject = {
            command: data,
            INS:"NQ SEP24"
        }
          socket.emit(CommandName, myObject)
         
        });
    }
    
});

let count6 =0;
fs.watch(MES_SimPathNinjaTrade,(event,filename)=>{
  
  count6++;
    if(count6%2==0){
          
          fs.readFile(MES_SimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND MES 09" )
          var myObject = {
            command: data,
            INS:"MES 09-24"
        }
          socket.emit(CommandName, myObject)
        });
    }
    
});
let count7 =0;
fs.watch(MES__SEP_SimPathNinjaTrade,(event,filename)=>{
  
  count7++;
    if(count7%2==0){
          
          fs.readFile(MES__SEP_SimPathNinjaTrade, 'utf8', (err, data) => {
          console.log("NEW COMMND MES SEP" )
          var myObject = {
            command: data,
            INS:"MES SEP24"
        }
          socket.emit(CommandName, myObject)
        });
    }
    
});