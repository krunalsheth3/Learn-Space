'use strict'

angular.module('techApp')
.config(function($stateProvider) {
  $stateProvider
  .state('instructor-list', {
    url: '/instructor',
    templateUrl: 'client/instructor/instructor-list.view.ng.html',
    controller: 'InstructorListCtrl'
  })
  .state('instructor-detail', {
    url: '/instructor/:instructorId',
    templateUrl: 'client/instructor/instructor-detail.view.ng.html',
    controller: 'InstructorDetailCtrl'
  });
});