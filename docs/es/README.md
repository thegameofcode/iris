#¿Qué es Iris?

[Iris](https://github.com/iris-js/iris) es un *framework* escrito en Javascript que permite construir el *front-end* de una aplicación Web utilizando distintas técnicas para que las aplicaciones sean eficientes, rápidas, estructuradas y modulares.

Iris es completamente independiente de la tecnología que se utilice en el servidor. Así, podemos utilizar Iris en aplicaciones basadas en Java, PHP, Python, GAE, .NET, Ruby, etc.

#Características de Iris

Las principales características de Iris son:

* Fuertemente enfocado hacia la construcción de aplicaciones orientadas a objetos.
* Facilita la organización en ficheros.
* Basada en el patrón [Presenter-View-Resource](http://blog.nodejitsu.com/scaling-isomorphic-javascript-code#rvp).
* [Navegación en una sola página](http://itsnat.sourceforge.net/php/spim/spi_manifesto_en.php) usando fragmentos Hash-URL.
* [Motor de plantillas](http://en.wikipedia.org/wiki/Template_engine_(web) ) sencillo y eficiente.
* Soporte multilenguaje realizado 100% en el cliente.
* Soporte a variaciones regionales de números, monedas, fechas, etc.
* Funcionamiento desacoplado mediante eventos.
* Soporte a servicios [REST](http://en.wikipedia.org/wiki/Representational_state_transfer).
* Independiente del navegador (Chrome, Firefox e Internet Explorer).
* Independiente del servidor (Apache, Node.js, IIS, GAE, etc).
* Únicamente dependendiente de JQuery <!--TODO: Preguntar versión-->.
* Integrable y totalmente compatible con otros populares *Frameworks* como Backbone o BootStrap <!--TODO: Confirmar y añadir más-->. 
* Ligero y rápido (<15 KB).
* De código libre (licencia New BSD License. <!--TODO: Poner enlace-->).

#¿Por qué Iris?

El conjunto de tecnologías conocido como [AJAX](http://en.wikipedia.org/wiki/Ajax_(programming) ) están cambiando radicalmente la forma tradicional de construir aplicaciones Web.

Desde el punto de vista del desarrollo, el cambio fundamental supone que parte de la lógica de la aplicación, que antes se ejecutaba en el servidor, ahora se realiza en el cliente.

El lenguaje [*Javascript*](http://en.wikipedia.org/wiki/Javascript) se está consolidando como la principal alternativa para responder a este desafío. En este sentido, *Javascript* está viendo una *segunda juventud*  gracias a que ahora es capaz de ejecutarse 100 veces más rápido y dejando atrás los tiempos en los que se utilizaba únicamente para tareas tales como responder a la pulsación de un botón o cambiar el color de fondo de un párrafo. Continuamente están apareciendo soluciones en *Javascript* que resuelven problemas como:

* Interaccionar con el [DOM](http://en.wikipedia.org/wiki/Document_object_model).
* *Maquetar* el *front-end*.
* Facilitar el [Diseño Web Adaptativo](http://en.wikipedia.org/wiki/Responsive_web_design). 
* Recuperar y enviar información del/al servidor.
* Construir el modelo de datos en el lado del cliente.
* Aplicar patrones de arquitectura como el [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).
* [Servir páginas Web](http://en.wikipedia.org/wiki/Web_server).
* Almacenar datos en bases de datos [NoSQL](http://en.wikipedia.org/wiki/Nosql).
* Realizar [pruebas de unidad](http://en.wikipedia.org/wiki/Unit_test).
* Automatizar tareas.
* Etcétera.

El mayor peso relativo que está adquiriendo la programación en el *lado del cliente* plantea nuevas dificultades:

* Por un lado, gran parte del código en [HTML](http://en.wikipedia.org/wiki/Html) ahora se genera dinámicamente desde cliente con *Javascript*. Esto supone una gran ventaja ya que mejora la experiencia de usuario y disminuye la necesidad de interaccionar con el servidor, pero también genera problemas nuevos:
	* Los buscadores ya no pueden realizar correctamente su trabajo, debido a que la aplicación ahora no necesita modificar la [URL](http://en.wikipedia.org/wiki/Url). Por motivos de optimización, los buscadores no analizan el código generado desde *Javascript* (ver [SEO](http://en.wikipedia.org/wiki/Search_Engine_Optimization)).
	* Por el mismo motivo, ahora es más difícil enlazar a secciones concretas de la aplicación.
	* Problemas con el almacenamiento temporal en *caché*. Es frecuente que el navegador almacene la información y no vaya a *buscar* los datos al servidor.
	* Problemas con los botones de delante/atrás.
	* Problemas con análisis estadísticos de las páginas visitadas.

* Por otro lado, el desplazamiento de parte de la lógica al cliente, tiene como consecuencia que ahora las aplicaciones en *Javascript* alcanzan fácilmente varios millares de líneas de código. Esto supone una dificultad de mantenimiento máxime si, como decíamos antes, el código en HTML se genera dinámicamente en el cliente.

Iris está especialmente diseñada para dar respuesta a ambos problemas:

* Con Iris, la navegación se realiza en una sólo página. El flujo de navegación se define mediante Hash-URLs como en populares aplicaciones como [Gmail](https://mail.google.com).
* Iris permite estructurar el código en HTML y en Javascript en pequeños fragmentos. Esto supone importantes ventajas como:
	* Refuerza la modularidad de la aplicación, la ocultación, la cohesión y el bajo acoplamiento.
	* Define una clara separación de la vista y su comportamiento.
	* Mejora el trabajo en equipo permitiendo asignar tareas a distintos roles: analista, programador, diseñador, etc.
	* Simplifica la definición y la modificación del flujo de navegación.
	* Elimina o reduce al mínimo la necesidad de generación de código dinámico.
	* Permite la reutilización de los componentes creados.
	* Facilita la realización de pruebas, la depuración y el mantenimiento.


#¿Cómo funciona Iris?

##Componentes

La estructura de una aplicación Iris consiste en la creación de varios componentes que interaccionan entre sí.

Un **componente** contiene dos elementos fundamentales: La vista o presentación y el comportamiento.

La **vista** consiste en un fragmento de código en HTML, típicamente un *DIV*, almacenado en un fichero, normalmente con extensión *.html*.

El **comportamiento** es un fragmento de código en Javascript almacenado en un fichero, típicamente con extensión *.js*. Cuando un componente se activa (ver más adelante), puede recibir parámetros que permiten modificar su comportamiento.

![Definición de comportamiento](https://raw.github.com/surtich/iris/iris-grunt/docs/images/component_equation.png)

Cuando Iris cargue un componente, visualizará el código de su fichero HTML asociado y ejecutará su fichero de Javascript según se haya definido en su ciclo de vida (ver más adelante).

El código HTML del componente se insertará en el DOM de la página. La inserción se hará sustituyendo o añadiéndose, según se defina, al elemento que se defina del DOM (ver más adelante).


##Screens y UIs

Iris utiliza dos tipos de componentes principales: Screens y UIs.

Recuérdese que ambos son componentes y, por lo tanto, se definen mediante dos ficheros: Uno en HTML para establecer la vista o presentación y otro en Javascript para el comportamiento. 

Un **UI** es un elemento sencillo. Puede ser un simple botón o un elemento en una lista. Un UI se puede componer de otros UIs y, así, tener un grado de complejidad mayor.

Un **Screen** es un elemento de navegación. Cada Screen está asociado a un Hash-URL. Si en la barra de direcciones del navegador, escribimos el Hash-URL al que está asociado un Screen, Iris cargará su fichero HTML y ejecutará el fichero en Javascript según su ciclo de vida.

En un Screen podemos registrar otros Screens y visualizarlos forzando que se modifique el Hash-URL de la barra de direcciones del navegador.

Un Screen puede contener otros componentes de tipo UI.


##Ciclo de vida de un componente

Iris define cuatro transiciones en el ciclo de vida de un componente: create, awake, sleep y destroy. En el fichero Javascript asociado al componente, podemos definir métodos *callbacks* que serán llamados por Iris cuando el evento correspondiente se produzca.

Cuando se cree un componente, Iris ejecutará el código asociado a la función **create**. Normalmente aquí cargaremos el código HTML asociado al componente y registraremos los Screens. Este método sólo se llamará una vez en la vida de un componente. La creación de un Screen se realizará navegando al Hash-URL correspondiente o invocando el método *goto* de Iris. La creación de un UI se realizará invocando el método *ui* del componente en el que lo queramos crear. 

El evento complementario será **destroy**. Esté método al igual que *create* se efectuará una única vez en la vida de un componente. La destrucción de un componente se efectuará llamando al método *destoryUI* o *destroyScreen* dependiendo del componente de que se trate. En el caso de componente de tipo UI, también se llamará cuando un UI sea sustituido por otro. La destrucción de un componente supondrá la destrucción de todos los componentes de tipo UI que contenga.

El evento **awake** se producirá después del evento *create* y cada vez que cambie el Hash-URL asociado al Screen que se va a visualizar. El método *awake* se llamará en los UIs que compongan el Screen y luego en el propio Screen. <!--TODO preguntar si tiene que tiene que ser así. La primera vez no se está lanzando el evento awake en los UIs-->. Aquí normalmente asociaremos eventos a nuestros aplicación, reproduciremos vídeo o audio, etc.

Por último, el evento **sleep** será el complementario de *awake*. Y se efectuará primero sobre los UIs contenidos en el Screen y luego en el propio Screen cada vez que se produzca un cambio en el Hash-URL que suponga su ocultamiento. No se nos debe olvidar desactivar los eventos o parar la reproducción de componentes multimedia que hayamos efectuado en el evento *awake*. Antes de que se llame al método *destroy* de un componente se efectuará la llamada a *sleep*.

Podemos ver esto gráficamente:<!--TODO Actualizar gráfico-->

![Ciclo de vida](https://raw.github.com/surtich/iris/iris-grunt/docs/images/iris_life_cycle.png)

##Página de inicio de Iris

#Paso a paso con Iris