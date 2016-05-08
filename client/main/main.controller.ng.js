'use strict'

angular.module('techApp')
.controller('MainCtrl', function($scope,  $meteor, $rootScope, techAppConstants, $location) {


  //Subscribe to the DB you wana use
  $scope.$meteorSubscribe('hmhuser');
  $scope.disableButton = false;
  $scope.submitLoginForm = function(){


    $meteor.call('getAccessToken', $scope.userObj).then(
        function(data) {
          $scope.disableButton = true;
           
            $rootScope.access_token = data.access_token;
            $rootScope.roles = data.roles;

            if(data.roles == techAppConstants.roles.instructor)  {
              $location.path("/instructor");
            } else {
              $location.path("/learner");
            }
            $scope.disableButton = false;
              
           
           
        }, 
        function(err) {
          alert("Failed to retrieve user info");
        }

      );

      

      /*
      * Create a Post in the List table
      */
      // $meteor.call('getAccessToken',$scope.userObj).then(
      //           function(data) {
      //             if(angular.isDefined(data)) {
      //               alert(data);
      //             }    
      //           },
      //          function(err) {
      //             alert(err.error);
      //           }
      //         ); 

      
          


        // // 1. Attempt to login.
        // Meteor.loginWithPassword(currentUser.userName, currentUser.userPassword, function(error) {
        //   // 2. Handle the response
        //   if(Meteor.user()) {
        //     // Redirect the user to where they're loggin into. Here, Router.go uses
        //     $("#loginModal").modal('hide');
        //             $location.path(Session.get('toState'));
        //   } else {
        //      // If no user resulted from the attempt, an error variable will be available
        //           // in this callback. We can output the error to the user here.
        //           $scope.showErrorMessage = true;
        //   }
        // });
      }


});