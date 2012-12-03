(function ($, window) {

    var iris = window.iris;

    /** @deprecated */
    iris.net = {};

    /** @deprecated */
    iris.util = {};


    /** @deprecated */
    iris.configAux = iris.config;

    /** @deprecated */
    iris.config = {};

    /** @deprecated */
    iris.config.Load = iris.configAux;
    
    /** @deprecated */
    iris.config.Env = iris.env;



    /** @deprecated */
    iris.globalAux = iris.global;

    /** @deprecated */
    iris.global = {};

    /** @deprecated */
    iris.global.Load = iris.globalAux;
    
    /** @deprecated */
    iris.global.Data = iris.globalAux;


    /** @deprecated */
    iris.localAux = iris.local;

    /** @deprecated */
    iris.local = {};

    /** @deprecated */
    iris.local.Load = iris.localAux;
    
    /** @deprecated */
    iris.local.Data = iris.localAux;


    
    /** @deprecated */
    iris.langAux = iris.lang;

    /** @deprecated */
    iris.lang = {};

    /** @deprecated */
    iris.lang.Load = iris.langAux;
    
    /** @deprecated */
    iris.lang.LoadFrom = iris.langAux;
    
    /** @deprecated */
    iris.lang.Get = iris.langAux;
    
    /** @deprecated */
    iris.lang.Locale = iris.locale;




    
    /** @deprecated */
    iris.L = iris.l;
    
    /** @deprecated */
    iris.D = iris.d;
    
    /** @deprecated */
    iris.W = iris.w;
    
    /** @deprecated */
    iris.E = iris.e;


    /** @deprecated */
    iris.event = {};
    
    /** @deprecated */
    iris.event.BEFORE_NAVIGATION = iris.BEFORE_NAVIGATION;



    
    /** @deprecated */
    iris.event.Subscribe = iris.on;
    
    /** @deprecated */
    iris.event.Notify = iris.notify;
    
    /** @deprecated */
    iris.event.Remove = iris.off;
    



    /** @deprecated */
    iris.net.BaseUri = iris.baseUri;
    
    /** @deprecated */
    iris.net.Ajax = iris.ajax;
    
    /** @deprecated */
    iris.net.CacheVersion = iris.cacheVersion;




    /** @deprecated */
    iris.Include = iris.include;
    
    /** @deprecated */
    iris.screenAux = iris.screen;

    /** @deprecated */
    iris.Screen = function (f_screen){
        iris.screenAux(
            function (self) {
                self.Settings = self.settings;
                self.Setting = self.setting;

                self.InstanceUI = self.ui;
                self.Show = self.show;
                self.Hide = self.hide;
                self.$Get = self.get;
                self.DestroyUI = self.destroyUI;
                self.DestroyAllUIs = self.destroyUIs;
                self.$Container = self.container;
                self.Create = self.create;
                self.Awake = self.awake;
                self.CanSleep = self.canSleep;
                self.Sleep = self.sleep;
                self.Destroy = self.destroy;

                self.Template = self.tmpl;
                self.AddScreen = self.screen;
                f_screen(self);
            }
        );
    };

    /** @deprecated */
    iris.screen = {};

    /** @deprecated */
    iris.Screen = iris.screenAux;

    /** @deprecated */
    iris.screen.WelcomeScreen = iris.welcome;
    
    /** @deprecated */
    iris.screen.Destroy = iris.destroyScreen;


    
    /** @deprecated */
    function _HashToJq(p_hash, p_$obj, p_filter){
        var dom = p_$obj.get(0);
        if ( p_filter ){
            var filter;
            for ( var f=0, F=p_filter.length; f<F; f++ ){
                filter = p_hash[p_filter[f]];
                if ( filter ) {
                    dom.setAttribute(p_filter[f], filter);
                }
            }
        }
        else {
            for ( var label in p_hash){
                if ( p_hash.hasOwnProperty(label) ) {
                    dom.setAttribute(label, p_hash[label]);
                }
            }
        }
        return p_$obj;
    }

    /** @deprecated */
    function _JqToHash(p_$obj) {
        var hash = {};
        var attrs = p_$obj.get(0).attributes;
        var label;
        for( var f=0, F=attrs.length; f<F; f++ ) {
            label = attrs[f].name;
            if ( label.indexOf("data-") === 0 ){
                label = label.substr(5);
            }
            hash[label] = attrs[f].value;
        }
        return hash;
    }

    /** @deprecated */
    iris.uiAux = iris.ui;

    /** @deprecated */
    iris.ui = {};

    /** @deprecated */
    iris.UI = function (f_ui){
        iris.uiAux(
            function (self) {
                self.Settings = self.settings;
                self.Setting = self.setting;

                self.InstanceUI = self.ui;
                self.Show = self.show;
                self.Hide = self.hide;
                self.$Get = self.get;
                self.DestroyUI = self.destroyUI;
                self.DestroyAllUIs = self.destroyUIs;
                self.$Container = self.container;
                self.Create = self.create;
                self.Awake = self.awake;
                self.CanSleep = self.canSleep;
                self.Sleep = self.sleep;
                self.Destroy = self.destroy;

                self.TemplateMode = self.tmplMode;
                self.Template = self.tmpl;
                f_ui(self);
            }
        );
    };

    /** @deprecated */
    iris.ui.JqToHash = _JqToHash;
    
    /** @deprecated */
    iris.ui.HashToJq = _HashToJq;




    
    /** @deprecated */
    iris.util.DateFormat = iris.date;
    
    /** @deprecated */
    iris.util.Currency = iris.currency;

    /** @deprecated */
    function _Deserialize (p_$form, p_data) {
        var element, tag, value;
        for ( var name in p_data ) {
            if ( p_data.hasOwnProperty(name) ) {
                element = p_$form.find('[name="' + name + '"]');
                
                if ( element.length > 0 ) {
                    tag = element[0].tagName.toLowerCase();
                    value = p_data[name];
                    switch (tag) {
                    case "select":
                    case"textarea":
                        $(element).val(value);
                        break;
                    case "input":
                        switch (tag) {
                        case "checkbox":
                            if (value) {
                                element.attr("checked", "checked"); 
                            }
                            break;
                        case "radio":
                            element.filter('[value="' + value + '"]').attr("checked", "checked");
                            break;
                        default:
                            element.val(value);
                        }
                    }
                }
            }
        }
    }
    /** @deprecated */
    iris.util.Deserialize = _Deserialize;

    /** @deprecated */
    function _Serialize (p_$form) {
        var json = {};
        $.map(p_$form.serializeArray(), function(p_obj){
            json[ p_obj.name ] = p_obj.value;
        });
        return json;
    }
    /** @deprecated */
    iris.util.Serialize = _Serialize;
    
    /** @deprecated */
    iris.Goto = iris.goto;
    
    /** @deprecated */
    iris.AddOn = function (f_addon){
        iris.addOn(
            function (self) {

                self.Settings = self.settings;
                self.Setting = self.setting;

                self.Create = self.create;

                self.AddAll = self.addAll;
                self.Add = self.add;
                self.Remove = self.remove;
                self.Get = self.get;
                self.Size = self.size;
                self.UIAddOn = self.addOn;

                f_screen(self);
            }
        );
    };
    
    /** @deprecated */
    iris.ApplyAddOn = iris.applyAddOn;
    
    /** @deprecated */
    iris.Regional = iris.regional;


})(jQuery, window);
