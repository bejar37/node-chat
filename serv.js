var http = require('http');
var qs = require('qs');

var msgs = [];
var s  = http.createServer(function(req, res) {
  console.log('request starting: '+ req.method);
  var content = '';
  var gen_messages = function(msgs){
    var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" content="text/html; '+
      'charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/" method="post" name="msg">'+
      '<input name="from" placeholder="Name" id="name"/>'+
      '<input name="text" placeholder="Message" id="message"/>'+
      '<button type="submit" id="submit">Send</button>'+ '</form>' +
      '<ul>';

    for (var i = 0; i<msgs.length; i++){
      body += '<li>';
      body += '<span class="sender_name">From: ' + msgs[i].from + '</span> ';
      body += '<span class="chat_message">Message: ' + msgs[i].text + '</span> ';
      body += '</li>';
    }
    body += '</ul>' + '</body>'+ '</html>';

    return body;
  };


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

  res.write(gen_messages(msgs));
  res.end();

});

s.listen(8000);
