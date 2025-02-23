import { faker } from "@faker-js/faker";

export const generatePhrase = function (): string {
  return faker.word.words(10).toLowerCase();
};

export const countdown = function (seconds: number, onChange: Function): void {
  let intervalId = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
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


