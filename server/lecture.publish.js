'use strict'

Meteor.publish('lecture', function(options, searchString) {
  
  return Lecture.find();
});
