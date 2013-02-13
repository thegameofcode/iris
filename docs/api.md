[Iris homepage](https://github.com/iris-js/iris) | [Documentation table of contents](toc.md)

# The iris API

Iris exposes all of its methods and properties on the `iris` object.

## Core
### iris.baseUri
### iris.cache
### iris.cacheVersion
### iris.noCache
### iris.enableLog
### iris.log


## Util
### iris.ajax
### iris.val
### iris.date
### iris.number
### iris.currency


## Events
### iris.notify
### iris.on
### iris.off
### iris.destroyEvents

### iris.Event class
#### self.on
#### self.off
#### self.notify

### Iris Events
#### iris.BEFORE_NAVIGATION
#### iris.AFTER_NAVIGATION
#### iris.RESOURCE_ERROR


## Language & Regional
### iris.translate
### iris.translations
### iris.locale
### iris.regional


## Components
### iris.welcome
### iris.navigate
### iris.screen
### iris.destroyScreen
### iris.ui
### iris.tmpl
### iris.resource

### iris.Settable Class
#### self.setting
#### self.settings

### iris.Component Class
#### self.tmpl
#### self.get
#### self.inflate
#### self.ui
#### self.destroyUI
#### self.destroyUIs

### iris.UI Class
Inherit methods from Component, Settable & Event classes
#### self.tmplMode

### iris.Screen Class
Inherit methods from Component, Settable & Event classes
#### self.screens

### iris.Resource Class
Inherit methods from Settable class
#### self.get
#### self.post
#### self.put
#### self.del
