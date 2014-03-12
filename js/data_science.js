'use strict';

(function (root) {
  var App = root.App = (root.App || {});

  var controller = App.controller = function (description, data, initialCode) {
    this.description = description
    this.data = data;
    this.initialCode = initialCode;
    this.editor = $('#edit-area');
    this.results = $('#results');
    $('#submit').click(this.submit.bind(this));
    this.displayInfo();
  }

  controller.prototype = {
    displayInfo: function () {
      $('#desc').append(this.description);
      $('#data').text(JSON.stringify(this.data));
      this.editor.html(this.initialCode);
    },

    submit: function () {
      var data = this.data;
      this.results.text(eval(this.editor[0].value));
    }
  }
})(this);

$(function () {
  var data = [];
  for(var i = 0; i < 500; i++) {
    data.push(i);
  }

  var controller = new App.controller(
    "<br>The current data is about a set of numbers.<br>Please find the average of the set.",
    data,
    "var sum = data.reduce(function (sum, el) { \n  return sum + el; \n}); \n\n'Average: ' + sum / data.length;"
  );
});