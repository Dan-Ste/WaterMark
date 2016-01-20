var $ = require('jquery'),
	unloadEventListener = require('./exit');

function addListenerForFileDownload () {
	$('#download_file').on('click', function (e) {
		var mark = $('.viewport-inner__water-mark img'),
			data = {
			opacity: $(mark.parent()).css('opacity'),
			top: $(mark.parent()).css('top'),
			left: $(mark.parent()).css('left'),
			type:  $(mark.parent()).data('reg'),
			margin_bottom: mark.css('margin-bottom'),
			margin_right: mark.css('margin-right')
		},
		param = $.param(data);
		unloadEventListener.off();
		window.open('php/actions/watermarkGanerate.php?'+ param,'_self');
		setTimeout(unloadEventListener.on,0);
	});
}
module.exports = addListenerForFileDownload;