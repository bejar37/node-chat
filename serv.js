var http = require('http');
var qs = require('qs');

var s  = http.createServer(function(req, res) {
  var msgs = [];
	req.content = "";
	var gen_messages = function(msgs){
		var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/" method="post">'+
		'<input placeholder="Name" id="name"/>'+
		'<input placeholder="Message" id="message"/>'+
		'<button type="submit" id="submit">Send</button>';
		for (var i = 0; i<msgs.length; i++){
			body += '<div class="sender_name">' + msgs.from + '</div>';
			body += '<div class="chat_message">' + msgs.text + '</div>';
		}
		body +='</form>'+
		'</body>'+
		'</html>';

		return body;
	};


if (req.method == 'GET') {
					res.write(gen_messages(msgs));
	}
if (req.method == 'POST') {
				req.addListener('data', function(data) {
												req.content += data;
												});

				req.addListener('end', function(data) {
												req.content = qs.parse(req.content);
												msgs.push(req.content.msg)
												});

}

res.end();

});

s.listen(8000);
