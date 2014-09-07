(function(){
  var articleListFilter = function() {
	 return function(dataArray, criteria) {
      		if(!dataArray) 
      	      return;
      		if(!criteria) {
          		return dataArray;
       		} else {
          		var term;
              var articleTypes = [];
              for (var i in criteria) {
                if (i == 'searchText') {
                  term = criteria.searchText.toLowerCase();
                } else if (criteria[i] == true) {
                    articleTypes.push(i);
                }
              }
              if (articleTypes.length > 0 && term.length > 0) {
                return dataArray.filter(function(item) {
                    return ((item.title.toLowerCase().indexOf(term) > -1 || item.summary.toLowerCase().indexOf(term) > -1)
                            && articleTypes.indexOf(item.articleType) > -1);    
                });
              }
              if (articleTypes.length == 0) {
                return dataArray.filter(function(item) {
                    return item.title.toLowerCase().indexOf(term) > -1 || item.summary.toLowerCase().indexOf(term) > -1;              
                });
              } else {
                return dataArray.filter(function(item) {
                    return articleTypes.indexOf(item.articleType) > -1;    
                });
              }
       		} 
  		}
	};

	angular.module('knowledgeArticlesApp')
		.filter('ArticleListFilter', articleListFilter);

}());