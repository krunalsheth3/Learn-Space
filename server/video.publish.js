'use strict'

Meteor.publish('video', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfVideo', Video.find(where), {noReady: true});
  return Video.find(where, options);
  
});
