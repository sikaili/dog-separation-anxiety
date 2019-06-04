function touchStarted(e) {
  state !== 1 ? state = 1 : '';
}

function touchEnded() {
  state !== 0 ? state = 0 : '';
}

function keyPressed() {

  keyCode == 32 ? save(cvs, `${frameCount}.tif`) : "";

}


function addSnapshot(id) {
  let dumps = [];
  for (let mm = 0; mm < draws.length; mm++) {
    let dump = draws[mm].mp.map(function (element) {
      return {
        x: element.x,
        y: element.y
      }
    })
    dumps.push(dump);
  }

  console.log(dumps);
  localStorage.setItem("canvas-" + id, JSON.stringify(dumps))
}

function removeSnapshot(id) {
  localStorage.removeItem("canvas-" + id);
}


function getSnapshot(id) {
  let canvas = JSON.parse(localStorage.getItem("canvas-" + id));
  return canvas;
}

function resetAllSnapshots() {
  localStorage.clear();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function record() {
  capturer = new CCapture({
    format: 'webm',
    framerate: 30
  });
  capturer.start();
  btn.textContent = 'stop recording';

  btn.onclick = e => {
    capturer.stop();
    capturer.save();
    capturer = null;
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
  window.onkeypress = e => {
    capturer.stop();
    capturer.save();
    capturer = null;
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
}