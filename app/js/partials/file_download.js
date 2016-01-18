var $ = require('jquery');

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
		};
		window.open('php/actions/watermarkGanerate.php?'+ $.param(data),'_self');
	});
}
module.exports = addListenerForFileDownload;