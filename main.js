$(document).on('ready', function(){
	var length =0;
	var getFromServer = function(){
		$.ajax({
				url: 'http://'+window.location.hostname +':3000',
				type: 'GET',
				data: {client_length: length}
				}).done(function(data){
					data = JSON.parse(data);	
					length = data.server_length;
					$.each(data.messages, function(){
						$("#main-list").append('<li> Name: '+ this.from+'</li>');
						$("#main-list").append('<li> Message:'+ this.text+'</li><br />');

					});
		});
	};

	$("#send").on('click', function(){
			$.ajax({
				url: 'http://'+window.location.hostname + ':3000',
				dataType: 'json',
				type: 'POST',
				data: {

						from: $("#from").val(),
						text: $("#text").val(),
						client_length: length
					}
		});		
	});
	
	setInterval(getFromServer, 1000);
});



