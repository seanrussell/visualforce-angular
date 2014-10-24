/**
 * Service that retrieves faq article data categories
 */
(function() {
	var faqDataCategoriesService = function ($q) {
		'use strict';

		var faqDataCategories = [];
		
		var deferred = $q.defer();

		var faqDataCategoriesRO = new RemoteObjectModel.FAQCategory();

		this.getFaqDataCategories = function() {
			var constraints = {};
			return query(constraints);
		};

		function query(queryContraints) {		
	        faqDataCategoriesRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	faqDataCategories = toJson(records);
	                deferred.resolve(faqDataCategories);
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

	faqDataCategoriesService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('FaqDataCategoriesService', faqDataCategoriesService);
}());

