var $ = require('jquery');

function share() {

	var init = function() {

		_setUpListeners();

	};

	var _setUpListeners = function() {

		$('#fb').on('click', _shareFb);
		$('#vk').on('click', _shareVk);
		$('#tw').on('click', _shareTw);

	};

	var pageUrl = document.location.href,
			pageTitle = document.title,
			descText = "Этот вотермарк сделан при помощи бесплатного онлайн генератора водяных знаков.",
			sharePic = $('.viewport-inner__main-image').attr('src');
	
	var _shareFb = function(event) {

		event.preventDefault();

		var shareUrl = 'http://www.facebook.com/sharer.php?s=100';

		shareUrl += '&p[title]=' + encodeURIComponent(pageTitle);
		shareUrl += '&p[summary]=' + encodeURIComponent(descText);
		shareUrl += '&p[url]=' + encodeURIComponent(pageUrl);
		shareUrl += '&p[images][0]=' + encodeURIComponent(sharePic);
		popup(shareUrl);

	};

	var _shareVk = function(event) {

		event.preventDefault();

		var shareUrl = 'http://vk.com/share.php?';
		shareUrl += 'url=' + encodeURIComponent(pageUrl);
		shareUrl += '&title=' + encodeURIComponent(pageTitle);
		shareUrl += '&description=' + encodeURIComponent(descText);
		shareUrl += '&image=' + encodeURIComponent(sharePic);
		shareUrl += '&noparse=true';
		popup(shareUrl);

	};
	
	var _shareTw = function(event) {

		event.preventDefault();

		var shareUrl = 'http://twitter.com/share?';

		shareUrl += 'text=' + encodeURIComponent(pageTitle);
		shareUrl += '&url=' + encodeURIComponent(pageUrl);
		shareUrl += '&counturl=' + encodeURIComponent(shareUrl);
		popup(shareUrl);

	};

	function popup(shareUrl) {
		var shareWindowWidth = 650,
				shareWindowHeight = 500,
				marginLeft = screen.availWidth / 2 - shareWindowWidth / 2,
				marginTop = screen.availHeight / 2 - shareWindowHeight / 2;
		window.open(shareUrl, '_blank', 'toolbar=0,status=0,width=650,height=500,left=' + marginLeft + ', top=' + marginTop);
	}


	init();

};

module.exports = share;