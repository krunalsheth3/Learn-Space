'use strict'

Meteor.publish('instructor', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfInstructor', Instructor.find(where), {noReady: true});
  return Instructor.find(where, options);
});
