(function(){
	var amex = angular.module('util');
	amex.service("globalSrv",function(){
		var params = {};
		var userDetails = {};
		return {
            getValues: function () {
                return params;
            },
            setValues: function(value) {
            	params = value;
            },
            getUserDetails: function () {
                return userDetails;
            },
            setUserDetails: function(key,value) {
            	userDetails[key] = value;
            }
        };
	});
})();