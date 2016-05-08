'use strict'

Meteor.publish('record', function(options, searchString) {
  
  return Record.find();
});
