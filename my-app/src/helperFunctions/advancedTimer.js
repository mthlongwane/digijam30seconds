var countSplits = 0;
var countSeconds = 30;

if (countSplits < 0 && countSeconds) {
  countSeconds--;
  countSplits = 99;
}

function runTimer(countSplits, countSeconds) {
  function leadingZero(num) {
    if (num <= 9) {
      num = "0" + num;
    }
    return num;
  }

  var timer = [countSeconds, countSplits];
  var currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}`;

  return currentTime;
}

// module.exports = leadingZero;
module.exports = runTimer;
// console.log(runTimer(countSplits, countSeconds));
// countSplits--;
