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
      countWidth = Math.ceil(wrapperWidth / watermarkWidth),
      countHeight = Math.ceil(wrapperHeight / watermarkHeight),
      maxGutterX = wrapperWidth - watermarkWidth,
      maxGutterY = wrapperHeight - watermarkHeight,
      i = 0,
      j = 0;

  indicatorX.spinner({
    min: 0,
    max: maxGutterY,
    spin: function(event, ui) {
      watermarkWrapper.height((countHeight+1) * (watermarkHeight + ui.value));
      widthViewMap.css('height', ui.value);
      $('.viewport-inner__water-mark-image').css({'margin-bottom': ui.value})
    }
  });

  indicatorY.spinner({
    min: 0,
    max: maxGutterX,
    spin: function(event, ui) {
      watermarkWrapper.width((countWidth+1) * (watermarkWidth + ui.value));
    heightViewMap.css('width', ui.value);
    $('.viewport-inner__water-mark-image').css({'margin-right': ui.value})
  }
});

indicatorX.spinner( "value", 15 );
indicatorY.spinner( "value", 15 );

  function createTiling() {
    watermarkWrapper.width((countWidth+1) * (watermarkWidth + indicatorX.spinner('value') ));
    watermarkWrapper.height((countHeight+1) * (watermarkHeight + indicatorY.spinner('value') ));
    var fragment = document.createDocumentFragment();    

    for(i=0, j = (countWidth+1) * (countHeight+1) ; i < j; i++) {
      watermarkWrapper.append(element.clone());
    }
    
    $('.viewport-inner__water-mark-image').css({
      'margin-bottom': '15px',
      'margin-right': '15px'
    })
  }

  createTiling();

  function changeGutterWithInput(event) {
    var max = event.data.max;
    var axis = event.data.axis;
    var wrapper = $('.viewport-inner__water-mark');
    var watermark = $('.viewport-inner__water-mark-image');

    if(axis === 'Y') {
      if(indicatorX.spinner('value') > max) {

        wrapper.height(countHeight * (watermarkHeight + max));
        widthViewMap.css('height', max);    
        watermark.css({'margin-bottom': max})
        indicatorX.spinner('value', max);

      } else if (indicatorX.spinner('value') < 0) {
        wrapper.height(countHeight * watermarkHeight);
        widthViewMap.css('height', 0);
        watermark.css({'margin-bottom': 0})
        indicatorX.spinner('value', 0);

      } else {
        wrapper.height(countHeight * (watermarkHeight + indicatorX.spinner('value')));
        watermark.css({ 'margin-bottom': indicatorX.spinner('value') });
        widthViewMap.css('height', indicatorX.spinner('value'));
      }
    } else if(axis === 'X') {
      if(indicatorY.spinner('value') > max) {
        wrapper.width(countWidth * (watermarkWidth + max));
        heightViewMap.css('width', max);
        watermark.css({'margin-right': max})
        indicatorY.spinner('value', max);

      } else if (indicatorY.spinner('value') < 0) {
        wrapper.width(countWidth * watermarkWidth);
        heightViewMap.css('width', 0);
        watermark.css({'margin-right': 0})
        indicatorY.spinner('value', 0);

      } else {
        wrapper.width(countWidth * (watermarkWidth + indicatorY.spinner('value')));
        watermark.css({ 'margin-right': indicatorY.spinner('value') });
        heightViewMap.css('width', indicatorY.spinner('value'));
      }
    }
  }

  indicatorX.off('keyup');
  indicatorY.off('keyup');

  indicatorX.on('keyup', {axis: 'Y',  max: maxGutterY}, changeGutterWithInput);
  indicatorY.on('keyup', {axis: 'X', max: maxGutterX}, changeGutterWithInput);

}

module.exports = init;
