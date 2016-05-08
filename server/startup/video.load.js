Meteor.startup(function() {
  if(Video.find().count() === 0) {
    var video = [
      {
        'name': 'video 1'
      },
      {
        'name': 'video 2'
      }
    ];
    video.forEach(function(video) {
      Video.insert(video);
    });
  }
});