var io = require('socket.io-client');
const os = require('os');
const fs = require('fs');

var source="Sim101"
const PATH_TO_SOURCE= "C:\\Users\\"+os.userInfo().username+"\\Downloads\\SOURCE.txt";

try {
  const data = fs.readFileSync(PATH_TO_SOURCE, 'utf8');
  console.log("new source :", data);
  source = data;
} catch (err) {
  console.error(err);
}

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
  try {
    fs.writeFileSync(element, "");
  } catch (err) {
    console.error(err);
  }
});

function watchFile(filePath, instrumentName) {
  fs.watchFile(filePath, { interval: 100 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log(`NEW COMMAND ${instrumentName}`);
        var myObject = {
          command: data,
          INS: instrumentName
        };
        socket.emit(CommandName, myObject);
      } catch (err) {
        console.error(err);
      }
    }
  });
}

watchFile(MNQSimPathNinjaTrade, "MNQ 09-24");
watchFile(MNQ_SEP_SimPathNinjaTrade, "MNQ SEP24");
watchFile(ES_SimPathNinjaTrade, "ES 09-24");
watchFile(ES__SEP_SimPathNinjaTrade, "ES SEP24");
watchFile(NQSimPathNinjaTrade, "NQ 09-24");
watchFile(NQ_SEP_SimPathNinjaTrade, "NQ SEP24");
watchFile(MES_SimPathNinjaTrade, "MES 09-24");
watchFile(MES__SEP_SimPathNinjaTrade, "MES SEP24");