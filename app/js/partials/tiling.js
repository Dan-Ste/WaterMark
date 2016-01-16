var $ = require('jquery');

function init() {

  var element = $('.viewport-inner__water-mark-image'),
      wrapper = $('.view-port-inner__wrapper'),
      wrapperWidth = wrapper.width(),
      wrapperHeight = wrapper.height(),
      watermarkWidth = element.width(),
      watermarkHeight = element.height(),
      watermarkWrapper = $('.viewport-inner__water-mark'),
      triggerXUp = $('.mode-pattern .position-control-X .trigger__up'),
      triggerXDown = $('.mode-pattern .position-control-X .trigger__down'),
      triggerYUp = $('.mode-pattern .position-control-Y .trigger__up'),
      triggerYDown = $('.mode-pattern .position-control-Y .trigger__down'),
      indicatorX = $('.mode-pattern #position-control-X'),
      indicatorY = $('.mode-pattern #position-control-Y'),
      heightViewMap =  $('.settings-position-map-pattern-vertical'),
      widthViewMap =  $('.settings-position-map-pattern-horizontal'),
      countWidth = Math.round(wrapperWidth / watermarkWidth),
      countHeight = Math.round(wrapperHeight / watermarkHeight),
      i = 0,
      j = 0;

  function createTiling() {
    watermarkWrapper.width(countWidth * (watermarkWidth + marginRight));
    watermarkWrapper.height(countHeight * (watermarkHeight + marginBottom));

    for(i, j = countWidth + countHeight; i < j; i++) {
      clone = element.clone();

      watermarkWrapper.append(clone);
    }
  }

  var marginBottom = parseInt( $('.viewport-inner__water-mark-image').css('margin-bottom') );
  var marginRight = parseInt( $('.viewport-inner__water-mark-image').css('margin-right') );

  createTiling();

  console.log(marginBottom, marginRight)
  indicatorX.val( marginBottom );
  indicatorY.val( marginRight );

  triggerXUp.off('click');
  triggerXDown.off('click');
  triggerYUp.off('click');
  triggerYDown.off('click');


  triggerXUp.on('click', function() {
    $('.viewport-inner__water-mark-image').css({'margin-bottom': ++marginBottom})
    indicatorX.val(marginBottom);
    watermarkWrapper.height(countHeight * (watermarkHeight + marginBottom));
    widthViewMap.css('height', indicatorX.val());
  });

  triggerXDown.on('click', function() {
    $('.viewport-inner__water-mark-image').css({'margin-bottom': --marginBottom})
    indicatorX.val(marginBottom);
    watermarkWrapper.height(countHeight * (watermarkHeight - marginBottom));
    widthViewMap.css('height', indicatorX.val());
  });

  triggerYUp.on('click', function() {
    $('.viewport-inner__water-mark-image').css({'margin-right': ++marginRight})
    indicatorY.val(marginRight);
    watermarkWrapper.width(countWidth * (watermarkWidth + marginRight));
    heightViewMap.css('width', indicatorY.val());
  });

  triggerYDown.on('click', function() {
    $('.viewport-inner__water-mark-image').css({'margin-right': --marginRight})
    indicatorY.val(marginRight);
    watermarkWrapper.width(countWidth * (watermarkWidth - marginRight));
    heightViewMap.css('width', indicatorY.val());
  });


  // triggerXDown.on('click', {property: 'left', direction: 'right'},  changePositionsWithTrigger);
  // triggerYUp.on('click', {property: 'top', direction: 'up'},  changePositionsWithTrigger);
  // triggerYDown.on('click', {property: 'top', direction: 'down'},  changePositionsWithTrigger);
}

module.exports = init;
