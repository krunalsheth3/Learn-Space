Video = new Mongo.Collection('video');

Video.allow({
  insert: function(userId, video) {
    return true;
  },
  update: function(userId, video, fields, modifier) {
    return true;
  },
  remove: function(userId, video) {
    return true;
  }
});