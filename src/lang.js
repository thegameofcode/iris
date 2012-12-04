(function($, iris) {

    var _locale = null,
        _translations = {};

    function _getOrSetLocale(p_locale) {
        if(p_locale !== undefined) {
            _locale = p_locale;
        } else {
            return _locale;
        }
    }

    function _translate(p_label) {
        var value;
        if(_translations.hasOwnProperty(_locale)) {
            value = iris.val(_translations[_locale], p_label);
            if(value === undefined) {
                iris.w("Label '" + p_label + "' not found in Locale '" + _locale + "'", _translations[_locale]);
            }
            if(typeof value === "object") {
                iris.w("Label '" + p_label + "' is an object but must be a property in Locale '" + _locale + "'", _translations[_locale]);
            }
        } else {
            iris.w("Locale '" + _locale + "' not loaded");
        }
        return(value) ? value : "??" + p_label + "??";
    }

    //
    // Translations
    //
    function _setTranslations(p_label, p_value, p_settings) {
        if(typeof p_value === "object") {
            _addTranslations(p_label, p_value);
        } else {
            _loadTranslations(p_label, p_value, p_settings);
        }
    }

    function _addTranslations(p_locale, p_data) {
        iris.d("[translations]", p_locale, p_data);

        if(_locale === null) {
            _locale = p_locale;
        }

        if(!_translations.hasOwnProperty(p_locale)) {
            _translations[p_locale] = {};
        }

        $.extend(_translations[p_locale], p_data);
    }

    function _loadTranslations(p_locale, p_uri, p_settings) {
        iris.d("[translations]", p_locale, p_uri);

        var ajaxSettings = {
            url: p_uri,
            dataType: "json",
            async: false,
            cache: iris.cache(),
            success: function _loadTranslationsSuccess(p_data) {
                _addTranslations(p_locale, p_data);
                iris.d("[translations]", p_data);

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


    iris.translate = _translate;
    iris.translations = _setTranslations;
    iris.locale = _getOrSetLocale;

})(jQuery, iris);