var $ = require('jquery');
require('jquery-ui/jquery-ui');
require('../../../dist/bower/blueimp-file-upload/js/jquery.fileupload');

function addlistenersForuploadFile() {

  $('#file_back').fileupload({
    dataType: 'json',
    url: 'http://localhost/ls/WaterMark/php/actions/mainFileUpload.php',
    done: function (e,data) {
       console.log(data.result);
    }
  });

  $('#file_mark').fileupload(
    {
    dataType: 'json',
    url: 'http://localhost/ls/WaterMark/php/actions/markFileUpload.php',
    done: function (e,data) {
       console.log(data.result);
    }
    }
  );

}


module.exports = addlistenersForuploadFile;