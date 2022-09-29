import './style.css';

let domReady = (cb) => {
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb()
    : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
  // Display body when DOM is loaded
  let content = document.getElementById('content');
  let loader = document.getElementById('loader');
  content.style.visibility = 'visible';
  loader.style.visibility = 'hidden';
});
/**
 * 3D Scroll
 */
let zSpacing = -1000;
let lastPos = zSpacing / 5;
let $frames = document.getElementsByClassName('frame');
let frames = Array.from($frames);
let zVals = [];

window.onscroll = () => {
  let top = document.documentElement.scrollTop;
  let delta = lastPos - top;
  lastPos = top;

  frames.forEach(function (n, i) {
    zVals.push(i * zSpacing + zSpacing);
    zVals[i] += delta * -5;
    let frame = frames[i];
    let transform = `translateZ(${zVals[i]}px)`;
    let opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0;
    frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`);
  });
};

window.scrollTo(0, 1);

/**
 * Audio
 */
let soundButton = document.querySelector('.soundbutton');
let audio = document.querySelector('.audio');
audio.volume = 0.4;

soundButton.addEventListener('click', () => {
  soundButton.classList.toggle('paused');
  audio.paused ? audio.play() : audio.pause();
});

window.onfocus = () => {
  soundButton.classList.contains('paused') ? audio.pause() : audio.play();
};

window.onblur = () => {
  audio.pause();
};
