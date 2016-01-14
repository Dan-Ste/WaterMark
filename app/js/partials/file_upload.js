var $ = require('jquery');
require('jquery-ui/jquery-ui');
require('blueimp-file-upload/js/jquery.fileupload');

function addlistenersForuploadFile() {

  $('#file_back').fileupload({
    dataType: 'json',
    url: window.location.href + 'php/actions/mainFileUpload.php',
    done: function (e,data) {
       $('.viewport-inner__main-image').attr('src',data.result);
    }
  });

  $('#file_mark').fileupload({
    dataType: 'json',
    url: window.location.href + 'php/actions/markFileUpload.php',
    done: function (e,data) {
      $.each(data.result, function (varName,val) {
        if(varName == 'path'){
          $('.viewport-inner__water-mark img').attr('src',val);
        }else{
          $('.viewport-inner__water-mark img').css(varName,val);
        }
      });
    }
  });
}

module.exports = addlistenersForuploadFile;
