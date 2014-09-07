/**
 * Service that retrieves how to view stats
 */
(function() {
	var howToViewStatService = function ($q) {
		'use strict';

		var allChannels = 'AllChannels';
		
		var howToViewStats = [];

		var deferred = $q.defer();

		var howToViewStatRO = new RemoteObjectModel.HowToViewStat();

		this.getHowToViewStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		this.getHowToViewStat = function(id) {
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
	        howToViewStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	howToViewStats = toJson(records);
	                deferred.resolve(howToViewStats);
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

	howToViewStatService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('HowToViewStatService', howToViewStatService);
}());

