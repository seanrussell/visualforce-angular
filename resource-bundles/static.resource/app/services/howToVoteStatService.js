/**
 * Service that retrieves how to Vote stats
 */
(function() {
	var howToVoteStatService = function ($q) {
		'use strict';

		var allChannels = 'AllChannels';
		
		var howToVoteStats = [];

		var deferred = $q.defer();

		var howToVoteStatRO = new RemoteObjectModel.HowToVoteStat();

		this.getHowToVoteStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		this.getHowToVoteStat = function(id) {
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
	        howToVoteStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	howToVoteStats = toJson(records);
	                deferred.resolve(howToVoteStats);
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

	howToVoteStatService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('HowToVoteStatService', howToVoteStatService);
}());

