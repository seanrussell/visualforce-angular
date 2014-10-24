/**
 * Service that retrieves documentation view stats
 */
(function() {
	var documentationViewStatService = function ($q) {
		'use strict';

		var allChannels = 'AllChannels';

		var documentationViewStats = [];

		var deferred = $q.defer();

		var documentationViewStatRO = new RemoteObjectModel.DocumentationViewStat();

		this.getDocumentationViewStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		this.getDocumentationViewStat = function(id) {
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
	        documentationViewStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	documentationViewStats = toJson(records);
	                deferred.resolve(documentationViewStats);
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

	documentationViewStatService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('DocumentationViewStatService', documentationViewStatService);
}());

