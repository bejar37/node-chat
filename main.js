$(document).on('ready', function(){

	$("#send").on('click', function(){
			$.post({
				url: window.location.hostname + ':8000',
				dataType: 'json',
				data: {

						from: $("#from").val(),
						text: $("#text").val()
					}
		});
			$.get({
				url: window.location.hostname +':8000',
				}).done(function(data){
					$("#messages").html(data);
		});
	});
});



