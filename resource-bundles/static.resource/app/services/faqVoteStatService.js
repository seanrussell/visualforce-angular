/**
 * Service that retrieves faq vote stats
 */
(function() {
	var faqVoteStatService = function ($q) {
		'use strict';

		var allChannels = 'AllChannels';
		
		var faqVoteStats = [];

		var deferred = $q.defer();

		var faqVoteStatRO = new RemoteObjectModel.FAQVoteStat();

		this.getFaqVoteStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		this.getFaqVoteStat = function(id) {
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
	        faqVoteStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	faqVoteStats = toJson(records);
	                deferred.resolve(faqVoteStats);
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

	faqVoteStatService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('FaqVoteStatService', faqVoteStatService);
}());

