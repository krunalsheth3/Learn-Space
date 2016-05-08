Meteor.startup(function() {
  if(Instructor.find().count() === 0) {
    var instructor = [
      {
        'name': 'instructor 1'
      },
      {
        'name': 'instructor 2'
      }
    ];
    instructor.forEach(function(instructor) {
      Instructor.insert(instructor);
    });
  }
});