var Task = function(desc) {
  this.desc = desc;
  this.done = false;
  this.editMode = false;
};

Task.render = _.template("<b><%- value %></b>");

$(function() {
  var g = new Glui(new Glue([]));

  g.$('#new-task').enter(function(e, el, data) {
    this.push(new Task(data.description));
  });

  g.$('#task .task').dblclick(function(e, el, data, index) {
    this.set('[' + index + '].editMode', !this.target[index].editMode);
  });

  g.addListener('[]:push', function(msg) {
    $('#tasks').insert(Task.render({ task: msg.newValue }));
  });

  g.addListener('[]:remove', function(msg) {
    $('#task .task').eq(index).remove();
  });

  g.addListener('[]:set', function(msg) {
    $('#task .task').eq(msg.index).html(Task.render({ task: msg.newValue }));
  });
});

