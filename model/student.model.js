Student = new Mongo.Collection('student');

Student.allow({
  insert: function(userId, student) {
    return true;
  },
  update: function(userId, student, fields, modifier) {
    return true;
  },
  remove: function(userId, student) {
    return true;
  }
});