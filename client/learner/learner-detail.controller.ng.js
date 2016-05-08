'use strict'

angular.module('techApp')
.controller('LearnerDetailCtrl', function($scope, $stateParams) {
  
  $scope.helpers({
    learner: function() {
      return Learner.findOne({ _id: $stateParams.learnerId }); 
    }
  });
  
  $scope.subscribe('learner');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      delete $scope.learner._id;
      Learner.update({
        _id: $stateParams.learnerId
      }, {
        $set: $scope.learner
      }, function(error) {
        if(error) {
          console.log('Unable to update the learner'); 
        } else {
          console.log('Done!');
        }
      });
    }
  };
        
  $scope.reset = function() {
    $scope.learner.reset();
  };
});