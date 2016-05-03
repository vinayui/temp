(function(){
	var amex = angular.module('amex');
	amex.directive('onFocusBlur',function() {
	    return {
	        restrict : 'A',
	        link : function($scope,$element,$attr) {
	            $element.bind('focus',function() {
	            	
	            	var inputBox = $(this).closest('.amex_input_box');
	            	inputBox.removeClass('box_error').addClass('blue_focus');
	            	$('.tooltipFocus').attr('isFocus','YES');
	            	
	            	var tip = $(this).closest('.amex_input_box').find('.cusTooltip');
	            	if($(this).attr('confirmPass') == "enterPass"){
	    	  			tip = $('.enterPass').closest('.amex_input_box').find('.cusTooltip');
	    	  		}
	            	$(tip).css({'display':'block'});	
	            	
	            });
	            $element.bind('blur',function() {
	            	
	            	var inputBox = $(this).closest('.amex_input_box');
	            	inputBox.removeClass('blue_focus');
	            	$('.tooltipFocus').attr('isFocus','NO');
	            	
	            	var tip = $(this).closest('.amex_input_box').find('.cusTooltip');
	            	if($(this).attr('confirmPass') == "enterPass"){
	    	  			tip = $('.enterPass').closest('.amex_input_box').find('.cusTooltip');
	    	  		}
	            	$(tip).css({'display':'none'});	
	            	
	            });
	        }
	    }
	});
})();