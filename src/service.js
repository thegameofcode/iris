(function(iris) {

    var Service = function() {
        this.type = "json";
        this.path = "";
    };

    Service.prototype.ajax = function(p_method, p_path, p_params, f_success, f_error) {
        iris.ajax({
            "url": this.path + p_path,
            "type": p_method,
            "data": p_params,
            "cache": false,
            "dataType": this.type,
            "async": true,
            "success": f_success,
            "error": f_error // function (p_request, p_textStatus, p_errorThrown)
        });
    };

    Service.prototype.get = function(p_path, f_success, f_error) {
        this.ajax("GET", p_path, null, f_success, f_error);
    };

    Service.prototype.del = function(p_path, f_success, f_error) {
        this.ajax("DELETE", p_path, null, f_success, f_error);
    };

    Service.prototype.put = function(p_path, p_params, f_success, f_error) {
        this.ajax("PUT", p_path, p_params, f_success, f_error);
    };

    Service.prototype.post = function(p_path, p_params, f_success, f_error) {
        this.ajax("POST", p_path, p_params, f_success, f_error);
    };

    function createService(f_service) {
        var serv = new Service();
        f_service(serv);
        return serv;
    }


    iris.service = createService;

})(window.iris);
