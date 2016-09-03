'use strict';
//var build      = require('./build');



exports.init = function(req, res){
//console.log(req);'use strict';
  console.log("rul request:"+ req.url );
var browserify = require('browserify');
 //
  var marked = require('marked');
  var peacock = require('peacock');
  var fs = require('fs');
  //var ace = require('brace');
  //require('brace/mode/markdown');
  //require('brace/theme/monokai');
  function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
    }
    return myJson;
  }
  marked.setOptions({ 
      gfm       :  true
    , pedantic  :  false
    , sanitize  :  true
    , highlight :  function (code, lang) {
      if (!lang) return code;
      try {
        return peacock.highlight(code);
      } catch (e) {
        return code;
      }
    }
  });

console.log("dt init been used");
	 //res.send(__dirname  + 'DT file reqply' + req.originalUrl );
	 var filename = getUrlVars(req.originalUrl)
	 //console.log(filename['file']);
	 res.render('dt', { filecon: filename['file'].toString() });
   //res.render('dt');
 //res.send('id: ' + req.query);
 //res.send();
};
//module.exports = router;