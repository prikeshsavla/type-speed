function countdown(seconds: number, onChange: Function): void {
  let intervalId = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);
  for (let i = 1; i <= intervalId; i++) {
    window.clearInterval(i);
  }
  intervalId = window.setInterval(() => {
    if (seconds > 0) {
      seconds--;
      onChange(seconds);
    } else {
      onChange(0);
      window.clearInterval(intervalId);
    }
  }, 1000);
}

export default countdown;
