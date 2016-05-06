(function(){
	var amex = angular.module('amex', ['ui.router', 'ngMaterial','util','angularSelectbox']);
	amex.config(['$stateProvider', '$urlRouterProvider',
	    function($stateProvider, $urlRouterProvider) {
		
		 $urlRouterProvider
	     .otherwise('/verify');
		 
		 /*$stateProvider.state("lang", {
	         url: "/lang",
	         controller : 'LangController',
	         templateUrl: 'AMEX/app/views/lang.html'
	     }).state("login", {
	         url: "/login",
	         controller : 'LoginController',
	         templateUrl: 'AMEX/app/views/login_auth.html'
	     })*/
		 
		 $stateProvider.state("verify", {
	         url: "/verify",
	         controller : 'VerificationController',
	         templateUrl: 'app/views/verification.html'
	     });
	}]);
})();
