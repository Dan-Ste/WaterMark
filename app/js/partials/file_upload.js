var $ = require('jquery');
require('jquery-ui/jquery-ui');
require('blueimp-file-upload/js/jquery.fileupload');
var changeMode = require('./change-mode');
var positioning = require('./positioning');
var enable = require('./disabled.js');


function addlistenersForUploadFile() {
    var imageMain =  $('.viewport-inner__main-image'),
        imageMark = $('.viewport-inner__water-mark img'),
        imageLoad = $('.peeek-loading');

  $('#file_back').fileupload({
    dataType: 'json',
    url: 'php/actions/mainFileUpload.php',
    done: function (e,data) {
      console.log('Выполнено');
      imageLoad.css({opacity: 1, 'z-index': 100});
      imageMain.css('opacity', '0');
    },
    add: function (e,data) {
      data.submit()
        .success(
            function (data){
              console.log('загружено изображение ' + data.name);
              imageMain.attr('src',data.path);


                imageMain.load(
                    function() {
                        setTimeout(function(){
                        imageMain.animate({opacity: 1}, 500 );
                        $(".settings-inputs-block").css('opacity', '1');
                        $('#file_mark').removeAttr("disabled");
                        $('[name=file_back_name]').val(data.name);
                        imageLoad.css({opacity: 0, 'z-index': -100}, 500 );
                        },
                        1000);
                    }
                );
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
      console.log('Выполнено');
      imageLoad.css({opacity: 1, 'z-index': 100});
      imageMark.css('opacity', '0');
    },
    add: function (e,data) {
      data.submit()
        .success(
            function (data){
              console.log('загружено изображение ' , data.name);
              imageMark.attr('src',data.path);
              imageMark.css({
                'width': data.width,
                'height': data.height
              });

                imageMark.load(
                    function() {
                        setTimeout(function(){
                                imageMark.animate({opacity: 1}, 500 );
                                $('[name=file_mark_name]').val(data.name);
                                imageLoad.animate({opacity: 0, 'z-index': -100}, 500 );
                            },
                            1000);
                    }
                );

                changeMode();
              positioning();
              $("#sliderOpacity").slider( "option", "disabled", false );
              $('.clearbutton').removeAttr("disabled");
              $('#download_file').removeAttr("disabled");
              $('#file_mark').removeAttr("disabled");
              $('#position-control-Y').removeAttr("disabled");
              $('#position-control-X').removeAttr("disabled");
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
            console.log(errorThrown);
          }
        );
    }
  });
}

module.exports = addlistenersForUploadFile;
