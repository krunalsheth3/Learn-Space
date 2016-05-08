Instructor = new Mongo.Collection('instructor');

Instructor.allow({
  insert: function(userId, instructor) {
    return true;
  },
  update: function(userId, instructor, fields, modifier) {
    return true;
  },
  remove: function(userId, instructor) {
    return true;
  }
});