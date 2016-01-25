var $ = require('jquery');

var pageLoad = $('.page-loading');

	function pageLoadFunc () {
		console.log('page download');
		$(document).ready(function(){
			pageLoad.css({opacity: 0, 'z-index': -1000});
		});
	}
	



module.exports = pageLoadFunc;

