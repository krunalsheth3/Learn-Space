'use strict'
Meteor.publish('staff', function (options, searchString) {
    var where = {
        'name': {
            '$regex': '.*' + (searchString || '') + '.*',
            '$options': 'i'
        }
    };
    Counts.publish(this, 'numberOfStaff', Staff.find(where), {noReady: true});
    return Staff.find(where, options);
});
Meteor.methods({
        getAccessToken: function (username, password) {
            var access_token_value;
            var role_value;
            HTTP.call('GET',
                'http://sandbox.graph.hmhco.com/v4/sample_token?client_id=a6d66350-9c25-45cc-92c7-d674ad9496f1.hmhco.com&grant_type=password&username=' + username + '&password=' + password,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                    }
                },
                function (error, response) {
                    console.log(response.data);
                    access_token_value = response.data.access_token;
                    console.log(access_token_value);
                }
            );
            HTTP.call('GET',
                "http://sandbox.graph.hmhco.com/v4/me",
                {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": access_token_value,
                        "Vnd-HMH-Api-Key": "558063932b65c556ebd5676e45a0b8cd"
                    }
                },
                function (error, response) {
                    console.log(response.data);
                    role_value = response.data.role;
                    console.log(role_value);
                }
            );
            var res =
            {
                'access_token': access_token_value,
                'role': role_value
            };
            return res;
        },
        getLectures: function () {
            return "";
        },
        findStaffByAccessToken: function (access_token_value) {
            return Staff.find({"access_token":access_token_value});
        },
        findStaffByEmail: function (email) {
            return Staff.find({"email":email});
        }
    }
)

