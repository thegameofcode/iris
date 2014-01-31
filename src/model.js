(function ($) {

    //
    // ModelFactory
    //
    var ModelFactory = function () {
        this.defaults = {};
        this.functions = {};
    };

    var modelFactoryProto = ModelFactory.prototype;

    modelFactoryProto.create = function (p_data) {
        var data = $.extend({}, this.defaults, p_data);
        var instance = new iris.Model(data);
        $.extend(instance, this.functions);
        return instance;
    };


    //
    // Model
    //
    var Model = function (p_data) {
        iris.Event.call(this);
        this.data = $.extend({}, p_data);
    };

    iris.inherits(Model, iris.Event);

    var modelProto = Model.prototype;

    modelProto.set = function (p_data) {
        // TODO notify change event by field
        $.extend(this.data, p_data);
        this.notify('change');
    };

    modelProto.get = function (p_fieldName) {
        if ( p_fieldName === undefined ) {
            return this.data;
        }
        return this.data[p_fieldName];
    };

    modelProto.toJson = function () {
        return JSON.stringify(this.data);
    };

    //
    // Public
    //
    iris.Model = Model;
    iris.ModelFactory = ModelFactory;

})(jQuery);
