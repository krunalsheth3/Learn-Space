'use strict'

Meteor.publish('staff', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfStaff', Staff.find(where), {noReady: true});
  return Staff.find(where, options);
});
