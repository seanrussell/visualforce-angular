/**
 * Service that retrieves how to documentation data categories
 */
(function() {
	var documentationDataCategoriesService = function ($q) {
		'use strict';

		var documentationDataCategories = [];
		
		var deferred = $q.defer();

		var documentationDataCategoriesRO = new RemoteObjectModel.DocumentationCategory();

		this.getDocumentationDataCategories = function() {
			var constraints = {};
			return query(constraints);
		};

		function query(queryContraints) {		
	        documentationDataCategoriesRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	documentationDataCategories = toJson(records);
	                deferred.resolve(documentationDataCategories);
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

	documentationDataCategoriesService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('DocumentationDataCategoriesService', documentationDataCategoriesService);
}());

