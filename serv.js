var http = require('http');
var qs = require('qs');

var s  = http.createServer(function(req, res) {
  var msgs = [];
  var req.content = '';

  req.addListener('data', function(data) {
    req.content += data;
  });

  req.addListener('end', function(data) {
    req.content = qs.parse(req.content);
  });
  if (req.method == 'GET') {
    res.write(gen_messages(msgs));
  }
  if (req.method == 'POST') {
     msgs.push(req.content.msg)
  }


  res.end();

});

s.listen(8000);
