

(function ($) {

    function _init() {
        iris.events = {};

        iris.on("iris-reset", _init);
    }

    var Event = function () {
        this.events = {}; // { "event1" : [f1, f2], "event2" : [f3, f4, f5, f6] }
    };

    var eventPrototype = Event.prototype;

    eventPrototype.on = function (p_eventName, f_func) {

        if ( ! $.isFunction(f_func) ) {
            throw "invalid function";
        }

        if ( !this.events.hasOwnProperty(p_eventName) ) {
            this.events[p_eventName] = [];
        }

        var callbacks = this.events[p_eventName];
        var index = $.inArray(f_func, callbacks);
        if ( index === -1 ) {
            callbacks.push(f_func);
        }

    };

    eventPrototype.off = function (p_eventName, f_func) {

        // if f_func is undefined removes all callbacks
        if ( f_func !== undefined && ! $.isFunction(f_func) ) {
            throw "invalid function";
        }

        var callbacks = this.events[p_eventName];
        if ( callbacks ) {

            if (f_func !== undefined) {

                var index = $.inArray(f_func, callbacks);
                if ( index !== -1 ) {
                    callbacks.splice(index, 1);
                }

            } else {
                delete this.events[p_eventName];
            }
        }
    };

    eventPrototype.notify = function (p_eventName, p_data) {
        if ( p_eventName === undefined ) {
            throw "event name undefined";
        }
        
        var callbacks = this.events[p_eventName];
        if ( callbacks ) {
            for ( var i = 0; i < callbacks.length; i++ ) {
                callbacks[i].call(this, p_data);
            }
        }
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
