# Release History

_Creation date: 2012-01-12_
 
[version] date -> authors
  * upd|fix|new|dep|rmv - description


[0.5.2] 2013-07-18
https://github.com/thegameofcode/iris/issues?milestone=8&page=1&state=closed

 * [fix] Fix iris.enableLog & iris.noCache
 * [dep] Deprecate template parameters and ##notation##
 * [dep] Deprecate data-model
 * [new] New data-jq-* attributes to print data on templates easily, close #130
 * [new] Create Screen.param() to improve components getting parameters, close #133
 * [new] iris.log allows multiple parameters
 * [new] Notify event (iris.SCREEN_NOT_FOUND) and print message instead of raise exception, close #131
 * [new] Raises exception when registering component with invalid path, close #127
 * [upd] Improve self.ui To Return UI instances, close #132
 * [new] Improve tests with new test cases
 * [upd] Add number to translation label format, close #129
 * [upd] iris.include doesn't allows to load external JS files, close #126
 * [upd] iris.include: Added UTF-8 charset to load javascript files
 * [upd] Info to iris.ajax error callback, close #118
 * [upd] API doc
 * [upd] Updated jQuery to v2.0.0 (for testing)
 * [upd] Update GruntJS to v0.4.1
 * [upd] Updated QUnit to v1.12.0


[0.5.1] 2013-04-05
https://github.com/thegameofcode/iris/issues?milestone=7&page=1&state=closed

 * [fix] Fixed initial navigation bug (issue #94)
 * [fix] Problem with same data-id of childs (issue #91)
 * [fix] Problem when inflating model in a DIV tag (issue #93)
 * [upd] self.destroyUI (AutoDestroy) (issue #107)
 * [upd] Add number format to inflate (issue #101)
 * [upd] Show before awake (issue #108)
 * [upd] Updated spanish docs (issue #117)
 * [upd] Iris API: difficult to use (issue #115)
 * [upd] Size of hidden DOM elements cannot be obtained in self.awake (issue #108)
 * [new] iris.include (issue #109 #92)
 * [new] iris.browser (issue #105)


[0.5.0] 2013-02-07
 * [upd] New code style using: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 * [new] Integration with GruntJs
 * [new] Source code splitted into modules files: core, event, lang, regional, ...
 * [new] iris resources to manage web services calls
 * [new] `echo-server.js` is a nodejs web server to run qunit tests
 * [new] Qunit tests with 379 tests
 * [upd] Function names are shorter to remember easily. WARNING: No backward with previous versions
 * [upd] Fixed small bugs and big code refactoring
 * [new] Created iris.path to avoid ajax load of scripts, better debugging
 * [new] New tools/iris_packager to minimize and concat all iris components
 * [doc] Completed spanish documentation

[0.4.5] 2012-11-03
 * [fix] Prevent multiple calls to hashchange event handler when welcome screen calls to iris.navigate() on create phase
 * [upd] Code refactoring to suppress JS validation warnings. All JSHint validations whitout strict mode are passed. (http://www.jshint.com/)
 * [fix] DateFormat bug with month names (https://github.com/intelygenz/iris/issues/22)
 * [new] iris.net.CacheVersion (https://github.com/intelygenz/iris/issues/23) 
 * [upd] self.$Get() selectors cache: improved performance & permit nested UIs

[0.4.4] 2012-09-27
 * [new] Screen error messages when template is not set (https://github.com/intelygenz/iris/issues/19)
 * [new] Prepend UI (https://github.com/intelygenz/iris/issues/21)
 * [rmv] Remove currency symbol of number regional format
 * [upd] self.Settings returns complete __Settings__ if don't use any parameter
 * [fix] Fix asynchronous load components on Firefox when hashchange event is triggered
 * [fix] Screen parameter bugs (https://github.com/intelygenz/iris/issues/9)

[0.4.3] 2012-09-06
 * [fix] Screen Context Bug (https://github.com/intelygenz/iris/issues/10)
 * [fix] Load Multiple Locales Bug (https://github.com/intelygenz/iris/issues/15)
 * [new] Nested properties value in Templates (https://github.com/intelygenz/iris/issues/8)
 * [upd] More Descriptive Error Messages (https://github.com/intelygenz/iris/issues/12)
 * [new] Specify new Regional configuration (https://github.com/intelygenz/iris/issues/17)
 * [doc] Add Screen Paramaters Example (https://github.com/intelygenz/iris/issues/11)

[0.4.2] 2012-09-04
 * [upd] _LocaleParse -> Now can finds variables with dot notation, eg: @@COMMON.HELLO@@. This mean that you can have nested objects in lang json files.
 * [new] iris.AddOn, iris.ApplyAddOn -> Now you can define groups of UIs and extends a UI functionality
 * [new] screen.CanSleep -> All screens can define a CanSleep public method that returns a boolean indicating when the screen can be leaved or not.
 *                    If only one screen can't sleep, sleep action is cancelled.
 * [upd] iris.InstanceUI -> Now displays in console when data-id is not unique.
 * [new] self.DestroyUI() -> Remove a UI from the DOM tree and all its references.
 * [new] self.DestroyAllUIs() -> Remove all UIs from a container.
 * [new] self.Destroy() -> new Lifecycle function is called when a UI is destroyed.
 * [new] self.$Get() -> shows error message when element isn't found
 * [new] iris.screen.Destroy() -> Remove a created screen completely
 * [rmv] iris.screen.Add() -> Now you can use self.AddScreen()
 * [new] _AbstractScreen.AddScreen() -> Screens only can be registered inside of screens
 * [new] iris.screen.WelcomeScreen() -> Now the applications must implement this entry point
 * [rmv] The last parameter of self.InstanceUI(p_id,p_js,p_settings,p_$tmpl) -> you can't instance UI outside its own templates
 * [rmv] The last parameter of self.$Get(p_id,p_$tmpl) -> you can't get elements outside its own templates
 * [fix] Small code refactoring and fixed bugs.
 * [new] Tested with JQuery 1.8
 * [doc] Documentation completed.

[0.4.0] 2012-07-18
 * Previous project: http://code.google.com/p/iris-js/
 * WARNING: No backward with previous versions
