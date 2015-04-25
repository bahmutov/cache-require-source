var useCache = process.argv.some(function (str) {
  return str === '--cache';
});
if (useCache) {
  require('..');
}

function time(fn) {
  var t = process.hrtime();
  var result = fn();
  t = process.hrtime(t);
  var nanoToMs = 1e-6;
  console.log('benchmark took %d seconds and %d milliseconds',
    t[0], Math.round(t[1] * nanoToMs));
}

function load() {
  var exp = require('express');
}

time(load);

