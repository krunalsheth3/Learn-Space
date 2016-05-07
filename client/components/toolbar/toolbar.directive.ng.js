'use strict'

angular.module('techApp')
.directive('toolbar', function($location) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {
    	    $scope.showLoginForm = function() {
    	        $("#registerModal").modal('hide');
    	        // $("#loginModal").modal({backdrop: false});
    	        $location.path(Session.get('toState'));
    	    }

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
    	    
    	
    }
    
  };
});