var http = require('http');
var qs = require('qs');
var url = require('url');

var msgs = [];
var client_length = 0;

var s  = http.createServer(function(req, res) {
   
	var content = "";

	res.writeHead(200, {'Access-Control-Allow-Origin': '*'});

	console.log(req.url);
	client_length = qs.parse(url.parse(req.url).query).client_length;

	console.log('request starting: '+ req.method);
	console.log('client length: ' + client_length);
	console.log('Msg length: ' + msgs.length);
	

	var	new_msgs = msgs.slice(client_length, msgs.length);
	
	var main_object = { 
			server_length: msgs.length,
			messages: new_msgs}
	
	
	res.write(JSON.stringify(main_object));
	

  	if (req.method == 'POST') {
    	req.on('data', function(data) {
    	content += data;
    });

    req.on('end', function() {
      req.body = qs.parse(content);
      var msg = { from: req.body.from, text: req.body.text };
	  if(req.method == 'POST'){ client_length = req.body.client_length;}
      msgs.push(msg);
    });

  }

  res.end();

});

s.listen(3000);
