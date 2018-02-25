# Glimpse.Prototype
Glimpse v2 prototype

This is a fork of the Glimpse prototype that has been adapted to work with ASP.NET Core 2.0

If you need MVC integration then you will need to make the following changes to get it working 
(this is because the Razor engine has been heavily refactored between ASP.NET Core 1.1 and 2.0)

In _ViewImports.cshtml include the following;

````
@addTagHelper *, Glimpse.Agent.AspNet.Mvc
````

In _Layout.cshtml, revise the body tag to include the tag-helper;

````
<body script-injector>
````

At some point I'll fix the code so this is done automatically - I just haven't worked out how yet!
