Meteor.startup(function() {
  if(Learner.find().count() === 0) {
    var learner = [
      {
        'name': 'learner 1'
      },
      {
        'name': 'learner 2'
      }
    ];
    learner.forEach(function(learner) {
      Learner.insert(learner);
    });
  }
});