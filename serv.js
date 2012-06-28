var http = require('http');
var qs = require('qs');

var msgs = [];
var s  = http.createServer(function(req, res) {
  console.log('request starting: '+ req.method);
  
}


  if (req.method == 'POST') {
    req.on('data', function(data) {
      content += data;
    });

    req.on('end', function() {
      req.body = qs.parse(content);
      var msg = { from: req.body.from, text: req.body.text };
      msgs.push(msg);
    });

  }

  res.end();

});

s.listen(8000);
