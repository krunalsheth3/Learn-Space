Lecture = new Mongo.Collection('lecture');

Lecture.allow({
  insert: function(userId, lecture) {
    return true;
  },
  update: function(userId, lecture, fields, modifier) {
    return true;
  },
  remove: function(userId, lecture) {
    return true;
  }
});