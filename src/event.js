
(function ($) {

    // static object to store all app callbacks
    var _events = {};

    iris.on = function (p_eventName, f_func) {
        if ( !_events.hasOwnProperty(p_eventName) ) {
            _events[p_eventName] = [];
        }

        var callbacks = _events[p_eventName];
        var index = callbacks.indexOf(f_func);
        if ( index === -1 ) {
            callbacks.push(f_func);
        }

    };

    iris.off = function (p_eventName, f_func){
        var callbacks = _events[p_eventName];
        if ( callbacks ){
            callbacks.splice(callbacks.indexOf(f_func), 1);
        }
    };

    iris.notify = function (p_eventName, p_data){
        if ( _events[p_eventName] ) {
            var callbacks = _events[p_eventName];
            for ( var i=0; i < callbacks.length; i++ ) {
                callbacks[i](p_data);
            }
        }
    };

    iris.destroyEvents = function (p_eventName, p_callbacks) {
        var callbacks = _events[p_eventName];
        if ( callbacks ) {
            for ( var i=0; i < p_callbacks.length; i++ ) {
                callbacks.splice(callbacks.indexOf(p_callbacks[i]), 1);
            }
        }
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
        if ( callbacks.indexOf(f_func) === -1 ) {
            callbacks.push(f_func);
            iris.on(p_eventName, f_func);
        }

    };

    eventPrototype.off = function (p_eventName, f_func){
        var callbacks = this.events[p_eventName];

        if ( callbacks ) {
            var index = callbacks.indexOf(f_func);

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
    iris.SERVICE_ERROR = "iris_service_error";

})(jQuery);
