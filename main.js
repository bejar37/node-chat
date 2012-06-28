$(document).on('ready', function(){

	$("#send").on('click', function(){
			$.ajax({
				url: window.location.hostname + ':8000',
				type: 'POST',
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



};
