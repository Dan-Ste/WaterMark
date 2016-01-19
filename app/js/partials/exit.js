var $ = require('jquery');

function addListenerForUnload () {
	window.onbeforeunload = function () {
		$.ajax({
			url: 'php/actions/exit.php',
			data: 'exit=true',
			method: 'GET',
			success: function (data) {
				console.log(data);
			},
			error: function (error,some,throwMessage) {
				console.log(error);
				alert(some);
			}
		});
	}
}

module.exports = addListenerForUnload;