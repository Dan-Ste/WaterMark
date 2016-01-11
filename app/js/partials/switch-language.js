$(document).ready(function(){
	var init = function() {
		_setUpListners();
	};
	

	var _setUpListners = function(){
		$('.language-link__рус').on('click', _switchRussian);
		$('.language-link__eng').on('click', _switchEnglish);
	};

	var _switchRussian = function(e) {
		e.preventDefault();
		$('.rus').css('display', 'block');
		$('.btn-rus').css('display', 'inline-block');
		$('.eng').css('display', 'none');
		$('.btn-eng').css('display', 'none');
	};

	var _switchEnglish = function(e) {
		e.preventDefault();
		$('.eng').css('display', 'block');
		$('.btn-eng').css('display', 'inline-block');
		$('.rus').css('display', 'none');
		$('.btn-rus').css('display', 'none');
	};

	init();
});