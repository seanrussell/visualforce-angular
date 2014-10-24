/**
 * Service that retrieves knowledge articles
 */
(function() {
	var knowledgeArticlesService = function ($q,
											howToArticlesService, 
											documentationArticlesService, 
											faqArticlesService) {
		'use strict';

		var pubStatus = 'Online';

		this.getKnowledgeArticles = function(lang) {
			var articles = [];

			var deferred = $q.defer();

	        howToArticlesService.getHowToArticles(lang).then(function(records) {
				articles = articles.concat(records);
				
				documentationArticlesService.getDocumentationArticles(lang).then(function(records) {
					articles = articles.concat(records);
				
					faqArticlesService.getFaqArticles(lang).then(function(records) {
						articles = articles.concat(records);
						deferred.resolve(articles);
					});
				});
			});	        

	        return deferred.promise;
		};
	};

	knowledgeArticlesService.$inject = ['$q', 
										'HowToArticlesService', 
										'DocumentationArticlesService', 
										'FaqArticlesService'];

	angular.module('knowledgeArticlesApp')
		.service('KnowledgeArticlesService', knowledgeArticlesService);
}());

