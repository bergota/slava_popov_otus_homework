var fs = require('fs');
var path = require('path');
var filename = path.basename('tree.js');

var aDIRs = function () {
  var folders = [],
    files = [];
  function addDir(arr) {
    folders.push(arr);
  }
  function addFile(arr) {
    files.push(arr);
  }
  return {
    arrFolders: folders,
    arrFiles: files,
    pushDir: function (arr) { addDir(arr); },
    pushFile: function (arr) { addFile(arr); }
  }
}
var aPaths = new aDIRs();


var cbFnc = function (err, result) {
  if (err) console.log("ERROR: %o", err);

}



var tree = function (dir, callbackFnc) {
  var results = [];



  callbackFnc = callbackFnc || cbFnc;




  fs.readdir(dir, function (err, list) {

    if (err) return callbackFnc(err);




    var pending = list.length;

    if (!pending) return callbackFnc(null, results);

    list.forEach(function (file) {
      file = path.resolve(dir, file);

      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {


          aPaths.pushDir(file);

          tree(file, function (err, res) {
            results = results.concat(res);

            if (!--pending) callbackFnc(null, results);
          });
        } else {

          results.push(file);
          aPaths.pushFile(file);

          if (!--pending) callbackFnc(null, results);
        }
      });
    });
  });
};

var rootDir = __dirname;
console.log('__dirname= %o', __dirname);

process.argv.forEach(function (val, index, array) {

  if (index == 2) {
    rootDir = val;
    console.log('rootDir : ' + val);
  }
});


tree(rootDir, cbFnc);
