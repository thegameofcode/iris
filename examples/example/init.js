
$(document).ready(
    function () {

        iris.baseUri(iris.baseUri() + "examples/example/");
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
        
        iris.welcome("screen/welcome.js");
    }
);
