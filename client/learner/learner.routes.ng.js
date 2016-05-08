'use strict'

angular.module('techApp')
.config(function($stateProvider) {
  $stateProvider
  .state('learner-list', {
    url: '/learner',
    templateUrl: 'client/learner/learner-list.view.ng.html',
    controller: 'LearnerListCtrl'
  })
  .state('learner-detail', {
    url: '/learner/:learnerId',
    templateUrl: 'client/learner/learner-detail.view.ng.html',
    controller: 'LearnerDetailCtrl'
  });
});