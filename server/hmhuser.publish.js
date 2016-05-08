'use strict'
Meteor.publish('hmhuser', function (options, searchString) {
    // var where = {
    //     'name': {
    //         '$regex': '.*' + (searchString || '') + '.*',
    //         '$options': 'i'
    //     }
    // };
    // Counts.publish(this, 'numberOfHmhuser', Hmhuser.find(where), {noReady: true});
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
            if (recordObj.roles.toUpperCase() === 'instructor'.toUpperCase()) {
                var errorRes = {
                    'errorCode': '-1',
                    'errorMessage': "role unsupported for this operation"
                };
                return errorRes;
            }

            var hmhuser = Hmhuser.find({"access_token":recordObj.access_token});
            recordObj["user"]=hmhuser;

            Record.insert(recordObj);
        },
        getRecords: function (videoObj) {
            console.log(videoObj.access_token);
            console.log(videoObj.roles);
            console.log(videoObj.secure_token);
            if (recordObj.roles.toUpperCase() === 'learner'.toUpperCase()) {
                var errorRes = {
                    'errorCode': '-1',
                    'errorMessage': "role unsupported for this operation"
                };
                return errorRes;
                
            }
            return Record.find({"secure_token":videoObj.secure_token});
        }
    }
)