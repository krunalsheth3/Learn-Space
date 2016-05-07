'use strict'

Meteor.publish('record', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfRecord', Record.find(where), {noReady: true});
  return Record.find(where, options);
});
