
(function ($) {
    "use strict";

    function _init() {
		
        // Reset all iris event properties
		Event.call(iris);
		
        // Register global iris events
        iris.events(
            iris.BEFORE_NAVIGATION,
            iris.AFTER_NAVIGATION, 
            iris.RESOURCE_ERROR,
            iris.SCREEN_NOT_FOUND
        );
    }

    function _destroyEvent (instance) {
        instance.destroyed = true;
        delete instance.eventMap;
        delete instance.silent;
        delete instance.listens;
        delete instance.pubs;
    }

    var Event = function () {
        
        // keys are event names, values are arrays with listeners
        // { 'event1' : [f1, f2], 'event2' : [f3, f4, f5, f6] }
        this.eventMap = {};

        // When this.silent is true, notify will not trigger any event
        this.silent = false;

        // Array of objects like:
        // {pub: <iris-component>, eventName: <string>,
        //  listener: <function>, pausable: <bool>, active: <bool>}
        this.listens = [];

        // Array with all registered targets
        this.pubs = [];

        // Define allowed events
        this.events('destroy');
        
        // On destroy remove all props
        var self = this;
        this.on('destroy', function () {
            _destroyEvent(self); // we can not use .bind() because is not supported for IE 8
        });
    };

    var eventPrototype = Event.prototype;


    eventPrototype.events = function () {
        for (var i = 0; i < arguments.length; i++) {
            if ( !this.eventMap.hasOwnProperty(arguments[i]) ) {
                this.eventMap[arguments[i]] = [];
            }
        }
    };

    // Check if eventName has been registered, otherwise throw exception
    eventPrototype.checkEvent = function (eventName) {
        if ( !this.eventMap.hasOwnProperty(eventName) ) {
            throw 'event[' + eventName + '] is not registered, use self.events';
        }
    };

    // Add a event listener (warning: this may cause memory leaks)
    eventPrototype.on = function (eventName, listener) {

        this.checkEvent(eventName);
        
        if ( ! $.isFunction(listener) ) {
            throw 'invalid function';
        }

        if ( !this.eventMap.hasOwnProperty(eventName) ) {
            this.eventMap[eventName] = [];
        }

        var callbacks = this.eventMap[eventName];
        var index = $.inArray(listener, callbacks);
        if ( index === -1 ) {
            callbacks.push(listener);
        }

    };

    eventPrototype.once = function(eventName, listener) {
        var self = this;

        var onceListener = function () {
            listener.apply(self, arguments);
            self.off(eventName, onceListener);
        };

        self.on(eventName, onceListener);
    };

    // Remove an event listener
    eventPrototype.off = function (eventName, listener) {

        this.checkEvent(eventName);
        
        if ( listener !== undefined && ! $.isFunction(listener) ) {
            throw 'invalid function';
        }

        var callbacks = this.eventMap[eventName];
        if ( callbacks ) {

            // if listener is undefined removes all callbacks
            if (listener !== undefined) {

                var index = $.inArray(listener, callbacks);
                if ( index !== -1 ) {
                    callbacks.splice(index, 1);
                }

            } else {
                this.eventMap[eventName] = [];
            }
        }
    };

    // Notify a new event
    eventPrototype.notify = function (eventName, data) {

        this.checkEvent(eventName);

        if ( this.silent ) {
            return false;
        }
        
        var callbacks = this.eventMap[eventName];
        if ( callbacks ) {
            for ( var i = 0; i < callbacks.length; i++ ) {
                callbacks[i].call(this, data);
            }
        }
    };

    // Enable notifications (this.notify will trigger events)
    eventPrototype.notifyOn = function () {
        this.silent = false;
    };

    // Disable notifications (this.notify will not trigger any event)
    eventPrototype.notifyOff = function () {
        this.silent = true;
    };
    
    // Add event listener (in safe way) that can be paused or automatically destroyed whitout generate memory leaks
    eventPrototype.listen = function (pub, eventName, listener, weakReference) {

        if ( weakReference === undefined ) {
            weakReference = false;
        }

        // Add listener to pub
        pub.on(eventName, listener);

        // Register listener to remove on destroy
        this.listens.push({pub: pub, eventName: eventName, listener: listener, pausable: true, active: true});
        
        // If pub is unregistered
        var subscriber = this;
        if ( weakReference && $.inArray(pub, subscriber.pubs) === -1 ) {

            subscriber.pubs.push(pub); // Register pub

            // When the pub is destroyed, remove all references in the subscriber
            var onPubDestroy = function () {

                // Unregister pub
                subscriber.pubs.splice($.inArray(pub, subscriber.pubs), 1);
                
                // Remove subscriber listeners from publisher
                var i, subscriberListen;
                for (i = subscriber.listens.length - 1; i >= 0; i--) {
                    subscriberListen = subscriber.listens[i];
                    if ( subscriberListen.pub === pub ) {
                        subscriber.listens.splice(i, 1);
                    }
                }

            };

            // Only one destroy callback per pub
            pub.on('destroy', onPubDestroy);
            
            // Register it to remove on destroy
            this.listens.push({pub: pub, eventName: 'destroy', listener: onPubDestroy, pausable: false, active: true});
        }

    };

    // Remove all listeners from targets
    eventPrototype.removeListeners = function () {
        var i, listen;
        for (i = 0; i < this.listens.length; i++) {
            listen = this.listens[i];

            if ( !listen.pub.destroyed ) {
                listen.pub.off(listen.eventName, listen.listener);
            }
        }

        this.listens = [];
        this.pubs = [];
    };

    // Pause all listeners, this will remove the listeners from targets.
    // Use resumeListeners to add them again.
    eventPrototype.pauseListeners = function () {
        var i, listen;
        for ( i = this.listens.length - 1; i >= 0; i-- ) {
            listen = this.listens[i];

            if ( listen.pub.destroyed ) {
                this.listens.splice(i, 1);
                
            } else if ( listen.pausable && listen.active ) {
                listen.pub.off(listen.eventName, listen.listener);
                listen.active = false;
            }
        }
    };

    // Resume all paused listeners, this will add again the listeners to targets.
    // Use pauseListeners to remove them from targets.
    eventPrototype.resumeListeners = function () {
        var i, listen;
        for ( i = this.listens.length - 1; i >= 0; i-- ) {
            listen = this.listens[i];

            if ( listen.pub.destroyed ) {
                this.listens.splice(i, 1);
                
            } else if ( listen.pausable && !listen.active ) {
                listen.pub.on(listen.eventName, listen.listener);
                listen.active = true;
            }
        }
    };

    // Iris instance will inherit Event
    var Iris = function () {};
    Iris.prototype = new Event();
    var iris = new Iris();

    // Expose iris object
    window.iris = iris;


    //
    // Public
    //
    iris.Event = Event;

    //
    // Iris global events
    //
    iris.BEFORE_NAVIGATION = 'iris_before_navigation';
    iris.AFTER_NAVIGATION = 'iris_after_navigation';
    iris.RESOURCE_ERROR = 'iris_resource_error';
    iris.SCREEN_NOT_FOUND = 'iris_screen_not_found';

	
    // Register module reset function
    if ( window.testMode ) {
        window.addIrisReset(_init);
    }

    _init();

})(jQuery);
