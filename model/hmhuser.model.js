Hmhuser = new Mongo.Collection('hmhuser');

Hmhuser.allow({
  insert: function(userId, hmhuser) {
    return true;
  },
  update: function(userId, hmhuser, fields, modifier) {
    return true;
  },
  remove: function(userId, hmhuser) {
    return true;
  }
});