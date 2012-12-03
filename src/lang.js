(function($, window) {

    var iris = window.iris;

    var _locale = null,
        _langs = {};

    function _localeGet(p_locale) {
        if(p_locale !== undefined) {
            _locale = p_locale;
        } else {
            return _locale;
        }
    }



    //
    // LANG
    //

    function _lang(p_label, p_value, p_settings) {
        if(typeof p_value === "undefined") {
            return _getLang(p_label);
        } else if(typeof p_value === "object") {
            _addLang(p_label, p_value);
        } else {
            _loadLang(p_label, p_value, p_settings);
        }
    }

    function _addLang(p_locale, p_data) {
        iris.d("[add lang]", p_locale, p_data);

        if(_locale === null) {
            _locale = p_locale;
        }

        if(!_langs.hasOwnProperty(p_locale)) {
            _langs[p_locale] = {};
        }

        $.extend(_langs[p_locale], p_data);
    }

    function _getLang(p_label) {
        var value;
        if(_langs.hasOwnProperty(_locale)) {
            value = iris.val(_langs[_locale], p_label);
            if(value === undefined) {
                iris.w("Label '" + p_label + "' not found in Locale '" + _locale + "'", _langs[_locale]);
            }
            if(typeof value === "object") {
                iris.w("Label '" + p_label + "' is an object but must be a property in Locale '" + _locale + "'", _langs[_locale]);
            }
        } else {
            iris.w("Locale '" + _locale + "' not loaded");
        }
        return(value) ? value : "??" + p_label + "??";
    }


    function _loadLang(p_locale, p_uri, p_settings) {
        iris.d("[iris.lang]", p_locale, p_uri);

        var ajaxSettings = {
            url: p_uri,
            dataType: "json",
            async: false,
            cache: iris.cache(),
            success: function _loadLangSuccess(p_data) {
                _addLang(p_locale, p_data);
                iris.d("[iris.lang]", p_data);

                if(p_settings && p_settings.hasOwnProperty("success")) {
                    p_settings.success(p_locale);
                }
            },
            error: function(p_err) {
                iris.e("Error " + p_err.status + " loading lang file: ", p_uri);

                if(p_settings && p_settings.hasOwnProperty("error")) {
                    p_settings.error(p_locale);
                }
            }
        };

        if(iris.cache() && iris.cacheVersion()) {
            ajaxSettings.data = "_=" + iris.cacheVersion();
        }

        iris.ajax(ajaxSettings);
    }

    iris.lang = _lang;
    iris.locale = _localeGet;

})(jQuery, window);