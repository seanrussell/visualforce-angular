(function(){
	var renderDirective = function($timeout) {
  		return function(scope, element, attrs) {
    		if (scope.$last){
    			$timeout(function() {
    				scope.$emit('renderStarRatings', element, attrs);
    				scope.$emit('renderViewRatings', element, attrs);
    			}, 200);		
    		}
  		}
  	};

  	renderDirective.$inject = ['$timeout'];

	angular.module('knowledgeArticlesApp')
		.directive('renderDirective', renderDirective);
}());