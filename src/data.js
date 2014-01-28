(function ($) {

    var Data = function (p_data) {
        iris.Event.call(this);
        this.data = $.extend({}, p_data);
    };

    iris.inherits(Data, iris.Event);

    var dataProto = Data.prototype;

    dataProto.set = function (p_data) {
        $.extend(this.data, p_data);
        this.notify('change');
    };

    dataProto.get = function (p_fieldName) {
        if ( p_fieldName === undefined ) {
            return this.data;
        }
        return this.data[p_fieldName];
    };

    iris.data = function (p_data) {
        return new Data(p_data);
    };

})(jQuery);
