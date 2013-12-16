
var iris = {};

// Expose iris to the global object
window.iris = iris;


(function ($) {

    // static object to store all app callbacks
    var _events;
    
    function _init() {

        _events = {};

        iris.on("iris-reset", _init);
    }

    iris.on = function (p_eventName, f_func) {
        
        if ( ! $.isFunction(f_func) ) {
            throw "invalid function";
        }

        if ( !_events.hasOwnProperty(p_eventName) ) {
            _events[p_eventName] = [];
        }

        var callbacks = _events[p_eventName];
        var index = $.inArray(f_func, callbacks);
        if ( index === -1 ) {
            callbacks.push(f_func);
        }

    };

    iris.off = function (p_eventName, f_func){
        if ( _events.hasOwnProperty(p_eventName) ){
            if (f_func !== undefined) {
                
                if ( ! $.isFunction(f_func) ) {
                    throw "invalid function";
                }

                var index = $.inArray(f_func, _events[p_eventName]);
                if ( index !== -1 ) {
                    _events[p_eventName].splice(index, 1);
                }

            } else {
                delete _events[p_eventName];
            }
        }
    };

    iris.notify = function (p_eventName, p_data){
        if ( p_eventName === undefined ) {
            throw "event name undefined";
        }
        
        if ( _events[p_eventName] ) {
            var callbacks = _events[p_eventName];
            for ( var i=0; i < callbacks.length; i++ ) {
                callbacks[i](p_data);
            }
        }
    };

    iris.destroyEvents = function (p_eventName, p_callbacks) {
        // Create an array copy, to prevent concurrent modification of _events[p_eventName] array.
        // This occur if an event that destroy uis is notified
        var callbacks = _events[p_eventName].concat([]);
        for ( var i=0; i < p_callbacks.length; i++ ) {
            var index = $.inArray(p_callbacks[i], callbacks);
            if ( index !== -1 ) {
                callbacks.splice(index, 1);
            }
        }
        _events[p_eventName] = callbacks;
    };


    iris.Event = function () {

        this.events = {}; // { "event1" : [f1, f2], "event2" : [f3, f4, f5, f6] }

    };

    var eventPrototype = iris.Event.prototype;

    eventPrototype.on = function (p_eventName, f_func) {
        if ( !this.events.hasOwnProperty(p_eventName) ) {
            this.events[p_eventName] = [];
        }

        var callbacks = this.events[p_eventName];
        var index = $.inArray(f_func, callbacks);
        if ( index === -1 ) {
            callbacks.push(f_func);
            iris.on(p_eventName, f_func);
        }

    };

    eventPrototype.off = function (p_eventName, f_func){
        var callbacks = this.events[p_eventName];
        if ( callbacks ) {
            var index = $.inArray(f_func, callbacks);

            if ( index !== -1 ) {
                callbacks.splice(index, 1);
            }
        }
    };

    eventPrototype.notify = function (p_eventName, p_data){
        iris.notify(p_eventName, p_data);
    };

    //
    // Iris custom events
    //
    iris.BEFORE_NAVIGATION = "iris_before_navigation";
    iris.AFTER_NAVIGATION = "iris_after_navigation";
    iris.RESOURCE_ERROR = "iris_resource_error";
    iris.SCREEN_NOT_FOUND = "iris_screen_not_found";
    
    _init();

})(jQuery);
