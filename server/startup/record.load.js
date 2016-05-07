Meteor.startup(function() {
  if(Record.find().count() === 0) {
    var record = [
      {
        'name': 'record 1'
      },
      {
        'name': 'record 2'
      }
    ];
    record.forEach(function(record) {
      Record.insert(record);
    });
  }
});