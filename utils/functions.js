const moment = require('moment');
require('moment-duration-format');

class Util {

  static formatUptime(ms) {
    return moment.duration(ms).format(' D [days], H [hrs], m [mins], s [secs]');
  }

  static clean(text) {
    if (typeof(text) === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    else return text;
  }

  static validURL(str) {
    const URLRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return URLRegex.test(str);
  }

  static randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

};

module.exports = Util;
