'use strict'

Meteor.publish('list', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfList', List.find(where), {noReady: true});
  return List.find(where, options);
});
