#¿Qué es Iris?

[Iris](https://github.com/iris-js/iris) es un *framework* escrito en Javascript para construir el *front-end* de una aplicación Web que, aplicando distintas técnicas, permite que las aplicaciones sean eficientes, rápidas, estructuradas y modulares.

Iris es completamente independiente de la tecnología que se utilice en el servidor; así, podemos utilizar Iris en aplicaciones basadas en Java, PHP, Python, GAE, .NET, Ruby, etc.

#Características de Iris

Las principales características de Iris son:
* Fuertemente enfocado hacia la construcción de aplicaciones orientadas a objetos.
* Facilita la organización en ficheros.
* Basada en el patrón [Presenter-View-Resource](http://blog.nodejitsu.com/scaling-isomorphic-javascript-code#rvp).
* [Navegación en una sola página](http://itsnat.sourceforge.net/php/spim/spi_manifesto_en.php) usando fragmentos Hash-URL.
* Motor de plantillas sencillo y eficiente.
* Soporte multilenguaje realizado 100% en el cliente.
* Soporte a variaciones regionales de números, monedas, fechas, etc.
* Funcionamiento desacoplado mediante eventos.
* Soporte a servicios [REST](http://en.wikipedia.org/wiki/Representational_state_transfer).
* Soporte para el paso de desarrollo a producción.
* Independiente del navegador (Chrome, Firefox e Internet Explorer).
* Independiente del servidor (Apache, Node.js, IIS, GAE, etc).
* Únicamente dependendiente de JQuery <!--TODO: Preguntar versión-->.
* Integrable y totalmente compatible con otros populares *Frameworks* como Backbone o BootStrap <!--TODO: Confirmar y añadir más-->. 
* Ligero y rápido (<15 KB).
* De código libre (licencia New BSD License. <!--TODO: Poner enlace-->).

#¿Por qué Iris?

El conjunto de tecnologías conocido como AJAX están cambiando radicalmente la forma tradicional de construir aplicaciones Web.

Desde el punto de vista del desarrollo, el cambio fundamental supone que parte de la lógica de la aplicación, que antes se ejecutaba en el servidor, ahora se realiza en el cliente.

El lenguaje [*Javascript*](http://en.wikipedia.org/wiki/Javascript) se está consolidando como la principal alternativa para responder a este desafío. En este sentido, *Javascript* está viendo una *segunda juventud*  gracias a que ahora es capaz de ejecutarse 100 veces más rápido, dejando atrás tiempos en los que se utilizaba únicamente para tareas tales como responder a la pulsación de un botón o cambiar el color de fondo de un párrafo. Continuamente están apareciendo soluciones en *Javascript* que resuelven problemas como:
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

Sin embargo, el mayor peso relativo que está adquiriendo la programación en el *lado del cliente* plantea nuevas dificultades:
* Por un lado, buena parte del código en [HTML](http://en.wikipedia.org/wiki/Html) ahora se genera dinámicamente desde cliente con *Javascript*. Esto supone una gran ventaja ya que mejora la experiencia de usuario y disminuye la necesidad de interaccionar con el servidor, pero también genera problemas nuevos:
	* Los buscadores ya no pueden realizar correctamente su trabajo debido a que la aplicación no necesita modificar la [URL](http://en.wikipedia.org/wiki/Url). Por motivos de optimización, los buscadores no analizan el código generado desde *Javascript* (ver [SEO](http://en.wikipedia.org/wiki/Search_Engine_Optimization)).
	* Por el mismo motivo, ahora es más difícil enlazar a secciones concretas de la aplicación.
	* Surgen problemas con el almacenamiento temporal en *caché*. Es frecuente que el navegador almacene la información y no vaya a *buscar* los datos al servidor.
	* Aparecen anomalías en el comportamiento de los botones de delante/atrás. 
	* Problemas con el análisis estadístico de las páginas visitadas.
	* Es fácil que se produzcan *filtraciones* de memoria debido a que los objetos creados dinámicamente con Javascript dejen de apuntar a la referencia correcta o, por el contrario, que permanezcan indefinidamente en la memoria.

* Por otro lado, el desplazamiento de parte de la lógica al cliente, tiene como consecuencia que las aplicaciones en *Javascript* alcancen fácilmente varios millares de líneas de código. Esto supone una dificultad de mantenimiento máxime si, como decíamos antes, el código en HTML se genera dinámicamente en el cliente.

Iris está especialmente diseñado para dar respuesta a ambos problemas:

* Con Iris, la navegación se realiza en una sóla página. El flujo de navegación se define mediante Hash-URLs como en populares aplicaciones como [Gmail](https://mail.google.com).
* Iris permite estructurar el código en HTML y en Javascript en pequeños fragmentos. Esto supone importantes ventajas como:
	* Refuerza la modularidad de la aplicación, la ocultación, la cohesión y el bajo acoplamiento.
	* Define una clara separación de la vista y su comportamiento.
	* Mejora el trabajo en equipo permitiendo asignar tareas a distintos roles: analista, programador, diseñador, etc.
	* Simplifica la definición y la modificación del flujo de navegación.
	* Elimina o reduce al mínimo la necesidad de generación de código dinámico.
	* Permite la reutilización de los componentes creados.
	* Facilita la realización de pruebas, la depuración y el mantenimiento.


#¿Cómo funciona Iris?

En esta sección se van a presentar los principales componentes de Iris y los métodos para crear, destruir o interaccionar con ellos. No se preocupe si no entiende algunos conceptos, ya que lo único que se pretende en este momento es que se vaya familirarizando con la forma de trabajo de Iris.  Más adelente se propondrán ejemplos de código que le permitirán clarificar y profundizar lo aquí esbozado.

##Componentes

La estructura de una aplicación Iris consiste en la creación de varios componentes que interaccionan entre sí.

Cada **componente** permite definir los elementos que conforman la interfaz de usuario. Un compoenete contiene dos elementos fundamentales: La vista o presentación y el comportamiento.

La **vista** consiste en un fragmento de código en HTML, típicamente un *DIV*, almacenado en un fichero, normalmente con extensión *.html*.

El **comportamiento** es un fragmento de código en Javascript almacenado en un fichero, típicamente con extensión *.js*. Cuando un componente se activa (<a href="#awake">ver más adelante</a>), puede recibir parámetros que permiten modificar su comportamiento.

![Definición de comportamiento](https://raw.github.com/surtich/iris/iris-grunt/docs/images/component_equation.png)

Cuando Iris carga un componente, visualiza el código de su fichero HTML asociado y ejecuta su fichero de Javascript según se haya definido en su ciclo de vida (<a href="#ciclo_de_vida">ver más adelante</a>).

El código HTML del componente se inserta en el DOM de la página. La inserción se hace sustituyendo o añadiéndo (según se prefiera) un elemento que se defina en el DOM (ver más adelante).

##Screens y UIs

Iris utiliza dos tipos de componentes principales: Screens y UIs.

Recuérdese que ambos son componentes y, por lo tanto, se definen mediante dos ficheros: Uno en HTML para establecer la vista o presentación y otro en Javascript para el comportamiento. 

Un **UI** es un elemento sencillo. Puede ser un simple botón o un elemento en una lista. Un UI se puede componer de otros UIs y, así, tener un grado de complejidad mayor.

Un <a name="screen"></a>**Screen** es un elemento de navegación. Cada Screen está asociado a un Hash-URL. Si en la barra de direcciones del navegador, escribimos el Hash-URL al que está asociado un Screen, Iris cargará su fichero HTML y ejecutará el fichero en Javascript según su ciclo de vida.

En un Screen podemos registrar otros Screens y visualizarlos al modificar el Hash-URL de la barra de direcciones del navegador.

Un Screen puede contener otros componentes de tipo UI.


##<a name="ciclo_de_vida"></a>Ciclo de vida de un componente

Iris establece cuatro transiciones en el ciclo de vida de un componente: *create*, *awake*, *sleep* y *destroy*. En el fichero Javascript asociado al componente, podemos definir métodos *callbacks* que serán llamados por Iris cuando el evento correspondiente se produzca.

Cuando se cree un componente, Iris ejecutará el código asociado a su método **create**. Normalmente aquí cargaremos el código HTML asociado al componente y registraremos los Screens. Este método sólo se llamará una vez en la vida de un componente. La creación de un Screen se realizará navegando al Hash-URL correspondiente o invocando el método *goto* de Iris. La creación de un UI se realizará invocando el método *ui* del componente en el que lo queramos crear. 

El evento complementario será **destroy**. Esté método, al igual que *create*, se efectuará una única vez en la vida de un componente. La destrucción de un componente se efectuará llamando al método *destoryUI* o *destroyScreen* dependiendo del componente de que se trate. En el caso de componente de tipo UI, también se llamará cuando un UI sea sustituido por otro. La destrucción de un componente supondrá la destrucción de todos los componentes de tipo UI que contenga.

<a name="awake"></a>El evento **awake** se producirá después del evento *create* y cada vez que cambie el Hash-URL asociado al Screen que se va a visualizar. El método *awake* se llamará en los UIs que compongan el Screen y luego en el propio Screen. <!--TODO preguntar si tiene que tiene que ser así. La primera vez no se está lanzando el evento awake en los UIs-->. Aquí es donde habitualmente asociaremos eventos a nuestra aplicación, reproduciremos vídeo o audio, etc. En la llamada al método *awake* podemos pasar parámetros al componente para variar su comportamiento.

Por último, el evento **sleep** es el complementario de *awake*, y se efectuará primero sobre los UIs contenidos en el Screen y luego en el propio Screen cada vez que se produzca un cambio en el Hash-URL que suponga su ocultamiento. No debemos olvidar desactivar los eventos o detener otras tareas, como la reproducción de componentes multimedia, que hayamos iniciado en el evento *awake*. Antes de que se llame al método *destroy* de un componente, se efectuará la llamada a *sleep*.

Podemos ver esto gráficamente:<!--TODO Actualizar gráfico-->

![Ciclo de vida](https://raw.github.com/surtich/iris/iris-grunt/docs/images/iris_life_cycle.png)

##Screen de bienvenida

Toda aplicación Iris debe definir un componente inicial que se cargará al principio. Este componente será un <a href="#screen">Screen</a> especial ya que tiene algunas diferencias con lo explicado anteriormente:
* El Screen de bienvenida no tiene Hash-URL asociado y se carga con el método **welcome** de Iris.
* A diferencia de lo que ocurre con otros Screens, el componente no puede recibir parámatros en su activación.
* En una aplicación Iris, normalmente, no habrá necesidad de refrescar o de modificar la *URL* sobre la que se carga el Screen de bienvenida.
* Por lo tanto, tampoco será habital llamar al método *destroy* de este Screen. Es decir, que el ciclo de vida de este Screen se simplifica ya que únicamente se hará una primera llamada al método *create* y una segunda al método *awake*.
* Lo habitual es que el cometido del Screen de bienvenida sea registrar otros Screens y *llamar* al Hash-URL del Screen inical de nuestra aplicación.

#Empezando con Iris

En esta sección vamos proponer ejemplos de código para aclarar y profundizar lo explicado anteriormente y para introducir nuevas capacidades de Iris.

Aquí no se pretende crear una aplicación funcional, sino que se comprenda como se trabaja con Iris. Los ejemplos, por lo tanto, no realizarán ningún trabajo úlil. Si quiere ver como construir una aplicación desde cero, puede consultar la <a href="#paso-a-paso">sección correspondiente</a>.

Para hacer más sencilla la explicación, todo el código de esta sección se situará un el directorio raiz de la aplicación. No es conveniente hacer esto en una aplciación real. En la sección *<a href="#paso-a-paso">Contruyendo paso a paso una aplicación desde cero</a>* se propone una estructura de directorios más adecuada para trabajar con Iris.

##Instalando Iris
El primer paso será decidir si queremos trabajar con la versión de [desarrollo](https://raw.github.com/iris-js/iris/master/dist/iris.js) o de [producción](https://raw.github.com/iris-js/iris/master/dist/iris.min.js)<!--TODO revisar enlaces-->y asociarlas a un fichero en HTML.

```html
<!-- In index.html -->
<script src="jquery-min.js"></script> <!--Iris just depends on JQuery-->
<script src="iris-0.5.0-SNAPSHOT.js"></script> <!-- TODO Change URL -->
```

##Llamando al Screen de bienvenida
Desde Javascript, llamamos al método **welcome** de Iris para cargar el fichero de comportamiento del Screen de bienvenida.

```js
//In any Javascrit file or in a "<script>" section of an HTML file ... 
$(document).ready(
 function () {
  iris.baseUri("./"); //It sets de base directory of the application
  iris.welcome("welcome.js"); //It loads the behavior file of the welcome Screen
 }
);
```

El fichero *welcome.js* antes referido tendrá la siguiente estructura:

```js
//In welcome.js
iris.screen(
	
 function (self) {
 	
  self.create = function () {
   self.tmpl("welcome.html");
   console.log("Welcome Screen Created");
  }

  self.awake = function () {
   console.log("Welcome Screen Awakened");
  }
		
  self.sleep = function () {
   console.log("Welcome Screen Sleeping"); //Never called
  }
  
  self.destroy = function () {
   console.log("Welcome Screen Destroyed");//Never called
  }
  
 }
 
);
```

Y el del archivo *welcome.html*:
```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
</div>
```
Cuando se ejecute el método *iris.welcome*, Iris creará un objeto de tipo Screen. Este objeto será pasado a la función que recibe el método *iris.screen* definido en el fichero *welcome.js* y se ejecutarán los métodos del ciclo de vida que se hayan definido en esta función. Concretamente, se ejecutarán sucesivamente los métodos *create* y *awake*.

Observe que el método *create* ejecuta una llamada al método **tmpl** que permite cargar en el DOM el contenido del archivo *welcome.html* pasado como parámetro. Los ficheros HTML asociados a componentes de Iris deben tener un único nodo raíz (típicamente un DIV).

Tras ejecutarse los métodos *create* y *awake* se visualizará se generará y visualizará el DOM siguiente:

```html
<html>
 <head>...</head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
  </div>
 </body>
</html>
```
Si llamáramos varias veces al método *tmpl*, el código HTML se irá añadiendo al anterior.
<!--TODO Preguntar si esto tiene sentido -->
<!-- TODO La llamada a tmpl funciona también si se hace en el awake, ¿Tiene algún sentido hacerlo aqui?. Supongo que no por el comentario anterior -->

##Registrando y mostrando un Screen

Primero creamos el Screen Home con una estructura muy parecida a la anterior.

```js
//In home.js

iris.screen(
 function (self) {
  self.create = function () {   
   self.tmpl("home.html");
   console.log("Home Screen Created");
  }
  self.awake = function () {   
   console.log("Home Screen Awakened");
  }
		
  self.sleep = function () {
   console.log("Home Screen Sleeping");
  }
  
  self.destroy = function () {
   console.log("Home Screen Destroyed");
  }
 }
);
```

Y en *home.html*:

```html
<div>
 <h1>Home Screen</h1>
 <p>This is the home screen.</p>
</div>
```
Modificamos el método *create* del Screen Welcome:

```js
self.create = function () {
 console.log("Welcome Screen Created");
 self.tmpl("welcome.html");
 self.screen("screens", "#home", "home.js"); 
 //This registers the #home hash and associates it with the Screen home.
 //The Screen will be added into the HTML element with attribute "data-id = 'screens'"
}
```
Y dejamos el fichero asociado *welcome.html* de la siguiente manera:

```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <a href="#home">Click to go to Home Screen</a>
 <div data-id="screens">
  Here is where Iris will load the Home Screen
 </div>
</div>
```
Observe como el método **screen** permite asociar un Hash-URL con un objeto de tipo Screen. El primer parámetro define el elemento de HTML dentro del cual será cargado el Screen cuando su Hash-URL sea invocado. Esta invocación la hacemos al pulsar sobre el enlace que hemos añadido en *welcome.html*. Iris utiliza el valor del atributo *data-id* para asociar el contenedor HTML con el Screen. Este atributo no debe repetirse dentro de una página Web.

Tras pulsar el enlace, el DOM de la página generada por Iris será el siguiente:

```html
<html>
 <head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <a href="#home">Click to go to Home Screen</a>
   <div data-id="screens">
    Here is where Iris will load the Home Screen
    <div style="display: block;">
     <h1>Home Screen</h1>
     <p>This is the home screen.</p>
    </div>
   </div>
  </div>
 </body>
</html>
```
Es importante observar como el  

##Mostrando un Screen desde Javascript

Podemos conseguir lo mismo que en el apartado anterior, desde el código en Javascript asociado al Screen.

Para hacer esto, modifiquemos el código del Screen Welcome:

En *welcome.html* sustituyamos el enlace por un botón:

```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <button data-id="goto-home">Click to go to Home Screen</button>
 <div data-id="screens">
  Here is where Iris will load the Home Screen
 </div>
</div>
```

Y en el fichero *welcome.js*:

```js
self.create = function () {
 console.log("Welcome Screen Created");
 self.tmpl("welcome.html");
 self.screen("screens", "#home", "home.js");
 //The get method returns de JQuery element associated with the data-id parameter
 self.get("goto-home").click( function() {
   iris.goto("#home"); //It browes to the Hash-URL
 }
 );
}
```
Observe como el método **goto** de Iris permite navegar al Hash-URL especificado y que el método **get** recibe el valor del atributo *data-id* del componente que se quiere seleccionar como un objeto JQuery.

##Mostrando varios screens

En este apartado vamos a crear un tercer Screen llamado Help.

Los ficheros asociados serán los habituales:

*help.js*:

```js
//In help.js

iris.screen(
 function (self) {
  self.create = function () {   
   self.tmpl("help.html");
   console.log("Help Screen Created");
  }
  self.awake = function () {   
   console.log("Help Screen Awakened");
  }
		
  self.sleep = function () {
   console.log("Help Screen Sleeping");
  }
  
  self.destroy = function () {
   console.log("Help Screen Destroyed");
  }
 }
);
```

*help.html*:
```html
<div>
 <h1>Help Screen</h1>
 <p>This is the help screen.</p>
</div>
```

El método *create* de *welcome.js* quedará así:

```js
self.create = function () {
 console.log("Welcome Screen Created");
 self.tmpl("welcome.html");
 self.screen("screens", "#home", "home.js");
 self.screen("screens", "#help", "help.js");
}
```

Y el fichero *welcome.html*:

```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <a href="#home">Click to go to Home Screen</a>
 </br>
 <a href="#help">Click to gets some help</a>
 <div data-id="screens">
  Here is where Iris will load all the Screens
 </div>
</div>
```


##Creando un Screen por defecto

Aunque no es obligatorio, las aplicaciones Iris tendrán normalmente un Screen que se cargará por defecto cuando no se especifique ningún Hash-URL.





#<a name="paso-a-paso"></a>Contruyendo paso a paso una aplicación desde cero
