'use strict';

(function (root) {
  var App = root.App = (root.App || {});

  var controller = App.controller = function (description, data) {
    this.description = description
    this.data = data;
    this.editor = $('#edit-area');
    this.results = $('#results');
    $('#submit').click(this.submit.bind(this));
    this.displayInfo();
  }

  controller.prototype = {
    displayInfo: function () {
      $('#desc').append(this.description);
      $('#data').text(JSON.stringify(this.data));
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
    "<br>The current data is about numbers.<br>Please find the average.",
    data
  );
});