/**
 * The controller that returns a specific documentation article
 */
(function(){
	var documentationArticleDetailsController = function ($scope, 
														articleCacheFactory,
														$routeParams, 
														$sce,
														documentationArticlesService,
														documentationViewStatService,
														documentationVoteStatService) {
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
			documentationArticlesService.getDocumentationArticle($routeParams.id, $routeParams.lang).then(function(record) {
				article = record[0];

				documentationViewStatService.getDocumentationViewStat(article.KnowledgeArticleId).then(function(record) {
					articleViewStat = record[0];
					
					documentationVoteStatService.getDocumentationVoteStat(article.KnowledgeArticleId).then(function(record) {
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

	documentationArticleDetailsController.$inject = ['$scope', 
													'ArticleCacheFactory',
													'$routeParams',
													'$sce',
													'DocumentationArticlesService', 
													'DocumentationViewStatService', 
													'DocumentationVoteStatService'];

	angular.module('knowledgeArticlesApp')
		.controller('DocumentationArticleDetailsController', documentationArticleDetailsController);
}());
