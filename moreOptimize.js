const io = require('socket.io-client');
const os = require('os');
const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(os.homedir(), 'Downloads', 'SOURCE.txt');
const OUTGOING_DIR = path.join(os.homedir(), 'Documents', 'NinjaTrader 8', 'outgoing');

const INSTRUMENTS = [
  { name: 'MNQ', dates: ['09-24', 'SEP24'] },
  { name: 'ES', dates: ['09-24', 'SEP24'] },
  { name: 'NQ', dates: ['09-24', 'SEP24'] },
  { name: 'MES', dates: ['09-24', 'SEP24'] }
];

const PATHS = INSTRUMENTS.flatMap(instrument => 
  instrument.dates.map(date => 
    path.join(OUTGOING_DIR, `${instrument.name} ${date} Globex_${source}_position.txt`)
  )
);

function initializeFiles(paths) {
  paths.forEach(filePath => {
    try {
      fs.writeFileSync(filePath, "");
    } catch (err) {
      console.error(`Error initializing file ${filePath}:`, err);
    }
  });
}

function setupFileWatchers() {
  INSTRUMENTS.forEach(instrument => {
    instrument.dates.forEach(date => {
      const filePath = path.join(OUTGOING_DIR, `${instrument.name} ${date} Globex_${source}_position.txt`);
      watchFile(filePath, `${instrument.name} ${date}`);
    });
  });
}

try {
  source = fs.readFileSync(SOURCE_FILE, 'utf8').trim();
  console.log("New source:", source);
} catch (err) {
  console.error("Error reading source file:", err);
}

const socket = io.connect("http://212.80.204.41:6789/", { reconnection: true });

socket.on('connect', () => {
  console.log('Connected to Hooli Server');
  socket.on('clientEvent', () => console.log('Hey now I\'m connected, Rock and roll'));
  socket.on('disconnect', () => console.log('Oooooops call me please'));
});

initializeFiles(PATHS);
setupFileWatchers();