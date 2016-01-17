var $ = require('jquery');

function switchLanguages() {

	var init = function() {
			_setUpListners();
		};
		
	var _setUpListners = function(){
		$('.language-link__рус').on('click', _switchRussian);
		$('.language-link__eng').on('click', _switchEnglish);
	};

	var _switchRussian = function(e) {
		e.preventDefault();

		$('[data-lang]').each(function() {

			var langArray = $(this).data('lang');
			$(this).text(langArray[0]);
			
		});
	
	};

	var _switchEnglish = function(e) {
		e.preventDefault();

		$('[data-lang]').each(function() {

			var langArray = $(this).data('lang');
			$(this).text(langArray[1]);
			
		});

	};

	init();

};

module.exports = switchLanguages;