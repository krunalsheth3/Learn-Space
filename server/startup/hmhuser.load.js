Meteor.startup(function () {

    if (Hmhuser.find().count() === 0) {
        var useremails = [
            {   
                "user_name": "emma_morgan_teacher_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "emma_morgan_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "joseph_dean_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "arlene_prescott_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "marc_barnes_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "jose_mcdonalid_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "erin_riley_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "chris_elliott_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "gertrude_pena_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "jessie_weaver_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "bertha_watts_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "edith_young_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "clyde_brooks_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "cory_marshall_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "regina_wood_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "anna_mitchell_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "jennie_newman_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "same_reynolds_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "beverly_mitchelle_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "tamara_gilbert_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }, {
                "user_name": "christine_sims_student_a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com"
            }
        ];

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

                    if(getAccessTokenResponse.roles.toUpperCase() === 'instructor'.toUpperCase()) {
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
                                    }
                                );
                            }
                        );
                    }
                }
            );
        });


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