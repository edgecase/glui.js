var vows = require('vows')
,   assert = require('assert')
,   Glui   = require(__dirname + "/../lib/glui")

,   suite = vows.describe('set value to a key');

suite.addBatch({
  "setting on key": {
    "user": function() {
      var obj = {}, keys = ["user"], value = "felix";

      Glui.set(obj, keys, value);
      assert.deepEqual(obj, { user: "felix" });
    },

    "user[name]": function() {
      var obj = {}, keys = ["user", "name"], value = "felix";

      Glui.set(obj, keys, value);
      assert.deepEqual(obj, { user: { name: "felix" }});
    },

    "user[name][stuff]": function() {
      var obj = {}, keys = ["user", "name", "stuff"], value = "felix";

      Glui.set(obj, keys, value);
      assert.deepEqual(obj, { user: { name: { stuff: "felix" }}});
    }
  },

  "setting with arrays": {
    "user[]": function() {
      var obj = {}, keys = ['user', '[]'], value = "felix";

      Glui.set(obj, keys, value);
      assert.deepEqual(obj, { user: ["felix"] });
    },

    "user[hobbies][]": function() {
      var obj = {}, keys = ['user', 'hobbies', '[]'], value = "running";

      Glui.set(obj, keys, value);
      assert.deepEqual(obj, { user: { hobbies: ["running"] }});
    },

    "user[][stuff]": function() {
      var obj = {}, keys = ['user', '[]', 'stuff'], value = "cool";

      Glui.set(obj, keys, value);
      assert.deepEqual(obj, { user: [ { stuff: "cool" } ]});
    },
  }
});

suite.export(module)
