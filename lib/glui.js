var Glui = function(glue) {
  this.glue = glue;
  this.selector;
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

Glui.bind = function(selector, event, glue, callback) {
  $(selector).on(event, function(e) {
    var $this = $(this),
        data  = Glui.serialize($this),
        index = $this.siblings().index($this),
        info  = [e, $this, data, index];

    callback.apply(glue, info);
  });
};

Glui.prototype.$ = function(selector) {
  this.selector = selector;
  return this;
};

Glui.prototype.blur = function(callback) {
  Glui.bind(this.selector, 'blur', this.glue, callback);
  return this;
};

Glui.prototype.dblclick = function(callback) {
  Glui.bind(this.selector, 'dblclick', this.glue, callback);
  return this;
};

Glui.prototype.change = function(callback) {
  Glui.bind(this.selector, 'change', this.glue, callback);
  return this;
};

Glui.prototype.click = function(callback) {
  Glui.bind(this.selector, 'click', this.glue, callback);
  return this;
};

Glui.prototype.enter = function(callback) {
  // TODO implement me
};

Glui.prototype.submit = function(callback, opts) {
  var self = this;

  opts = _.defaults({ resetOnSubmit: true }, opts);

  $(this.selector).on('submit', function(e) {
    var $this = $(this);

    e.preventDefault();

    callback.call(self.glue, $this, Glui.serialize($this), e);
    if (opts.resetOnSubmit) this.reset();
  });

  return this;
};

Glui.prototype.addListener = function() {
  this.glue.addListener.apply(this.glue, arguments);
};

// blur ✓
// change ✓
// click
// dblclick
// focus
// focusin
// focusout
// hover
// keydown
// keypress
// keyup
// mousedown
// mouseenter
// mouseleave
// mousemove
// mouseover
// mouseup
// scroll
// select
// submit ✓
