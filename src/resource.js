(function() {

    var Resource = function() {
        iris.Settable.call(this);
        iris.Event.call(this);
    };

    Resource.prototype = $.extend(
        {},
        iris.Settable.prototype,
        iris.Event.prototype
    );

    Resource.prototype.ajax = function(p_method, p_path, p_params, f_success, f_error) {

        return iris.ajax({
            "url": this.setting("path") + p_path,
            "type": p_method,
            "data": p_params,
            "cache": false,
            "dataType": this.setting("type"),
            "async": true,
            "success": f_success,
            "error": function (p_request, p_textStatus, p_errorThrown) {

                iris.notify(iris.RESOURCE_ERROR, {request: p_request, status: p_textStatus, error: p_errorThrown});

                if ( f_error !== undefined ) {
                    f_error( p_request, p_textStatus, p_errorThrown );
                }
            }
        });
    };

    Resource.prototype.get = function(p_path, f_success, f_error) {
        return this.ajax("GET", p_path, null, f_success, f_error);
    };

    Resource.prototype.del = function(p_path, f_success, f_error) {
        return this.ajax("DELETE", p_path, null, f_success, f_error);
    };

    Resource.prototype.put = function(p_path, p_params, f_success, f_error) {
        return this.ajax("PUT", p_path, p_params, f_success, f_error);
    };

    Resource.prototype.post = function(p_path, p_params, f_success, f_error) {
        return this.ajax("POST", p_path, p_params, f_success, f_error);
    };

    iris.Resource = Resource;

})();
