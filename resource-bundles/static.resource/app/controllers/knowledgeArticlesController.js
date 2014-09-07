/**
 * The controller that returns a list of knowledge articles
 */
(function(){
	var knowledgeArticlesController = function ($scope, 
												articleCacheFactory,
												knowledgeArticlesService, 
												knowledgeArticlesViewStatService, 
												knowledgeArticlesVoteStatService) {
		'use strict';

		var cache = articleCacheFactory.get('articleData');

		$scope.filterCriteria = {
			searchText: ''
		};
		$scope.sortBy = 'publishDate';
		$scope.reverse = false;
		$scope.articleWrappers = [];
		$scope.articleTypes = [];
		$scope.lang = 'en_US';

		var articles = [];
		var articleViewStats = [];
		var articleVoteStats = [];
		var articleViewStatsMap = {};
		var articleVoteStatsMap = {};

		if (cache) {
			articles = cache.articles;
			$scope.articleTypes = getUniqueArticleTypes(articles);

			articleViewStats = cache.articleViewStats;
			articleViewStatsMap = toMap(articleViewStats);

			articleVoteStats = cache.articleVoteStats;
			articleVoteStatsMap = toMap(articleVoteStats);

			for (var i = 0; i < articles.length; i++) {
				var article = articles[i];	
				var articleWrapper = translateToArticleWrapper(article, 
																articleViewStatsMap[article.KnowledgeArticleId],
																articleVoteStatsMap[article.KnowledgeArticleId],
																null);
				$scope.articleWrappers.push(articleWrapper);
			}

		} else {
			var articleData = {};

			knowledgeArticlesService.getKnowledgeArticles($scope.lang).then(function(records) {
				articles = records;
				articleData['articles'] = articles;
				$scope.articleTypes = getUniqueArticleTypes(articles);
				console.log(articles);
				
				knowledgeArticlesViewStatService.getKnowledgeViewStats().then(function(records) {
					articleViewStats = records;
					articleData['articleViewStats'] = articleViewStats;
					articleViewStatsMap = toMap(articleViewStats);
					
					knowledgeArticlesVoteStatService.getKnowledgeVoteStats().then(function(records) {
						articleVoteStats = records;
						articleData['articleVoteStats'] = articleVoteStats;
						articleVoteStatsMap = toMap(articleVoteStats);
						
						for (var i = 0; i < articles.length; i++) {
							var article = articles[i];	
							var articleWrapper = translateToArticleWrapper(article, 
																			articleViewStatsMap[article.KnowledgeArticleId],
																			articleVoteStatsMap[article.KnowledgeArticleId],
																			null);
							$scope.articleWrappers.push(articleWrapper);
						}

						articleCacheFactory.put('articleData', articleData);
						/*
						knowledgeArticlesDataCategoriesService.getKnowledgeDataCategories().then(function(records) {
							dataCategories = records;
							$scope.dataCategoriesAll = groupDataCategories(dataCategories);

							for (var i = 0; i < articles.length; i++) {
								var article = articles[i];
								var articleDataCategories = dataCategories.filter(function (el) { return el.ParentId == article.Id; });
								var groupedDataCategories = groupDataCategories(articleDataCategories);
								
								var articleWrapper = translateToArticleWrapper(article, 
																				articleViewStatsMap[article.KnowledgeArticleId],
																				articleVoteStatsMap[article.KnowledgeArticleId],
																				groupedDataCategories);
								$scope.articleWrappers.push(articleWrapper);
							}
						});	
						*/
					});
				});
			});
		}
		
		function toMap(records) {
			var objMap = {};
			for (var i = 0; i < records.length; i++) {
				var record = records[i];
				objMap[record.ParentId] = record;
			}
			return objMap;
		}
		
		function translateToArticleWrapper(article, viewStat, voteStat, dataCategories) {
			var wrapper = {};
			wrapper.id = article.Id
			wrapper.articleType = article.ArticleType.slice(0, -5);
			wrapper.title = article.Title;
			wrapper.summary = article.Summary;
			wrapper.publishDate = article.LastPublishedDate;
			wrapper.language = article.Language; 
			wrapper.viewCount = viewStat.ViewCount;
			wrapper.viewScore = viewStat.NormalizedScore;
			wrapper.voteCount = voteStat.WeightedCount;
			wrapper.voteScore = voteStat.NormalizedScore;
			wrapper.categories = dataCategories;
			return wrapper;
		}

		function groupDataCategories(dataCategories) {
			var objCat = {};
			for (var i = 0; i < dataCategories.length; i++) {
				var groupName = dataCategories[i].DataCategoryGroupName;
				var catName = dataCategories[i].DataCategoryName;
				if (objCat.hasOwnProperty(groupName)) {
					if (objCat[groupName].indexOf(catName) === -1) {
						objCat[groupName].push(catName);
					}
				} else {
					objCat[groupName] = [ catName ];
				}
			}
			return objCat;
		}

		function getUniqueArticleTypes(articles) {
			var arrTypes = [];
			for (var i = 0; i < articles.length; i++) {
				var article = articles[i];
				var articleType = article.ArticleType.slice(0, -5);
				if (arrTypes.indexOf(articleType) === -1) {
					arrTypes.push(articleType);
				}
			}
			return arrTypes;
		}

		$scope.doSort = function(propName) {
			$scope.sortBy = propName;
			$scope.reverse = !$scope.reverse;
		};
	};

	knowledgeArticlesController.$inject = ['$scope', 
											'ArticleCacheFactory',
											'KnowledgeArticlesService',
											'KnowledgeArticlesViewStatService',
											'KnowledgeArticlesVoteStatService'];

	angular.module('knowledgeArticlesApp')
		.controller('KnowledgeArticlesController', knowledgeArticlesController);

}());
