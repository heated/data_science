'use strict';

(function (root) {
  var DataSci = root.DataSci = (root.DataSci || {});

  var slider = DataSci.slider = function (slides) {
    this.slides = slides;
    this.currentSlide = 0;
  }

  slider.prototype = {
    goto: function(i) {
      this.currentSlide = i;
    },

    left: function() {
      if(this.currentSlide > 0) this.currentSlide--;
    },

    right: function() {
      if(this.currentSlide < 0) this.currentSlide--;
    }
  }
})(this);