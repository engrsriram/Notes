'use strict';

exports.init = function(req, res){
  //var util = require('util');
  var fs = require('fs');
  var path = require('path');
  
	function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            path1: filename,//.replace('/','?'),
            name: path.basename(filename)
        };
    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        info.type = "file";
    }
    return info;
	}
  /*
  function locate(filename){
    return true;
  }  
  function markdata(filename)
  {
     //var md = fs.readFileSync(__dirname + '/CHANGELOG.md').toString();
     var md = fs.readFileSync(filename).toString();
     return (marked(md));
  }
  */

    console.log("sending index file");
    res.render('index', { vizJson: dirTree('./public/data') });
    //res.render('dt');
  


};
