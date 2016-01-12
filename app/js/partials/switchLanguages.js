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

			var langArray = $('[data-lang]').data('lang');
			$('[data-lang]').text(langArray[0]);

			// $('.rus').css('display', 'block');
			// $('.btn-rus').css('display', 'inline-block');
			// $('.eng').css('display', 'none');
			// $('.btn-eng').css('display', 'none');
		};

		var _switchEnglish = function(e) {
			e.preventDefault();

			var langArray = $('[data-lang]').data('lang');
			$('[data-lang]').text(langArray[1]);

			// $('.eng').css('display', 'block');
			// $('.btn-eng').css('display', 'inline-block');
			// $('.rus').css('display', 'none');
			// $('.btn-rus').css('display', 'none');
		};

		init();

};

module.exports = switchLanguages;