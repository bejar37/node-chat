$(document).on('ready', function(){

	$("#send").on('click', function(){
		$.ajax({
				url: window.location.hostname + ':3000',
				dataType: 'jsonp',
				method: 'POST',
				data: {

						from: $("#from").val(),
						text: $("#text").val()
					}
		});
			$.get({
				url: window.location.hostname +':3000',
				}).done(function(data){
					$("#messages").html(data);
		});
	});
});



