'use strict'

angular.module('techApp')
.controller('InstructorDetailCtrl', function($scope, $stateParams) {
  
  // $scope.helpers({
  //   instructor: function() {
  //     return Instructor.findOne({ _id: $stateParams.instructorId }); 
  //   }
  // });
  
  // $scope.subscribe('instructor');
  
  // $scope.save = function() {
  //   if($scope.form.$valid) {
  //     delete $scope.instructor._id;
  //     Instructor.update({
  //       _id: $stateParams.instructorId
  //     }, {
  //       $set: $scope.instructor
  //     }, function(error) {
  //       if(error) {
  //         console.log('Unable to update the instructor'); 
  //       } else {
  //         console.log('Done!');
  //       }
  //     });
  //   }
  // };
        
  // $scope.reset = function() {
  //   $scope.instructor.reset();
  // };
});