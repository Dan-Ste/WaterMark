var $ = require('jquery');
require('jquery-ui/draggable');
require('jquery-ui/spinner');

function init() {

  var currentAxis,
      step = 1,
      waterMarkImg = $('.viewport-inner__water-mark'),
      waterMarkImgWidth = waterMarkImg.width(),
      waterMarkImgHeight = waterMarkImg.height(),
      viewportInnerWidth = $('.view-port-inner__wrapper').width(),
      viewportInnerHeight = $('.view-port-inner__wrapper').height(),
      indicatorX = $('.mode-one #position-control-X'),
      indicatorY = $('.mode-one #position-control-Y'),
      oneMapInput = $('.settings-position-map-list__item').children('input'),
      maxX = viewportInnerWidth - waterMarkImgWidth,
      maxY = viewportInnerHeight - waterMarkImgHeight;

  function _deleteChecked () {
    // del active class
    oneMapInput.removeAttr('checked');
    $(".settings-position-extra-list")
      .find('.settings-position-extra-list__item')
      .removeClass('extra-item__active'); // удаляем активный класс со всех кнопок
  }

  indicatorX.spinner({
    min: 0,
    max: maxX,
    spin: function(event, ui) {
      waterMarkImg.css({'left': ui.value});
      _deleteChecked();
    }
  });

  indicatorY.spinner({
    min: 0,
    max: maxY,
    spin: function(event, ui) {
      waterMarkImg.css({'top': ui.value});
      _deleteChecked();
    }
  });

  indicatorX.spinner( "value", 0 );
  indicatorY.spinner( "value", 0 );

  // Prevent type not a numbers values
  function typeOnlyNumbers(event) {
    if ((event.which < 48 || event.which > 57) && event.which != 8) {
      return false;
    }
  }

  function changePositionsWithInput(event) {
    var max = event.data.max;
    var property = event.data.property;

    if($(this).val() > max) {
      waterMarkImg.css( property, max );
      _deleteChecked();
      $(this).val(max);
    } else if ($(this).val() < 0) {
      waterMarkImg.css( property, 0 );
      _deleteChecked();
      $(this).val(0);
    } else {
      waterMarkImg.css( property, parseInt($(this).val()) );
      _deleteChecked();
    }
  }

  function changeKeyPositions(event) {

  // Depend on chosen radio button we change key point position of the water mark
    switch(event.target.id) {
      case 'input-map0':
        waterMarkImg.css({'top': 0, 'left': 0});
        break;
      case 'input-map1':
        waterMarkImg.css({'top': 0, 'left': viewportInnerWidth/2 - waterMarkImgWidth/2});
        break;
      case 'input-map2':
        waterMarkImg.css({'top': 0, 'left': maxX});
        break;
      case 'input-map3':
        waterMarkImg.css({'top': viewportInnerHeight/2 - waterMarkImgHeight/2, 'left': 0});
        break;
      case 'input-map4':
        waterMarkImg.css({'top': viewportInnerHeight/2 - waterMarkImgHeight/2, 'left': viewportInnerWidth/2 - waterMarkImgWidth/2});
        break;
      case 'input-map5':
        waterMarkImg.css({'top': viewportInnerHeight/2 - waterMarkImgHeight/2, 'left': maxX});
        break;
      case 'input-map6':
        waterMarkImg.css({'top': maxY, 'left': 0});
        break;
      case 'input-map7':
        waterMarkImg.css({'top': maxY, 'left': viewportInnerWidth/2 - waterMarkImgWidth/2});
        break;
      case 'input-map8':
        waterMarkImg.css({'top': maxY, 'left': maxX});
        break;
    }
    indicatorY.val(parseInt(waterMarkImg.css('top')));
    indicatorX.val(parseInt(waterMarkImg.css('left')));
  }

  // Initialize jquery.draggable plugin on the water mark image, limit his draggable area
  $('.viewport-inner__water-mark').draggable({
    containment:".view-port-inner__wrapper",
    scroll:false,
    drag: function() {
      // and change indicator during drag event
      indicatorX.val( parseInt(waterMarkImg.css('left')) );
      indicatorY.val( parseInt(waterMarkImg.css('top')) );

      _deleteChecked();

    }
  });

  indicatorX.off('keyup');
  indicatorY.off('keyup');

  indicatorX.on('keypress', typeOnlyNumbers);
  indicatorX.on('keyup', {property: 'left', max: maxX}, changePositionsWithInput);
  indicatorY.on('keypress', typeOnlyNumbers);
  indicatorY.on('keyup', {property: 'top', max: maxY}, changePositionsWithInput);

  // Setup event listener on radio buttons, which change key points positioning of the water mark image
  $('.input-hide').on('click', changeKeyPositions);
}

module.exports = init;
