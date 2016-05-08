Meteor.startup(function() {
  if(Hmhuser.find().count() === 0) {
    // var hmhuser = [
    //   {
    //     'name': 'hmhuser 1'
    //   },
    //   {
    //     'name': 'hmhuser 2'
    //   }
    // ];
    // hmhuser.forEach(function(hmhuser) {
    //   Hmhuser.insert(hmhuser);
    // });
  }
});