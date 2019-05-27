p5.disableFriendlyErrors = true;


document.addEventListener(
  "touchmove",
  function (n) {
    n.preventDefault();
  }, {
    passive: false
  }
);

let counter = [];
let state = -1;
let doubleClick, ts = [];
let mic;
let songs = [];
let amplitudes = [];
let add = {
  ok: true,
}

function preload() {
  Array(9).fill('').map((a, i) => {
    songs[i] = loadSound(`assets/sound${i%7}.m4a`);
    amplitudes[i] = new p5.Amplitude();
  })
}

function setup() {
  frameRate(15);
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder');
  songs.map((a, i) => {
    // Math.random() > 0.8 ? a.reverseBuffer() : "";
    a.play();
    a.playMode('sustain');
    a.setVolume(1);
    a.connect();
    a.stop();
    amplitudes[i].setInput(a);
  })
  mic = new p5.AudioIn();
  mic.start();


}

const micPeak = (vol) => {
  // console.log(this);
  if (vol > 0.03) {
    setTimeout(() => {
      return vol
    }, 5000);
    return true
  }
  return false

}

const delay = ms => new Promise(res => setTimeout(res, ms));
const addTrue = async () => {
  await delay(5000);
  add.ok = true;
};


function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(25);
  textAlign(CENTER, CENTER)
  text('Whoooafff times ' + counter.length, width / 2, 100)
  counter.map((a, i) => {
    text('Whoooafff at ' + a, width / 2, 100 + i * 50)
  })
  let vol = mic.getLevel();
  // noting is playing ?
  console.log(vol)
  let noplay = songs.every(a => !a.isPlaying())
  if (vol > 0.09 && noplay) {
    background(255);
    let song = songs[Math.floor(random(0, songs.length))];
    song.setVolume(3, 0.1);
    song.play();
    setTimeout(() => {
      song.setVolume(0, 2);
      setTimeout(() => {
        song.pause();
      }, 3000);
    }, 2000);


    console.log(noplay);
    counter.push(Date().slice(15));
  }

}



document.touchmove = function (n) {
  n.preventDefault();
};