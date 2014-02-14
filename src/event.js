
(function ($) {

    function _init() {
        iris.eventMap = {};
        iris.events(iris.BEFORE_NAVIGATION, iris.AFTER_NAVIGATION, iris.RESOURCE_ERROR, iris.SCREEN_NOT_FOUND, 'iris-reset');

        iris.on("iris-reset", _init);
    }

    var Event = function () {
        this.eventMap = {}; // { "event1" : [f1, f2], "event2" : [f3, f4, f5, f6] }
        this.eventNames = {};
        this.silent = false;
        this.listeners = [];
        this.targets = [];

        this.events('destroy');
        this.on('destroy', this.destroyEvents);
    };

    var eventPrototype = Event.prototype;

    // Define allowed events
    eventPrototype.events = function () {
        for (var i = 0; i < arguments.length; i++) {
            this.eventNames[arguments[i]] = true;
        }
    };

    eventPrototype.checkEvent = function (p_eventName) {
        if ( !this.eventNames.hasOwnProperty(p_eventName) ) {
            throw 'event[' + p_eventName + '] is not registered';
        }
    };

    eventPrototype.on = function (p_eventName, f_func) {

        this.checkEvent(p_eventName);
        
        if ( ! $.isFunction(f_func) ) {
            throw "invalid function";
        }

        if ( !this.eventMap.hasOwnProperty(p_eventName) ) {
            this.eventMap[p_eventName] = [];
        }

        var callbacks = this.eventMap[p_eventName];
        var index = $.inArray(f_func, callbacks);
        if ( index === -1 ) {
            callbacks.push(f_func);
        }

    };

    eventPrototype.off = function (p_eventName, f_func) {

        this.checkEvent(p_eventName);
        
        // if f_func is undefined removes all callbacks
        if ( f_func !== undefined && ! $.isFunction(f_func) ) {
            throw "invalid function";
        }

        var callbacks = this.eventMap[p_eventName];
        if ( callbacks ) {

            if (f_func !== undefined) {

                var index = $.inArray(f_func, callbacks);
                if ( index !== -1 ) {
                    callbacks.splice(index, 1);
                }

            } else {
                delete this.eventMap[p_eventName];
            }
        }
    };

    eventPrototype.notify = function (p_eventName, p_data) {

        if ( this.silent ) {
            return false;
        }
        
        this.checkEvent(p_eventName);

        if ( p_eventName === undefined ) {
            throw "event name undefined";
        }
        
        var callbacks = this.eventMap[p_eventName];
        if ( callbacks ) {
            for ( var i = 0; i < callbacks.length; i++ ) {
                callbacks[i].call(this, p_data);
            }
        }
    };

    eventPrototype.notifyOn = function () {
        this.silent = true;
    };

    eventPrototype.notifyOff = function () {
        this.silent = false;
    };
    
    eventPrototype.listen = function (target, eventName, listener) {
window.console.log('Adding listener...', target, eventName, listener);

        // Add listener to target
        target.on(eventName, listener);

        var targetRegistered = false;
        for (var i = 0; i < this.targets.length; i++) {
            if ( this.targets[i] === target ) {
                targetRegistered = true;
                break;
            }
        }

        if ( !targetRegistered ) {
            this.targets.push(target);

            var self = this;
            target.on('destroy', function () {
window.console.log('The target listened is destroyed, removing its reference from this.targets...');
                self.targets.splice(self.targets.indexOf(target), 1);

window.console.log('    Removing listeners associated with the target destroyed');
                var lis;
                for (i = self.listeners.length - 1; i >= 0; i--) {
                    lis = self.listeners[i];
                    if ( lis.target === target ) {
window.console.log('            removing a listener from self.listeners...', lis.target, lis.e, lis.fn);
                        self.listeners.splice(i, 1);
                    }
                }
            });
        }

        // Register listener to remove on destroy
        this.listeners.push({target: target, e: eventName, fn: listener});
    };

    eventPrototype.removeListeners = function () {
        var i, lis;
        for (i = 0; i < this.listeners.length; i++) {
            lis = this.listeners[i];
window.console.log('       removing listener created in target = ', lis.target, lis.e, lis.fn);
            lis.target.off(lis.e, lis.fn);
        }

        this.listeners = [];
        this.targets = [];
    };
    
    eventPrototype.destroyEvents = function () {
window.console.log('An event object has been destroyed', this);
        this.removeListeners();
        delete this.eventMap;
        delete this.eventName;
    };

    var Iris = function() {
        Event.call(this);
    };
    Iris.prototype = new Event();
    var iris = new Iris();

    //
    // Public
    //
    iris.Event = Event;

    //
    // Iris custom events
    //
    iris.BEFORE_NAVIGATION = "iris_before_navigation";
    iris.AFTER_NAVIGATION = "iris_after_navigation";
    iris.RESOURCE_ERROR = "iris_resource_error";
    iris.SCREEN_NOT_FOUND = "iris_screen_not_found";

    window.iris = iris;
    
    _init();

})(jQuery);
