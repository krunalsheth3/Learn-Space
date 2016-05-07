'use strict'

Meteor.publish('class', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfClass', Class.find(where), {noReady: true});
  return Class.find(where, options);
});
