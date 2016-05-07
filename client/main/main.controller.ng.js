'use strict'

angular.module('techApp')
.controller('MainCtrl', function($scope,  $meteor) {


  //Subscribe to the DB you wana use
  $scope.$meteorSubscribe('staff');

  $scope.submitLoginForm = function(){

      /*
      * Create a Post in the List table
      */
      $meteor.call('getAccessToken',$scope.userObj).then(
          function(data) {
            if(angular.isDefined(data)) {
              debugger;
            }    
          },
         function(err) {
            alert(err.error);
          }
        ); 

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