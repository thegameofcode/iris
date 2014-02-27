
(function ($) {
    "use strict";

    //
    // Model
    //
    var Model = function () {
        iris.Event.call(this);
        this.events('change');
    };

    iris.inherits(Model, iris.Event);

    var modelProto = Model.prototype;

    // Data
    modelProto.set = function (keyOrHash, value) {
        
        var change = false, oldValue;

        if ( value === undefined ) {
            // Multiple settings
            for ( var key in keyOrHash ) {
                
                if ( keyOrHash.hasOwnProperty(key) ) {

                    oldValue = this.data[key];
                    this.data[key] = keyOrHash[key];

                    if ( !change ) {
                        change = oldValue !== keyOrHash[key];
                    }
                }
            }

        } else {
            // Single setting
            oldValue = this.data[keyOrHash];
            change = oldValue !== value;
            if ( change ) {
                this.data[keyOrHash] = value;
            }
        }

        if ( change ) {
            this.notify('change');
        }
        
        return this;
    };

    modelProto.get = function (key) {
        if ( key === undefined ) {
            return this.data;
        }
        return this.data[key];
    };

    modelProto.unset = function (key) {
        if ( this.data.hasOwnProperty(key) ) {
            delete this.data[key];
            this.notify('change');
        }
        return this;
    };

    modelProto.destroy = function () {
        delete this.data;
        this.notify('destroy');
    };

    // To override
    modelProto.create = function () {};


    //
    // Public
    //
    iris.Model = Model;

})(jQuery);
