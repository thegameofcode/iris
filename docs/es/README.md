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
* Utilización de técnicas de *minificación* de programaas.
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

Tras ejecutarse los métodos *create* y *awake* se generará y visualizará el DOM siguiente:

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
Observe como el método **screen** permite asociar un Hash-URL con un objeto de tipo Screen. El primer parámetro define el elemento de HTML dentro del cual será cargado el Screen cuando su Hash-URL sea invocado. Esta invocación la hacemos al pulsar sobre el enlace que hemos añadido en *welcome.html*. Iris utiliza el valor del atributo *data-id* para asociar el contenedor HTML con el Screen. Este atributo no debe repetirse dentro de un mismo componente.

El método *create* del Screen Home no se ejecutará hasta que no pulsemos por primera vez sobre el enlace.

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
Es importante observar que el código HTML del Screen se añade dentro del contenedor especificado.  

##Mostrando un Screen desde Javascript

Podemos conseguir lo mismo que en el apartado anterior desde el código en Javascript asociado al Screen.

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

Si pulsamos primero sobre el enlace a *#home* y después sobre *#help*, el DOM generado por Iris será:

```html
<html>
 <head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <a href="#home">Click to go to Home Screen</a>
   <br>
   <a href="#help">Click to gets some help</a>
   <div data-id="screens">
    Here is where Iris will load all the Screens
    <div style="display: none;">
     <h1>Home Screen</h1>
     <p>This is the home screen.</p>
    </div>
    <div style="display: block;">
     <h1>Help Screen</h1>
     <p>This is the help screen.</p>
    </div>
   </div>
  </div>
 </body>
</html>
```

Podemos comprobar, consistentemente con lo explicado anteriormente, que el código HTML de los Screens Home y Help ha sido añadido al contenedor pero sólo estará visible el correspondiente al último enlace pulsado, Help en este caso.

La secuencia de eventos producida tras ejecutar la secuencia anterior será:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
Home Screen Awakened
Help Screen Created
Home Screen Sleeping
Help Screen Awakened 
</pre>

Si volvemos a pulsa sobre el enlace a *#home*, se producirán los eventos adicionales:

<pre>
Help Screen Sleeping
Home Screen Awakened 
</pre>

##Malas prácticas en el registro de Screens

<!--TODO IMPORTANTE: Aclarar si lo ue se explica en esta sección son solamentre malas prácticas o si Iris se debería proteger de ellas -->

Vamos a poner algunos ejemplos de **malas prácticas** que se deben evitar:

Modificamos el Screen Welcome para que los Screens Home y Help se carguen en contenedores diferentes.

En *welcome.js* tendremos:

```js
self.create = function () {
 console.log("Welcome Screen Created");
 self.tmpl("welcome.html");
 self.screen("home-screen", "#home", "home.js");
 self.screen("help-screen", "#help", "help.js");
}
```

Y en *welcome.html*:

```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <a href="#home">Click to go to Home Screen</a>
 </br>
 <a href="#help">Click to gets some help</a>
 <div data-id="home-screen">
  Here is where Iris will load the Home Screen
 </div>
 <div data-id="help-screen">
  Here is where Iris will load the Home Screen
 </div>
</div>
```

Tras pulsar sobre ambos enlaces el DOM será:
```html
<html>
 <head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <a href="#home">Click to go to Home Screen</a>
   <br>
   <a href="#help">Click to gets some help</a>
   <div data-id="home-screen">
    Here is where Iris will load the Home Screen
    <div style="display: block;">
     <h1>Home Screen</h1>
     <p>This is the home screen.</p>
    </div>
   </div>
   <div data-id="help-screen">
    Here is where Iris will load the Home Screen
    <div style="display: block;">
     <h1>Help Screen</h1>
     <p>This is the help screen.</p>
    </div>
   </div>
  </div>
 </body>
</html>
```
Es decir, que se verán ambos Screens pero el Hash-URL apuntará a *#help*.
El problema es que si la secuencia la hacemos al revés, primero pulsamos sobre *#help* y luego sobre *#home*, la apariencia será la misma pero el Hash-URL del navegador ahora será *home*.

Peor será lo que ocurre con los eventos, la secuencia si pulsamos sobre *#home* y sobre *#help* sucesivamente será:

<pre>
Welcome Screen Created
Home Screen Created
Home Screen Awakened
Help Screen Created
Help Screen Awakened
</pre>

Es decir, que no se llega a llamar al evento *sleep* de Home.

Sin embargo, si después pulsamos sobre nuevamente sobre *#home*:

<pre>
Home Screen Sleeping
Home Screen Awakened
</pre>

Ahora se llama al evento *sleep* que antes echábamos de menos.

> Como norma general, debemos mostrar un único Screen cada vez. Esto lo podemos garantizar si asociamos los Hash-URLs que se vayan a utilizar a un mismo *data-id*.

Otra cosa que debemos evitar es hacer cosas como la siguiente:

```js
self.screen("screens", "#home", "home.js");
self.screen("screens", "#home", "help.js");
```

El registro del segundo Screen reemplazará al primero y será como si no hubiera tenido lugar.

> Debemos evitar asociar el mismo Hash-URL a varios Screens.

Por último, tampoco es conveniente hacer lo siguiente:

```js
self.screen("screens", "#home", "home.js");
self.screen("screens", "#help", "home.js");
```

El problema surge si analizamos la secuencia de eventos que se genera:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
Home Screen Awakened
Home Screen Created
Home Screen Sleeping
Home Screen Awakened 
</pre>

Como se comprueba fácilmente, se está violando el principio de que el método *create* de cada Screen se llamará una única vez.

> Debemos evitar asociar el mismo Screen a varios Hash-URLs.

##Creando un Screen por defecto

Aunque no es obligatorio, las aplicaciones que usen Iris tendrán normalmente un Screen que se cargará por defecto cuando no se especifique ningún Hash-URL.

Para hacer esto simplemente incluiremos el siguiente código en el método *awake* del Screen de bienvenida:

```js
//In welcome.js
self.awake = function () {
 ...
 if ( !document.location.hash ) {                
  iris.goto("#home"); //Default Screen

 }
 ...
}
```

##Visualizando UIs

En esta apartado vamos a aprender a trabajar con UIs. Los UIs son componentes reutiizables para definir la interfaz de usuario. Un UI pertenece a un Screen o a otro UI.

Los UIs tienen muchas analogías con los Screens por lo que si no lo ha hecho todavía, revise la sección anterior.

Vamos a crear un UI en el Screen Home del apartado anterior.

El código del UI va a ser:

En myUI.js:

```js
//In myUI.js

iris.ui(
 function (self) {
  self.create = function () {
   console.log("myUI UI Created");
   self.tmpl("myUI.html");
  }
  self.awake = function () {   
   console.log("myUI UI Awakened");
  }
  self.sleep = function () {
   console.log("myUI UI Sleeping");
  }
  
  self.destroy = function () {
   console.log("myUI UI Destroyed");
  }
 }
);
```
La única diferencia que enonctramos aquí con respoecto a lo explicado en los Screens es que los método se llama *ui* en vez de *screen*.

Tampoco tiene nada especial el fichero *myUI.html*:

```html
<div>
 <h1>myUI UI</h1>
 <p>This is the myUI template.</p>
</div>
```

Ahora vamos a ver las modificaciones que haremos en el Screen Home.

El fichero *home.html* tendrá un botón que nos permita cargar el UI y un contenedor que nos permita visualizarlo.

```html
<div>
 <h1>Home Screen</h1>
 <p>This is the home screen.</p>
 <button data-id="myUI-loader">Load MyUI</button>
 <div data-id='ui-container'/>
</div>
```

En el método *create* del fichero *home.js* tendremos lo siguiente:

```js
//In home.js
self.create = function () {   
 console.log("Home Screen Created");
 self.tmpl("home.html");
 self.get("myUI-loader").click(
  function() {
   self.ui("ui-container", "myUI.js");
  }
 );   
}
```

Los UIs son componentes no *navegables* y, por lo tanto, su activación tiene que hacerse desde Javascript de forma análoga a como se puede hacer también con los Screens. La principal diferencia con ellos es que no se registran y se cargan simplemente llamando al método *ui* del componente (en este caso del Screen Home). Este método puede recibir cuatro parámetros: el *data-id* del contenedor donde se va a cargar; el fichero Javascript asociado al UI y opcionalmente un objeto de Javascript que se pasará al UI como se explica más adelante; y por último, también de forma opcional, el *template mode* (ver explicación posterior).

Es interesante estudiar el DOM que genera Iris tras pulsar el botón y cargar el UI:

```html
<html>
 <head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <a href="#home">Click to go to Home Screen</a>
   <br>
   <a href="#help">Click to gets some help</a>
   <div data-id="screens">
    Here is where Iris will load all the Screens
    <div style="display: block;">
     <h1>Home Screen</h1>
     <p>This is the home screen.</p>
     <button data-id="myUI-loader">Load MyUI</button>
     <div>
      <h1>myUI UI</h1>
      <p>This is the myUI template.</p>
     </div>
    </div>
   </div>
  </div>
 </body>
</html>
```

Obsérvese que el contenedor con *data-id='ui-container'* ha sido reemplazado por el contenido del fichero *myUI.html*.

Aunque se puede modificar como explicaremos posteriormente, este es el comportamiento por defecto de los UIs:

> De forma predeterminada, cuando se carga un **UI**, su vista reempleza al contenedor. Por el contrario, cuando se carga un **Screen**, su vista se añade al contenedor.

Comprender esto es esencial ya que si, por ejemplo, volviéramos a pulsar el botón, se trataría de cargar el UI *myUI* sin éxito debido a que contenedor que le estamos pasando en el método *ui* ya no está presente en el DOM.

<!--TODO Iris no se queja de esta situación y decho llega a llamar al método create del UI-->

También es interesante analizar la secuencia de eventos que se produce:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
Home Screen Awakened
myUI UI Created 
</pre>

!--TODO Averiguar por qué no se llama al evento awake del UI -->
Hasta aquí nada especial; pero si luego pulsamos sobre el enlace a *#help*:

<pre>
Help Screen Created
myUI UI Sleeping
Home Screen Sleeping
Help Screen Awakened 
</pre>

Obsérvese que se llama al evento *sleep* tanto del UI *myUI* como del Screen *Home*.

Si ahora volvemos a pulsar sobre *#home*:

<pre>
Help Screen Sleeping
myUI UI Awakened
Home Screen Awakened 
</pre>

Se llama al evento *awake* tanto del UI *myUI* como del Screen *Home* ya que el UI ya estaba cargado.

##UIs contenidos en otros UIs

Un UI puede contener otros UIs. Para probar esto creemos otor UI llamado *innerUI* con los siguientes ficheros:

En *innerUI.js*:

```js
//In innerUI.js

iris.ui(
 function (self) {
  self.create = function () {
   console.log("innerUI UI Created");
   self.tmpl("innerUI.html");
  }
  self.awake = function () {   
   console.log("innerUI UI Awakened");
  }
  self.sleep = function () {
   console.log("innerUI UI Sleeping");
  }
  
  self.destroy = function () {
   console.log("innerUI UI Destroyed");
  }
 }
);
```

Y en *innerUI.html*:

```html
<div>
 <h1>innerUI UI</h1>
 <p>This is the innerUI template.</p>
</div>
```

En el método *create* del UI *myUI*:

```js
self.create = function () {
 console.log("myUI UI Created");
 self.tmpl("myUI.html");
 self.ui("inner-ui-container", "innerUI.js");
};
```

Y el fichero en el fichero *myUI.html*:

```html
<div>
 <h1>myUI UI</h1>
 <p>This is the myUI template.</p>
 <div data-id="inner-ui-container"/>
</div>
```

Aquí hay poco que comentar. Tan sólo que los UIs, al igual que los Screens, tienen un método *ui* que permite cargar otros UIs. Obsérvese también que la carga del UI interno se ha realizado directamtente sin utilizar un botón como hicimos en el ejemplo anterior.

##Añadiendo varios UIs a un mismo contenedor

Anteriormente hemos visto que cuando añadimos un UI, su contenedor es reemplazado por la vista del UI. Este comportamiento se puede modificar.

Para mostrar como hacer esto, modifiquemos el método *create* del UI *myUI*:

```js
self.create = function () {   
 console.log("myUI UI Created");
 self.tmplMode(self.APPEND);
 self.tmpl("myUI.html");
}
```

Únicamente hemos llamado el método **tmplMode** con la constante *APPEND*.  Esto hace que el contenedor no sea reemplezado por el UI creado, sino que el UI será añadido al final del contenedor. La implicación más importante es que podemos pulsar varias veces el botón. Cada pulsación creará un nuevo UI que se añadirá al contenedor.

Este comportamiento es similar al que tienen los Screens. La principal diferencia, que todavía permanece, es que Iris mostrará todos los UIs añadidos a un contenedor, mientras que sólo visualizará un Screen permaneciendo el resto ocultos.

El método *tmplMode* puede recibir también la constante *PREPEND* haciendo que los UIs se añadan como primer hijo en vez de como último.

Se puede especificar el valor de *tmplMode* en el método *ui* pasándolo como cuarto parámetro.

##Malas prácticas con UIs

> En general, no es una buena idea reutilizar un contenedor de UIs para cargar Screens o viceversa. Aunque Iris puede manejar esta situación, vamos a tener problemas si el método *tmplMode* del UI no está configurado en modo *APPEND* ó *PREPEND* ya que  el modo por defecto, *REPLACE*, impedirá que se carguen los Screens una vez que se haya creado el UI.

Es mejor tener un contenedor para UIs y otro para Screens y no mezclar conceptos.

> Podemos reutilizar un contenedor para almacenar UIs de distinto tipo pero hay que tener mucho cuidado con la definición que se haga en el método *tmplMode* en cada uno de los UIs.

Normalmente cada tipo de UI tendrá su propio contenedor.

##Destruyendo Screens

Iris dispone del método *destroyScreen* para destruir componentes de tipo Screen.

Podemos probarlo con el siguiente código:

En *welcome.html*:

```html
div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <button data-id="create-home-screen">Click create a Home Screen</button>
 </br> 
 <button data-id="destroy-home-screen">Click to destroy Home Screen</button>
 </br>
 <a href="#help">Gets some help</a>
 <div data-id="container"/>
</div>
```
Y en el método *create* *welcome.js*:
 
```js
 self.create = function () {
 console.log("Welcome Screen Created");
 self.tmpl("welcome.html"); 
 self.screen("container", "#home", "home.js")
 self.screen("container", "#help", "help.js")
 
 self.get("create-home-screen").click(
  function() {   
   iris.goto("#home");
  }
 );

 self.get("destroy-home-screen").click(
  function() {   
    iris.destroyScreen("#home");
  }
 );
}
```
 
Observe que tenemos dos botones, uno para ir al Screen Home y otro para destruirlo. Tras pulsar sucesivamente sobre ambos Iris generará el siguiente DOM:

```html
<<html>
 <head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <button data-id="create-home-screen">Click create a Home Screen</button>
   <br>
   <button data-id="destroy-home-screen">Click to destroy Home Screen</button>
   <br>
   <a href="#help">Gets some help</a>
   <div data-id="container"></div>
  </div>
 </body>
</html>
```

Observe que el contenido del Screen Home ha sido completamente eliminada.

<!-- TODO Se elimina la referencia pero en la barra de direcciones del navegador se conserva el HAs-UL #home -->
 
 Si el Screen destruido contiene UIs, estos también serán destruidos. Para probarlo, modifiquemos el Screen Home de la siguiente manera:
 
En *home.html*:

```html
<div>
 <h1>Home Screen</h1>
 <p>This is the home screen.</p> 
 <div data-id='ui-container'/>
</div>
```
Y en el método *create* de *home.js*:

```js
self.create = function () {
 console.log("Home Screen Created");
 self.tmpl("home.html");
 self.ui("ui-container", "myUI.js"); 
}
```
Al pulsar sobre los botones *create* y *destroy* se generará un DOM idéntico al anterior ya que el UI se destruirá junto con el Screen. La secuencia de eventos será la siguiente:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
myUI UI Created
myUI UI Awakened
Home Screen Awakened
myUI UI Sleeping
Home Screen Sleeping
myUI UI Destroyed
Home Screen Destroyed
</pre>

 <!--TODO Revisar la consistencia de esto ya que la secuencia no parece lógica: ¿Por qué se ejecutan los enventos create y awake del UI entre los eventos create y awake del Screen contenedor-->

##Destruyendo UIs

Para destruir UIs, Iris dispone de dos métodos: *destroyUI* y *destroyUIs*. Esto métodos son locales al componente que los vaya a destruir a diferancia de *destroyScreen* que es global.

Para probar *destroyUI* tendremos el siguiente código:

En *welcome.js*:

```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <button data-id="create-myUI">Click create a myUI UI</button>
 </br> 
 <button data-id="destroy-myUI">Click to destroy all myUI UIs</button>
 <div data-id="container"/>
</div>
```

En *welcome.js*:

```js
self.create = function () {
 console.log("Welcome Screen Created");
 self.tmpl("welcome.html"); 
 
 var myUI = null;
 
 self.get("create-myUI").click(
  
  function() {   
   myUI = self.ui("container", "myUI.js");
  }
 );

 self.get("destroy-myUI").click(
  function() {   
    if (myUI != null) {
     self.destroyUI(myUI);
    }
  }
 );
}
```

Observe que eliminamos el UI con el método *destroyUI* a través de la referencia al UI que nos devuelve el método *ui*.

En *myUI.js*:

```js
self.create = function () {
 console.log("myUI UI Created");
 //self.tmplMode(self.APPEND);
 self.tmpl("myUI.html");
}
```

El DOM generado ha eliminado todo el contenido del UI y de su contenedor (*data-id='container'*).

```html
<html>
 <head>...</head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <button data-id="create-myUI">Click create a myUI UI</button>
   <br>
   <button data-id="destroy-myUI">Click to destroy myUI UI</button>
  </div>
 </body>
</html>
```

Si descomentamos la línea que asigna el *tmplMode* a *APPEND* en el fichero *myUI.js*, y pulsamos varias veces al botón que crea el UI seguida de una pulsación sobre el que lo destruye, sólo se eliminrá el último UI.

Para eliminar todos los UIs de un contenedor debemos utilizar el método *destroyUIs* como se explica en el siguiente ejemplo:

Para eliminar todos los UIs del contenedor, estas son las modificaciones que habría que hacer:

El método *create* de *welcome.js*:

```js
self.create = function () {
 console.log("Welcome Screen Created");
 self.tmpl("welcome.html"); 
 
 self.get("create-myUI").click(
  function() {   
   self.ui("container", "myUI.js");
  }
 );

 self.get("destroy-myUI").click(
  function() {   
    self.destroyUIs("container");
  }
 );
}
```
Para eliminar todos los UIs de un contenedor le pasamos el *data-id* de ese contenedor el método *destroyUIs*.

Y el método *create* de *myUI.js*:

```js
self.create = function () {
 console.log("myUI UI Created");
 self.tmplMode(self.APPEND);
 self.tmpl("myUI.html");
}
```

Tras pulsar tres veces sobre el botón que crea el UI y una vez sobre el que lo destruye, el DOM quedaría:

```html
<html>
 <head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <button data-id="create-myUI">Click create a myUI UI</button>
   <br>
   <button data-id="destroy-myUI">Click to destroy myUI UIs</button>
   <div data-id="container"></div>
  </div>
 </body>
</html>
```

Es decir, los UIs habrán sido eliminados pero no su contenedor ya que el *tmplMode* tiene valor *APPEND*.

La secuencia de eventos será:

<pre>
Welcome Screen Created
Welcome Screen Awakened
myUI UI Created
myUI UI Created
myUI UI Created
myUI UI Sleeping
myUI UI Destroyed
myUI UI Sleeping
myUI UI Destroyed
myUI UI Sleeping
myUI UI Destroyed
</pre>

<!TODO Como ya se ha advertido, faltan los eventos awake de los UIs-->

<!-TODO Preguntar si hay algo más no contado sobre el método destroyUIs-->

<!TODO Esto también funciona pero creo que no debería hacerlo:

Si trabajamos en modo REPLACE en vez de en modo APPEND, el método destroyUIs elimina el UI pero su contenedor (data-id'container') no existe por lo que creo que no debería haberlo hecho

-->

##Enviando parámetros a un Screen

En esta sección vamos a ver varias formas de que un Screen reciba un parámetro. Los parámetros se pasan los Screen en el *[Query String](http://en.wikipedia.org/wiki/Query_string)* de la URL.

Observe como se pasa el parámetro al Screen Home en el *welcome.html*:

```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <a href="#home?year=2013">Click to go to Home Screen</a>
 </br>
 <a href="#help">Click to gets some help</a>
 </br> 
 <div data-id="screens">
  Here is where Iris will load all the Screens
 </div> 	
</div>
```

El *welcome.js* no tendría nada de particular:

```js
//In welcome.js
iris.screen(
 function (self) {
  self.create = function () {
   console.log("Welcome Screen Created");
   self.tmpl("welcome.html");
   self.screen("screens", "#home", "home.js");
   self.screen("screens", "#help", "help.js");   
  }
 }
 );
```

El parámetro lo recibimos en el Screen Home de esta forma:

En *home.html*:

```html
<div>
 <h1>Home Screen</h1>
 <p>This is the home screen.</p>
 <div data-id="year-parameter"/>
</div>
```

Y en *home.js*:

```js
//In home.js

iris.screen(
 function (self) {
  self.create = function () {   
   console.log("Home Screen Created");
   self.tmpl("home.html");
  }
  
  self.awake = function (params) {  
   console.log("Home Screen Awakened");   
   self.get("year-parameter").text("The value of the year parameter is: " + params.year);
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

Observe que el parámetro se recibe como un atributo del objeto *params* que será pasado por Iris a la función definida en el método *awake*.

También podemos pasar un parámetro en el método *goto* de Iris. Para probar esto hagamos las siguientes cambios:


En *welcome.html* cambiamos el enlace por un botón:

```html
<div>
 <h1>Welcome Screen</h1>
 <p>This is the initial screen.</p>
 <button data-id="goto-home">Goto Home</button>
 </br>
 <a href="#help">Click to gets some help</a>
 </br> 
 <div data-id="screens">
  Here is where Iris will load all the Screens
 </div> 	
</div>
```

En *welcome.js* enviamosel parámetro:

```js
//In welcome.js
iris.screen(
 function (self) {
  self.create = function () {
   console.log("Welcome Screen Created");
   self.tmpl("welcome.html");
   self.screen("screens", "#home", "home.js");
   self.screen("screens", "#help", "help.js");   
   self.get("goto-home").click(
    function() {
     iris.goto("#home?year=" + (new Date().getFullYear())); //Send the current year instead a fixed value
    }
   )
  }
 }
 );
```

##Paso de parámetros en UIs

#<a name="paso-a-paso"></a>Contruyendo paso a paso una aplicación desde cero
