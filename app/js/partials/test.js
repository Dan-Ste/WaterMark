var $ = require('jquery');

function testFunction() {
  $('body').addClass('test');
  console.log('prove test');
}

module.exports = testFunction;
