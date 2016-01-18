var $ = require('jquery');
function addListenerForUnload () {
	$(window).on('unload', function (event) {
	$.ajax({
		url: 'php/actions/exit.php',
		data: 'exit=true',
		method: 'get',
		error: function (error) {
			console.log(error);
		}
	});
});	
}

module.exports = addListenerForUnload;