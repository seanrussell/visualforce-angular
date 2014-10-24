Sample Salesforce Knowledge Application using Visualforce & AngularJS
===================

A demonstration application for a presentation I did for a local [Salesforce Developer Group](http://www.meetup.com/Lehigh-Valley-Salesforce-Developer-Group/events/206905302/) meeting. You can see the application in action [here](http://spa-developer-edition.na17.force.com/)

Overview
----------

This basic application demonstrates using [AngularJS](https://angularjs.org/) within a [Visualforce](http://www.salesforce.com/us/developer/docs/pages/Content/pages_intro_what_is_it.htm) page and connecting to a [Salesforce](http://www.salesforce.com/) backend through [Visualforce Remote Objects](https://www.salesforce.com/us/developer/docs/pages/Content/pages_remote_objects.htm) 

Libraries
----------

* [AngularJS](https://angularjs.org/)
* [Mobile Angular UI](http://mobileangularui.com/)
* [Dynamic Locale](https://github.com/lgalfaso/angular-dynamic-locale)
* [Angular Translate](http://angular-translate.github.io/)

Details
----------

The application displays Salesforce Knowledge Articles that it pulls from three(3) different types of custom Article Types:

* How To
* Documentation
* FAQ

In addition to the standard fields that come with an Article Type object, the How To and Documentation article types have a custom Content__c text field for holding the content of the article. The FAQ article type has a custom Question__c and Answer__c text field for holding the question and answer.


[Data Categories](http://www.salesforce.com/developer/docs/api/Content/sforce_api_guidelines_datacategory.htm) classify the various articles that are created from each custom Article Type. The following list illustrates the data category hierarchy:

* Products
 * equipment
 * hair care
* Procedures
 * hair coloring
 * hair care
  * washing
  * treating
* Inquiries
 * products
 * company

The resulting list of articles can be filtered using the 'search' text box at the top. The list can also be sorted by publish date, view count, vote rating, and alphabetically by title using the buttons along the bottom of the screen. Each article in the list can be clicked/tapped to display the article details. 

On the top right is a button that, when clicked, toggles a simple feedback form that, when submitted will create a [Case]() in Salesforce.

On the top left is a button that, when clicked, toggles an area that allows you to filtering the article list further by article type and data category. On the bottom of this section is a language selection list that allows you to choose a language within which to view the application. Any articles that have been translated in Salesforce to the selected language will also display in the article list.

TODO
----------
* Add additional tests


Author
----------

Sean Russell. Email me if you have any questions: [seand.russell@gmail.com](mailto:seand.russell@gmail.com). 
