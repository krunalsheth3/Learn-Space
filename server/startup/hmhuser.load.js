Meteor.startup(function () {
    if (Hmhuser.find().count() === 0) {
        var useremails = [];
        HTTP.call('GET', 
            "http://sandbox.graph.hmhco.com/v4/developer",
            {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "SIF_HMACSHA256 ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVFEyTWpZME5ESXdOU3dpYzNWaUlqb2lZMjVjZFRBd00yUkhZVzVrWVd4bUlFZHlaWGtzZFdsa1hIVXdNRE5rWjJGdVpHRnNaaXgxYm1seGRXVkpaR1Z1ZEdsbWFXVnlYSFV3TUROa1lXSXhaRFF5TXpjdFpXUmtOeTAwWldSa0xUa3pOR1l0TXpRNE5tVmhZelZqTWpZeUxHOWNkVEF3TTJReE1EQXlPRGcxTUN4a1kxeDFNREF6WkRjME56Y2lMQ0pvZEhSd09pOHZkM2QzTG1sdGMyZHNiMkpoYkM1dmNtY3ZhVzF6Y0hWeWJDOXNhWE12ZGpFdmRtOWpZV0l2Y0dWeWMyOXVJanBiSWtsdWMzUnlkV04wYjNJaVhTd2lZMnhwWlc1MFgybGtJam9pWVRaa05qWXpOVEF0T1dNeU5TMDBOV05qTFRreVl6Y3RaRFkzTkdGa09UUTVObVl4TG1odGFHTnZMbU52YlNJc0ltVjRjQ0k2TVRRMk1qY3pNRFl3TlgwLjlFZmlMdWI1RmlBUkMyS2dXaC1uZ3B5Q1loRHd4UU9DM3J4OS1tSFhoOHM6OHljZTI4WHduN1FiRlFpVFZhMEJHdVBrdjZWVVBCR25SWTFzWXg5NlE2TT0K",
                    "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                }
            },
            function (error, response) {
                var getSandboxResponse = response.data;
                var staff = getSandboxResponse.staff;
                var students = getSandboxResponse.students;
                staff.forEach(function (staff) {
                    useremails.push(staff);
                });
                students.forEach(function (students) {
                    useremails.push(students);
                });
                useremails.forEach(function (useremails) {
                    HTTP.call('POST',
                        'http://sandbox.graph.hmhco.com/v4/sample_token?client_id=a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com&grant_type=password&username=' + useremails.user_name + '&password=password',
                        {
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                            }
                        },
                        function (error, response) {
                            var getAccessTokenResponse = response.data;
                            if (Hmhuser.find({"preferred_username": getAccessTokenResponse.preferred_username}).count() == 0) {
                                Hmhuser.insert(getAccessTokenResponse);
                                console.log("inserting user: " + getAccessTokenResponse.preferred_username);
                            } else {
                                Hmhuser.update({"preferred_username": getAccessTokenResponse.preferred_username}, {$set: getAccessTokenResponse});
                                console.log("updating user: " + getAccessTokenResponse.preferred_username);
                            }
                            if (getAccessTokenResponse.roles.toUpperCase() === 'instructor'.toUpperCase()) {
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
                                        var getLecturesResponse = response.data;
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
                                                var documents = getDocumentsResponse.data;
                                                var idx = 0;
                                                var firstDocSet = [];
                                                var secondDocSet = [];
                                                documents.forEach(function (documents) {
                                                    if(idx%2 ==0){
                                                        firstDocSet.push(documents);
                                                    }else{
                                                        secondDocSet.push(documents);
                                                    }
                                                    idx++;
                                                    if (Video.find({"secure_token": documents.secure_token}).count() == 0) {
                                                        Video.insert(documents);
                                                        console.log("inserting video: " + documents.secure_token);
                                                    }
                                                    else {
                                                        Video.update({"secure_token": documents.secure_token}, {$set: documents})
                                                        console.log("updating video: " + documents.secure_token);
                                                    }
                                                });
                                                for (var i = 0; i < getLecturesResponse.data.length; i++) {
                                                    if(i%2==0){
                                                        getLecturesResponse.data[i]["videos"] = firstDocSet;
                                                    }else{
                                                        getLecturesResponse.data[i]["videos"] = secondDocSet;
                                                    }

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
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    );
                });
            }
        );
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