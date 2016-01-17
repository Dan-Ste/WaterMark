var $ = require('jquery');
require('jquery-ui/jquery-ui');
require('blueimp-file-upload/js/jquery.fileupload');
var changeMode = require('./change-mode');
var positioning = require('./positioning');
var enable = require('./disabled.js');


function addlistenersForuploadFile() {

  $('#file_back').fileupload({
    dataType: 'json',
    url: window.location.href + 'php/actions/mainFileUpload.php',
    done: function (e,data) {
      console.log('Выполнено');
    },
    add: function (e,data) {
      data.submit()
        .success(
            function (data){
              console.log('загружено изображение ' + data.name);
              $('.viewport-inner__main-image').attr('src',data.path);

            }
        )
        .error(
          function (jqXHR, textStatus, errorThrown){
            alert(errorThrown);
          }
        );
    }
  });

  $('#file_mark').fileupload({
    dataType: 'json',
    url: window.location.href + 'php/actions/markFileUpload.php',
    done: function (e,data) {
      console.log('Выполнено')
    },
    add: function (e,data) {
      data.submit()
        .success(
            function (data){
              console.log('загружено изображение ' , data.name);
              $('.viewport-inner__water-mark img').attr('src',data.path);
              changeMode();
              positioning();
              $("#sliderOpacity").slider( "option", "disabled", false );
              $('.viewport-inner__water-mark img').css({
                'width': data.width,
                'height': data.height
              });
            }
        )
        .error(
          function (jqXHR, textStatus, errorThrown){
            alert(errorThrown);
          }
        );
    }
  });
}

module.exports = addlistenersForuploadFile;
