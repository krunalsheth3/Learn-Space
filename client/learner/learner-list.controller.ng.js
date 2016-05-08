'use strict'

angular.module('techApp')
.controller('LearnerListCtrl', function($scope, $meteor) {


  $scope.videoControls = function(btn) {
    var player = $('#video1').get(0);
            
    if (player) {
        var current_time=Math.floor(player.currentTime);
        console.log(current_time);
        var obj = {
          'tag': btn.$id,
          'currentTime': current_time
        }
        var result = $meteor.call('postData',obj);

      
    }
            
        
  }
  

  // $scope.page = 1;
  // $scope.perPage = 3;
  // $scope.sort = {name_sort : 1};
  // $scope.orderProperty = '1';
  
  // $scope.helpers({
  //   learner: function() {
  //     return Learner.find({}, {
  //       sort: $scope.getReactively('sort') 
  //     });
  //   },
  //   learnerCount: function() {
  //     return Counts.get('numberOfLearner');
  //   }
  // });
                  
  // $scope.subscribe('learner', function() {
  //   return [{
  //     sort: $scope.getReactively('sort'),
  //     limit: parseInt($scope.getReactively('perPage')),
  //     skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
  //   }, $scope.getReactively('search')];
  // });

  // $scope.save = function() {
  //   if ($scope.form.$valid) {
  //     Learner.insert($scope.newLearner);
  //     $scope.newLearner = undefined;
  //   }
  // };
                  
  // $scope.remove = function(learner) {
  //   Learner.remove({_id:learner._id});
  // };
                  
  // $scope.pageChanged = function(newPage) {
  //   $scope.page = newPage;
  // };
                  
  // return $scope.$watch('orderProperty', function() {
  //   if ($scope.orderProperty) {
  //     $scope.sort = {
  //       name_sort: parseInt($scope.orderProperty)
  //     };
  //   }
  // });
});
        