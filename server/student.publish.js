'use strict'

Meteor.publish('student', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfStudent', Student.find(where), {noReady: true});
  return Student.find(where, options);
});
