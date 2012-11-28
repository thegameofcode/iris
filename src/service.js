(function () {

	var iris = window.iris;

    var Service = function () {
        this.type = "json";
        this.path = "";
    };

    Service.prototype.ajax = function (p_method, p_path, p_params, f_success, f_error){
        p_path = this.path + p_path;
        var path = p_path;

        // replace path params
		var pathParamRegExp = /\{(\w+)\}/g;
		var matches = pathParamRegExp.exec(p_path);
		while (matches) {
			path = path.replace(new RegExp(matches[0], "g"), p_params[matches[1]]);
			matches = pathParamRegExp.exec(p_path);
		}

        // do async call
        iris.ajax({
            "url" : path,
            "type" : p_method,
            "data" : p_params,
            "cache" : false,
            "dataType" : this.type,
            "async" : true,
            "success" : f_success,
            "error" : f_error // function (p_request, p_textStatus, p_errorThrown)
        });
    };

    Service.prototype.get = function (p_path, p_params, f_success, f_error){
        this.ajax("GET", p_path, p_params, f_success, f_error);
    };

    Service.prototype.put = function (p_path, p_params, f_success, f_error){
        this.ajax("PUT", p_path, p_params, f_success, f_error);
    };

    Service.prototype.post = function (p_path, p_params, f_success, f_error){
        this.ajax("POST", p_path, p_params, f_success, f_error);
    };

    Service.prototype.del = function (p_path, p_params, f_success, f_error){
        this.ajax("DELETE", p_path, p_params, f_success, f_error);
    };

    function createService (f_service) {
        var serv = new Service();
        f_service(serv);
        return serv;
    }

	iris.service = createService;



})(jQuery, window);