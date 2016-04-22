function api(hex){
	if(hex){
	console.log(hex);
}
	$.ajax({
		
		url:"http://localhost:8080/now/node.js?"+hex,
		//dataType: "jsonp",
		// jsonpCallback: "_testcb",
		cache: false,
		timeout: 5000,
		success: function(data) {	
		var colorsArray = data.split(',')
		


		for (var i = 0; i < colorsArray.length; i++) {
			var color = colorsArray[i]
			var bgstyle = 'background-color:'+color
			var divElm = '<div class="colordiv" style="'+bgstyle+'";">'+color+'</div>'
			$('#colorsDiv').append(divElm)
		};
			$('#results').html(colorsArray)
		
			console.log(colorsArray)
		console.log('done')
	},
	error: function(jqXHR, textStatus, errorThrown) {
	    alert('error is something like....' + textStatus + " " + errorThrown);
	}
})
}

$('#colorVal').on('change', function(){
	var hex = $('#colorVal').val()
	$('#hexText').val(hex)
	var hex = (hex.substring(1));
	api(hex)
})


 