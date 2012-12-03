(function($, window) {

    var iris = window.iris;

    // TODO Extract to separated regional files
    var _regional = {
        "en-US": {
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            dateFormat: "m/d/Y h:i:s",
            currency: {
                formatPos: "n",
                formatNeg: "(n)",
                decimal: ".",
                thousand: ",",
                precision: 2
            }
        },
        "es-ES": {
            dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            dateFormat: "d/m/Y H:i:s",
            currency: {
                formatPos: "n",
                formatNeg: "-n",
                decimal: ",",
                thousand: ".",
                precision: 2
            }
        }
    };

    function _getRegionalSetting(p_label) {

        var locale = iris.locale();

        if(_regional.hasOwnProperty(locale)) {
            if(typeof p_label === "undefined") {
                return _regional[locale];
            } else if(_regional[locale].hasOwnProperty(p_label)) {
                return _regional[locale][p_label];
            } else {
                iris.e("Regional setting '" + p_label + "' not found for locale '" + locale + "'");
            }
        } else {
            iris.e("Regional for locale '" + locale + "' not found");
        }
    }

    function _getOrSetRegional(p_localeOrLabel, p_regional) {
        if (p_regional) {
            _regional[p_localeOrLabel] = p_regional;
        } else {
            return _getRegionalSetting(p_localeOrLabel);
        }
    }


    iris.regional = _getOrSetRegional;


})(jQuery, window);