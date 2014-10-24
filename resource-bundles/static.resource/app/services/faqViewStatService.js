/**
 * Service that retrieves faq view stats
 */
(function() {
	var faqViewStatService = function ($q) {
		'use strict';

		var allChannels = 'AllChannels';
		
		var faqViewStats = [];

		var deferred = $q.defer();

		var faqViewStatRO = new RemoteObjectModel.FAQViewStat();

		this.getFaqViewStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		this.getFaqViewStat = function(id) {
			var constraints = {
				where: { 
					and: {
						Channel: { eq: allChannels },
						ParentId: { eq: id }  
					}
				}
	        };
			return query(constraints);
		};

		function query(queryContraints) {
	        faqViewStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	faqViewStats = toJson(records);
	                deferred.resolve(faqViewStats);
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

	faqViewStatService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('FaqViewStatService', faqViewStatService);
}());

