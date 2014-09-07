/**
 * The main knowledgeArticlesApp module
 */
 (function(){
 	angular.module('knowledgeArticlesApp', ['ngRoute', 'ngSanitize'])
		.config(function ($routeProvider) {
			'use strict';

			$routeProvider.when('/', {
				controller: 'KnowledgeArticlesController',
				templateUrl: 'apex/visualforce_angular_list'
			}).when('/How_To/:id/:lang', {
				controller: 'HowToArticleDetailsController',
				templateUrl: 'apex/visualforce_angular_detail_howto'
			}).when('/Documentation/:id/:lang', {
				controller: 'DocumentationArticleDetailsController',
				templateUrl: 'apex/visualforce_angular_detail_documentation'
			}).when('/FAQ/:id/:lang', {
				controller: 'FaqArticleDetailsController',
				templateUrl: 'apex/visualforce_angular_detail_faq'
			}).otherwise({
				redirectTo: '/'
			});
		});
 }());