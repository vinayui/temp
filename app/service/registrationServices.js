(function(){
	var amex = angular.module('amex');
	amex.factory('registService',['$q','$http', 'serviceUrls', 
	   function( $q, $http, serviceUrls){
	    return {
	        getLabelData : function(text){
	        	var deferred = $q.defer();
	            $http({
	            	method : "GET",
	                url : serviceUrls.getLabels
	            }).success (function(responce){
                	deferred.resolve(responce);
                }).error(function(){
                	deferred.resolve({"success":false,"data":"Technical Error"});
                });	
	            return deferred.promise;
	        },
	        ajaxPost : function(path, data ){
	        	var deferred = $q.defer();
	            $http({
	            	method : "POST",
	                url : path,
	                data : data
	            }).success (function(responce){
                	deferred.resolve(responce);
                }).error(function(){
                	deferred.resolve({"success":false,"data":"Technical Error"});
                });	
	            return deferred.promise;
	        },
	        ajaxGet : function(path){
	        	var deferred = $q.defer();
	            $http({
	            	method : "POST",
	                url : path,
	                //data : data
	            }).success (function(responce){
                	deferred.resolve(responce);
                }).error(function(){
                	deferred.resolve({"success":false,"data":"Technical Error"});
                });	
	            return deferred.promise;
	        }
	    }               
	}]);
})();