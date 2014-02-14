(function ($) {

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
    modelProto.set = function (p_data) {
        $.extend(this.data, p_data);
        this.notify('change');
    };

    modelProto.get = function (p_fieldName) {
        if ( p_fieldName === undefined ) {
            return this.data;
        }
        return this.data[p_fieldName];
    };

    // Conversion
    modelProto.toJson = function () {
        return JSON.stringify(this.data);
    };

    modelProto.destroy = function () {
        this.notify('destroy');
    };

    // To override
    modelProto.create = function () {};


    //
    // Public
    //
    iris.Model = Model;

})(jQuery);
