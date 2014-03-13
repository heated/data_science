'use strict';

(function (root) {
  var DataSci = root.DataSci = (root.DataSci || {});

  var controller = DataSci.controller = function (data, initialCode, slides) {
    this.data = data;
    this.initialCode = initialCode;
    this.output = $('#output');
    $('#run').click(this.run.bind(this));
    this.setupSlides(slides);
    this.setupEditor();
    this.displayInfo();
    this.run();
  }

  controller.prototype = {
    displayInfo: function () {
      $('#data').text(JSON.stringify(this.data));
      this.editor.setValue(this.initialCode);
    },

    run: function () {
      var data = this.data;
      this.output.text(eval(this.editor.getValue()));
    },

    setupEditor: function () {
      var editor = this.editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
      var session = editor.getSession();
        session.setMode("ace/mode/javascript");
        session.setTabSize(2);
        session.setUseSoftTabs(true);
      editor.commands.addCommand({
        bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
        exec: this.run.bind(this)
      });
    },

    setupSlides: function (slideData) {
      var slides = $('#slides-inner');
      slideData.forEach(function (slide) {
        var newSlide = $('<div class="item">')
        if(slides.html() == "") {
          newSlide.addClass('active');
        }

        newSlide.html(slide);
        slides.append(newSlide);
      });

      $('#total-slides').text(slideData.length);
    }
  }
})(this);

$(function () {
  var data = [];
  for(var i = 0; i < 500; i++) {
    data.push(i);
  }

  var initialCode = "data.join('\\n');";

  var slides = [
    '<div class="well">hi</div>',
    '<div class="well well-sm">small well!</div>',
    '<img src="http://placekitten.com/550/300">'
  ];

  var controller = new DataSci.controller(
    data,
    initialCode,
    slides
  );

  $('#run').tooltip();

  $('#slides').carousel({
    interval: false,
    wrap: false
  });

  var counter = $('#slide-count');

  $('#slides').on('slide.bs.carousel', function (event) {
    var dir = (event.direction == 'left') ? 1 : -1;
    counter.text(parseInt(counter.text()) + dir);
  });

});