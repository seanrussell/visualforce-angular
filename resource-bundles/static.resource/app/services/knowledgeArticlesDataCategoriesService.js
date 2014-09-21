/**
 * Service that retrieves knowledge article data categories
 */
(function() {
	var knowledgeArticlesDataCategoriesService = function ($q, 
														howToDataCategoriesService,
														documentationDataCategoriesService,
														faqDataCategoriesService) {
		'use strict';

		var articleDataCategories = [];
		
		var howtoDataCategories = [];
		var documentationDataCategories = [];
		var faqDataCategories = [];

		var deferred = $q.defer();

		this.getKnowledgeDataCategories = function() {
			var constraints = {};
			return query(constraints);
		};

		function query(queryContraints) {		
	        howToDataCategoriesService.getHowToDataCategories().then(function(records) {
				articleDataCategories = articleDataCategories.concat(records);

				documentationDataCategoriesService.getDocumentationDataCategories().then(function(records) {
					articleDataCategories = articleDataCategories.concat(records);

					faqDataCategoriesService.getFaqDataCategories().then(function(records) {
						articleDataCategories = articleDataCategories.concat(records);
						deferred.resolve(articleDataCategories);
					});
				});
			});

	        return deferred.promise;
	    }
	};

	knowledgeArticlesDataCategoriesService.$inject = ['$q', 
													'HowToDataCategoriesService', 
													'DocumentationDataCategoriesService', 
													'FaqDataCategoriesService'];

	angular.module('knowledgeArticlesApp')
		.service('KnowledgeArticlesDataCategoriesService', knowledgeArticlesDataCategoriesService);
}());

