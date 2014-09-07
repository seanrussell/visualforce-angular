/**
 * Service that retrieves documentation articles
 */
(function() {
	var documentationArticlesService = function ($q) {
		'use strict';

		var pubStatus = 'Online';

		var articles = [];

		var deferred = $q.defer();

		var documentationArticleRO = new RemoteObjectModel.Documentation();

		this.getDocumentationArticles = function(lang) {
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

		this.getDocumentationArticle = function(id, lang) {
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
	        documentationArticleRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	            	console.log(error);
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

	documentationArticlesService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('DocumentationArticlesService', documentationArticlesService);
}());

	