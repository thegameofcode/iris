
(function ($, window) {

var iris = window.iris;

var _event = {};

function _findEvent(p_eventName, f_func){
    var events = _event[p_eventName];
    if ( events ) {
        for ( var f=0, F=events.length; f<F; f++ ) {
            if ( events[f] === f_func ) {
                return f;
            }
        }
    }
    return -1;
}

function _eventSubscribe(p_eventName, f_func){
    if ( !_event[p_eventName] ) {
        _event[p_eventName] = [];
    }

    var index = _findEvent( p_eventName, f_func );
    if ( index === -1 ) {
        index = _event[p_eventName].length;
    }

    _event[p_eventName][index] = f_func;
}

function _eventRemove(p_eventName, f_func){
    var index = _findEvent(p_eventName, f_func);
    if ( index !== -1 ){
        _event[p_eventName].splice(index,1);
    }
}

function _eventNotify(p_eventName, p_data){
    if ( _event[p_eventName] ) {
        var funcs = _event[p_eventName];
        for ( var f=0, F=funcs.length; f<F; f++ ) {
            funcs[f](p_data);
        }
    }
}

iris.BEFORE_NAVIGATION = "iris_before_navigation";
iris.notify = _eventNotify;
iris.on = _eventSubscribe;
iris.off = _eventRemove;


})(jQuery, window);
