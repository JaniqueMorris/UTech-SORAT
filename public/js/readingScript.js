
var startTime;
var stopTime;
var diff;
function startReading() {
  startTime = new Date();
  document.getElementById("btnStart").style.display = "none";
  document.getElementById("readingPassage").style.textShadow = "0 0 0 #000";
  document.getElementById("btnStop").style.display = "block";
}
function stopReading() {
  stopTime = new Date();
  diff = parseInt((stopTime.getTime() - startTime.getTime()) / 1000);
  window.location = 'assessment/readingTest-questions/' + (diff * 7490);
}
