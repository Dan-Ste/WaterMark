var $ = require('jquery');
	//Cache DOM
	var bgInput = $('#file_back');
	var markInput = $('#file_mark');

	function ableMarkInput () {
		//Making WaterMark Input able for User
		$('#file_mark').prop("disabled", false);
	}
	
	var init = {
		ableMarkInput : ableMarkInput
	}


module.exports = init;

