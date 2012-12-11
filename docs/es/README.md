#¿Qué es Iris?

[Iris](https://github.com/iris-js/iris) es un *framework* escrito en Javascript que permite construir el *front-end* de una aplicación Web utilizando distintas técnicas que permiten crear aplicaciones eficientes, rápidas, estructuradas y modulares.

Iris es completamente independiente de la tecnología que se utilice en el servidor. Así, podemos utilizar Iris en aplicaciones basadas en Java, PHP, Python, GAE, .NET, Ruby, etc.

#Características de Iris

Las principales características de Iris son:

* Fuertemente enfocado hacia la construcción de aplicaciones orientadas a objetos.
* Facilita la organización en ficheros.
* Basada en el patrón [Presenter-View-Resource](http://blog.nodejitsu.com/scaling-isomorphic-javascript-code#rvp).
* [Navegación en una sola página](http://itsnat.sourceforge.net/php/spim/spi_manifesto_en.php) usando fragmentos Hash-URL.
* [Motor de plantillas](http://en.wikipedia.org/wiki/Template_engine_(web)) sencillo y eficiente.
* Soporte multilenguaje realizado 100% en el cliente.
* Soporte a variaciones regionales de números, monedas, fechas, etc.
* Funcionamiento desacoplado mediante eventos.
* Soporte a servicios [REST](http://en.wikipedia.org/wiki/Representational_state_transfer).
* Independiente del navegador (Chrome, Firefox e Internet Explorer).
* Independiente del servidor (Apache, Node.js, IIS, GAE, etc).
* Únicamente dependendiente de JQuery (TODO: Preguntar versión).
* Integrable y totalmente compatible con otros populares *Frameworks* como Backbone o BootStrap (TODO: Confirmar y añadir más). 
* Ligera y rápida (<15 KB).
* De código libre (licencia New BSD License. TODO: Poner enlace).

#¿Por qué Iris?

Las aplicaciones Web modernas basadas en [AJAX](http://en.wikipedia.org/wiki/Ajax_(programming)) están cambiando radicalmente la forma tradicional de construir aplicaciones Web.

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

Iris estructura la aplicación dividiéndola en **componentes**.

Un componente contiene dos elementos fundamentales: La vista o presentación y el comportamiento.

La **vista** consiste en un fragmento de código en HTML, típicamente un *DIV*, almacenado en un fichero, normalmente con extensión *.html*.

El **comportamiento** es un fragmento de código en Javascript almacenado en un fichero, típicamente con extensión *.js*.



#Paso a paso con Iris