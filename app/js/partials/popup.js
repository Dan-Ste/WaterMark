var $ = require('jquery');

popupModule =  (function () {
	var popup = $('.popup');
	function setUpListeners (){
		$('.popup__close').on('click', function () {
			popup.fadeOut();
		})
	}
	return {
		show: function () {
			popup.css({
				'z-index':'100',
				'display': 'none'
			});
			popup.fadeIn(500);
			setUpListeners();
			$('.viewport-loading').css({opacity: 0, 'z-index': -100}, 500);
		}
	}
})();
module.exports = popupModule;