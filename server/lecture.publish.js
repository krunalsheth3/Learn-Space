'use strict'

Meteor.publish('lecture', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfLecture', Lecture.find(where), {noReady: true});
  return Lecture.find(where, options);
});
