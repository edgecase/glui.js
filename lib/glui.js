// var _ = require('underscore');

var Glui = function(glue) {
  this.glue = glue;
  this.selector;
};

Glui.prototype.$ = function(selector) {
  this.selector = selector;
  return this;
};

Glui.set = function(obj, keys, val) {
  if (keys.length < 1) return val;
  if (!obj[keys[0]]) obj[keys[0]] = keys[1] === '[]' ? [] : {};

  if (keys[1] === '[]') {
    obj[keys[0]].push(Glui.set({}, _.rest(keys, 2), val));
  } else {
    obj[keys[0]] = Glui.set(obj[keys[0]], _.rest(keys), val);
  }

  return obj;
};

Glui.serialize = function($elem) {
  var obj = {};

  _.each($elem.find("input, textarea", "select", "option"), function(field) {
    var $field = $(field),
        keys = $field.attr("name").match(/\[\]|([^\[\]])+/g);

    if ($field.is("option")) {
      Glui.set(obj, keys, $field.is(":checked"));
    } else if ($field.is('[type=radio], [type=checkbox]')) {
      if ($field.is(':checked')) Glui.set(obj, keys, $field.val());
    } else {
      Glui.set(obj, keys, $field.val());
    };
  });

  return obj;
};

// module.exports = Glui;
