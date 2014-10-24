/**
 * The controller that returns a specific faq article
 */
(function(){
	var faqArticleDetailsController = function ($scope, 
												articleCacheFactory,
												$routeParams, 
												faqArticlesService,
												faqViewStatService,
												faqVoteStatService) {
		'use strict';

		var cache = articleCacheFactory.get('articleData');

		$scope.articleWrapper = {};
		var article = {};
		var articleViewStat = {};
		var articleVoteStat = {};
		var articles = [];
		var articleViewStats = [];
		var articleVoteStats = [];
		var articleViewStatDetails = [];
		var articleVoteStatDetails = [];
		
		if (cache) {
			articles = cache.articles;
			var articleDetails = articles.filter(function (el) { return el.Id == $routeParams.id });
			article = articleDetails[0];

			articleViewStats = cache.articleViewStats;
			articleViewStatDetails = articleViewStats.filter(function(el) { return el.ParentId == article.KnowledgeArticleId });
			articleViewStat = articleViewStatDetails[0];

			articleVoteStats = cache.articleVoteStats;
			articleVoteStatDetails = articleVoteStats.filter(function(el) { return el.ParentId == article.KnowledgeArticleId });
			articleVoteStat = articleVoteStatDetails[0];

			var articleWrapper = translateToArticleWrapper(article, articleViewStat, articleVoteStat);
			$scope.articleWrapper = articleWrapper;
			
		} else {	
			faqArticlesService.getFaqArticle($routeParams.id, $routeParams.lang).then(function(record) {
				article = record[0];

				faqViewStatService.getFaqViewStat(article.KnowledgeArticleId).then(function(record) {
					articleViewStat = record[0];
					
					faqVoteStatService.getFaqVoteStat(article.KnowledgeArticleId).then(function(record) {
						articleVoteStat = record[0];
						
						var articleWrapper = translateToArticleWrapper(article, articleViewStat, articleVoteStat);
						$scope.articleWrapper = articleWrapper;
					});
				});
			});
		}
	
		function translateToArticleWrapper(article, viewStat, voteStat) {
			var wrapper = {};
			wrapper.id = article.Id
			wrapper.articleType = article.ArticleType.slice(0, -5);
			wrapper.title = article.Title;
			wrapper.summary = article.Summary;
			wrapper.question = article.Question__c;
			wrapper.answer = article.Answer__c;
			wrapper.publishDate = article.LastPublishedDate;
			wrapper.language = article.Language; 
			wrapper.viewCount = viewStat.ViewCount;
			wrapper.viewScore = viewStat.NormalizedScore;
			wrapper.voteCount = voteStat.WeightedCount;
			wrapper.voteScore = voteStat.NormalizedScore;
			return wrapper;
		}
	};

	faqArticleDetailsController.$inject = ['$scope', 
										'ArticleCacheFactory',
										'$routeParams', 
										'FaqArticlesService',
										'FaqViewStatService',
										'FaqVoteStatService'];

	angular.module('knowledgeArticlesApp')
		.controller('FaqArticleDetailsController', faqArticleDetailsController);
}());
