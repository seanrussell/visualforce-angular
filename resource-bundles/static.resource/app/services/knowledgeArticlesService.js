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
		var languageCode;

		var articles = [];

		var deferred = $q.defer();

		//var knowledgeArticleRO = new RemoteObjectModel.KnowledgeArticleVersion();

		this.getKnowledgeArticles = function(lang) {
			languageCode = lang;
			/* 
			 * Need at least the publish status and language
			 * for retrieving knowledge article version records
			 */
			var constraints = {
				where: { 
					and: {
						PublishStatus: { eq: pubStatus }, 
						Language: { eq: lang }  
					}
				}
	        };
			return query(constraints);
		};

		function query(queryContraints) {
			/*
	        knowledgeArticleRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	articles = toJson(records);
	                deferred.resolve(articles);
	            }
	        });
	        */
	        howToArticlesService.getHowToArticles(languageCode).then(function(records) {
				articles = articles.concat(records);

				documentationArticlesService.getDocumentationArticles(languageCode).then(function(records) {
					articles = articles.concat(records);

					faqArticlesService.getFaqArticles(languageCode).then(function(records) {
						articles = articles.concat(records);
						deferred.resolve(articles);
					});
				});
			});
	        
	        return deferred.promise;
	    }

	    // grab _props from each record object so we can get key/value pairs
	    function toJson(records) {
	    	return records.map(function(r) {
	    		return r['_props'];
	    	});
	    }

	};

	knowledgeArticlesService.$inject = ['$q', 'HowToArticlesService', 'DocumentationArticlesService', 'FaqArticlesService'];

	angular.module('knowledgeArticlesApp')
		.service('KnowledgeArticlesService', knowledgeArticlesService);
}());

