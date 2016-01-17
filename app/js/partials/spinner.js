var $ = require('jquery');

require('jquery-ui/slider');

function spinnerInit() {
    console.log('spinner');
    var spinnerX = $("#position-control-X").spinner(),
        spinnerY = $("#position-control-Y").spinner();
}

module.exports = spinnerInit;