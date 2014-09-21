/**
 * Service that creates a case in salesforce
 */
(function() {
	var caseService = function ($q) {

		var caseRO = new RemoteObjectModel.Case();

		this.submitCase = function(caseDetails) {

			var deferred = $q.defer();	
			
			caseRO.create(caseDetails, function(error) {
	  			if (error) {
	  				console.log(error);
	  				deferred.reject(error);
	  			} else {
	  				deferred.resolve(caseRO.get('Id'));
				}
			});

			return deferred.promise;
		};

	};

	caseService.$inject = ['$q'];

	angular.module('knowledgeArticlesApp')
		.service('CaseService', caseService);
}());		