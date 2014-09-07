/**
 * The controller that returns a specific how to article
 */
(function(){
	var howToArticleDetailsController = function ($scope, 
												articleCacheFactory,
												$routeParams, 
												$sce,
												howToArticlesService, 
												howToViewStatService, 
												howToVoteStatService) {
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
			howToArticlesService.getHowToArticle($routeParams.id, $routeParams.lang).then(function(record) {
				article = record[0];

				howToViewStatService.getHowToViewStat(article.KnowledgeArticleId).then(function(record) {
					articleViewStat = record[0];
					
					howToVoteStatService.getHowToVoteStat(article.KnowledgeArticleId).then(function(record) {
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
			wrapper.content = decodeHtml($sce.trustAsHtml(article.Content__c));
			wrapper.publishDate = article.LastPublishedDate;
			wrapper.language = article.Language; 
			wrapper.viewCount = viewStat.ViewCount;
			wrapper.viewScore = viewStat.NormalizedScore;
			wrapper.voteCount = voteStat.WeightedCount;
			wrapper.voteScore = voteStat.NormalizedScore;
			return wrapper;
		}

		function decodeHtml(input) {
			var e = document.createElement('div');
  			e.innerHTML = input;
  			return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
		}
	};

	howToArticleDetailsController.$inject = ['$scope',
											'ArticleCacheFactory', 
											'$routeParams', 
											'$sce',
											'HowToArticlesService', 
											'HowToViewStatService', 
											'HowToVoteStatService'];

	angular.module('knowledgeArticlesApp')
		.controller('HowToArticleDetailsController', howToArticleDetailsController);
}());
