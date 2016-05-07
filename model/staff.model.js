Staff = new Mongo.Collection('staff');

Staff.allow({
  insert: function(userId, staff) {
    return true;
  },
  update: function(userId, staff, fields, modifier) {
    return true;
  },
  remove: function(userId, staff) {
    return true;
  }
});