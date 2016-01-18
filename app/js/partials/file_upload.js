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
              $(".settings-inputs-block").css('opacity', '1');
              $(".clearbutton").css('opacity', '1');
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
              $(".settings-position-extra").css('opacity', '1');
              $(".settings-position-block__left").css('opacity', '1');
              $(".settings-position-block__right").css('opacity', '1');
              $(".settings-opacity__wrap").css('opacity', '1');
              $(".downloadbutton").css('opacity', '1');
              $(".input-hide").addClass('working');
              $(".extra-icon").addClass('working');
              $(".settings-button").addClass('working-button');
               $("#file_mark").addClass('working-input');
              $(".settings-position-map__label").addClass('working');
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
