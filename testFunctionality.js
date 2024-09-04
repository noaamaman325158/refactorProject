const io = require('socket.io-client');
const os = require('os');
const fs = require('fs');

let source;
const PATH_TO_SOURCE= "SOURCE.txt";

try {
  const data = fs.readFileSync(PATH_TO_SOURCE, 'utf8');
  console.log("new source :", data);
  source = data;
} catch (err) {
  console.error(err);
}

let CommandName="InorCommand"
const ComputerWindowsPAth= "outgoing\\";

const MNQSimPathNinjaTrade = `${ComputerWindowsPAth}MNQ 09-24 Globex_${source}_position.txt`;
const MNQ_SEP_SimPathNinjaTrade = `${ComputerWindowsPAth}MNQ SEP24 Globex_${source}_position.txt`;


PATHS=[
  MNQSimPathNinjaTrade, MNQ_SEP_SimPathNinjaTrade,
]

var socket = io.connect("hrittp://212.80.204.41:6789/", {
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
    console.log(element)
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