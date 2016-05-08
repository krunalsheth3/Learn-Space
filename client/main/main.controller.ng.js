'use strict'

angular.module('techApp')
.controller('MainCtrl', function($scope,  $meteor, $rootScope, techAppConstants, $location) {


  //Subscribe to the DB you wana use
  $scope.$meteorSubscribe('staff');

  $scope.submitLoginForm = function(){

      /*
      * Create a Post in the List table
      */
      var result = $meteor.call('getAccessToken',$scope.userObj);
      $rootScope.access_token = result.access_token;
      if(result.roles == techAppConstants.roles.instructor) {
        $location.path('/instructor');
      } else {
        $location.path('/learner');
      }
          
          

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