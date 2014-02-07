(function ($) {

    //
    // Model
    //
    var Model = function () {
        iris.Event.call(this);
    };

    iris.inherits(Model, iris.Event);

    var modelProto = Model.prototype;

    // Data
    modelProto.set = function (p_data) {
        $.extend(this.data, p_data);
        this.notify('change');
        // TODO notify change event by field
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


    //
    // Public
    //
    iris.Model = Model;

})(jQuery);
