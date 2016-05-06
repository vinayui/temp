(function(){
	var amex = angular.module('amex');
	amex.controller('VerificationController', ['$scope', '$location', 'registService', 'globalSrv', 'serviceUrls', '$window',
	    function($scope, $location, registService,globalSrv, serviceUrls, $window) {		
		
		//$scope.labelTxt = globalSrv.getValues();
		$scope.steps = ['Verify', 'Create Profile', 'Welcome to @Work'];
		$scope.contractError = "";
		$scope.userDetails = {"contactId" : "", "dobMonth":"","dobDate":""};
		
		$scope.contactDetails = {};		
		registService.ajaxGet(serviceUrls.isContactID).then(function(responce){
			if(responce.status == "SUCCESS"){
				$scope.contactDetails = responce.data;
			}else{
				// Redirect to Error Page
			}
		});
		
		$scope.stepActive = 1;
		$scope.saveNnext = function(){
			if($scope.stepActive == 1)$scope.verifivation();
			else if($scope.stepActive == 2)$scope.saveUserDetails();
			//else if($scope.stepActive == 3)$scope.stepActive++;
		}
		
		$scope.saveUserDetails = function(){
			var userDet = $scope.userDetails;
			if(userDet.userId && userDet.password 
					&& userDet.confirmPassword && userDet.securityQuestion 
						&& userDet.answer){
				
				//$scope.userResponce.
				var list = $scope.userResponce.payload.claimList;
				for(var i=0; i < list.length; i++){
					if(list[i].claim.type == "CredentialData"){
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push(userDet.userId);
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push(userDet.password);
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push($scope.questions[userDet.securityQuestion-1].name);
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push(userDet.answer);
					}
				}
				
				registService.ajaxPost(serviceUrls.postDetails,$scope.userResponce).then(function(responce){
					if(responce.status == "FAILURE"){
						//$scope.showError();
						$scope.userIdError =responce.userIdErrorMessage;
						$scope.PasswordError =responce.passwordErrorMessage;
					
					}else{
						$scope.stepActive++;
					}
					//$scope.stepActive++;
					
				});
			}else{
				$scope.showError();
			}
		};
		$scope.accountLocked = 0;
		$scope.verifivation = function(){
			var dob = new Date($scope.contactDetails.dob);
			if(!$scope.userDetails.contactId || $scope.dateSelected < 1 || $scope.monthSelected < 1){
				$scope.showContractError();
			}else if($scope.contactDetails.contactId != $scope.userDetails.contactId ||
					dob.getMonth()+1 != $scope.userDetails.dobMonth ||
					dob.getDate() != $scope.userDetails.dobDate){
				$scope.accountLocked++ ;	
				
				$scope.showContractError();
				$scope.contractError = $scope.labelTxt.AMEX_Contact_Error_Msg;
				if($scope.accountLocked == 3)
					$scope.contractError = $scope.labelTxt.AMEX_Contact_Locked_Error_Msg;
				
				registService.ajaxPost(serviceUrls.lockUser,'').then(function(responce){
					if(responce.status == "SUCCESS"){
						//$scope.showContractError();
						//$scope.contractError = responce.data;
					}
				});
				
			}else{
				registService.ajaxGet(serviceUrls.getUserDetails).then(function(responce){
					if(!responce.success){
						$scope.showContractError();
						$scope.contractError = responce.data;
					}else{
						$scope.stepActive++;
						$scope.userResponce = responce.data;
					}
				});
			}
		};
		
		$scope.showContractError = function(){
			var dob = new Date($scope.contactDetails.dob);
			if(!$scope.userDetails.contactId || $scope.contactDetails.contactId != $scope.userDetails.contactId)
				$('.contact_field.cont').addClass('box_error');
			if($scope.dateSelected < 1 || dob.getDate() != $scope.userDetails.dobDate)
				$('.dobDate').addClass('box_error');
			if($scope.monthSelected < 1 || dob.getMonth()+1 != $scope.userDetails.dobMonth)
				$('.dobMonth').addClass('box_error');
		};
		
		$scope.showError = function(){
			$('.contact_field').addClass('box_error');
			$('.emp_field').addClass('box_error');
		};
		
		$scope.print = function(){
			$window.print();
		}
		
		//if(!globalSrv.getValues().AMEX_Verify_Heading)
		registService.getLabelData().then(function(responce){
			globalSrv.setValues(responce.data);
			$scope.labelTxt = responce.data;
		});
		
		$scope.questions = [
		                 {id:1, name:'What is your favorite hobby?'},
		                 {id:2, name:'Your childhood pet\'s name?'},
		                 {id:3, name:'Where was your mother born?'},
		                 {id:4, name:'Your mother\'s maiden name?'},
		                 {id:5, name:'Who was your favorite teacher?'},
		                 {id:6, name:'What was your first school?'},
		                 {id:7, name:'Where were you born?'},
		                 {id:8, name:'What is your date of birth?'},
		                 {id:9, name:'What is your favorite city or place?'}
		               ];
		$scope.questionsSelected = 0;		
		
		$scope.months = [{id:1, name:'January'}, {id:2, name:'February'}, {id:3, name:'March'},{id:4, name:'April'},
			             {id:5, name:'May'},{id:6, name:'June'},{id:7, name:'July'},{id:8, name:'August'},
			             {id:9, name:'September'},{id:10, name:'October'},{id:11, name:'November'},{id:12, name:'December'}];
		$scope.monthSelected = 0;
		
		$scope.dates = [];
		$scope.dateSelected = 0;
		
		$scope.dobMonthChange = function(value){
			$scope.monthSelected = value;
			$scope.userDetails.dobMonth = value;
			$scope.dateSelected = 0;
			$scope.userDetails.dobDate = 0;
			$('.dobMonth').removeClass('box_error');
		};
		$scope.dobDateChange = function(value){
			$scope.dateSelected = value;
			$scope.userDetails.dobDate = value;
			$('.dobDate').removeClass('box_error');
		}
		
		$scope.daysInMonth = function(month) {
		    return new Date(2016, month, 0).getDate();
		};
		
		$scope.$watch('monthSelected',function(value){
			var numDates = $scope.daysInMonth(value);
			$scope.dates = [];
			for(var i = 0; i< numDates ;i++){
				$scope.dates.push({id:i+1, name:i+1+''});
			}
		});
		
		$scope.change = function(value) {
			$scope.userDetails['securityQuestion'] = value;
		}
		
		$scope.$watch('userDetails.answer',function(value){
			var msg = "";
			if(value && (value.length < 2 || value.length > 32)){
				msg = "Must contain 2 to 32 characters";
			}else if(value && !/^[A-z0-9]+$/.test(value)){
				msg = "Should not include any special characters: %,&,@,* _, ?, #, =, -.";
			}
			$scope.answerError = msg;
		});
		
	}]);
})();