
$(document).ready(
    function () {

        iris.baseUri(iris.baseUri() + "examples/basic/app/");
        iris.translations("es-ES", "lang/es-es.js");
        
        
        iris.locale(
            "es-ES", {
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
        );

        iris.path = {
            welcome : "screen/welcome.js",
            welcome_tmpl : "screen/welcome.html",
            example_destroy : "screen/example_destroy.js",
            example_destroy_tmpl : "screen/example_destroy.html",
            example_destroy_all : "screen/example_destroy_all.js",
            example_destroy_all_tmpl : "screen/example_destroy_all.html",
            example_instance : "screen/example_instance.js",
            example_instance_tmpl : "screen/example_instance.html",
            example_list : "screen/example_list.js",
            example_list_tmpl : "screen/example_list.html",
            example_nested_uis : "screen/example_nested_uis.js",
            example_nested_uis_tmpl : "screen/example_nested_uis.html",
            example_screen_params : "screen/example_screen_params.js",
            example_screen_params_tmpl : "screen/example_screen_params.html",
            example_screen_params_child : "screen/example_screen_params_child.js",
            example_screen_params_child_tmpl : "screen/example_screen_params_child.html",
            example_template_params : "screen/example_template_params.js",
            example_template_params_tmpl : "screen/example_template_params.html",
            ui_example : "ui/example.js",
            ui_example_tmpl : "ui/example.html",
            ui_example_basic : "ui/example_basic.js",
            ui_example_basic_tmpl : "ui/example_basic.html",
            ui_nested : "ui/nested.js"
            ui_nested_tmpl : "ui/nested.html"
        };
        
        iris.welcome(iris.path.welcome);
    }
);
