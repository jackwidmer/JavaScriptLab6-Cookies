"use strict";
/* Main css file for Jack Widmer Lab 6. */
function _Initialize() {
	startInt();
}

/**
 * Format a Javascript Date in the format h:mm:ss[am|pm] day, mon, dd, yyyy.
 *
 * @param {date} date - A Javascript Date object.
 * 
 * @returns the formatted Date.
 */
function TimeDateFormat(date) {
  let dateParts = date.toString().split(' ');
  let hour, minute, second, ampm;
  [hour, minute, second] = dateParts[4].split(':');
  hour = parseInt(hour);
  if (hour >= 12 ) {
    ampm = 'pm';
    if (hour > 12 ) {
      hour -= 12;
    }
  } else {
    ampm = 'am';
    if (hour == 0 ) {
      hour = 12;
    }
  }
  let returnDateTimeString = `${hour}:${minute}:${second}${ampm} on ${dateParts[0]}, ${dateParts[1]} ${dateParts[2]} ${dateParts[3]}`;
  return returnDateTimeString;
}

let date;
// create "user" cookie, expires in 1 minute
date = new Date(Date.now() + 60e3);
console.log(`date = ${date}`);
document.cookie = `${encodeURIComponent('user')}=${encodeURIComponent('Jack Widmer')}; expires=${date.toUTCString()}`;
// create "thirty" cookie, expires in 30 seconds
date = new Date(Date.now() + 30e3);
console.log(`date = ${date}`);
document.cookie = `${encodeURIComponent('thirty')}=${encodeURIComponent(`expires: ${TimeDateFormat(date)}`)}; expires=${date.toUTCString()}`;
// create "daylong" cookie, expires in 1 day
date = new Date(Date.now() + 86400e3);
console.log(`date = ${date}`);
document.cookie = `${encodeURIComponent('daylong')}=${encodeURIComponent(`expires: ${TimeDateFormat(date)}`)}; expires=${date.toUTCString()}`;

console.log(document.cookie);

let setIntervalId;
let setIntervalTwo;

function readCookies() {
    readCookies.counter++;
    // console.log(`${readCookies.counter} document.cookie = \n${document.cookie}`); // show all cookies
    let siteCookies = document.cookie.split(';');
    console.log(`${readCookies.counter} length=${siteCookies.length} document.cookie = \n`);
    siteCookies.forEach(thisCookie => {
        let thisCookieClean = decodeURIComponent(thisCookie.trim());
        console.log(`\t${thisCookieClean}\n`);
        document.getElementById("theCookies").innerText += `${thisCookieClean}\n`;
    });
}

function displayRead() {
  document.getElementById("theCookies").innerText += `Read cookies at ${TimeDateFormat(date)}\n`;
}

function clearInt() {
    clearInterval(setIntervalId);
}

function startInt() {
    clearInt();
    // document.getElementById("theCookies").innerText += `Read cookies at ${TimeDateFormat(date)}\n`;
    readCookies.counter = 0;
    displayRead();
    readCookies();
    setIntervalTwo = setInterval(displayRead,30000);
    setIntervalId = setInterval(readCookies, 30000); 
}
