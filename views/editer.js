var express = require('express');
var fileSystem = require('fs');
var router = express.Router();
  var marked = require('marked');
  var peacock = require('peacock');
  
/* GET home page. */
/*
router.get('/:id', function(req, res, next) {
  
	//res.customRender(__dirname + '/../','editer', { title: req.params.id });

// res.render('editer', { title: req.params.id });
res.render( req.params.id );
});

*/

router.get('/:id', function(req, res, next) {
  

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
  function markdata(filename)
  {
     //var md = fs.readFileSync(__dirname + '/CHANGELOG.md').toString();
     var md = fileSystem.readFileSync(filename).toString();
     return (marked(md));
  }
  var UrlVar = getUrlVars(req.originalUrl);
  console.log(UrlVar['work']);
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
    if( UrlVar['work'] === 'edit')
  {
    //console.log("i am in file sending stage");

    var data = fileSystem.readFileSync(UrlVar['file'], "utf8");
    //console.log("Data:" + data);
    res.set('Content-Type', 'text/plain');
	res.set({
  		'Content-Type': 'text/plain',
  		'Content-Length': data.size
	});
	res.send(data);
  }
  else if ( UrlVar['work'] === 'view'){

    var data = markdata(UrlVar['file']);
    //console.log("Data:" + data);
    res.set('Content-Type', 'text/plain');
	res.set({
  		'Content-Type': 'text/html',
  		'Content-Length': data.size
	});
	res.send(data);
  }
  else
  {

	//res.customRender(__dirname + '/../','editer', { title: req.params.id });

// res.render('editer', { title: req.params.id });
 res.send(__dirname  + 'Looks like something wrong, no HTML!' + req.params.id );
}
});
module.exports = router;
