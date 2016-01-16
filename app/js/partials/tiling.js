var $ = require('jquery');


function createTiling() {
  var element = $('.viewport-inner__water-mark-image'),
      wrapper = $('.view-port-inner__wrapper'),
      wrapperWidth = wrapper.width(),
      wrapperHeight = wrapper.height(),
      watermarkWidth = element.width(),
      watermarkHeight = element.height(),
      watermarkWrapper = $('.viewport-inner__water-mark'),
      gutterLeft = 0,
      gutterBottom = 0,
      i = 0,
      j = 0;

  var countWidth = Math.round(wrapperWidth / watermarkWidth);
  var countHeight = Math.round(wrapperHeight / watermarkHeight);


  watermarkWrapper.width(countWidth * (watermarkWidth + gutterLeft));
  watermarkWrapper.height(countHeight * (watermarkHeight + gutterBottom));

  for(i, j = countWidth + countHeight; i < j; i++) {
    clone = element.clone();

    watermarkWrapper.append(clone);
  }
}

module.exports = createTiling;
