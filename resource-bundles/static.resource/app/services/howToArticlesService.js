/**
 * Service that retrieves how to articles
 */
(function() {
	var howToArticlesService = function ($q) {
		'use strict';

		var pubStatus = 'Online';

		var articles = [];

		var deferred = $q.defer();

		var howToArticleRO = new RemoteObjectModel.HowTo();

		this.getHowToArticles = function(lang) {
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

		this.getHowToArticle = function(id, lang) {
			var constraints = {
				where: { 
					and: {
						Id: { eq: id },
						Language: { eq: lang }  
					}
				}
	        };
			return query(constraints);
		};
		
		function query(queryContraints) {	
	        howToArticleRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	articles = toJson(records);
	                deferred.resolve(articles);
	            }
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

	howToArticlesService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('HowToArticlesService', howToArticlesService);
}());

	