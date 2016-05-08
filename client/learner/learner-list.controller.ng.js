'use strict'

angular.module('techApp')
.controller('LearnerListCtrl', function($scope, $meteor, $rootScope) {


  $scope.$meteorSubscribe('lecture');
  $scope.$meteorSubscribe('record');

 $scope.helpers({
    lecturesList() {
      return Lecture.find();
    }
  });

 

  $scope.videoControls = function(btn) {
    var player = $("#"+btn).attr('videoData');
    var video = $("#"+player).get(0);
    var current_time = Math.floor(video.currentTime);

    var recordObj = {
      "access_token" : Session.get('access_token'),
      "roles"        : Session.get('roles'),
      "secure_token" : $("#"+btn).attr('data'),
      "tag"          : btn,
      "time"         : current_time
    }
    
    $meteor.call('postRecord', recordObj).then(
        function(data) {
          alert("test");
        }, 
        function(err) {
          alert("Failed to post video data");
        }

      );
            
        
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
        