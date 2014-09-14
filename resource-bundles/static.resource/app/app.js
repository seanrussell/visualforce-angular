/**
 * The main knowledgeArticlesApp module
 */
 (function(){
 	angular.module('knowledgeArticlesApp', ['ngRoute', 'pascalprecht.translate', 'tmh.dynamicLocale', 'ngSanitize', 'ngTouch', 'mobile-angular-ui'])
		.config(function ($routeProvider, $translateProvider, tmhDynamicLocaleProvider) {
			'use strict';

			tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.2.20/i18n/angular-locale_{{locale}}.js');

			/* Bind routes to controllers and views */
			$routeProvider.when('/', {
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

			/*  Provide translations for select languages */
			$translateProvider.translations('en_US', {
				TITLE_FILTER: 'Article Type',
			    DATE_SORT: 'Date',
			    VIEW_SORT: 'Views',
			    VOTE_SORT: 'Votes',
			    TITLE_SORT: 'Title',
			    PUB_DATE: 'Last Published',
			    HOWTO_FILTER: 'How To',
			    DOC_FILTER: 'Documentation',
			    FAQ_FILTER: 'FAQ'
			})
			.translations('it', {
				TITLE_FILTER: 'Tipo di articolo',
			    DATE_SORT: 'data',
			    VIEW_SORT: 'viste',
			    VOTE_SORT: 'Voti',
			    TITLE_SORT: 'titolo',
			    PUB_DATE: 'Ultimo Pubblicata',
			    HOWTO_FILTER: 'Come',
			    DOC_FILTER: 'Documentazione',
			    FAQ_FILTER: 'FAQ'	
			})
			.translations('ja', {
				TITLE_FILTER: '記事の種類',
			    DATE_SORT: '日付',
			    VIEW_SORT: '閲覧',
			    VOTE_SORT: '投票',
			    TITLE_SORT: 'タイトル',
			    PUB_DATE: '最後の公開',
			    HOWTO_FILTER: '方法',
			    DOC_FILTER: 'ドキュメンテーション',
			    FAQ_FILTER: 'よくある質問'	
			})
			.translations('zh_TW', {
				TITLE_FILTER: '文章類型',
			    DATE_SORT: '日期',
			    VIEW_SORT: '意見',
			    VOTE_SORT: '票',
			    TITLE_SORT: '標題',
			    PUB_DATE: '最後發表',
			    HOWTO_FILTER: '如何',
			    DOC_FILTER: '文檔',
			    FAQ_FILTER: '常問問題'	
			})
			.translations('es', {
				TITLE_FILTER: 'tipo de artículo',
			    DATE_SORT: 'Fecha',
			    VIEW_SORT: 'Vistas',
			    VOTE_SORT: 'Votos',
			    TITLE_SORT: 'Título',
			    PUB_DATE: 'Última fecha de publicación',
			    HOWTO_FILTER: 'Cómo',
			    DOC_FILTER: 'Documentación',
			    FAQ_FILTER: 'Preguntas más frecuentesP'	
			})
			.translations('fr', {
				TITLE_FILTER: 'type de produit',
			    DATE_SORT: 'date',
			    VIEW_SORT: 'vues',
			    VOTE_SORT: 'votes',
			    TITLE_SORT: 'titre',
			    PUB_DATE: 'la dernière publication',
			    HOWTO_FILTER: 'Comment',
			    DOC_FILTER: 'Documentation',
			    FAQ_FILTER: 'FAQ'	
			})
			.translations('de', {
				TITLE_FILTER: 'Artikel Typ',
			    DATE_SORT: 'Datum',
			    VIEW_SORT: 'Ansichten',
			    VOTE_SORT: 'Stimmen',
			    TITLE_SORT: 'Titel',
			    PUB_DATE: 'letzten veröffentlichten',
			    HOWTO_FILTER: 'Wie',
			    DOC_FILTER: 'Dokumentation',
			    FAQ_FILTER: 'FAQ'	
			})
			.translations('ko', {
				TITLE_FILTER: '제 유형',
			    DATE_SORT: '날짜',
			    VIEW_SORT: '조회 수',
			    VOTE_SORT: '투표',
			    TITLE_SORT: '제목',
			    PUB_DATE: '최근 게시',
			    HOWTO_FILTER: '방법',
			    DOC_FILTER: '문서',
			    FAQ_FILTER: 'FAQ'	
			})
			.translations('ru', {
				TITLE_FILTER: 'Тип статьи',
			    DATE_SORT: 'Дата',
			    VIEW_SORT: 'Просмотров',
			    VOTE_SORT: 'Голосов',
			    TITLE_SORT: 'Название',
			    PUB_DATE: 'Последние публикации',
			    HOWTO_FILTER: 'Как',
			    DOC_FILTER: 'Документация',
			    FAQ_FILTER: 'ЧАВО'	
			});

			$translateProvider.preferredLanguage('en_US');
		});
 }());