(function(){
	var amex = angular.module('util');
	var path = window.location.protocol+"//"+window.location.host+window.location.pathname;
	
	amex.constant("serviceUrls",{
		"path" : path,
		"getLabels" : path+'/AMEX/app/model/labelConstants.json',
		"isContactID" : path+'/AMEX/app/model/contact.json',
		"getUserDetails" : path+"/AMEX/app/model/userdetails.json",
		"postDetails" : path+"storeDetails"
	});
})();