// worker.js
let remainingTime = 0;
let isRunning = false;
let timerInterval;

onmessage = function (event) {
	if (event.data === "stop") {
		clearInterval(timerInterval);
    isRunning = false;
    return;
  }
	
  isRunning = event.data.isRunning;
  remainingTime = event.data.remainingTime;
	
  if (isRunning) {
		clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime -= 1;
				// send remaining time to the main thread
        postMessage({ remainingTime });
      } else {
        clearInterval(timerInterval);
				// send finished message to the main thread
        postMessage({ finished: true });
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
  }
};
