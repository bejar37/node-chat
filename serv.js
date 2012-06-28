var http = require('http');
var qs = require('qs');

var s  = http.createServer(function(req, res) {
  var msgs = [];
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
      '<input name="message" placeholder="Message" id="message"/>'+
      '<button type="submit" id="submit">Send</button>';
    for (var i = 0; i<msgs.length; i++){
      body += '<div class="sender_name">' + msgs[i].from + '</div>';
      body += '<div class="chat_message">' + msgs[i].text + '</div>';
    }
    body +='</form>'+
      '</body>'+
      '</html>';

    return body;
  };


  if (req.method == 'POST') {
    req.on('data', function(data) {
      content += data;
      console.log(data);
    });

    req.on('end', function() {
      console.log('Body: ' + req.body);
      console.log('Content: ' + content);
      req.body = JSON.parse(content);
      msgs.push(req.body.msg);
      console.log(content);
    });

  }

  res.write(gen_messages(msgs));
  res.end();

});

s.listen(8000);
