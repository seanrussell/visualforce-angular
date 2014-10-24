/**
 * The controller that manages knowledge articles
 */
(function(){
	var knowledgeArticlesController = function ($rootScope,
												$scope, 
												$translate,
												tmhDynamicLocale,
												articleCacheFactory,
												knowledgeArticlesService, 
												knowledgeArticlesViewStatService, 
												knowledgeArticlesVoteStatService,
												knowledgeArticlesDataCategoriesService,
												caseService) {
		'use strict';

		$rootScope.loading = true;

		$scope.lang = 'en_US';
		$scope.caseDetails = {
			Subject: '',
			Description: '',
			Status: 'Open',
			Origin: 'Web'
		};
		$scope.filterCriteria = { 
			searchText: '',
			dataCategories: {} 
		};
		$scope.allSelected = true;
		$scope.sortBy = 'publishDate';
		$scope.reverse = false;
		$scope.articleWrappers = [];

		tmhDynamicLocale.set(getCode($scope.lang));

		var articles = [];
		var articleViewStats = [];
		var articleVoteStats = [];
		var articleDataCategories = [];
		var articleViewStatsMap = {};
		var articleVoteStatsMap = {};
		var articleDataCategoriesMap = {};
		var articleDataCategoriesHierarchyMap = {};

		var cache = articleCacheFactory.get('articleData');

		if (cache) {
			articles = cache.articles;

			articleViewStats = cache.articleViewStats;
			articleViewStatsMap = toMap(articleViewStats);

			articleVoteStats = cache.articleVoteStats;
			articleVoteStatsMap = toMap(articleVoteStats);

			articleDataCategories = cache.articleDataCategories;
			articleDataCategoriesMap = groupDataCategoriesByArticle(articleDataCategories);
			articleDataCategoriesHierarchyMap = groupDataCategoriesByHierarchy(articleDataCategories);

			createArticleWrappers();
			
		} else {
			var articleData = {};

			knowledgeArticlesService.getKnowledgeArticles($scope.lang).then(function(records) {
				articles = records;
				articleData['articles'] = articles;
				
				knowledgeArticlesViewStatService.getKnowledgeViewStats().then(function(records) {
					articleViewStats = records;
					articleData['articleViewStats'] = articleViewStats;
					articleViewStatsMap = toMap(articleViewStats);
					
					knowledgeArticlesVoteStatService.getKnowledgeVoteStats().then(function(records) {
						articleVoteStats = records;
						articleData['articleVoteStats'] = articleVoteStats;
						articleVoteStatsMap = toMap(articleVoteStats);
						
						knowledgeArticlesDataCategoriesService.getKnowledgeDataCategories().then(function(records) {
							articleDataCategories = records;
							articleData['articleDataCategories'] = articleDataCategories;
							articleDataCategoriesMap = groupDataCategoriesByArticle(articleDataCategories);
							articleDataCategoriesHierarchyMap = groupDataCategoriesByHierarchy(articleDataCategories);

							createArticleWrappers();
							
							articleCacheFactory.put('articleData', articleData);
							$rootScope.loading = false;
						});		
					});
				});
			});
		}

		$rootScope.$on("$routeChangeStart", function(){
    		$rootScope.loading = true;
  		});

  		$rootScope.$on("$routeChangeSuccess", function(){
    		$rootScope.loading = false;
  		});

		$scope.getArticlesByLanguage = function(language) {
			$scope.lang = language;
			$translate.use($scope.lang);
			tmhDynamicLocale.set(getCode(language));

			knowledgeArticlesService.getKnowledgeArticles($scope.lang).then(function(records) {
				var cache = articleCacheFactory.get('articleData');

				articles = records;

				cache['articles'] = articles;

				articleViewStats = cache.articleViewStats;
				articleViewStatsMap = toMap(articleViewStats);

				articleVoteStats = cache.articleVoteStats;
				articleVoteStatsMap = toMap(articleVoteStats);

				articleDataCategories = cache.articleDataCategories;
				articleDataCategoriesMap = groupDataCategoriesByArticle(articleDataCategories);
				articleDataCategoriesHierarchyMap = groupDataCategoriesByHierarchy(articleDataCategories);

				$scope.articleWrappers = [];

				createArticleWrappers();
				
				articleCacheFactory.put('articleData', cache);
			});
		};

		$scope.doSort = function(propName) {
			$scope.sortBy = propName;
			$scope.reverse = !$scope.reverse;
		};

		$scope.submitCase = function() {
			caseService.submitCase($scope.caseDetails).then(function() {
				$rootScope.toggle('rightSidebar', 'off');
				$rootScope.toggle('successMsg', 'on');
			});
		};

		$scope.setCategoryFilter = function(group, category) {
			if ($scope.filterCriteria.dataCategories[group].indexOf(category) >= 0) {
				$scope.filterCriteria.dataCategories[group].shift();
			} else {
				$scope.filterCriteria.dataCategories[group].shift();
				$scope.filterCriteria.dataCategories[group].push(category);
			}
		}

		$scope.isCategorySelected = function(group, category) {
			return $scope.filterCriteria.dataCategories[group].indexOf(category) == -1;
		}

		$scope.setAllArticles = function(articleType) {	
			if (articleType == 'All') {
				$scope.allSelected = !$scope.allSelected;
				for (var i in $scope.filterCriteria) {
					if (i != 'searchText' && i != 'dataCategories') {
						$scope.filterCriteria[i] = $scope.allSelected;
					}
				}
			} 
		}

		function createArticleWrappers() {
			for (var i = 0; i < articles.length; i++) {
				var article = articles[i];	
				var articleWrapper = translateToArticleWrapper(article, 
																articleViewStatsMap[article.KnowledgeArticleId],
																articleVoteStatsMap[article.KnowledgeArticleId],
																articleDataCategoriesMap[article.Id]);
				$scope.articleWrappers.push(articleWrapper);
			}
		}

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
			wrapper.viewsWidth = calculateWidth(viewStat.NormalizedScore, 11);
			wrapper.voteCount = voteStat.WeightedCount;
			wrapper.voteScore = voteStat.NormalizedScore;
			wrapper.votesWidth = calculateWidth(voteStat.NormalizedScore, 16);
			wrapper.categories = (typeof dataCategories === 'undefined')? {}: dataCategories;
			return wrapper;
		}

		function groupDataCategoriesByArticle(dataCategories) {
			var objCat = {};
			for (var i = 0; i< dataCategories.length; i++) {
				var dataCatItem = dataCategories[i];
				var groupName = dataCatItem.DataCategoryGroupName;
				var catName = dataCatItem.DataCategoryName;
				var parentId = dataCatItem.ParentId;

				if (objCat.hasOwnProperty(parentId)) {
					var catGrpObj = objCat[parentId];
					if (catGrpObj.hasOwnProperty(groupName)) {
						catGrpObj[groupName].push(catName);
					} else {
						catGrpObj[groupName] = [catName];
					}
				} else {
					objCat[parentId] = {};
					objCat[parentId][groupName] = [catName];
				}
			}
			return objCat;
		}

		function groupDataCategoriesByHierarchy(dataCategories) {
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

		function calculateWidth(score, factor) {
			return Math.max(0, (Math.min(5, parseFloat(score)))) * factor;
		}
	};

	knowledgeArticlesController.$inject = ['$rootScope',
											'$scope', 
											'$translate',
											'tmhDynamicLocale',
											'ArticleCacheFactory',
											'KnowledgeArticlesService',
											'KnowledgeArticlesViewStatService',
											'KnowledgeArticlesVoteStatService',
											'KnowledgeArticlesDataCategoriesService',
											'CaseService'];

	angular.module('knowledgeArticlesApp')
		.controller('KnowledgeArticlesController', knowledgeArticlesController);

}());
