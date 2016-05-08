'use strict';

angular.module('techApp')

  .config(function($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })

  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      switch(error) {
        case 'AUTH_REQUIRED':
           Session.set('toState', toState.url);
            $("#loginModal").modal({backdrop: false});
            break;
        case 'FORBIDDEN':
        case 'UNAUTHORIZED':
          $state.go('main');
          break;
      }
    });
  }])

  /*
  * techAppconstants used throughout the portal
  */
  .constant('techAppConstants', {
    'roles' : {
      'instructor' : 'Instructor',
      'leraner'    : 'Learner'
    },
    'SUCCESS_CODE' : 200,
    'PERPAGEENTRY' : 12,
    'INFINITE_SCROLL_DISTANCE': 0

  })