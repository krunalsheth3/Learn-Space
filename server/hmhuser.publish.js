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
            var getLecturesResponse = {};
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
                    //console.log(getAccessTokenResponse);
                    // v4/rosters
                    HTTP.call('GET',
                        "http://sandbox.graph.hmhco.com/v4/rosters?facet=detail&include=staff%2Cstudents",
                        {
                            headers: {
                                "Accept": "application/json",
                                "Authorization": getAccessTokenResponse.access_token,
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
                            getLecturesResponse = response.data;
                            //console.log(getLecturesResponse);
                            // v4/documents
                            HTTP.call('GET',
                                "http://sandbox.graph.hmhco.com/v4/documents",
                                {
                                    headers: {
                                        "Accept": "application/json",
                                        "Authorization": getAccessTokenResponse.access_token,
                                        "Content-Type": "application/json",
                                        "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                                    }
                                },
                                function (error, response) {
                                    var getDocumentsResponse = response.data;
                                    //console.log(getDocumentsResponse);
                                    for (var i = 0; i < getLecturesResponse.data.length; i++) {
                                        getLecturesResponse.data[i]["videos"] = getDocumentsResponse.data;
                                    }
                                    //console.log(getLecturesResponse);
                                    //console.log(getLecturesResponse.data[0]);
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
                }
            );
        }
    }
)