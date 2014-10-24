/**
 * The main knowledgeArticlesApp module
 */
 (function(){
 	var knowledgeApp = angular.module('knowledgeArticlesApp', ['ngRoute', 
					 											'pascalprecht.translate', 
					 											'tmh.dynamicLocale', 
					 											'ngSanitize', 
					 											'ngTouch', 
					 											'mobile-angular-ui', 
					 											'ngAnimate']);


 	knowledgeApp.config(['$routeProvider', 
 						'$translateProvider', 
 						'tmhDynamicLocaleProvider', function ($routeProvider, $translateProvider, tmhDynamicLocaleProvider) {
			'use strict';

			/* Set the pattern that locale files follow */
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
				/* App title Label */
				SK: 'Knowledge',

				/* Sorting Labels */
			    DATE_SORT: 'Date',
			    VIEW_SORT: 'Views',
			    VOTE_SORT: 'Votes',
			    TITLE_SORT: 'Title',

			    /* Article Type Labels */
			    TITLE_FILTER: 'Article Type',
			    ALL_FILTER: 'All Article Types',
			    HOW_TO_FILTER: 'How To',
			    DOCUMENTATION_FILTER: 'Documentation',
			    FAQ_FILTER: 'FAQ',

			    /* Data Category Labels */
			    DATA_CAT_FILTER: 'Data Category',
			    INQUIRIES_FILTER: 'Inquiries',
			    PROCEDURES_FILTER: 'Procedures',
			    PRODUCTS_FILTER: 'Products',
			    ALL_CAT_FILTER: 'All',
			    HAIR_COLORING_FILTER: 'Hair Coloring',
			    HAIR_CARE_FILTER: 'Hair Care',
			    WASHING_FILTER: 'Washing',
			    TREATING_FILTER: 'Treating',
			    COMPANY_FILTER: 'Company',
			    EQUIPMENT_FILTER: 'Equipment',

			    /* Language Labels */
			    LANG_FILTER: 'Language',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: 'Feedback',
			    HELP_SUBTITLE_FILTER: 'Submit a comment',
			    SUBJECT_FILTER: 'Subject',
			    COMMENT_FILTER: 'Comment',
			    SUBMIT_FILTER: 'Submit Feedback',
			    FEEDBACK_TITLE_FILTER: 'Feedback Submitted',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: 'Congratulations! Your feedback was successfully submitted and a case has been created on our support team. Your concerns will be promptly disregarded.',
			    FEEDBACK_OK: 'Ok',

			    /* Article Labels */
			    PUB_DATE: 'Last Published'
			})
			.translations('it', {
				/* App title Label */
				SK: 'cognizioni',

				/* Sorting Labels */
			    DATE_SORT: 'data',
			    VIEW_SORT: 'viste',
			    VOTE_SORT: 'Voti',
			    TITLE_SORT: 'titolo',
			    
			    /* Article Type Labels */
			    TITLE_FILTER: 'Tipo di articolo',
			    ALL_FILTER: 'Tutti i tipi di Articolo',
			    HOW_TO_FILTER: 'Come',
			    DOCUMENTATION_FILTER: 'Documentazione',
			    FAQ_FILTER: 'FAQ',	

			    /* Data Category Labels */
			    DATA_CAT_FILTER: 'dati Categoria',
			    INQUIRIES_FILTER: 'Richieste',
			    PROCEDURES_FILTER: 'Procedure',
			    PRODUCTS_FILTER: 'Prodotti',
			    ALL_CAT_FILTER: 'tutto',
			    HAIR_COLORING_FILTER: 'Colore dei capelli',
			    HAIR_CARE_FILTER: 'Cura dei capelli',
			    WASHING_FILTER: 'Cura dei capelli',
			    TREATING_FILTER: 'Trattamento',
			    COMPANY_FILTER: 'azienda',
			    EQUIPMENT_FILTER: 'attrezzatura',

			    /* Language Labels */
			    LANG_FILTER: 'lingua',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: 'retroazione',
			    HELP_SUBTITLE_FILTER: 'inviare un commento',
			    SUBJECT_FILTER: 'soggetto',
			    COMMENT_FILTER: 'commento',
			    SUBMIT_FILTER: 'Inserisci un feedback',
			    FEEDBACK_TITLE_FILTER: 'Commenti Inserito',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: 'Congratulazioni! Il tuo feedback è stato presentato con successo e un caso è stato creato il nostro team di supporto. Le vostre preoccupazioni saranno prontamente ignorati.',
			    FEEDBACK_OK: 'ok',

			    /* Article Labels */
			    PUB_DATE: 'Ultimo Pubblicata'
			})
			.translations('ja', {
				/* App title Label */
				SK: '知識',

				/* Sorting Labels */
			    DATE_SORT: '日付',
			    VIEW_SORT: '閲覧',
			    VOTE_SORT: '投票',
			    TITLE_SORT: 'タイトル',

			    /* Article Type Labels */
			    TITLE_FILTER: '記事の種類',
			    ALL_FILTER: 'すべての投稿タイプ',
			    HOW_TO_FILTER: '方法',
			    DOCUMENTATION_FILTER: 'ドキュメンテーション',
			    FAQ_FILTER: 'よくある質問'	,

			    /* Data Category Labels */
			    DATA_CAT_FILTER: 'データカテゴリ',
			    INQUIRIES_FILTER: 'お問い合わせ',
			    PROCEDURES_FILTER: '手続き',
			    PRODUCTS_FILTER: '製品All',
			    ALL_CAT_FILTER: 'すべて',
			    HAIR_COLORING_FILTER: 'ヘアカラー',
			    HAIR_CARE_FILTER: 'ヘアケア',
			    WASHING_FILTER: '洗髪',
			    TREATING_FILTER: '治療',
			    COMPANY_FILTER: '会社',
			    EQUIPMENT_FILTER: '機器',

			    /* Language Labels */
			    LANG_FILTER: '言語',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: 'フィードバック',
			    HELP_SUBTITLE_FILTER: '意見を投稿',
			    SUBJECT_FILTER: 'テーマ',
			    COMMENT_FILTER: 'コメント',
			    SUBMIT_FILTER: 'フィードバックの送信',
			    FEEDBACK_TITLE_FILTER: '提出フィードバック',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: 'おめでとう！ご意見は首尾よく家に提出し、弊社のサポートチームに作成されていました。あなたの懸念は速やかに無視されます。',
			    FEEDBACK_OK: 'Ok',

			    /* Article Labels */
			    PUB_DATE: '最後の公開'
			})
			.translations('zh_TW', {
				/* App title Label */
				SK: '知識',

				/* Sorting Labels */
				TITLE_SORT: '標題',
			    DATE_SORT: '日期',
			    VIEW_SORT: '意見',
			    VOTE_SORT: '票',

			    /* Article Type Labels */
			    TITLE_FILTER: '文章類型',
			    ALL_FILTER: '所有文章種類',
			    HOW_TO_FILTER: '如何',
			    DOCUMENTATION_FILTER: '文檔',
			    FAQ_FILTER: '常問問題',

			    /* Data Category Labels */
			    DATA_CAT_FILTER: '數據分類',
			    INQUIRIES_FILTER: '查詢',
			    PROCEDURES_FILTER: '程序',
			    PRODUCTS_FILTER: '產品展示',
			    ALL_CAT_FILTER: '所有',
			    HAIR_COLORING_FILTER: '染髮',
			    HAIR_CARE_FILTER: '頭髮護理',
			    WASHING_FILTER: '洗髮',
			    TREATING_FILTER: '頭髮護理',
			    COMPANY_FILTER: '企業',
			    EQUIPMENT_FILTER: '設備',

			    /* Language Labels */
			    LANG_FILTER: '語言',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: '反饋',
			    HELP_SUBTITLE_FILTER: '提交評論',
			    SUBJECT_FILTER: '主題',
			    COMMENT_FILTER: '評論',
			    SUBMIT_FILTER: '提交反饋',
			    FEEDBACK_TITLE_FILTER: '提交反饋',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: '恭喜您！您的反饋已成功提交，情況對我們的支持團隊已經創建。您的問題將及時忽視。',
			    FEEDBACK_OK: 'OK',

			    /* Article Labels */
			    PUB_DATE: '最後發表'	
			})
			.translations('es', {
				/* App title Label */
				SK: 'Conocimiento',

				/* Sorting Labels */
			    DATE_SORT: 'Fecha',
			    VIEW_SORT: 'Vistas',
			    VOTE_SORT: 'Votos',
			    TITLE_SORT: 'Título',
			    
			    /* Article Type Labels */
			    TITLE_FILTER: 'tipo de artículo',
			    ALL_FILTER: 'Todos los tipos de artículos',
			    HOW_TO_FILTER: 'Cómo',
			    DOCUMENTATION_FILTER: 'Documentación',
			    FAQ_FILTER: 'Preguntas más frecuentes',

			    /* Data Category Labels */
			    DATA_CAT_FILTER: 'Categoría de datos',
			    INQUIRIES_FILTER: 'Consultas',
			    PROCEDURES_FILTER: 'Procedimientos',
			    PRODUCTS_FILTER: 'Productos',
			    ALL_CAT_FILTER: 'Todos',
			    HAIR_COLORING_FILTER: 'Teñir el cabello',
			    HAIR_CARE_FILTER: 'Cuidado del Cabello',
			    WASHING_FILTER: 'lavado de cabello',
			    TREATING_FILTER: 'el tratamiento del cabello',
			    COMPANY_FILTER: 'Empresa',
			    EQUIPMENT_FILTER: 'Equipos',

			    /* Language Labels */
			    LANG_FILTER: 'Idioma',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: 'realimentación',
			    HELP_SUBTITLE_FILTER: 'Enviar un comentario',
			    SUBJECT_FILTER: 'Asunto',
			    COMMENT_FILTER: 'comentario',
			    SUBMIT_FILTER: 'Enviar comentarios',
			    FEEDBACK_TITLE_FILTER: 'Feedback Enviado',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: '¡Enhorabuena! Su regeneración se ha enviado correctamente y un caso se ha creado en nuestro equipo de soporte. Sus preocupaciones se tendrán en cuenta de inmediato.',
			    FEEDBACK_OK: 'Okay',

			    /* Article Labels */
			    PUB_DATE: 'Última fecha de publicación'	
			})
			.translations('fr', {
				/* App title Label */
				SK: 'Conocimiento',

				/* Sorting Labels */
			    DATE_SORT: 'date',
			    VIEW_SORT: 'vues',
			    VOTE_SORT: 'votes',
			    TITLE_SORT: 'titre',
			    
			    /* Article Type Labels */
			    TITLE_FILTER: 'type de produit',
			    ALL_FILTER: 'Tous les types',
			    HOW_TO_FILTER: 'Comment',
			    DOCUMENTATION_FILTER: 'Documentation',
			    FAQ_FILTER: 'FAQ',	

			    /* Data Category Labels */
			    DATA_CAT_FILTER: 'Catégorie de données',
			    INQUIRIES_FILTER: 'enquêtes',
			    PROCEDURES_FILTER: 'procédures',
			    PRODUCTS_FILTER: 'produits',
			    ALL_CAT_FILTER: 'tous',
			    HAIR_COLORING_FILTER: 'Coloriage cheveux',
			    HAIR_CARE_FILTER: 'Soins des cheveux',
			    WASHING_FILTER: 'Se laver les cheveux',
			    TREATING_FILTER: 'cheveux traitement',
			    COMPANY_FILTER: 'entreprise',
			    EQUIPMENT_FILTER: 'équipement',

			    /* Language Labels */
			    LANG_FILTER: 'langue',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: 'réaction',
			    HELP_SUBTITLE_FILTER: 'Ecrire un commentaire',
			    SUBJECT_FILTER: 'sujet',
			    COMMENT_FILTER: 'commentaire',
			    SUBMIT_FILTER: 'Envoyer des commentaires',
			    FEEDBACK_TITLE_FILTER: 'Commentaires Soumis',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: 'Félicitations! Vos commentaires a été soumis avec succès et un cas a été créé sur notre équipe d\'assistance. Vos préoccupations seront ignorés rapidement.',
			    FEEDBACK_OK: 'Dáccord',

			    /* Article Labels */
			    PUB_DATE: 'la dernière publication'
			})
			.translations('de', {
				/* App title Label */
				SK: 'Wissen',

				/* Sorting Labels */
			    DATE_SORT: 'Datum',
			    VIEW_SORT: 'Ansichten',
			    VOTE_SORT: 'Stimmen',
			    TITLE_SORT: 'Titel',
			    
			    /* Article Type Labels */
			    TITLE_FILTER: 'Artikel Typ',
			    ALL_FILTER: 'Alle Artikel Typen',
			    HOW_TO_FILTER: 'Wie',
			    DOCUMENTATION_FILTER: 'Dokumentation',
			    FAQ_FILTER: 'FAQ',

			    /* Data Category Labels */
			    DATA_CAT_FILTER: 'Daten Kategorie',
			    INQUIRIES_FILTER: 'Anfragen',
			    PROCEDURES_FILTER: 'Verfahren',
			    PRODUCTS_FILTER: 'Produkte',
			    ALL_CAT_FILTER: 'alle',
			    HAIR_COLORING_FILTER: 'Haare färben',
			    HAIR_CARE_FILTER: 'Haarpflege',
			    WASHING_FILTER: 'Haarwäsche',
			    TREATING_FILTER: 'Haarbehandlung',
			    COMPANY_FILTER: 'Firma',
			    EQUIPMENT_FILTER: 'Ausrüstung',

			    /* Language Labels */
			    LANG_FILTER: 'Sprache',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: 'Rückkopplung',
			    HELP_SUBTITLE_FILTER: 'Einen Kommentar abgeben',
			    SUBJECT_FILTER: 'Thema',
			    COMMENT_FILTER: 'Kommentar',
			    SUBMIT_FILTER: 'Bestätige Feedback',
			    FEEDBACK_TITLE_FILTER: 'Feedback eingereicht',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: 'Herzlichen Glückwunsch! Ihr Feedback wurde erfolgreich abgegeben und ein Fall auf unser Support-Team erstellt. Ihr Anliegen wird umgehend außer Acht gelassen werden.',
			    FEEDBACK_OK: 'Ok',

			    /* Article Labels */
			    PUB_DATE: 'letzten veröffentlichten'	
			})
			.translations('ko', {
				/* App title Label */
				SK: '지식',
				
				/* Sorting Labels */
			    DATE_SORT: '날짜',
			    VIEW_SORT: '조회 수',
			    VOTE_SORT: '투표',
			    TITLE_SORT: '제목',
			    
			    /* Article Type Labels */
			    TITLE_FILTER: '제 유형',
			    ALL_FILTER: '모든 기술 유형',
			    HOW_TO_FILTER: '방법',
			    DOCUMENTATION_FILTER: '문서',
			    FAQ_FILTER: 'FAQ',

			    /* Data Category Labels */
			    DATA_CAT_FILTER: '데이터 종류',
			    INQUIRIES_FILTER: '문의',
			    PROCEDURES_FILTER: '절차',
			    PRODUCTS_FILTER: '제품',
			    ALL_CAT_FILTER: '모든',
			    HAIR_COLORING_FILTER: '헤어 컬러',
			    HAIR_CARE_FILTER: '헤어 케어',
			    WASHING_FILTER: '머리 세척',
			    TREATING_FILTER: '헤어 트리트먼트',
			    COMPANY_FILTER: '회사',
			    EQUIPMENT_FILTER: '장비',

			    /* Language Labels */
			    LANG_FILTER: '언어',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: '피드백',
			    HELP_SUBTITLE_FILTER: '의견 제출',
			    SUBJECT_FILTER: '주제',
			    COMMENT_FILTER: '댓글',
			    SUBMIT_FILTER: '의견 제출',
			    FEEDBACK_TITLE_FILTER: '의견 제출',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: '축하합니다! 여러분의 의견은 성공적으로 제출하고 사건은 우리의 지원 팀에서 작성되었습니다. 당신의 관심은 즉시 무시됩니다.',
			    FEEDBACK_OK: '확인',

			    /* Article Labels */
			    PUB_DATE: '최근 게시'	
			})
			.translations('ru', {
				/* App title Label */
				SK: '지식',
				
				/* Sorting Labels */		
			    DATE_SORT: 'Дата',
			    VIEW_SORT: 'Просмотров',
			    VOTE_SORT: 'Голосов',
			    TITLE_SORT: 'Название',
			    
			    /* Article Type Labels */
			    TITLE_FILTER: 'Тип статьи',
			    ALL_FILTER: 'Все типы Статья',
			    HOW_TO_FILTER: 'Как',
			    DOCUMENTATION_FILTER: 'Документация',
			    FAQ_FILTER: 'ЧАВО',

			    /* Data Category Labels */
			    DATA_CAT_FILTER: 'Данные Категория',
			    INQUIRIES_FILTER: 'Запросы',
			    PROCEDURES_FILTER: 'Процедуры',
			    PRODUCTS_FILTER: 'Продукты',
			    ALL_CAT_FILTER: 'Все',
			    HAIR_COLORING_FILTER: 'Окрашивание волос',
			    HAIR_CARE_FILTER: 'Уход за волосами',
			    WASHING_FILTER: 'Мытье волос',
			    TREATING_FILTER: 'Лечение волос',
			    COMPANY_FILTER: 'Компания',
			    EQUIPMENT_FILTER: 'оборудование',

			    /* Language Labels */
			    LANG_FILTER: 'Язык',

			    /* Feedback Labels */
			    HELP_TITLE_FILTER: 'Обратная связь',
			    HELP_SUBTITLE_FILTER: 'Отправить комментарий',
			    SUBJECT_FILTER: 'Тема',
			    COMMENT_FILTER: 'Комментарий',
			    SUBMIT_FILTER: 'Оставить отзыв',
			    FEEDBACK_TITLE_FILTER: 'Обратная связь Представленные',
			    FEEDBACK_ERROR_TEXT: '',
			    FEEDBACK_SUCCESS_TEXT: 'Поздравляем! Ваш отзыв был успешно представлен и случай был создан в нашей команде поддержки. Ваши проблемы будут оперативно приниматься во внимание.',
			    FEEDBACK_OK: 'Хорошо',

			    PUB_DATE: 'Последние публикации'	
			});

			/* Set the default locale */
			$translateProvider.preferredLanguage('en_US');
		}]);
 }());