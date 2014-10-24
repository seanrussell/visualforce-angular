/**
 * Service that retrieves documentation vote stats
 */
(function() {
	var documentationVoteStatService = function ($q) {
		'use strict';

		var allChannels = 'AllChannels';

		var documentationVoteStats = [];

		var deferred = $q.defer();

		var documentationVoteStatRO = new RemoteObjectModel.DocumentationVoteStat();

		this.getDocumentationVoteStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		this.getDocumentationVoteStat = function(id) {
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
	        documentationVoteStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	documentationVoteStats = toJson(records);
	                deferred.resolve(documentationVoteStats);
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

	documentationVoteStatService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('DocumentationVoteStatService', documentationVoteStatService);
}());

