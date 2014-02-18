
(function ($) {


    var _resetFunctions = [];

	
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

    var Event = function () {
        // keys are event names, values are arrays with listeners
        // { 'event1' : [f1, f2], 'event2' : [f3, f4, f5, f6] }
        this.eventMap = {};

        // When this.silent is true, notify will not trigger any event
        this.silent = false;

        // Array of objects like:
        // {target: <iris-component>, eventName: <string>,
        //  fn: <function>, pausable: <bool>, active: <bool>}
        this.listeners = [];

        // Array with all registered targets
        this.eventTargets = [];

        // Register the essential destroy event
        this.events('destroy');

        // When the object is destroyed, calls to this.removeListeners
        this.on('destroy', this.removeListeners);
    };

    var eventPrototype = Event.prototype;

    // Define allowed events
    eventPrototype.events = function () {
        for (var i = 0; i < arguments.length; i++) {
            if ( !this.eventMap.hasOwnProperty(arguments[i]) ) {
                this.eventMap[arguments[i]] = [];
            }
        }
    };

    // Check if eventName has been registered, otherwise throw exception
    eventPrototype.checkEvent = function (p_eventName) {
        if ( !this.eventMap.hasOwnProperty(p_eventName) ) {
            throw 'event[' + p_eventName + '] is not registered, use self.events';
        }
    };

    // Add a event listener (warning: this may cause memory leaks)
    eventPrototype.on = function (p_eventName, f_func) {

        this.checkEvent(p_eventName);
        
        if ( ! $.isFunction(f_func) ) {
            throw 'invalid function';
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

    // Remove an event listener
    eventPrototype.off = function (p_eventName, f_func) {

        this.checkEvent(p_eventName);
        
        // if f_func is undefined removes all callbacks
        if ( f_func !== undefined && ! $.isFunction(f_func) ) {
            throw 'invalid function';
        }

        var callbacks = this.eventMap[p_eventName];
        if ( callbacks ) {

            if (f_func !== undefined) {

                var index = $.inArray(f_func, callbacks);
                if ( index !== -1 ) {
                    callbacks.splice(index, 1);
                }

            } else {
                this.eventMap[p_eventName] = [];
            }
        }
    };

    // Notify a new event
    eventPrototype.notify = function (p_eventName, p_data) {

        this.checkEvent(p_eventName);

        if ( this.silent ) {
            return false;
        }
        
        var callbacks = this.eventMap[p_eventName];
        if ( callbacks ) {
            for ( var i = 0; i < callbacks.length; i++ ) {
                callbacks[i].call(this, p_data);
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
    eventPrototype.listen = function (target, eventName, listener) {

        // Add listener to target
        target.on(eventName, listener);

        // Register listener to remove on destroy
        this.listeners.push({target: target, eventName: eventName, fn: listener, pausable: true, active: true});
        
        // If target is unregistered
        var observer = this;
        if ( $.inArray(target, observer.eventTargets) === -1 ) {

            observer.eventTargets.push(target); // Register target

            // When the target is destroyed, remove all references in the observer
            var onTargetDestroy = function () {

                // Unregister target
                observer.eventTargets.splice($.inArray(target, observer.eventTargets), 1);
                
                // Remove target listeners from observer
                var i, observerListener;
                for (i = observer.listeners.length - 1; i >= 0; i--) {
                    observerListener = observer.listeners[i];
                    if ( observerListener.target === target ) {
                        observer.listeners.splice(i, 1);
                    }
                }

            };

            // Only one destroy callback per target
            target.on('destroy', onTargetDestroy);
            
            // Register listener to remove on destroy
            this.listeners.push({target: target, eventName: 'destroy', fn: onTargetDestroy, pausable: false, active: true});
        }

    };

    // Remove all listeners from targets
    eventPrototype.removeListeners = function () {
        var i, listener;
        for (i = 0; i < this.listeners.length; i++) {
            listener = this.listeners[i];
            listener.target.off(listener.eventName, listener.fn);
        }

        this.listeners = [];
        this.eventTargets = [];
    };

    // Pause all listeners, this will remove the listeners from targets.
    // Use resumeListeners to add them again.
    eventPrototype.pauseListeners = function () {
        var i, listener;
        for (i = 0; i < this.listeners.length; i++) {
            listener = this.listeners[i];

            if ( listener.pausable && listener.active ) {
                listener.target.off(listener.eventName, listener.fn);
                listener.active = false;
            }
        }
    };

    // Resume all paused listeners, this will add again the listeners to targets.
    // Use pauseListeners to remove them from targets.
    eventPrototype.resumeListeners = function () {
        var i, listener;
        for (i = 0; i < this.listeners.length; i++) {
            listener = this.listeners[i];

            if ( listener.pausable && !listener.active ) {
                listener.target.on(listener.eventName, listener.fn);
                listener.active = true;
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

    iris._reset = function (fn) {
        if ( fn === undefined ) {

            // Call to all registered reset functions
            for (var i = 0; i < _resetFunctions.length; i++) {
                _resetFunctions[i]();
            }

        } else {

            // Register reset function
            _resetFunctions.push(fn);
            fn();
        }
    };

    //
    // Iris global events
    //
    iris.BEFORE_NAVIGATION = 'iris_before_navigation';
    iris.AFTER_NAVIGATION = 'iris_after_navigation';
    iris.RESOURCE_ERROR = 'iris_resource_error';
    iris.SCREEN_NOT_FOUND = 'iris_screen_not_found';

	
    // Register module reset function
    iris._reset(_init);

})(jQuery);
