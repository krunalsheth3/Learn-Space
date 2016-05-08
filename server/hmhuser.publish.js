'use strict'
Meteor.publish('hmhuser', function (options, searchString) {
    return Hmhuser.find();
});
Meteor.methods({
        getAccessToken: function (userObj) {
            console.log(userObj.username);
            console.log(userObj.password);
            // v4/sample_tokenas
            var where = {
                'preferred_username': userObj.username
            };
            return Hmhuser.findOne(where);
        },
        getLectures: function () {
            return Hmhuser.find();
        },
        postRecord: function (recordObj) {
            console.log(recordObj.access_token);
            console.log(recordObj.roles);
            console.log(recordObj.secure_token);
            console.log(recordObj.tag);
            console.log(recordObj.time);
            return Record.insert(recordObj);
        },
        getRecords: function (videoObj) {
            console.log(videoObj.access_token);
            console.log(videoObj.roles);
            console.log(videoObj.secure_token);
            return Record.find({"secure_token": videoObj.secure_token});
        },
        getVideos: function () {
            return Video.find();
        }
    }
)