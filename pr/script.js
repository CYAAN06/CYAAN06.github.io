"use strict";

/*
document.body.style.background = 'red'; // 배경을 붉은색으로 변경하기

setTimeout(() => document.body.style.background = '', 3000); // 원상태로 복구하기
*/

/*
const asd = document.createElement("div");

asd.className = "alert";
asd.innerHTML = "<strong>Hello</strong>, world!";

const sdf = document.querySelector("#contact");

sdf.append(asd);
asd.innerHTML = "asdasdas";
setTimeout(() => asd.remove(asd), 1000);
*/

class Clock {
    constructor(template) {
        this.template = template;
    };

    render = () => {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    stop() {
      clearInterval(this.timer);
    };
  
    start() {
      this.render();
      this.timer = setInterval(this.render, 1000);
    };
  
  }
  
  let clock = new Clock('h:m:s');
  clock.start();