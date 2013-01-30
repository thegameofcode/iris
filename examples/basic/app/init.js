
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
            example_destroy : "screen/example_destroy.js",
            example_destroy_all : "screen/example_destroy_all.js",
            example_instance : "screen/example_instance.js",
            example_list : "screen/example_list.js",
            example_nested_uis : "screen/example_nested_uis.js",
            example_screen_params : "screen/example_screen_params.js",
            example_screen_params_child : "screen/example_screen_params_child.js",
            example_template_params : "screen/example_template_params.js",
            ui_example : "ui/example.js",
            ui_example_basic : "ui/example_basic.js",
            ui_nested : "ui/nested.js"
        };
        
        iris.welcome("screen/welcome.js");
    }
);
