/**
 * Service that retrieves knowledge article vote stats
 */
(function() {
	var knowledgeArticlesVoteStatService = function ($q, 
													howToVoteStatService,
													documentationVoteStatService,
													faqVoteStatService) {
		'use strict';

		var allChannels = 'AllChannels';

		var articleVoteStats = [];
		
		var howtoVoteStats = [];
		var documentationVoteStats = [];
		var faqVoteStats = [];

		var deferred = $q.defer();

		//var knowledgeArticleVoteStatRO = new RemoteObjectModel.KnowledgeArticleVoteStat();

		this.getKnowledgeVoteStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		function query(queryContraints) {
			/*
	        knowledgeArticleVoteStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	articleVoteStats = toJson(records);
	                deferred.resolve(articleVoteStats);
	            }
	        });
	        */
	        howToVoteStatService.getHowToVoteStats().then(function(records) {
				articleVoteStats = articleVoteStats.concat(records);

				documentationVoteStatService.getDocumentationVoteStats().then(function(records) {
					articleVoteStats = articleVoteStats.concat(records);

					faqVoteStatService.getFaqVoteStats().then(function(records) {
						articleVoteStats = articleVoteStats.concat(records);
						deferred.resolve(articleVoteStats);
					});
				});
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

	knowledgeArticlesVoteStatService.$inject = ['$q', 'HowToVoteStatService', 'DocumentationVoteStatService', 'FaqVoteStatService'];

	angular.module('knowledgeArticlesApp')
		.service('KnowledgeArticlesVoteStatService', knowledgeArticlesVoteStatService);
}());

