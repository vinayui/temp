(function(){
	var amex = angular.module('amex', ['ui.router', 'ngMaterial','util','angularSelectbox']);
	amex.config(['$stateProvider', '$urlRouterProvider',
	    function($stateProvider, $urlRouterProvider) {
		
		 $urlRouterProvider
	     .otherwise('/verify');

		 
		 $stateProvider.state("verify", {
	         url: "/verify",
	         controller : 'VerificationController',
	         templateUrl: 'app/views/verification.html'
	     });
	}]);
})();
