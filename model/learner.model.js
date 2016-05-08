Learner = new Mongo.Collection('learner');

Learner.allow({
  insert: function(userId, learner) {
    return true;
  },
  update: function(userId, learner, fields, modifier) {
    return true;
  },
  remove: function(userId, learner) {
    return true;
  }
});