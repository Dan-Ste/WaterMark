var $ = require('jquery');
require('jquery-ui/jquery-ui');
require('blueimp-file-upload/js/jquery.fileupload');

function addlistenersForuploadFile() {

  $('#file_back').fileupload({
    dataType: 'json',
    url: window.location.href + 'php/actions/mainFileUpload.php',
    done: function (e,data) {
       console.log(data.result);
    }
  });

  $('#file_mark').fileupload(
    {
    dataType: 'json',
    url: window.location.href + 'php/actions/markFileUpload.php',
    done: function (e,data) {
       console.log(data.result);
    }
    }
  );
  console.log(window.location.href);
}

module.exports = addlistenersForuploadFile;
