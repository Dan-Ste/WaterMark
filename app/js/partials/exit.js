var $ = require('jquery');

ListenerForUnload  = {
	on: function () {
		var that = this;
		$(window).on('beforeunload', function () {
			$.ajax({
				url: 'php/actions/exit.php',
				data: 'exit=true',
				method: 'GET',
				success: function (data) {
					console.log(data);
				}
			});
		});
	},
	off: function () {
		$(window).off('beforeunload');
	}
}

module.exports = ListenerForUnload;