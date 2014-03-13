'use strict';

(function (root) {
  var App = root.App = (root.App || {});

  var controller = App.controller = function (description, data, initialCode) {
    this.description = description;
    this.data = data;
    this.initialCode = initialCode;
    this.output = $('#output');
    $('#run').click(this.run.bind(this));
    this.setupEditor();
    this.displayInfo();
    this.run();
  }

  controller.prototype = {
    displayInfo: function () {
      $('#desc').append(this.description);
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
    "data.join('\\n');"
  );

  $('#run').tooltip({});

});