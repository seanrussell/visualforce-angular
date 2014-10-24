Sample Salesforce Knowledge Application using Visualforce & AngularJS
===================

A demonstration application for a presentation I did for a local [Salesforce Developer Group](http://www.meetup.com/Lehigh-Valley-Salesforce-Developer-Group/events/206905302/) meeting.

Overview
----------

This basic application demonstrates using [AngularJS](https://angularjs.org/) within a [Visualforce](http://www.salesforce.com/us/developer/docs/pages/Content/pages_intro_what_is_it.htm) page and connecting to a [Salesforce](http://www.salesforce.com/) backend through [Visualforce Remote Objects](https://www.salesforce.com/us/developer/docs/pages/Content/pages_remote_objects.htm) 

Libraries
----------

*[AngularJS](https://angularjs.org/)
*[Mobile Angular UI](http://mobileangularui.com/)
*[Dynamic Locale](https://github.com/lgalfaso/angular-dynamic-locale)
*[Angular Translate](http://angular-translate.github.io/)

Details
----------

The application displays Salesforce Knowledge Articles that it pulls from three(3) different types of custom Article Types:

*How To
*Documentation
*FAQ

In addition to the standard fields that come with an Article Type object, the How To and Documentation article types have a custom Content__c text field for holding the content of the article. The FAQ article type has a custom Question__c and Answer__c text field for holding the question and answer.


[Data Categories](http://www.salesforce.com/developer/docs/api/Content/sforce_api_guidelines_datacategory.htm) classify the various articles that are created from each custom Article Type. The following list illustrates the data category hierarchy:

*Products
**equipment
**hair care
*Procedures
**hair coloring
**hair care
***washing
***treating
*Inquiries
**products
**company
