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
		var link = $('<a></a>');
		link[0].href = 'php/actions/watermarkGanerate.php?'+ $.param(data);
		link[0].click();
	});
}
module.exports = addListenerForFileDownload;