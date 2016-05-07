'use strict'

angular.module('techApp')
.controller('MainCtrl', function($scope) {
  $("#loginModal").modal({backdrop: false});

  $scope.submitLoginForm = function(currentUser){
        // 1. Attempt to login.
        Meteor.loginWithPassword(currentUser.userName, currentUser.userPassword, function(error) {
          // 2. Handle the response
          if(Meteor.user()) {
            // Redirect the user to where they're loggin into. Here, Router.go uses
            $("#loginModal").modal('hide');
                    $location.path(Session.get('toState'));
          } else {
             // If no user resulted from the attempt, an error variable will be available
                  // in this callback. We can output the error to the user here.
                  $scope.showErrorMessage = true;
          }
        });
      }

      $scope.showRegistrationForm = function(newUser){
        $("#loginModal").modal('hide');
        $("#registerModal").modal({backdrop: false});
      }

      $scope.submitRegistrationForm = function(newUser) {
        Accounts.createUser({
          email: newUser.userName,
          password: newUser.userPassword,
          profile: 'user'
        });
        $("#registerModal").modal('hide');
            $location.path(Session.get('toState'));
      }
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';
  
  $scope.helpers({
    things: function() {
      return Things.find({}, {
        sort: $scope.getReactively('sort') 
      });
    },
    thingsCount: function() {
      return Counts.get('numberOfThings');
    }
  });
                  
  $scope.subscribe('things', function() {
    return [{
      sort: $scope.getReactively('sort'),
      limit: parseInt($scope.getReactively('perPage')),
      skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
    }, $scope.getReactively('search')];
  });

  $scope.save = function() {
    if ($scope.form.$valid) {
      Things.insert($scope.newThing);
      $scope.newThing = undefined;
    }
  };
                  
  $scope.remove = function(thing) {
    Things.remove({_id: thing._id});
  };
                  
  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };
                  
  return $scope.$watch('orderProperty', function() {
    if ($scope.orderProperty) {
      $scope.sort = {
        name_sort: parseInt($scope.orderProperty)
      };
    }
  });
});