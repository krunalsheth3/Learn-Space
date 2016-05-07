'use strict'

angular.module('techApp')
.config(function($stateProvider) {
  $stateProvider
  .state('class', {
    url: '/class',
    templateUrl: 'client/class/class.view.ng.html',
    controller: 'ClassCtrl',
    resolve: {
      // currentUser: ['$meteor', function($meteor) {
      //   return $meteor.requireUser();
      // }]
    }
  });
});