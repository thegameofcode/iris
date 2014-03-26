
(function() {
    "use strict";

    var Resource = function() {
        iris.Settable.call(this);
        iris.Event.call(this);
    };

    Resource.prototype = $.extend(
        {},
        iris.Settable.prototype,
        iris.Event.prototype
    );

    Resource.prototype.ajax = function(p_method, p_path, p_params) {

        return iris.ajax({
            "url": this.setting("path") + p_path,
            "type": p_method,
            "data": p_params,
            "cache": false,
            "dataType": this.setting("type"),
            "async": true,
            "error": function (p_request, p_textStatus, p_errorThrown) {
                iris.notify(iris.RESOURCE_ERROR, {request: p_request, status: p_textStatus, error: p_errorThrown});
            }
        });
    };

    Resource.prototype.get = function(p_path, p_params) {
        return this.ajax("GET", p_path, p_params);
    };

    Resource.prototype.del = function(p_path) {
        return this.ajax("DELETE", p_path, null);
    };

    Resource.prototype.put = function(p_path, p_params) {
        return this.ajax("PUT", p_path, p_params);
    };

    Resource.prototype.post = function(p_path, p_params) {
        return this.ajax("POST", p_path, p_params);
    };

    //
    // To override
    //
    Resource.prototype.create = function() {};

    iris.Resource = Resource;

})();
