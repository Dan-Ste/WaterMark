var $ = require('jquery');
require('jquery-ui/slider');

function opacitySlider() {
  //__Cache DOM
  var sliderOpacity = $("#sliderOpacity"),
      image = $(".viewport-inner__water-mark");
 //__Setting Slider Parameters
sliderOpacity.slider({
  min: 0,
  max: 100,
  value: 0,
  slide: function (event, ui) {
   //__Change Opacity Value in WaterMark Image
   image.css('opacity',(100 - sliderOpacity.slider("value")) / 100);
  }
 });
sliderOpacity.slider( "option", "disabled", true );
}
module.exports = opacitySlider;
