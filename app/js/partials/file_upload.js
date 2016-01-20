var $ = require('jquery');
require('jquery-ui/jquery-ui');
require('blueimp-file-upload/js/jquery.fileupload');
var changeMode = require('./change-mode');
var positioning = require('./positioning');
var enable = require('./disabled.js');


function addlistenersForUploadFile() {

  $('#file_back').fileupload({
    dataType: 'json',
    url: 'php/actions/mainFileUpload.php',
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
              $('[name=file_back_name]').val(data.name);

              if('size' in data){
                $('.viewport-inner__water-mark img').css({
                  'width': data.size.width,
                  'height': data.size.height
                });
                changeMode();
                setTimeout(positioning,100);
              }
            }
        )
        .error(
          function (jqXHR, textStatus, errorThrown){
            alert('Что по пошло не так, презагрузите страничку и попробуйте снова.');
          }
        );
    }
  });

  $('#file_mark').fileupload({
    dataType: 'json',
    url: 'php/actions/markFileUpload.php',
    done: function (e,data) {
      console.log('Выполнено')
    },
    add: function (e,data) {
      data.submit()
        .success(
            function (data){
              console.log('загружено изображение ' , data.name);
              $('.viewport-inner__water-mark img').attr('src',data.path);
              $('[name=file_mark_name]').val(data.name);
              
              $('.viewport-inner__water-mark img').css({
                'width': data.size.width,
                'height': data.size.height
              });
              
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
            }
        )
        .error(
          function (jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
          }
        );
    }
  });
}

module.exports = addlistenersForUploadFile;
