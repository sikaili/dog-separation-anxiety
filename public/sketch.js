"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

p5.disableFriendlyErrors = true;
document.addEventListener("touchmove", function (n) {
  n.preventDefault();
}, {
  passive: false
});
var counter = [];
var state = -1;
var doubleClick,
    ts = [];
var mic;
var songs = [];
var amplitudes = [];
var add = {
  ok: true
};

function preload() {
  Array(9).fill('').map(function (a, i) {
    songs[i] = loadSound("assets/sound".concat(i % 7, ".m4a"));
    amplitudes[i] = new p5.Amplitude();
  });
}

function setup() {
  frameRate(15);
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder');
  songs.map(function (a, i) {
    // Math.random() > 0.8 ? a.reverseBuffer() : "";
    a.play();
    a.playMode('sustain');
    a.setVolume(1);
    a.connect();
    a.stop();
    amplitudes[i].setInput(a);
  });
  mic = new p5.AudioIn();
  mic.start();
}

var micPeak = function micPeak(vol) {
  // console.log(this);
  if (vol > 0.03) {
    setTimeout(function () {
      return vol;
    }, 5000);
    return true;
  }

  return false;
};

var delay = function delay(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

var addTrue =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return delay(5000);

          case 2:
            add.ok = true;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addTrue() {
    return _ref.apply(this, arguments);
  };
}();

function draw() {
  background(255);
  fill(0);
  noStroke();
  textSize(25);
  textAlign(CENTER, CENTER);
  state == -1 ? text("touch to get ready", width / 2, height / 2) : text('Whoooafff times: ' + counter.length, width / 2, 100);
  counter.map(function (a, i) {
    text('Whoooafff at ' + a, width / 2, 150 + i * 50);
  });
  var vol = mic.getLevel(); // noting is playing ?

  var noplay = songs.every(function (a) {
    return !a.isPlaying();
  });

  if (vol > 0.09 && noplay) {
    background(255);
    var song = songs[Math.floor(random(0, songs.length))];
    song.setVolume(3, 0.1);
    song.play();
    setTimeout(function () {
      song.setVolume(0, 2);
      setTimeout(function () {
        song.pause();
      }, 3000);
    }, 2000);
    var ampdata = {
      time: Date().slice(15),
      amp: vol
    };
    var options1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ampdata)
    };
    fetch('/api', options1);
    counter.push(Date().slice(15));
  }
}

document.touchmove = function (n) {
  n.preventDefault();
};