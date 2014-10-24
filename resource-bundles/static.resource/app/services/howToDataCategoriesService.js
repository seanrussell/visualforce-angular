/**
 * Service that retrieves how to article data categories
 */
(function() {
	var howToDataCategoriesService = function ($q) {
		'use strict';

		var howToDataCategories = [];
		
		var deferred = $q.defer();

		var howToDataCategoriesRO = new RemoteObjectModel.HowToCategory();

		this.getHowToDataCategories = function() {
			var constraints = {};
			return query(constraints);
		};

		function query(queryContraints) {		
	        howToDataCategoriesRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	howToDataCategories = toJson(records);
	                deferred.resolve(howToDataCategories);
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

	howToDataCategoriesService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('HowToDataCategoriesService', howToDataCategoriesService);
}());

