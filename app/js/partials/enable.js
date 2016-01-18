var $ = require('jquery');

function enabling () {
  (function opacityFix () {
	  $(".settings-position-extra").css('opacity', '1');
	  $(".settings-position-block__left").css('opacity', '1');
	  $(".settings-position-block__right").css('opacity', '1');
	  $(".settings-opacity__wrap").css('opacity', '1');
	  $(".downloadbutton").css('opacity', '1');
	  $(".clearbutton").css('opacity', '1');
  })();
  (function enableElements () {
	  $(".input-hide").addClass('working');
	  $(".extra-icon").addClass('working');
	  $(".settings-button").addClass('working-button');
	  $("#file_mark").addClass('working-input');
	  $(".settings-position-map__label").addClass('working');
	  $("#sliderOpacity").slider( "option", "disabled", false );
	  $('.position-control-value').prop("disabled", false);
  })();
}

module.exports = enabling;