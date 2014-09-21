public with sharing class FilterController {
	private final String ARTICLE_TYPE_SUFFIX = '__kav';
	private List<ArticleType> articleTypes;
	private List<String> objTypes;
  private Map<String, List<DataCategorySet>> dataCategoryGroups;

	public FilterController() {
      articleTypes = new List<ArticleType>{ new ArticleType('ALL_FILTER', 'All') };	
      objTypes = new List<String>();
      dataCategoryGroups = new Map<String, List<DataCategorySet>>();
	}

	public List<ArticleType> getArticleTypes() {
		  Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
      Set<String> keySet = gd.keySet();
      for (String key : keySet) {
          Schema.SObjectType objectType = gd.get(key);
          if (key.endsWith(ARTICLE_TYPE_SUFFIX)) {
              String typeName = objectType.getDescribe().getLabel();
              this.objTypes.add(objectType.getDescribe().getName());
              String placeholder = typeName.toUpperCase().replaceAll(' ', '_') + '_FILTER';
              String filterTag = typeName.replaceAll(' ', '_');
              this.articleTypes.add(new ArticleType(placeholder, filterTag));
          }
      }
		  return articleTypes;
	}

  public Map<String, List<DataCategorySet>> getDataCategorySets() {
	    List<DescribeDataCategoryGroupResult> describeCategoryResult;
    	List<DescribeDataCategoryGroupStructureResult> describeCategoryStructureResult;
      
      List<String> objTypes = new List<String>();
      objTypes.add('KnowledgeArticleVersion');

    	describeCategoryResult = Schema.describeDataCategoryGroups(objTypes);         
    	List<DataCategoryGroupSobjectTypePair> pairs = new List<DataCategoryGroupSobjectTypePair>();
     
    	for (DescribeDataCategoryGroupResult singleResult: describeCategoryResult) {
        	DataCategoryGroupSobjectTypePair p = new DataCategoryGroupSobjectTypePair();
        	p.setSobject(singleResult.getSobject());
        	p.setDataCategoryGroupName(singleResult.getName());
        	pairs.add(p);
     	}
     
     	describeCategoryStructureResult = Schema.describeDataCategoryGroupStructures(pairs, false);

     	for (DescribeDataCategoryGroupStructureResult singleResult: describeCategoryStructureResult) {
          String dataCategoryGroupName = singleResult.getName().toUpperCase();
          dataCategoryGroups.put(dataCategoryGroupName, new List<DataCategorySet>());
          DataCategory[] toplevelCategories = singleResult.getTopCategories();
          
          List<DataCategory> allCategories = getAllCategories(toplevelCategories);
          
          List<DataCategorySet> dataCategorySet = new List<DataCategorySet>();
          
          for (DataCategory category: allCategories) {
              String categoryName = category.getName();
              if (categoryName.equals('All')) {
                  String placeholder = categoryName.toUpperCase().replaceAll(' ', '_') + '_CAT_FILTER';
                  DataCategorySet catSet = new DataCategorySet(placeholder, 'level0', categoryName, categoryName);
                  dataCategorySet.add(catSet);
                  DataCategory[] childCategories = category.getChildCategories();
                  if (childCategories.size() > 0) {
                     for (DataCategory dc: childCategories) {
                         categoryName = dc.getName();
                         placeholder = categoryName.toUpperCase().replaceAll(' ', '_') + '_FILTER';
                         catSet = new DataCategorySet(placeholder, 'level1', categoryName, dc.getLabel());
                         dataCategorySet.add(catSet);
                         childCategories = dc.getChildCategories();
                         if (childCategories.size() > 0) {
                            for (DataCategory dataCat: childCategories) {
                                categoryName = dataCat.getName();
                                placeholder = categoryName.toUpperCase().replaceAll(' ', '_') + '_FILTER';
                                catSet = new DataCategorySet(placeholder, 'level2', categoryName, dataCat.getLabel());
                                dataCategorySet.add(catSet);
                                childCategories = dataCat.getChildCategories();
                                if (childCategories.size() > 0) {
                                    // limit 5 levels deep
                                }
                            }
                         }
                     }
                  }
              }
          }
            
          dataCategoryGroups.put(dataCategoryGroupName, dataCategorySet);
       	}
      	
      	return dataCategoryGroups;
    }

   	private DataCategory[] getAllCategories(DataCategory[] categories){
    	if (categories.isEmpty()) {
        	return new DataCategory[]{};
      	} else {
        	DataCategory[] categoriesClone = categories.clone();
         	DataCategory category = categoriesClone[0];
         	DataCategory[] allCategories = new DataCategory[]{ category };
         	categoriesClone.remove(0);
         	categoriesClone.addAll(category.getChildCategories());
         	allCategories.addAll(getAllCategories(categoriesClone));
         	return allCategories;
      	}
   	}

  	public class ArticleType {
    		public String placeholder { get; set; }
    		public String filterTag { get; set; }

    		public ArticleType(String ph, String ft) {
      			placeholder = ph;
      			filterTag = ft;
    		}
  	}

  	public class DataCategorySet {
        public String placeholder { get; set; }
        public String level { get; set; }
        public String name { get; set; }
        public String displayName { get; set; }

    		public DataCategorySet(String p, String l, String n, String dn) {
            placeholder = p;
            level = l;
            name = n;
            displayName = dn;
    		}
  	}
}