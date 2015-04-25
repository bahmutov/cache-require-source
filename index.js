var SAVE_FILENAME = './.cache-require-source.json';
var Module = require('module');
var fs = require('fs');
var exists = fs.existsSync;

var _compile = Module.prototype._compile;

var t = process.hrtime();
var nameCache = exists(SAVE_FILENAME) ? JSON.parse(fs.readFileSync(SAVE_FILENAME, 'utf-8')) : {};
t = process.hrtime(t);
var nanoToMs = 1e-6;
console.log('loading source cache took', Math.round(t[1] * nanoToMs));

var cacheChanges = false;

function getCachedOrRead(filename) {
  var source = nameCache[filename];

  if (!source) {
    source = fs.readFileSync(filename, 'utf-8');
    nameCache[filename] = source;
    cacheChanges = true;
  }
  return source;
}

Module._extensions['.js'] = function (module, filename) {
  var source = getCachedOrRead(filename);
  return module._compile(source, filename);
};

Module._extensions['.json'] = function (module, filename) {
  var source = getCachedOrRead(filename);
  return module._compile('module.exports = ' + source, filename);
};

function printCache() {
  Object.keys(nameCache).forEach(function (fromFilename) {
    console.log(fromFilename);
    var moduleCache = nameCache[fromFilename];
    Object.keys(moduleCache).forEach(function (name) {
      console.log(' ', name, '->', moduleCache[name]);
    });
  });
}

process.once('exit', function () {
  fs.writeFileSync(SAVE_FILENAME,
    JSON.stringify(nameCache, null, 2), 'utf-8');
});
