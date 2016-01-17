var $ = require('jquery');

function init() {

  var element = $('.viewport-inner__water-mark-image'),
      wrapper = $('.view-port-inner__wrapper'),
      wrapperWidth = wrapper.width(),
      wrapperHeight = wrapper.height(),
      watermarkWidth = element.width(),
      watermarkHeight = element.height(),
      watermarkWrapper = $('.viewport-inner__water-mark'),
      indicatorX = $('.mode-pattern #position-control-X'),
      indicatorY = $('.mode-pattern #position-control-Y'),
      heightViewMap =  $('.settings-position-map-pattern-vertical'),
      widthViewMap =  $('.settings-position-map-pattern-horizontal'),
      countWidth = Math.round(wrapperWidth / watermarkWidth),
      countHeight = Math.round(wrapperHeight / watermarkHeight),
      maxGutterX = wrapperWidth - watermarkWidth,
      maxGutterY = wrapperHeight - watermarkHeight,
      i = 0,
      j = 0;

  indicatorX.spinner({
    min: 0,
    max: maxGutterY,
    spin: function(event, ui) {
      watermarkWrapper.height(countHeight * (watermarkHeight + ui.value));
      widthViewMap.css('height', ui.value);
      $('.viewport-inner__water-mark-image').css({'margin-bottom': ui.value})
    }
  });

  indicatorY.spinner({
    min: 0,
    max: maxGutterX,
    spin: function(event, ui) {
      watermarkWrapper.width(countWidth * (watermarkWidth + ui.value));
      heightViewMap.css('width', ui.value);
      $('.viewport-inner__water-mark-image').css({'margin-right': ui.value})
    }
  });

  indicatorX.spinner( "value", 0 );
  indicatorY.spinner( "value", 0 );

  function createTiling() {
    watermarkWrapper.width(countWidth * (watermarkWidth + indicatorX.spinner('value') ));
    watermarkWrapper.height(countHeight * (watermarkHeight + indicatorY.spinner('value') ));

    for(i, j = countWidth + countHeight; i < j; i++) {
      clone = element.clone();

      watermarkWrapper.append(clone);
    }
  }

  createTiling();

  function changeGutterWithInput(event) {
    var max = event.data.max;
    var axis = event.data.axis;
    if(axis === 'Y') {
      if($(this).val() > max) {
        watermarkWrapper.height(countHeight * (watermarkHeight + max));
        widthViewMap.css('height', max);
        $('.viewport-inner__water-mark-image').css({'margin-bottom': max})
        $(this).val(max);
      } else if ($(this).val() < 0) {
        watermarkWrapper.height(countHeight * watermarkHeight);
        widthViewMap.css('height', 0);
        $('.viewport-inner__water-mark-image').css({'margin-bottom': 0})
        $(this).val(0);
      } else {
        watermarkWrapper.height(countHeight * (watermarkHeight + $(this).val()));
        $('.viewport-inner__water-mark-image').css({ 'margin-bottom': $(this).val() });
        widthViewMap.css('height', $(this).val());
      }
    } else if(axis === 'X') {
      if($(this).val() > max) {
        watermarkWrapper.width(countWidth * (watermarkWidth + max));
        heightViewMap.css('width', max);
        $('.viewport-inner__water-mark-image').css({'margin-right': max})
        $(this).val(max);
      } else if ($(this).val() < 0) {
        watermarkWrapper.width(countWidth * watermarkWidth);
        heightViewMap.css('width', 0);
        $('.viewport-inner__water-mark-image').css({'margin-right': 0})
        $(this).val(0);
      } else {
        watermarkWrapper.width(countWidth * (watermarkWidth + $(this).val()));
        $('.viewport-inner__water-mark-image').css({ 'margin-right': $(this).val() });
        heightViewMap.css('width', $(this).val());
      }
    }
  }

  indicatorX.off('keyup');
  indicatorY.off('keyup');

  indicatorX.on('keyup', {axis: 'Y',  max: maxGutterY}, changeGutterWithInput);
  indicatorY.on('keyup', {axis: 'X', max: maxGutterX}, changeGutterWithInput);

}

module.exports = init;
