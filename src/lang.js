(function($) {

    var _translations = {};

    function _init() {
        _translations = {};
    }
    //
    // Private
    //
    
    function _addTranslations(p_locale, p_data) {
        iris.log("[translations]", p_locale, p_data);

        if(iris.locale() === undefined) {
            iris.locale(p_locale);
        }

        if(!_translations.hasOwnProperty(p_locale)) {
            _translations[p_locale] = {};
        }

        $.extend(_translations[p_locale], p_data);
    }

    function _loadTranslations(p_locale, p_uri, p_settings) {
        
        if (p_uri.indexOf("http") !== 0) {
            p_uri = iris.baseUri() + p_uri;
        }
        
        iris.log("[translations]", p_locale, p_uri);

        var ajaxSettings = {
            url: p_uri,
            dataType: "json",
            async: false,
            cache: iris.cache(),
            success: function _loadTranslationsSuccess(p_data) {
                _addTranslations(p_locale, p_data);
                iris.log("[translations]", p_data);

                if(p_settings && p_settings.hasOwnProperty("success")) {
                    p_settings.success(p_locale);
                }
            },
            error: function(p_err) {
                if(p_settings && p_settings.hasOwnProperty("error")) {
                    p_settings.error(p_locale);
                }
                throw "Error " + p_err.status + " loading lang file[" + p_uri + "]";
            }
        };


        if(iris.cache() && iris.cacheVersion()) {
            ajaxSettings.data = "_=" + iris.cacheVersion();
        }

        iris.ajax(ajaxSettings);
    }


    //
    // Public
    //

    iris.translations = function (p_locale, p_value, p_settings) {
        if(typeof p_value === "object") {
            _addTranslations(p_locale, p_value);
        } else {
            _loadTranslations(p_locale, p_value, p_settings);
        }
    };

    iris.translate = function (p_label, p_locale) {
        var value;
        var locale = null;
        if (p_locale !== undefined) {
            locale = p_locale;
        } else {
            locale = iris.locale();
        }
        
        var logPrefix = "[translate]";
        if(_translations.hasOwnProperty(locale)) {
            value = iris.val(_translations[locale], p_label);
            if(value === undefined) {
                iris.log(logPrefix + " label '" + p_label + "' not found in Locale '" + locale + "'", _translations[locale]);
            }
            if(typeof value === "object") {
                iris.log(logPrefix + "label '" + p_label + "' is an object but must be a property in Locale '" + locale + "'", _translations[locale]);
            }
        } else {
            iris.log(logPrefix + " locale '" + locale + "' not loaded", this);
        }
        return (value) ? value : "??" + p_label + "??";
    };
    
    iris.init(_init);

})(jQuery);