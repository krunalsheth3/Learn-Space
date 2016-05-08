'use strict'

Meteor.publish('learner', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfLearner', Learner.find(where), {noReady: true});
  return Learner.find(where, options);
});
