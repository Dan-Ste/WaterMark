var $ = require('jquery');
require('jquery-ui/slider');

function opacitySlider() {
  //__Cache DOM
  var sliderOpacity = $("#sliderOpacity"),
      image = $(".viewport-inner__water-mark");
 //__Setting Slider Parameters
sliderOpacity.slider({
  min: 0,
  max: 100,
  value: 50,
  slide: function (event, ui) {
   //__Change Opacity Value in WaterMark Image
   image.css('opacity',(100 - sliderOpacity.slider("value")) / 100);
  }
 });
sliderOpacity.slider( "option", "disabled", true );
}
module.exports = opacitySlider;
/*var $ = require('jquery');
require('jquery-ui/slider');

var opacitySlider = (function () {
	"use strict";
//__Cache DOM
	var slider = $("#sliderOpacity");
	var img = $('.viewport-inner__water-mark');
//__Module Initialization
	function init (startValue) {
		_setUpListeners(startValue);
	}
//__Event Listening Start
	function _setUpListeners (startValue) {
		_startVal(startValue);
		_sliderParams(startValue);
		slider.on("slide",_changeValue);
		_disableSlider();
	}
//__Set The starting Opacity for Image
	function _startVal (startValue) {
		img.css('opacity',startValue/100);
	}
//__Setting Slider Parameters
	function _sliderParams (startValue) {
		slider.slider({
			min: 0,
			max: 100,
			value: startValue
		});
	}
//__Change Opacity Value in WaterMark Image
	function _changeValue (event, ui) {
		var newVal = ui.value / 100;
		img.css('opacity', newVal);
	}
//Disabling
	function _disableSlider () {
		slider.slider( "option", "disabled", true );
	}
//__Public Methods
	return {
		init : init
	}
}());

module.exports = opacitySlider.init(55);
*/