/**
 * The controller that returns a list of knowledge articles
 */
(function(){
	var knowledgeArticlesController = function ($scope, 
												$translate,
												tmhDynamicLocale,
												articleCacheFactory,
												knowledgeArticlesService, 
												knowledgeArticlesViewStatService, 
												knowledgeArticlesVoteStatService) {
		'use strict';

		$scope.lang = 'en_US';
		$scope.filterCriteria = { searchText: '' };
		$scope.sortBy = 'publishDate';
		$scope.reverse = false;
		$scope.articleWrappers = [];
		//$scope.articleTypes = [];

		tmhDynamicLocale.set(getCode($scope.lang));

		var articles = [];
		var articleViewStats = [];
		var articleVoteStats = [];
		var articleViewStatsMap = {};
		var articleVoteStatsMap = {};

		var cache = articleCacheFactory.get('articleData');

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
				//$scope.articleTypes = getUniqueArticleTypes(articles);
				
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
					});
				});
			});
		}
		
		$scope.getArticlesByLanguage = function(language) {
			$scope.lang = language;
			$translate.use($scope.lang);
			tmhDynamicLocale.set(getCode(language));
			
			var articles = [];
			var articleViewStats = [];
			var articleVoteStats = [];
			var articleViewStatsMap = {};
			var articleVoteStatsMap = {};
			
			knowledgeArticlesService.getKnowledgeArticles($scope.lang).then(function(records) {
				var cache = articleCacheFactory.get('articleData');

				articles = records;

				cache['articles'] = articles;

				articleViewStats = cache.articleViewStats;
				articleViewStatsMap = toMap(articleViewStats);

				articleVoteStats = cache.articleVoteStats;
				articleVoteStatsMap = toMap(articleVoteStats);

				$scope.articleWrappers = [];

				for (var i = 0; i < articles.length; i++) {
					var article = articles[i];	
					var articleWrapper = translateToArticleWrapper(article, 
																	articleViewStatsMap[article.KnowledgeArticleId],
																	articleVoteStatsMap[article.KnowledgeArticleId],
																	null);
					$scope.articleWrappers.push(articleWrapper);
				}	

				articleCacheFactory.put('articleData', cache);


			});
		}

		$scope.doSort = function(propName) {
			$scope.sortBy = propName;
			$scope.reverse = !$scope.reverse;
		};

		$scope.$on('renderStarRatings', function(scope, element, attrs){ 
			$('span.stars').stars(); 
		});

		$scope.$on('renderViewRatings', function(scope, element, attrs){ 
			$('span.views').views(); 
		});

		$scope.renderRatings = function() {};

		function getCode(code) {
			var langObj = {
				'en_US': 'en',
				'zh_TW': 'zh-tw',
				'it': 'it-it',
				'es': 'es-es',
				'fr': 'fr-fr',
				'de': 'de-de',
				'ko': 'ko-kr',
				'ja': 'ja-jp',
				'ru': 'ru-ru'
			};
			return langObj[code];
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
	};

	knowledgeArticlesController.$inject = ['$scope', 
											'$translate',
											'tmhDynamicLocale',
											'ArticleCacheFactory',
											'KnowledgeArticlesService',
											'KnowledgeArticlesViewStatService',
											'KnowledgeArticlesVoteStatService'];

	angular.module('knowledgeArticlesApp')
		.controller('KnowledgeArticlesController', knowledgeArticlesController);

}());
