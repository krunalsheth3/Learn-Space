'use strict'

Meteor.publish('instructor', function(options, searchString) {
  
  return Instructor.find();
});
