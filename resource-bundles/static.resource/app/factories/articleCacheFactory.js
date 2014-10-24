(function(){
	var articleCache = function($cacheFactory) {
		return $cacheFactory('articleData');
  	};

	angular.module('knowledgeArticlesApp')
		.factory('ArticleCacheFactory', articleCache);
}());