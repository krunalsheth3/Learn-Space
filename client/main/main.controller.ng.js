'use strict'

angular.module('techApp')
.controller('MainCtrl', function($scope,  $meteor, $rootScope, techAppConstants, $location) {


  //Subscribe to the DB you wana use
  //$scope.$meteorSubscribe('hmhuser');
  $scope.disableButton = false;
  $scope.submitLoginForm = function(){


    Meteor.call('getAccessToken', $scope.userObj, function(err,response) {
      $scope.disableButton = true;
          if(err) {
            alert(err);
          }
          
          $rootScope.access_token = response.access_token;
          $rootScope.roles = response.roles;

          if(response.roles == techAppConstants.roles.instructor)  {
            $location.path("/instructor");
          } else {
            $location.path("/learner");
          }
          $scope.disableButton = false;
        });

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