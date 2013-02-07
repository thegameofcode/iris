iris.path = {
    welcome : "app/screen/welcome.js",
    welcome_tmpl : "app/screen/welcome.html",
    example_destroy : "app/screen/example_destroy.js",
    example_destroy_tmpl : "app/screen/example_destroy.html",
    example_destroy_all : "app/screen/example_destroy_all.js",
    example_destroy_all_tmpl : "app/screen/example_destroy_all.html",
    example_instance : "app/screen/example_instance.js",
    example_instance_tmpl : "app/screen/example_instance.html",
    example_list : "app/screen/example_list.js",
    example_list_tmpl : "app/screen/example_list.html",
    example_nested_uis : "app/screen/example_nested_uis.js",
    example_nested_uis_tmpl : "app/screen/example_nested_uis.html",
    example_screen_params : "app/screen/example_screen_params.js",
    example_screen_params_tmpl : "app/screen/example_screen_params.html",
    example_screen_params_child : "app/screen/example_screen_params_child.js",
    example_screen_params_child_tmpl : "app/screen/example_screen_params_child.html",
    example_template_params : "app/screen/example_template_params.js",
    example_template_params_tmpl : "app/screen/example_template_params.html",
    ui_example : "app/ui/example.js",
    ui_example_tmpl : "app/ui/example.html",
    ui_example_basic : "app/ui/example_basic.js",
    ui_example_basic_tmpl : "app/ui/example_basic.html",
    ui_nested : "app/ui/nested.js",
    ui_nested_tmpl : "app/ui/nested.html"
};


$(document).ready(
    function () {
        iris.translations("es-ES", "./app/lang/es-es.js");

        iris.baseUri("./");
        
        
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

        iris.welcome(iris.path.welcome);
    }
);
