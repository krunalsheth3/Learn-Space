'use strict'
Meteor.publish('hmhuser', function (options, searchString) {
    var where = {
        'name': {
            '$regex': '.*' + (searchString || '') + '.*',
            '$options': 'i'
        }
    };
    Counts.publish(this, 'numberOfHmhuser', Hmhuser.find(where), {noReady: true});
    return Hmhuser.find(where, options);
});
Meteor.methods({
        getAccessToken: function (userObj) {
            console.log(userObj.username);
            console.log(userObj.password);
            // v4/sample_token
            HTTP.call('POST',
                'http://sandbox.graph.hmhco.com/v4/sample_token?client_id=a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com&grant_type=password&username=' + userObj.username + '&password=' + userObj.password,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                    }
                },
                function (error, response) {
                    if (error != null) {
                        console.log(error.message);
                        var errorRes = {
                            'errorCode': '-1',
                            'errorMessage': error.message
                        };
                        return errorRes;
                    }
                    var getAccessTokenResponse = response.data;
                    if (Hmhuser.find({"preferred_username": getAccessTokenResponse.preferred_username}).count() == 0) {
                        Hmhuser.insert(getAccessTokenResponse);
                        console.log("inserting user: " + getAccessTokenResponse.preferred_username);
                    } else {
                        Hmhuser.update({"preferred_username": getAccessTokenResponse.preferred_username}, {$set: getAccessTokenResponse});
                        console.log("updating user: " + getAccessTokenResponse.preferred_username);
                    }
                    return getAccessTokenResponse;
                }
            );
        },
        getLectures: function (authObj) {
            console.log(authObj.access_token);
            console.log(authObj.roles);
            if(authObj.roles.toUpperCase() === 'learner'.toUpperCase()){
                return Lecture.find();
            }
            // v4/rosters
            HTTP.call('GET',
                "http://sandbox.graph.hmhco.com/v4/rosters?facet=detail&include=staff%2Cstudents",
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": authObj.access_token,
                        "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                    }
                },
                function (error, response) {
                    if (error != null) {
                        var errorRes = {
                            'errorCode': '-1',
                            'errorMessage': error.message
                        };
                        return errorRes;
                    }
                    var getLecturesResponse = response.data;
                    //console.log(getLecturesResponse);
                    // v4/documents
                    HTTP.call('GET',
                        "http://sandbox.graph.hmhco.com/v4/documents",
                        {
                            headers: {
                                "Accept": "application/json",
                                "Authorization": authObj.access_token,
                                "Content-Type": "application/json",
                                "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                            }
                        },
                        function (error, response) {
                            if (error != null) {
                                var errorRes = {
                                    'errorCode': '-1',
                                    'errorMessage': error.message
                                };
                                return errorRes;
                            }
                            var getDocumentsResponse = response.data;
                            for (var i = 0; i < getLecturesResponse.data.length; i++) {
                                getLecturesResponse.data[i]["videos"] = getDocumentsResponse.data;
                            }
                            for (var i = 0; i < getLecturesResponse.data.length; i++) {
                                if (Lecture.find({"course_id": getLecturesResponse.data[i].course_id}).count() == 0) {
                                    Lecture.insert(getLecturesResponse.data[i]);
                                    console.log("inserting lecture: " + getLecturesResponse.data[i].course_id);
                                } else {
                                    Lecture.update({"course_id": getLecturesResponse.data[i].course_id}, {$set: getLecturesResponse.data[i]});
                                    console.log("updating lecture: " + getLecturesResponse.data[i].course_id);
                                }
                            }
                            return getLecturesResponse;
                        }
                    );
                }
            );
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