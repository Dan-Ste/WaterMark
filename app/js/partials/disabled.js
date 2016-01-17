var $ = require('jquery');
	//Cache DOM
	var bgInput = $('#file_back');
	var markInput = $('#file_mark');

	function ableMarkInput () {
		//Making WaterMark Input able for User
		$('#file_mark').prop("disabled", false);
		//Making User able to clear bg image
		$('#clearbutton').prop("disabled", false);
	}
	
	var init = {
		ableMarkInput : ableMarkInput
	}


module.exports = init;

