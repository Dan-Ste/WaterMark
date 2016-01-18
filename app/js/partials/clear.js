function clear () {

		var $ = require('jquery');
		$('.clearbutton').on('click', _clearButton);

		function _clearButton () {
			require('./positioning');
			require('./opacity-slider')();
			var changeMode = require('./change-mode')();
	    $('#position-control-X').spinner('value', 0);
	    $('#position-control-Y').spinner('value', 0);
	    $('.viewport-inner__water-mark').css({
	    	top: '0',
	    	left: '0',
	    	opacity: '1'
	    });
	    $("#sliderOpacity").slider({value: 0});
	    changeMode.modOne();
		}
}

module.exports = clear;
