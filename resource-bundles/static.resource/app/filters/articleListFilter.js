(function(){
  var firstUpperCase = function (str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  };

  var doCategoriesMatch = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
  };
  
  var hasDataCategory = function(selCatObj, articleCatObj) {
    var hasCat = true;
    for (var i in selCatObj) {
      var arr = selCatObj[i];
      if (arr.length > 0) {
        var grp = firstUpperCase(i.toLowerCase());
        if (articleCatObj.hasOwnProperty(grp)) {
          var items = selCatObj[i];
          if (items.indexOf('All') >= 0) {
            hasCat = true;
          } else {
            hasCat = doCategoriesMatch(articleCatObj[grp], items);
          }
        } else {
          return false;
        }
      }
    }
    return hasCat;
  };

  var articleListFilter = function() {
      return function(dataArray, criteria) {
          if(!dataArray) { return; }
      		if(!criteria) { return dataArray; }

      		var term;
          var articleTypes = [];
          var dataCategories = {};
          var hasDataCategories = false;

          for (var i in criteria) {
            if (i == 'searchText') {
                term = criteria.searchText.toLowerCase();
            } else if (i == 'dataCategories') {
                var dataCatObj = criteria[i];
                dataCategories = dataCatObj;
                for (var j in dataCatObj) {
                  var dataCat = dataCatObj[j];
                  if (dataCat.length > 0) {
                    hasDataCategories = true;
                    break;
                  }
                }
            } else if (criteria[i] == true) {
                articleTypes.push(i);
            }
          }

          if (articleTypes.length == 0 && term.length == 0 && !hasDataCategories) {
            return dataArray;
          }
          if (articleTypes.length > 0 && term.length > 0 && hasDataCategories) {
            return dataArray.filter(function(item) {
                return ((item.title.toLowerCase().indexOf(term) > -1 || item.summary.toLowerCase().indexOf(term) > -1)
                        && articleTypes.indexOf(item.articleType) > -1 
                        && hasDataCategory(dataCategories, item.categories));    
            });
          } 
          if (articleTypes.length > 0 && term.length > 0 && !hasDataCategories) {
            return dataArray.filter(function(item) {
                return ((item.title.toLowerCase().indexOf(term) > -1 || item.summary.toLowerCase().indexOf(term) > -1)
                        && articleTypes.indexOf(item.articleType) > -1);    
            });
          } 
          if (articleTypes.length == 0 && term.length > 0 && hasDataCategories) {
            return dataArray.filter(function(item) {
                return ((item.title.toLowerCase().indexOf(term) > -1 || item.summary.toLowerCase().indexOf(term) > -1)
                        && hasDataCategory(dataCategories, item.categories));    
            });
          }
          if (articleTypes.length > 0 && term.length == 0 && hasDataCategories) {
            console.log('HERE');
            return dataArray.filter(function(item) {
                return (articleTypes.indexOf(item.articleType) > -1 
                        && hasDataCategory(dataCategories, item.categories));    
            });
          } 
          if (articleTypes.length == 0 && term.length > 0 && !hasDataCategories) {
            return dataArray.filter(function(item) {
                return item.title.toLowerCase().indexOf(term) > -1 || item.summary.toLowerCase().indexOf(term) > -1;              
            });
          } 
          if (articleTypes.length > 0 && term.length == 0 && !hasDataCategories) {
            return dataArray.filter(function(item) {
                return articleTypes.indexOf(item.articleType) > -1;    
            });
          }
          if (articleTypes.length == 0 && term.length == 0 && hasDataCategories) {
            return dataArray.filter(function(item) {
                return hasDataCategory(dataCategories, item.categories);    
            });
          }

  		}
	};

	angular.module('knowledgeArticlesApp')
		.filter('ArticleListFilter', articleListFilter);

}());