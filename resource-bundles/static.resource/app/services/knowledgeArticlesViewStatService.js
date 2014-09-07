/**
 * Service that retrieves knowledge article view stats
 */
(function() {
	var knowledgeArticlesViewStatService = function ($q, 
													howToViewStatService,
													documentationViewStatService,
													faqViewStatService) {
		'use strict';

		var allChannels = 'AllChannels';

		var articleViewStats = [];
		
		var howtoViewStats = [];
		var documentationViewStats = [];
		var faqViewStats = [];

		var deferred = $q.defer();

		//var knowledgeArticleViewStatRO = new RemoteObjectModel.KnowledgeArticleViewStat();

		this.getKnowledgeViewStats = function() {
			var constraints = {
				where: {
					Channel: { eq: allChannels }
				}
			};
			return query(constraints);
		};

		function query(queryContraints) {
			/*
	        knowledgeArticleViewStatRO.retrieve(queryContraints, function(error, records) {
	            if (error) {
	                deferred.reject(error);
	            } else {
	            	articleViewStats = toJson(records);
	                deferred.resolve(articleViewStats);
	            }
	        });
	        */
	        howToViewStatService.getHowToViewStats().then(function(records) {
				articleViewStats = articleViewStats.concat(records);

				documentationViewStatService.getDocumentationViewStats().then(function(records) {
					articleViewStats = articleViewStats.concat(records);

					faqViewStatService.getFaqViewStats().then(function(records) {
						articleViewStats = articleViewStats.concat(records);
						deferred.resolve(articleViewStats);
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

	knowledgeArticlesViewStatService.$inject = ['$q', 'HowToViewStatService', 'DocumentationViewStatService', 'FaqViewStatService'];

	angular.module('knowledgeArticlesApp')
		.service('KnowledgeArticlesViewStatService', knowledgeArticlesViewStatService);
}());

