var $ = require('jquery');
var tiling = require('./tiling');

function changeModeModul() {
  //__Cache DOM
  var patternMapBlock = $('.settings-position-map-pattern-list'),
      oneMapInput = $('.settings-position-map-list__item').children('input'),
      imputX = $('#position-control-X'),
      imputY = $('#position-control-Y'),
      firstInputMap = $('#input-map0'),
      heightViewMap =  $('.settings-position-map-pattern-vertical'),
      widthViewMap =  $('.settings-position-map-pattern-horizontal'),
      titleInput = $('.position-control-title'),
      waterMarkWrapper = $('.viewport-inner__water-mark'),
      waterMarkImg = $('.viewport-inner__water-mark img:first-child');


  $(".settings-position-extra-list").on('click', _changeMode); // переключение режима ватермарки
  $(".extra-icon-one").on('click', _modOne); // режим одной марки
  $(".extra-icon-pattern").on('click', _modPattern); // меняем режим патерна


  function _modOne() { // режим одной марки
    patternMapBlock.css('display', 'none');
    firstInputMap.prop('checked',true);
    imputX.val('0');
    imputY.val('0');
    titleInput.removeClass('position-control-title__patern');

    waterMarkWrapper.draggable("option", "containment", ".view-port-inner__wrapper");
    waterMarkWrapper.width('auto');
    waterMarkWrapper.height('auto');

    waterMarkImg.siblings().remove();
  }

  function _modPattern() { // меняем режим патерна
    patternMapBlock.css('display', 'block');
    oneMapInput.removeAttr('checked');
    imputX.val('12');
    imputY.val('12');
    heightViewMap.css('width', imputY.val());
    widthViewMap.css('height',imputX.val());
    titleInput.addClass('position-control-title__patern');

    tiling();

    waterMarkWrapper.draggable("option", "containment", "window");

    waterMarkWrapper.css('left', 0);
    waterMarkWrapper.css('top', 0);
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
}

module.exports = changeModeModul;
