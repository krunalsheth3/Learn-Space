Record = new Mongo.Collection('record');

Record.allow({
  insert: function(userId, record) {
    return true;
  },
  update: function(userId, record, fields, modifier) {
    return true;
  },
  remove: function(userId, record) {
    return true;
  }
});