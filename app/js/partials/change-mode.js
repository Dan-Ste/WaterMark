var $ = require('jquery');
var tiling = require('./tiling');
var positioning = require('./positioning');

function changeModeModul() {
  //__Cache DOM
  var patternMapBlock = $('.settings-position-map-pattern-list'),
      oneMapInput = $('.settings-position-map-list__item').children('input'),
      controlWrapper = $('.settings-position-control'),
      firstInputMap = $('#input-map0'),
      heightViewMap =  $('.settings-position-map-pattern-vertical'),
      widthViewMap =  $('.settings-position-map-pattern-horizontal'),
      titleInput = $('.position-control-title'),
      waterMarkWrapper = $('.viewport-inner__water-mark'),
      waterMarkImg = $('.viewport-inner__water-mark img:first-child'),
      marginBottom = parseInt( $('.viewport-inner__water-mark-image').css('margin-bottom') ),
      marginRight = parseInt( $('.viewport-inner__water-mark-image').css('margin-right') );

 
  $(".settings-position-extra-list").on('click', _changeMode); // переключение режима ватермарки
  $(".extra-icon-one").on('click', _modOne); // режим одной марки
  $(".extra-icon-pattern").on('click', _modPattern); // меняем режим патерна


  function _modOne() { // режим одной марки
    waterMarkImg = $('.viewport-inner__water-mark img:first-child');
    patternMapBlock.css('display', 'none');
    firstInputMap.prop('checked',true);
    controlWrapper.removeClass('mode-pattern').addClass('mode-one');
    titleInput.removeClass('position-control-title__patern');

    waterMarkWrapper.draggable("option", "containment", ".view-port-inner__wrapper");
    waterMarkWrapper.width('auto');
    waterMarkWrapper.height('auto');
    waterMarkWrapper.css({
      'top': 0,
      'left': 0
    })
    waterMarkImg.siblings().remove();
    waterMarkImg.css({
      'margin-bottom': 0,
      'margin-right': 0
    })

     $('.viewport-inner__water-mark').data('reg','single');

     $($('.extra-icon-one').parent())
      .addClass('extra-item__active')
      .siblings()
      .removeClass('extra-item__active')

    positioning('.extra-item__active');
  }

  function _modPattern() { // меняем режим патерна

    patternMapBlock.css('display', 'block');
    oneMapInput.removeAttr('checked');
    controlWrapper.removeClass('mode-one').addClass('mode-pattern');
    heightViewMap.css('width', 0);
    widthViewMap.css('height', 0);
    titleInput.addClass('position-control-title__patern');

    waterMarkImg.siblings().remove();


    tiling();
    positioning();


    waterMarkWrapper.draggable("option", "containment", "none");

    waterMarkWrapper.css('left', 0);
    waterMarkWrapper.css('top', 0);

    waterMarkWrapper.data('reg',"tile");
    waterMarkImg = $('.viewport-inner__water-mark img:first-child');

    waterMarkWrapper.draggable({
      drag: function(event, ui) {
            var cssMarginBottom = parseInt(waterMarkImg.css('margin-bottom')),
                cssMarginRight = parseInt(waterMarkImg.css('margin-right'));
                
          ui.position.top = Math.max($('.view-port-inner__wrapper').height()-waterMarkWrapper.height(), Math.min(ui.position.top, cssMarginBottom) );
          ui.position.left = Math.max($('.view-port-inner__wrapper').width()-waterMarkWrapper.width(), Math.min(ui.position.left, cssMarginRight) );

      }
    });

  }

  function _changeMode(e) { // переключение режима ватермарки
    var buttonMode = $(e.target).parent('li'),
        buttonBlock = $(this);

      buttonBlock
        .find('.settings-position-extra-list__item')
        .removeClass('extra-item__active'); // удаляем активный класс со всех кнопок
      buttonMode
        .addClass('extra-item__active'); // добавляем активный класс

    waterMarkWrapper.css('left', 0);
    waterMarkWrapper.css('top', 0);
  }
  return {
    modOne : _modOne
  }

}

module.exports = changeModeModul;
