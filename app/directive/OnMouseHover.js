(function(){
	var amex = angular.module('amex');
	amex.directive('onMouseHover',function() {
	    return {
	      restrict : 'A',
	      link : function($scope,$element,$attr) {
	    	  	$element.bind('mouseover',function() {	    	  		
	    	  		var tip = $(this).closest('.amex_input_box').find('.cusTooltip');
	    	  		if($(this).attr('confirmPass') == "enterPass"){
	    	  			tip = $('.enterPass').closest('.amex_input_box').find('.cusTooltip');
	    	  		}
	    	  		if($('.tooltipFocus').attr('isFocus') == 'NO')
	    	  		$(tip).css({'display':'block'});
	            });
	            $element.bind('mouseout',function() {
	            	
	            	var tip = $(this).closest('.amex_input_box').find('.cusTooltip');
	            	if($(this).attr('confirmPass') == "enterPass"){
	    	  			tip = $('.enterPass').closest('.amex_input_box').find('.cusTooltip');
	    	  		}
	            	if($('.tooltipFocus').attr('isFocus') == 'NO')
	            	$(tip).css({'display':'none'});	   
	            	
	            });
	        }
	    }
	});
})();