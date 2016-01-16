var $ = require('jquery');
require('jquery-ui/draggable');

  var currentAxis,
  step = 1,
  waterMarkImg = $('.viewport-inner__water-mark'),
  waterMarkImgWidth = waterMarkImg.width(),
  waterMarkImgHeight = waterMarkImg.height(),
  viewportInnerWidth = $('.view-port-inner__wrapper').width(),
  viewportInnerHeight = $('.view-port-inner__wrapper').height(),
  triggerXUp = $('.position-control-X .trigger__up'),
  triggerXDown = $('.position-control-X .trigger__down'),
  triggerYUp = $('.position-control-Y .trigger__up'),
  triggerYDown = $('.position-control-Y .trigger__down'),
  indicatorX = $('#position-control-X'),
  indicatorY = $('#position-control-Y'),
  maxX = viewportInnerWidth - waterMarkImgWidth,
  maxY = viewportInnerHeight - waterMarkImgHeight;

  console.log('waterMarkImgWidth: ' + waterMarkImgWidth, 'waterMarkImgHeight: ' + waterMarkImgHeight,
              'maxX: ' + maxX, 'maxY: ' + maxY);

function changePositionsWithTrigger(event) {
  currentCoord = parseInt(waterMarkImg.css(event.data.property));
  var property = event.data.property;
  var direction = event.data.direction;

  if(property === 'left') {
    currentCoord = direction === 'left' ? currentCoord + step : currentCoord - step;
    // Check if water mark falls to the viewport of our main image
    if( currentCoord >= 0 && currentCoord <= maxX ) {
      indicatorX.val(currentCoord);
      waterMarkImg.css({'left': currentCoord});
    }
  } else if (property === 'top') {
    currentCoord = direction === 'up' ? currentCoord - step  : currentCoord + step;
    if( currentCoord >= 0 && currentCoord <= maxY ) {
      indicatorY.val(currentCoord);
      waterMarkImg.css({'top': currentCoord});
    }
  }
}

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
    $(this).val(max);
  } else if ($(this).val() < 0) {
    waterMarkImg.css( property, 0 );
    $(this).val(0);
  } else {
    waterMarkImg.css( property, parseInt($(this).val()) );
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
  indicatorX.val(parseInt(waterMarkImg.css('top')));
  indicatorY.val(parseInt(waterMarkImg.css('left')));
}

function init() {
  // Initialize jquery.draggable plugin on the water mark image, limit his draggable area
  $('.viewport-inner__water-mark').draggable({
    containment:".view-port-inner__wrapper",
    scroll:false,
    drag: function() {
      // and change indicator during drag event
      indicatorX.val( parseInt(waterMarkImg.css('left')) );
      indicatorY.val( parseInt(waterMarkImg.css('top')) );
    },
  });

  // Setup event listiners on trigger buttons which control water mark image positioning.
  // We pass parameters to the changePositionsWithTrigger function with the necessary information
  triggerXUp.on('click', {property: 'left', direction: 'left'},  changePositionsWithTrigger);
  triggerXDown.on('click', {property: 'left', direction: 'right'},  changePositionsWithTrigger);
  triggerYUp.on('click', {property: 'top', direction: 'up'},  changePositionsWithTrigger);
  triggerYDown.on('click', {property: 'top', direction: 'down'},  changePositionsWithTrigger);

  indicatorX.on('keypress', typeOnlyNumbers);
  indicatorX.on('keyup', {property: 'left', max: maxX}, changePositionsWithInput);
  indicatorY.on('keypress', typeOnlyNumbers);
  indicatorY.on('keyup', {property: 'top', max: maxY}, changePositionsWithInput);

  // Setup event listener on radio buttons, which change key points positioning of the water mark image
  $('.input-hide').on('click', changeKeyPositions);
}

module.exports = init;
