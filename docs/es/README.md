#Índice
* <a href="#what_is_it">¿Qué es Iris?</a><br>
* <a href="#features">Características de Iris</a><br>
* <a href="#why">¿Por qué Iris?</a><br>
* <a href="#how_it_works">¿Cómo funciona Iris?</a><br>
 * <a href="#components">Componentes</a><br>
 * <a href="#screens_UIs">Screens y UIs</a></br>
 * <a href="#life_cycle">Ciclo de vida de un componente</a></br>
 * <a href="#welcome">Screen de bienvenida</a><br>
* <a href="#starting">Empezando con Iris</a></br>
  * <a href="#installing">Instalando Iris</a><br>
  * <a href="#calling_welcome">Llamando al Screen de bienvenida</a><br>
  * <a href="#register">Registrando y mostrando un Screen</a><br>
  * <a href="#showing_screen_js">Mostrando un Screen desde Javascript</a><br>
  * <a href="#showing_some_screens">Mostrando varios screens</a><br>
  * <a href="#screens_bad_practices">Malas prácticas en el registro de Screens</a><br>
  * <a href="#default_screen">Creando un Screen por defecto</a><br>
  * <a href="#uis">Visualizando UIs</a><br>
  * <a href="#inner_UIs">UIs contenidos en otros UIs</a><br>
  * <a href="#some_UIs">Añadiendo varios UIs a un mismo contenedor</a><br>
  * <a href="#UIs_bad_practices">Malas prácticas con UIs</a><br>
  * <a href="#Screens_drestroy">Destruyendo Screens</a><br>
  * <a href="#destroy_screens_bad_practices">Malas prácticas destruyendo Screens</a><br>
  * <a href="#UIs_drestroy">Destruyendo UIs</a><br>
  * <a href="#params">Enviando parámetros a un Screen</a><br>
  * <a href="#ui_params">Paso de parámetros en UIs</a><br>
  * <a href="#settings">Paso de parámetros utilizando el método *settings*</a><br>
  * <a href="#tmpl_settings">Paso de parámetros en el método *tmpl*</a><br>
  * <a href="#events">Trabajando con eventos</a><br>
  * <a href="#locals">Utilizando locales y regionales</a><br>
  * <a href="#ajax">Llamadas Ajax y servicios REST</a><br>
  * <a href="#production">Paso a producción</a><br>
  * <a href="#unit_test">Pruebas de unidad en Iris</a><br>
* <a href="#step_by_step">Construyendo paso a paso una aplicación desde cero</a><br>
  * <a href="#directories">Estructura de directorios</a><br>
  * <a href="#step_by_step_welcome">*Screen* Welcome</a><br>
  * <a href="#step_by_step_home">*Screen* Home</a><br>
  * <a href="#step_by_step_model">ShoppingList Model</a><br>
  * <a href="#step_by_step_caterogies">*Screen* Categories</a><br>
  * <a href="#step_by_step_products">*Screen* Products</a><br>
  * <a href="#step_by_step_shopping">*Screen* Shopping</a><br>
  * <a href="#step_by_step_qunit">Pruebas unitarias con *QUnit*</a><br>
  * <a href="#step_by_step_grunt">Automatizando procesos con *Grunt*</a><br>
  

#<a name="what_is_it"></a>¿Qué es Iris?

[Iris](https://github.com/iris-js/iris) es un *framework* escrito en Javascript para construir el *front-end* de una aplicación Web que, aplicando distintas técnicas, permite que las aplicaciones sean eficientes, rápidas, estructuradas y modulares.

Iris es completamente independiente de la tecnología que se utilice en el servidor; así, podemos utilizar Iris en aplicaciones basadas en Java, PHP, Python, GAE, .NET, Ruby, etc.

#<a name="features"></a>Características de Iris

Las principales características de Iris son:

* Código libre ([licencia New BSD License](https://raw.github.com/iris-js/iris/iris-grunt/LICENSE-New-BSD)).
* Ejecución 100% en cliente.
* Ligero y rápido (<15 KB).
* Independiente de servidor (Apache, Node.js, IIS, GAE, etc).
* Estructura organizada de ficheros.
* Independiente de navegador (Chrome, Firefox e Internet Explorer; basado en jQuery -1.5 o superior-)
* Fuertemente enfocado a Aplicaciones Orientadas a Objetos.
* Orientado a eventos, para la coordinación de elementos.
* Alta escalabilidad y alta reutilización de código.
* Patrón Resource-View-Presenter.
* Soporta cualquier tipo de tecnología de consumo de datos (servicios REST, almacenamiento local, distintas estrategias de caché...).
* Navegación sin cambiar de página, empleado Hash-URL.
* Motor de plantillas sencillo y eficiente.
* Soporte multiidioma y presentación regional de números, monedas, fechas, etc.
* Soporte para el paso de desarrollo a producción.
* Integrable y totalmente compatible con otros populares Frameworks como Backbone o BootStrap.
* Bien documentado.

#<a name="why"></a>¿Por qué Iris?

El conjunto de tecnologías conocido como AJAX está cambiando radicalmente la forma tradicional de construir aplicaciones Web.

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
* Por un lado, buena parte del código en [HTML](http://en.wikipedia.org/wiki/Html) ahora se genera dinámicamente en el cliente con *Javascript*. Esto supone una gran ventaja ya que mejora la experiencia de usuario y disminuye la necesidad de interaccionar con el servidor, pero también genera problemas nuevos:
 
 * Los buscadores ya no pueden realizar correctamente su trabajo debido a que la aplicación no necesita modificar la [URL](http://en.wikipedia.org/wiki/Url) y que, por motivos de optimización, los buscadores no analizan el código generado desde *Javascript* (ver [SEO](http://en.wikipedia.org/wiki/Search_Engine_Optimization)).
 * Por el mismo motivo, ahora es más difícil enlazar a secciones concretas de la aplicación.
 * Surgen problemas con el almacenamiento temporal en *caché*. Es frecuente que el navegador almacene la información y no vaya a *buscar* los datos al servidor.
 * Aparecen anomalías en el comportamiento de los botones de delante/atrás. 
 * Problemas con el análisis estadístico de las páginas visitadas.
 * Es fácil que se produzcan *filtraciones* de memoria debido a que los objetos creados dinámicamente con Javascript dejen de apuntar a la referencia correcta o, por el contrario, que permanezcan indefinidamente en la memoria.

* Por otro lado, el desplazamiento de parte de la lógica al cliente, tiene como consecuencia que las aplicaciones en *Javascript* alcanzan fácilmente varios millares de líneas de código. Esto dificulta el mantenimiento máxime si, como decíamos antes, el código en HTML se genera dinámicamente en el cliente.

Iris está especialmente diseñado para dar respuesta a ambos problemas:

* Con Iris, la navegación se realiza en una sola página. El flujo de navegación se define mediante Hash-URLs como en populares aplicaciones como [GMail](https://mail.google.com).
* Iris permite estructurar el código en HTML y en Javascript en pequeños fragmentos relacionados entre sí. Esto supone importantes ventajas como:
 * Refuerza la modularidad de la aplicación, la ocultación, la cohesión y el bajo acoplamiento.
 * Define una clara separación de la vista y su comportamiento.
 * Mejora el trabajo en equipo permitiendo asignar tareas a distintos roles: programador, maquetador, diseñador, etc.
 * Simplifica la definición y la modificación del flujo de navegación.
 * Elimina o reduce al mínimo la necesidad de generación de código dinámico.
 * Permite la reutilización de los componentes creados.
 * Facilita la realización de pruebas, la depuración y el mantenimiento.

#<a name="how_it_works"></a>¿Cómo funciona Iris?

En esta sección se van a presentar los principales componentes de Iris y los métodos para crear, destruir o interaccionar con ellos. No se preocupe si no entiende algunos conceptos, ya que lo único que se pretende en este momento es que se vaya familiarizando con la forma de trabajo de Iris.  Más adelante se propondrán ejemplos de código que le permitirán clarificar y profundizar lo aquí esbozado.

##<a name="components"></a>Componentes

Iris permite estructurar la aplicación en componentes que interaccionan entre sí.

Cada **componente** permite definir los elementos que conforman la interfaz de usuario. Un componente tiene dos elementos fundamentales: La vista o presentación y el comportamiento.

La **vista** consiste en un fragmento de código en HTML, típicamente un *DIV*, almacenado en un fichero, normalmente con extensión *.html*.

El **comportamiento** es un fragmento de código en Javascript almacenado en un fichero, típicamente con extensión *.js*. Cuando un componente se activa (<a href="#awake">ver más adelante</a>), puede recibir parámetros que permiten modificar su comportamiento.

![Definición de comportamiento](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/component_equation.png)

Cuando Iris carga un componente, visualiza el código de su fichero HTML asociado y ejecuta su fichero de Javascript según se haya definido en su ciclo de vida (<a href="#life_cycle">ver más adelante</a>).

El código HTML del componente se inserta en el DOM de la página. La inserción se hace sustituyendo o añadiendo (según se prefiera) un elemento que se defina en el DOM (ver más adelante).

##<a name="screens_UIs"></a>Screens y UIs

Iris utiliza dos tipos de componentes principales: Screens y UIs.

Recuérdese que ambos son componentes y, por lo tanto, se definen mediante dos ficheros: Uno en HTML para establecer la vista o presentación y otro en Javascript para el comportamiento. 

Un **UI** es un elemento sencillo. Puede ser un simple botón o un elemento en una lista. Un UI se puede componer de otros UIs y, así, tener un grado de complejidad mayor.

Un <a name="screen"></a>**Screen** es un elemento de navegación. Cada Screen está asociado a un Hash-URL. Si en la barra de direcciones del navegador, escribimos el Hash-URL al que está asociado un Screen, Iris cargará su fichero HTML y ejecutará el fichero en Javascript según su ciclo de vida.

En un Screen podemos registrar otros Screens y visualizarlos al modificar el Hash-URL de la barra de direcciones del navegador.

Un Screen puede contener otros componentes de tipo UI.

En resumen: Los UIs deben pertenecer a otros UIs o a un Screen y no tienen Hash-URL. Los UIs sólo estarán visibles cuando se haya navegado al Screen al que pertenecen. Desde un Screen se puede navegar a otros Screens.

##<a name="life_cycle"></a>Ciclo de vida de un componente

Iris establece cuatro transiciones en el ciclo de vida de un componente: *create*, *awake*, *sleep* y *destroy*. En el fichero Javascript asociado al componente, podemos definir métodos *callbacks* que serán llamados por Iris cuando el evento correspondiente se produzca.

Cuando se cree un componente, Iris ejecutará el código asociado a su método **create**. Normalmente aquí cargaremos el código HTML asociado al componente y registraremos los Screens (si el componente es de tipo Screen). Este método sólo se llamará una vez en la vida de un componente. La creación de un Screen se realizará navegando al Hash-URL correspondiente o invocando,desde *Javascript*, el método *goto* de Iris. Si un Screen ya se hubiera creado, el método *goto* o escribir su Hash-URL en el navegador hará que Iris *navegue* hacia él provocando el evento *awake* (ver más adelante). La creación de un UI se realizará invocando el método *ui* del componente en el que lo queramos crear. A diferencia de lo que ocurre con los Screens, llamar al método *ui* siempre llamará al método "create" del componente ya que siempre se creará un nuevo UI.

El evento complementario será **destroy**. Esté método, al igual que *create*, se ejecutará una única vez en la vida de un componente. La destrucción de un componente se efectuará llamando al método *destoryUI*, *destroyUIs* o *destroyScreen* dependiendo del componente de que se trate. En el caso de componentes de tipo UI, también se llamará cuando un UI sea sustituido por otro. La destrucción de un componente supondrá la destrucción de todos los componentes que contenga.

<a name="awake"></a>El evento **awake** se producirá después del evento *create* y cada vez que cambie el Hash-URL asociado al Screen que se va a visualizar. El método *awake* se llamará también en los UIs que compongan el Screen. Aquí es donde habitualmente asociaremos eventos a nuestra aplicación, reproduciremos vídeo o audio, etc. En la llamada al método *awake* podemos pasar parámetros al componente para variar su comportamiento.

Por último, el evento **sleep** es el complementario de *awake*, y se efectuará primero sobre los UIs contenidos en el Screen y luego en el propio Screen cada vez que se produzca un cambio en el Hash-URL que suponga su ocultamiento. No debemos olvidar desactivar los eventos o detener otras tareas, como la reproducción de componentes multimedia, que hayamos iniciado en el evento *awake*. Antes de que se llame al método *destroy* de un componente, se efectuará la llamada a *sleep*.

Podemos ver esto gráficamente:

![Ciclo de vida](https://raw.github.com/surtich/iris/iris-grunt/docs/images/iris_life_cycle.png)

##<a name="welcome"></a>Screen de bienvenida

Toda aplicación Iris debe definir un componente inicial que se cargará al principio y antes de efectuar cualquier operación con Iris. Este componente será un <a href="#screen">Screen</a> especial ya que tiene algunas diferencias con lo explicado anteriormente:
* El Screen de bienvenida no tiene Hash-URL asociado y se carga con el método **welcome** de Iris.
* A diferencia de lo que ocurre con otros Screens, el componente no puede recibir parámetros en su activación.
* En una aplicación Iris, normalmente, no habrá necesidad de refrescar o de modificar la *URL* sobre la que se carga el Screen de bienvenida.
* Por lo tanto, tampoco será necesario llamar al método *destroy* de este Screen. Es decir, que el ciclo de vida de este Screen se simplifica ya que únicamente se hará una primera llamada al método *create* y una segunda al método *awake*.
* Lo habitual es que el cometido del Screen de bienvenida sea registrar otros Screens y *llamar* al Hash-URL del Screen inicial de nuestra aplicación.

#<a name="starting"></a>Empezando con Iris

En esta sección vamos proponer ejemplos de código para aclarar y profundizar lo explicado anteriormente y para introducir nuevas capacidades de Iris.

Aquí no se pretende crear una aplicación funcional, sino que se comprenda como se trabaja con Iris. Los ejemplos, por lo tanto, no realizarán ningún trabajo útil. Si quiere ver como construir una aplicación desde cero, puede consultar la <a href="#paso-a-paso">sección correspondiente</a>.

Para hacer más sencilla la explicación, todo el código de esta sección se situará un el directorio raíz de la aplicación. No es conveniente hacer esto en una aplicación real. En la sección *<a href="#paso-a-paso">Construyendo paso a paso una aplicación desde cero</a>* se propone una estructura de directorios más adecuada para trabajar con Iris.

##<a name="installing"></a>Instalando Iris
El primer paso será decidir si queremos trabajar con la versión de [desarrollo](https://raw.github.com/iris-js/iris/master/dist/iris.js) o de [producción](https://raw.github.com/iris-js/iris/master/dist/iris.min.js)<!-- TODO revisar enlaces -->y asociarlas a un fichero en HTML.

```html
<!-- In index.html -->
<script src="jquery-min.js"></script> <!--Iris just depends on JQuery-->
<script src="iris-0.5.0-SNAPSHOT.js"></script> <!-- TODO Change URL -->
```

##<a name="calling_welcome"></a>Llamando al Screen de bienvenida
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
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html");
        };

        self.awake = function () {
            console.log("Welcome Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Welcome Screen Sleeping"); //Never called
        };
  
        self.destroy = function () {
            console.log("Welcome Screen Destroyed");//Never called
        };
  
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

Cuando se ejecute el método *iris.welcome*, Iris creará un objeto de tipo Screen. Este objeto será pasado a la función que recibe el método *iris.screen* definido en el fichero *welcome.js* y se ejecutarán los métodos del ciclo de vida que se hayan definido en esta función. Concretamente, en nuestro ejemplo, se ejecutarán sucesivamente los métodos *create* y *awake*.

Observe que el método *create* ejecuta una llamada al método **tmpl** que permite cargar en el DOM el contenido del archivo *welcome.html* pasado como parámetro. 

> Los ficheros HTML asociados a componentes de Iris deben tener un único nodo raíz (típicamente un DIV).

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

##<a name="register"></a>Registrando y mostrando un Screen

Primero creamos el *Screen Home* con una estructura muy parecida a la anterior.

```js
//In home.js

iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl("home.html");
        };
        self.awake = function () {   
            console.log("Home Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Home Screen Sleeping");
        };
  
        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
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
    self.screens("screens", [{
                "#home": "home.js"
    }]);
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
Observe como el método **screens** permite definir los Hash-URL de los objetos de tipo Screen. Este método recibe dos parámetros: El primer parámetro define el elemento de HTML dentro del cual será cargado el Screen cuando su Hash-URL sea invocado; el segundo parámetro es un *array de objetos* donde cada objeto tiene el formato: "#hash":"fichero.js". Es decir, que cada objeto tiene un atributo que se corresponde con al *#hash* del *Screen* y el valor de este atributo será el fichero de comportamiento asociado. El método *screens* únicamente registra esta información pero no produce ningún evento del ciclo de vida del Screen.

> En un Screen puede llamar al método *screens* una única vez.

En nuestro ejemplo, para *navegar* el Screen debemos pulsar sobre el enlace que hemos añadido en *welcome.html* y que contine el Hash-URL del Screen al que queremos ir.

Cuando pulsemos sobre el enlace, Iris buscará un elemento del DOM cuyo atributo *data-id* corresponda con el contenedor pasado al método *screens* y ejecutará el fichero de *javascript* asociado al Hash-URL, concretamente llamará al método *create*, con lo cual, el contenido HTML del Screen se añadirá al contenedor.

Tras llamar al método *create*, Iris llamará al método *awake* del Screen.

Tras pulsar el enlace, el DOM de la página generada por Iris será el siguiente:

```html
<html>
 <head>..</head>
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
Es importante reiterar que el código HTML del Screen se añade dentro del contenedor especificado. 

##<a name="showing_screen_js"></a>Mostrando un Screen desde Javascript

Podemos conseguir lo mismo que en el apartado anterior desde el código en Javascript asociado al Screen Welcome.

Para hacer esto, modifiquemos el código del Screen Welcome:

En *welcome.html* sustituyamos el enlace por un botón:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="goto_home">Click to go to Home Screen</button>
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
    self.screens("screens", [{
        "#home": "home.js"
    }]);
    //The get method returns de JQuery element associated with the data-id parameter
    self.get("goto_home").click( function() {
        iris.goto("#home"); //It browses to the Hash-URL
    });
};
```
Observe como el método **goto** de Iris permite navegar al Hash-URL especificado y que, para capturar el evento *click* del botón, hemos utiliado el método **get** del componente de Iris que recibe el valor de su atributo *data-id*. Iris buscará un elemento en el DOM del componente con ese *data-id* y lo devolverá como un objeto de JQuery.

Si al método *get* no se le pasara ningún argumento, Iris devolvería el objeto JQuery que corresponda con el elemento raíz del componente.

##<a name="showing_some_screens"></a>Mostrando varios screens

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
        };
        self.awake = function () {   
            console.log("Help Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Help Screen Sleeping");
        };
  
        self.destroy = function () {
            console.log("Help Screen Destroyed");
        };
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
    self.screens("screens", [{
        "#home": "home.js"
    },{
        "#help": "help.js"
    }]);
};
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
 <head>..</head>
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

La secuencia de eventos producida será:

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

##<a name="screens_bad_practices"></a>Malas prácticas en el registro de Screens

Vamos a poner algunos ejemplos de **malas prácticas** que Iris impide realizar mostrando un mensaje en la consola de error.

Modificamos el Screen Welcome para que los Screens Home y Help se carguen en contenedores diferentes.

En *welcome.js* tendremos:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl("welcome.html");
    self.screens("home_screen", [{"#home": "home.js"}]);
    self.screens("help_screen", [{"#help": "help.js"}]);
};
```

Y en *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#home">Click to go to Home Screen</a>
    </br>
    <a href="#help">Click to gets some help</a>
    <div data-id="home_screen">
        Here is where Iris will load the Home Screen
    </div>
    <div data-id="help_screen">
        Here is where Iris will load the Home Screen
    </div>
</div>
```


> Sólo se puede llamar una vez al método *screens* en cada Screen.

Otra cosa que debemos evitar es hacer cosas como la siguiente:

```js
self.screens("screens", [{
        "#home": "home.js"
    },{
        "#home": "help.js"
}]);
```

> El hash-URL asociado a un Screen debe ser único en toda la aplicación.

Por último, tampoco es posible hacer lo siguiente:

```js
self.screens("screens", [{
        "#home": "home.js"
    },{
        "#help": "home.js"
}]);
```

> No podemos asociar el mismo Screen a varios Hash-URLs.

##<a name="default_screen"></a>Creando un Screen por defecto

Aunque no es obligatorio, las aplicaciones Iris tendrán normalmente un Screen que se cargará por defecto cuando no se especifique ningún Hash-URL.

Para hacer esto simplemente incluiremos el siguiente código en el método *awake* del Screen de bienvenida:

```js
self.awake = function () {
    console.log("Welcome Screen Awakened");
    if ( !document.location.hash ) {                
        iris.goto("#home"); //Default Screen

    }
};
```

##<a name="uis"></a>Visualizando UIs

En este apartado vamos a aprender a trabajar con UIs. Los UIs son componentes reutiizables para definir la interfaz de usuario. Un UI pertenece a un Screen o a otro UI.

Los UIs tienen muchas analogías con los Screens por lo que si no lo ha hecho todavía, revise la sección anterior.

Vamos a crear un UI en el Screen Home del apartado anterior.

El código del UI va a ser:

En my_ui.js:

```js
//In my_ui.js

iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmpl("my_ui.html");
        };
        self.awake = function () {   
            console.log("my_ui UI Awakened");
        }
        self.sleep = function () {
            console.log("my_ui UI Sleeping");
        };
  
        self.destroy = function () {
            console.log("my_ui UI Destroyed");
        };
    }
);
```
La única diferencia que encontramos aquí con respecto a lo explicado en los Screens es que el método se llama **ui** en vez de *screen*.

Tampoco tiene nada especial el fichero *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
</div>
```

Ahora vamos a ver las modificaciones que haremos en el Screen Home.

El fichero *home.html* tendrá un botón que nos permita cargar el UI y un contenedor que nos permita visualizarlo.

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p>
    <button data-id="my_ui_loader">Load my_ui</button>
    <div data-id='ui_container'/>
</div>

```

En el método *create* del fichero *home.js* tendremos lo siguiente:

```js
//In home.js
self.create = function () {   
    console.log("Home Screen Created");
    self.tmpl("home.html");
    self.get("my_ui_loader").click(
        function() {
            self.ui("ui_container", "my_ui.js");
        }
    );   
};
```

Los UIs son componentes no *navegables* y, por lo tanto, su activación tiene que hacerse desde Javascript de forma análoga a como se puede hacer también con los Screens. La principal diferencia con ellos es que no se registran y se cargan simplemente llamando al método *ui* del componente (en este caso del Screen Home).

Este método puede recibir cuatro parámetros: el *data-id* del contenedor donde se va a cargar; el fichero Javascript asociado al UI y opcionalmente un objeto de Javascript que se pasará al UI como se explica más adelante; y por último, también de forma opcional, el *template mode* (ver explicación posterior).

Es interesante estudiar el DOM que genera Iris tras pulsar el botón y cargar el UI:

```html
<html>
 <head>...</head>
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
     <button data-id="my_ui_loader">Load my_ui</button>
     <div>
      <h1>my_ui UI</h1>
      <p>This is the my_ui template.</p>
     </div>
    </div>
   </div>
  </div>
 </body>
</html>
```

Observe que el contenedor con *data-id='ui_container'* ha sido reemplazado por el contenido del fichero *my_ui.html*.

Aunque se puede modificar, como explicaremos posteriormente, este es el comportamiento por defecto de los UIs:

> De forma predeterminada, cuando se carga un **UI**, su vista reemplaza al contenedor. Por el contrario, cuando se carga un **Screen**, su vista se añade al contenedor.

Comprender esto es esencial ya que si, por ejemplo, volviéramos a pulsar el botón, se trataría de cargar el UI *my_ui* sin éxito debido a que el contenedor que le estamos pasando en el método *ui* ya no está presente en el DOM. Iris mostrará un mensaje en la consola de error advirtiendo de esta circunstancia.


También es interesante analizar la secuencia de eventos que se produce:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
Home Screen Awakened
my_ui UI Created
my_ui UI Awakened
</pre>

Hasta aquí nada especial; pero si luego pulsamos sobre el enlace a *#help*:

<pre>
Help Screen Created
my_ui UI Sleeping
Home Screen Sleeping
Help Screen Awakened 
</pre>

Obsérvese que se llama al evento *sleep* tanto del UI *my_ui* como del Screen *Home*.

Si ahora volvemos a pulsar sobre *#home*:

<pre>
Help Screen Sleeping
Home Screen Awakened
my_ui UI Awakened 
</pre>

Se llama al evento *awake* tanto del UI *my_ui* como del Screen *Home* ya que el UI ya estaba cargado.

##<a name="inner_UIs"></a>UIs contenidos en otros UIs

Un UI puede contener otros UIs. Para probar esto creemos otro UI llamado *inner_ui* con los siguientes ficheros:

En *inner_ui.js*:

```js
//In inner_ui.js

iris.ui(
    function (self) {
        self.create = function () {
            console.log("inner_ui UI Created");
            self.tmpl("inner_ui.html");
        };
        self.awake = function () {   
            console.log("inner_ui UI Awakened");
        };
        self.sleep = function () {
            console.log("inner_ui UI Sleeping");
        };
  
        self.destroy = function () {
            console.log("inner_ui UI Destroyed");
        };
    }
);
```

Y en *inner_ui.html*:

```html
<div>
    <h1>inner_ui UI</h1>
    <p>This is the inner_ui template.</p>
</div>
```

En el método *create* del UI *my_ui*:

```js
self.create = function () {
    console.log("my_ui UI Created");
    self.tmpl("my_ui.html");
    self.ui("inner_ui_container", "inner_ui.js");
};
```

Y el fichero en el fichero *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
    <div data-id="inner_ui_container"></div>
</div>
```

Aquí hay poco que comentar. Tan sólo que los UIs, al igual que los Screens, tienen un método *ui* que permite cargar otros UIs. Obsérvese también que la carga del UI interno se ha realizado directamente sin utilizar un botón como hicimos en el ejemplo anterior.

##<a name="some_UIs"></a>Añadiendo varios UIs a un mismo contenedor

Anteriormente hemos visto que cuando añadimos un UI, su contenedor es reemplazado por la vista del UI. Este comportamiento se puede modificar.

Para mostrar como hacer esto, modifiquemos el método *create* del UI *my_ui*:

```js
self.create = function () {   
    console.log("my_ui UI Created");
    self.tmplMode(self.APPEND);
    self.tmpl("my_ui.html");
};
```

Únicamente hemos añadido una llamada al método **tmplMode**  pasándole como parámetro la constante *APPEND*.  Esto hace que el contenedor no sea reemplazado por el UI creado, sino que el UI será añadido al final del contenedor. La implicación más importante es que podemos pulsar varias veces el botón. Cada pulsación creará un nuevo UI que se añadirá al contenedor.

Este comportamiento es similar al que tienen los Screens. La principal diferencia es que Iris mostrará todos los UIs añadidos a un contenedor, mientras que sólo visualizará un Screen permaneciendo el resto ocultos.

El método *tmplMode* puede recibir también la constante *PREPEND* haciendo que los UIs se añadan como primer hijo en vez de como último. Existe una tercera constante que podemos utilizar y que es el comportamiento por defecto llamada *REPLACE*.

Se puede especificar el valor de *tmplMode* en el método *ui* pasándolo como cuarto parámetro.

##<a name="UIs_bad_practices"></a>Malas prácticas con UIs

> Iris no permite que cargar un UI en un contenedor registrado para un Screen.

Por ejemplo, el siguiente código producirá un error:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl("welcome.html");
    self.screens("screens", [{
        "#home": "home.js"
    },{
        "#help": "help.js"
    }]);
    self.ui("screens", "my_ui.js");
};
```

> Podemos reutilizar un contenedor para almacenar UIs de distinto tipo pero hay que tener mucho cuidado con la definición que se haga en el método *tmplMode* en cada uno de los UIs.

Normalmente cada tipo de UI tendrá su propio contenedor.

> Debemos evitar utilizar el atributo *id* de las etiquetas de *HTML* y en su lugar utilizar *data-id*, debido a que, al ser los UIs componentes reutilizables, normalmente habrá varios de ellos en la misma página y el atributo *id* en *HTML* debe ser único.

##<a name="Screens_drestroy"></a>Destruyendo Screens

Iris dispone del método *destroyScreen* para destruir componentes de tipo Screen.

Podemos probarlo con el siguiente código:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="create_home_screen">Click create a Home Screen</button>
    </br> 
    <button data-id="destroy_home_screen">Click to destroy Home Screen</button>
    </br>
    <a href="#help">Gets some help</a>
    <div data-id="container"></div>
</div>
```
Y en el método *create* *welcome.js*:
 
```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl("welcome.html"); 
    self.screens("container", [{
        "#home": "home.js"
    },{
        "#help": "help.js"
    }]);

    self.get("create_home_screen").click(
        function() {   
            iris.goto("#home");
        }
    );

    self.get("destroy_home_screen").click(
        function() {   
            iris.destroyScreen("#home");
        }
    );
};
```
 
Observe que tenemos dos botones, uno para ir al Screen Home y otro para destruirlo. Si pulsamos primero sobre el botón que nos lleva al Screen Home, luego sobre el enlace que nos lleva al Screen Help y luego sobre el botón que destruye el Screen Home, obtendremos el siguiente DOM:

```html
<html>
 <head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <button data-id="create_home_screen">Click create a Home Screen</button>
   <br>
   <button data-id="destroy_home_screen">Click to destroy Home Screen</button>
   <br>
   <a href="#help">Gets some help</a>
   <div data-id="container"></div>
    <div style="display: block;">
     <h1>Help Screen</h1>
     <p>This is the help screen.</p>
    </div>
  </div>
 </body>
</html>
```

Observe que el contenido del Screen Home ha sido completamente eliminado. Sin embargo, su hash-URL permanece todavía registrado; si pulsamos sobre el botón se volverá a crear el Screen Home.

Si el Screen destruido contiene UIs, estos también serán destruidos. Para probarlo, modifiquemos el Screen Home de la siguiente manera:
 
En *home.html*:

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p> 
    <div data-id='ui_container'/>
</div>

```
Y en el método *create* de *home.js*:

```js
self.create = function () {
    console.log("Home Screen Created");
    self.tmpl("home.html");
    self.ui("ui_container", "my_ui.js"); 
};
```

Si hacemos lo anterior para destruir el Screen Home, se generará un DOM idéntico al anterior ya que el UI se destruirá junto con el Screen. La secuencia de eventos será la siguiente:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
my_ui UI Created
my_ui UI Awakened
Home Screen Awakened
Help Screen Created
my_ui UI Sleeping
Home Screen Sleeping
Help Screen Awakened
my_ui UI Destroyed
Home Screen Destroyed
</pre>

##<a name="destroy_screens_bad_practices"></a>Malas prácticas destruyendo Screens

> No se puede destruir el Screen actual. Es decir, no se puede destruir el Screen asociado al hash-URL que esté mostrando el navegador.

Si, por ejemplo, estamos en el hash-URL #home, no podemos destruir el Screen Home. Puede probarlo tratando de destruir el Screen Home sin cambiar a *#help*.

> Tampoco se puede destruir un Screen si el hash-URL actual pertenece a la jerarquía del Screen que se quiere destruir.

Veámoslo con un ejemplo; para ello creemos el Screen *inner_home* con los siguientes ficheros:

En *inner_home.js*:

```js
//In inner_home.js

iris.screen(
    function (self) {
        self.create = function () {   
            self.tmpl("inner_home.html");
            console.log("Inner_home Screen Created");
        };
        self.awake = function () {   
            console.log("Inner_home Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Inner_home Screen Sleeping");
        };
  
        self.destroy = function () {
            console.log("Inner_home Screen Destroyed");
        };
    }
);
```

En *inner_home.html*:

```html
<div>
    <h1>Inner_home Screen</h1>
    <p>This is the Inner_home screen.</p>
</div>
```

En *home.html*:

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p>
    <div data-id='inner_home_container'/>
</div>
```

Y en *home.js*:

```js
//In home.js

iris.screen(
    function (self) {
        self.screens("container", [{
            "#inner_home": "inner_home.js"
        }]);
        self.awake = function () {   
            console.log("Home Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Home Screen Sleeping");
        };
  
        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    }
);
```
Observe que estando en el hash-URL *#inner_home*, si pulsamos el botón de destruir el Screen Home, Iris da un error indicando que no podemos destruir el padre del Screen actual.

Si navegamos a *#help*, podremos destruir el Screen Home. Como decíamos antes, la destrucción del Screen Home no eliminará su registro, sin embargo sí se eliminará el registro del Screen Inner_home. Para volver a navegar a #inner_home debemos navegar previamente #home; se volverá a llamar al método *create* del Screen Home que volverá a registrar el Screen Inner_Home permitiéndonos navegar a él.

> Si destruimos un Screen, se eliminará el registro de los #hash-URL que hayan sido creados por él. 


##<a name="UIs_drestroy"></a>Destruyendo UIs

Para destruir UIs, Iris dispone de dos métodos: *destroyUI* y *destroyUIs*. Esto métodos son locales al componente que los vaya a destruir a diferencia de *destroyScreen* que es global.

Para probar *destroyUI* tendremos el siguiente código:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="create_my_ui">Click create a my_ui UI</button>
    </br> 
    <button data-id="destroy_my_ui">Click to destroy all my_ui UIs</button>
    <div data-id="container"></div>
</div>
```

En el método *create* de *welcome.js*:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl("welcome.html"); 

    var my_ui = null;

    self.get("create_my_ui").click(

        function() {   
            my_ui = self.ui("container", "my_ui.js");
        }
    );

    self.get("destroy_my_ui").click(
        function() {   
            if (my_ui != null) {
                self.destroyUI(my_ui);
            }
        }
    );
};
```

Observe que eliminamos el UI con el método *destroyUI* a través de la referencia que nos devuelve la llamada al método *ui*.

En *my_ui.js*:

```js
self.create = function () {   
    console.log("my_ui UI Created");
    //self.tmplMode(self.APPEND);
    self.tmpl("my_ui.html");
};
```

En el DOM generado ha eliminado todo el contenido del UI. Tampoco aparece ninguna referencia a su contenedor (*data-id='container'*) porque estamos en modo *REPLACE*.

```html
<html>
 <head>...</head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <button data-id="create_my_ui">Click create a my_ui UI</button>
   <br>
   <button data-id="destroy_my_ui">Click to destroy my_ui UI</button>
  </div>
 </body>
</html>
```

Si descomentamos la línea que asigna el *tmplMode* a *APPEND* en el fichero *my_ui.js*, y pulsamos varias veces sobre botón que crea el UI seguida de una pulsación sobre el que lo destruye, sólo se eliminará el último UI creado ya que la referencia la habremos ido reemplazando a medida que creamos nuevos UIs.

Podríamos eliminar todos los UIs si los hubiéramos ido almacenando en un *array*. Aunque también lo podemos hacer si utilizamos el método *destroyUIs* como se explica en el siguiente ejemplo:

Para eliminar todos los UIs del contenedor, estas son las modificaciones que habría que hacer:

El método *create* de *welcome.js*:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl("welcome.html"); 

    self.get("create_my_ui").click(
        function() {   
            self.ui("container", "my_ui.js");
        }
    );

    self.get("destroy_my_ui").click(
        function() {   
            self.destroyUIs("container");
        }
    );
};
```
Para eliminar todos los UIs de un contenedor le pasamos el *data-id* de ese contenedor al método *destroyUIs*.

Y el método *create* de *my_ui.js*:

```js
self.create = function () {   
    console.log("my_ui UI Created");
    self.tmplMode(self.APPEND);
    self.tmpl("my_ui.html");
};
```

Tras pulsar tres veces sobre el botón que crea el UI y una vez sobre el que lo destruye, el DOM quedaría:

```html
<html>
 <head>...</head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <button data-id="create_my_ui">Click create a my_ui UI</button>
   <br>
   <button data-id="destroy_my_ui">Click to destroy my_ui UIs</button>
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
my_ui UI Created
my_ui UI Awakened
my_ui UI Created
my_ui UI Awakened
my_ui UI Created
my_ui UI Awakened
my_ui UI Sleeping
my_ui UI Destroyed
my_ui UI Sleeping
my_ui UI Destroyed
my_ui UI Sleeping
my_ui UI Destroyed
</pre>

##<a name="params"></a>Enviando parámetros a un Screen
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

En esta sección vamos a ver varias formas de que un Screen reciba un parámetro. Los parámetros se pasan a los Screen en el *[Query String](http://en.wikipedia.org/wiki/Query_string)* de la URL.

Observe como se pasa el parámetro al Screen Home en el archivo *welcome.html*:

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

El archivo *welcome.js* no tendría nada de particular:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html"); 
            self.screens("screens", [{
                "#home": "home.js"
            },{
                "#help": "help.js"
            }]);
        };
    }
);
```

El parámetro lo recibimos en el Screen Home de esta forma:

En *home.html* ponemos un contenedor para visualizar el parámetro:

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p>
    <div data-id="year_parameter"></div>
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
        };
  
        self.awake = function (params) {  
            console.log("Home Screen Awakened");   
            self.get("year_parameter").text("The value of the year parameter is: " + params.year);
        };
		
        self.sleep = function () {
            console.log("Home Screen Sleeping");
        };
  
        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    }
);
```

Observe que el parámetro se recibe como un atributo del objeto *params* que será pasado por Iris a la función definida en el método *awake*.

También podemos pasar un parámetro en el método *goto* de Iris. Para probar esto hagamos los siguientes cambios:


En *welcome.html* cambiamos el enlace por un botón:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="goto_home">Goto Home</button>
    </br>
    <a href="#help">Click to gets some help</a>
    </br> 
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div> 	
</div>
```

En *welcome.js* enviamos el parámetro:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html"); 
            self.screens("screens", [{
                "#home": "home.js"
            },{
                "#help": "help.js"
            }]);
            self.get("goto_home").click(
                function() {
                    iris.goto("#home?year=" + (new Date().getFullYear())); //Send the current year instead a fixed value
                }
            );
        };
    }
);
```

##<a name="ui_params"></a>Paso de parámetros en UIs

Los UIs pueden recibir parámetros de forma análoga a como se hizo en el ejercicio anterior. Veámoslo con el siguiente ejemplo:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="create_my_ui">Create my_ui UI</button>
    <div data-id="ui_container"></div>
</div>
```

En *welcome.js*:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html");
            var ui_number = 0;
            self.get("create_my_ui").click(
                function() {
                    ui_number++;
                    self.ui("ui_container", "my_ui.js", {
                        "ui_number": ui_number
                    }, self.APPEND);
                }
            );
        };
    }
);
```

En *my_ui.js*:

```js
//In my_ui.js

iris.ui(
    function (self) {
        self.create = function () {   
            console.log("my_ui UI Created");  
            self.tmpl("my_ui.html");
        };
  
        self.awake = function (params) {  
            console.log("my_ui UI Awakened");
            self.get("ui_number").text("This is the " + params.ui_number + " muyUI UI.");
        };
    }
);
```

En *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
    <div data-id="ui_number"></div>
</div>
```

Observe como el UI recibe un parámetro que indica el número de UI de que se trata.


##<a name="settings"></a>Paso de parámetros utilizando el método *settings*

Los componentes, UIs y Screens, disponen de un método alternativo al anteriormente explicado para pasar parámetros. Consiste en utilizar los métodos *settings* o *setting*.

El método *settings* permite almacenar cualquier objeto de Javascript en el componente. La sintaxis de este método es:

```js
self.settings({...}); //any kind of Javascript object
```

El método *setting* permite almacenar o recuperar una variable (atributo).

Para almacenar un atributo:

```js
self.setting(variable_name, {...});
```

Para recuperar un atributo:

```js
self.setting(variable_name);
```

Lo que hicimos en el ejemplo anterior, lo podemos hacer ahora de la siguiente manera:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="create_my_ui">Click create a my_ui UI</button>
    </br> 
    <button data-id="destroy_my_ui">Click to destroy all my_ui UIs</button>
    <div data-id="ui_container"></div>
</div>
```

En *welcome.js*:

```js
//In welcome.js
iris.screen(

    function (self) {
  
        var my_ui_number = 0;

        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html"); 
 
            self.get("create_my_ui").click(
                function() {
                    my_ui_number++;
                    self.ui("ui_container", "my_ui.js", {
                        "number": my_ui_number
                    });
                }
            );

            self.get("destroy_my_ui").click(
                function() {   
                    self.destroyUIs("ui_container");
                }
            );
        };

    }

);
```

En *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the <span data-id="my_ui_number"></span> my_ui template.</p>
</div>
```
En *my_ui.js*:

```js
//In my_ui.js

iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmplMode(self.APPEND);
            self.tmpl("my_ui.html");
        };
        self.awake = function () {   
            console.log("my_ui UI Awakened");
            self.get("my_ui_number").html(self.setting("number"));
        };
    }
);
```

Observe como utilizamos el método *self.setting* para recuperar el valor de la variable.

##<a name="tmpl_settings"></a>Paso de parámetros en el método *tmpl*

Podemos pasar parámetros a la vista a través del método *tmpl*. Para hacerlo, debemos añadir un segundo parámetro a este método. Este parámetro será un objeto con los nombres de variables que queramos pasar y sus valores.

Por ejemplo, en *welcome.js*:

```js
//In welcome.js
iris.screen(

    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html",{"name":"John"}); 
        };

    }

);
```
Para recuperar el valor de un parámetro, en la vista, pondremos su nombre entre símbolos *##*.

Por ejemplo, en *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>The name is ##name##</p>
</div>
```

##<a name="events"></a>Trabajando con eventos

Iris implementa el patrón "Publish–subscribe" para trabajar con eventos. Los eventos en Iris, a diferencia de los de JQuery, no están ligados a ningún objeto del DOM.

Veamos un ejemplo sencillo que consiste en contar cuantos UIs de tipo my_ui se han creado:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="create_my_ui">Click create a my_ui UI</button>
    </br> 
    <button data-id="destroy_my_ui">Click to destroy all my_ui UIs</button>
    </br>
    The number of my_uis is: <span data-id="my_ui_number">0</span>
    </br>
    <div data-id="ui_container"></div>
</div>
```

En *welcome.js*:

```js
//In welcome.js

iris.screen(
 
    function (self) {
  
        var my_ui_number = 0;
  
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html"); 
            //The method allows for subscription on an event
            iris.on("MY_UI_CREATED_event", fn_my_uiCreatedEvent);
            ////When "MY_UI_CREATED_event" event happens, Iris will call to "fn_my_uiCreatedEvent" function.
            iris.on("my_uis_destroy_event", fn_my_uisDestroyEvent);
   
            self.get("create_my_ui").click(
                function() {   
                    self.ui("ui_container", "my_ui.js");
                }
            );

            self.get("destroy_my_ui").click(
                function() {   
                    self.destroyUIs("ui_container");
                    iris.notify("my_uis_destroy_event");
                }
            );
        };
  
        function fn_my_uiCreatedEvent() {
            my_ui_number++;
            self.get("my_ui_number").html(my_ui_number);
        }
  
        function fn_my_uisDestroyEvent() {
            my_ui_number = 0;
            self.get("my_ui_number").html(my_ui_number);
        }
    }

);
```

En *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
</div>
```

En *my_ui.js*:

```js
//In my_ui.js

iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmplMode(self.APPEND);
            self.tmpl("my_ui.html");   
            iris.notify("MY_UI_CREATED_event"); //This notifies subscribers that the "MY_UI_CREATED_event" event has occurred 
        };
    }
);
```

Observe como para suscribirse a un evento, en el método *iris.on*, pasamos una cadena de texto (que representa al evento) y una función que será llamada cuando el evento se produzca. Para notificar que un evento se ha producido, se debe llamar al método *iris.notify*.

Es importante eliminar la suscripción a un evento cuanto esta ya no sea necesaria. Para hacer esto se utiliza el método *iris.off* con la misma sintaxis que *iris.on*. Por ejemplo:

```js
iris.off("MY_UI_CREATED_event", fn_my_uiCreatedEvent);
```

Para eliminar la suscripción a todos los eventos de un determinado tipo, llamamos a *iris.off* sin pasarle la función asociada. Por ejemplo,

```js
iris.off("MY_UI_CREATED_event");
```

> Para evitar filtraciones de memoria, en general, si la suscripción a un evento se realiza en el método *awake* de un componente, la eliminación debe realizarse en el método *sleep* de ese mismo componente; y si la suscripción se realiza en el *create*, la eliminación se hará en el *destroy*.

Cuando se notifica que se ha producido un evento, se pueden pasar parámetros a la función que recibe la notificación. Los parámetros pueden ser de cualquier tipo. Si se necesitan pasar varios parámetros de deben *encapsular* en un objeto de Javascript.

Vamos a transformar el ejemplo anterior para que haya una única función que maneje los eventos de creación y destrucción del UI. La función recibe un parámetro para discriminar si se trata de un evento o de otro. Aprovechamos el ejemplo para transformar los eventos en variables en lugar usar literales de cadena ya que es una forma más conveniente de trabajar.

Los ficheros HTML quedan intactos, las modificaciones únicamente se harán sobre los ficheros de comportamiento.

En *welcome.js*:

```js
//In welcome.js

EVENT = {
    MY_UI_CREATED: "my_ui created",
    MY_UIS_DESTROYED: "my_uis destroyed"
};


iris.screen(
 
    function (self) {
  
        var my_ui_number = 0;
  
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html"); 
            //The method allows for subscription on an event
            iris.on(EVENT.MY_UI_CREATED, fn_my_ui_event);
            ////When "MY_UI_CREATED_event" event happens, Iris will call to "fn_my_uiCreatedEvent" function.
            iris.on(EVENT.MY_UIS_DESTROYED, fn_my_ui_event);
   
            self.get("create_my_ui").click(
                function() {   
                    self.ui("ui_container", "my_ui.js");
                }
            );

            self.get("destroy_my_ui").click(
                function() {   
                    self.destroyUIs("ui_container");     
                    iris.notify(EVENT.MY_UIS_DESTROYED, EVENT.MY_UIS_DESTROYED);     
                }
            );
        };

        self.destroy = function () {
            console.log("Welcome Screen Destroyed");
            //The "iris.off()" method eliminates the subscription to the event.
            //It uses the same syntax as the "iris.on()" method.
            iris.off("MY_UI_CREATED_event", fn_my_ui_event);
        };
  
        function fn_my_ui_event(eventType) {
            if (eventType === EVENT.MY_UI_CREATED) {
                my_ui_number++;
            } else if (eventType === EVENT.MY_UIS_DESTROYED) {
                my_ui_number = 0;
            }
            self.get("my_ui_number").html(my_ui_number);
        }
  
    }

);
```

Y en *my_ui.js*:

```js
//In my_ui.js

iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmplMode(self.APPEND);
            self.tmpl("my_ui.html");   
            iris.notify(EVENT.MY_UI_CREATED, EVENT.MY_UI_CREATED);
        };
    }
);
```

Podemos utilizar el método *iris.destroyEvents* como alternativa al método *iris.off*. Este método recibe el evento y un *array* con las funciones que quieren eliminar de la suscripción al evento. Por ejemplo:

```js
iris.destroyEvents(EVENT.MY_UIS_DESTROYED, [fn_my_ui_event]);
```

##<a name="locals"></a>Utilizando locales y regionales

Iris permite trabajar con aplicaciones **multiidioma**.

Para definir el idioma con el que trabaja la aplicación utilizamos:

```js
iris.locale("en_US");
```

Para conocer el idioma que está usando Iris:

```js
iris.locale();
```

Para definir las traducciones tenemos dos alternativas.

1 Podemos definir las traducciones en el código de Javascript. Por ejemplo:

```js
iris.translations("en_US", {
    GREETING: "Hi!",
    GREETINGS: {
        MORNING: "Good Morning",
        AFTERNOON: "Good Afternoon",
        NIGHT: "Good Night"
    }
});
```
Observe que Iris soporta definiciones de vocablos multinivel.

2 Podemos definir las traducciones en un fichero de *JSON*. Por ejemplo:

```js
iris.translations("fr_FR", "./lang_FR.json", {"success" : onFRSuccess, "error" : onFRError });
```
Observe que a la función *iris.translations* se le debe pasar la ruta al fichero y, opcionalmente, un objeto de Javascript que contiene las funciones que se ejecutarán en caso de éxito y en caso de error durante la carga.

El fichero *./lang_FR.json* podría ser el siguiente:

```json
{
    "GREETING": "Salut!",
    "GREETINGS": {
        "MORNING": "Bonjour",
        "AFTERNOON": "Bonjour",
        "NIGHT": "Bonne nuit"
    }
}
```

La definición de los vocablos utilizados en un idioma se puede hacer en una única llamada al método *iris.translations* o en varias. Es decir, que podemos llamar a este método con el mismo parámetro de idioma tantas veces como queramos ya que las definiciones se irán añadiendo.

> Iris soporta que una aplicación tenga varios idiomas definidos pero, para un correcto funcionamiento de Iris, el cambio de un idioma a otro requiere que se *refresque* la página.

Para ver como hacer esto, puede consultar la sección *<a href="#paso-a-paso">Construyendo paso a paso una aplicación desde cero</a>*.

Para traducir un vocablo, tenemos dos opciones:

1 Hacer la traducción en un fichero de Javascript, por ejemplo:

```js
iris.translate("GREETINGS.MORNING");
```

También podemos especificar el idioma si es distinto del que se ha definido en Iris:

```js
iris.translate("GREETINGS.MORNING", "es_ES");
```


2 Hacer la traducción en el fichero HTML asociado al componente, por ejemplo:

```html
<div>
    @@GREETINGS.MORNING@@
</div>
```

Observe que el vocablo hay que rodearlo con un doble símbolo *@*.

Veamos un ejemplo completo:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    Morning Greeting from HTML: @@GREETINGS.MORNING@@
    </br>
    Morning Greeting from Javascript: <span data-id="greeting"/>
</div>
```
Y en *welcome.js*:

```js
iris.screen(
    function (self) {  
        iris.locale("es_ES");
  
        iris.translations("en_US", {
            GREETING: "Hi!",
            GREETINGS: {
                MORNING: "Good Morning",
                AFTERNOON: "Good Afternonn",
                NIGHT: "Good Night"
            }
        });
  
        iris.translations("es_ES", {
            GREETING: "Hola",
            GREETINGS: {
                MORNING: "Buenos días",
                AFTERNOON: "Buenas tardes",
                NIGHT: "Buenas noches"
            }
        });

        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl("welcome.html");   
            self.get("greeting").html(iris.translate("GREETINGS.MORNING"));
        };  
    }
);
```
Iris tiene capacidad de aplicar formatos de fechas, números y monedas adaptándolos a la variación **regional** que se haya seleccionado. Esto se puede hacer desde el código Javascript de un componente o bien desde el código HTML de un componente. En este último caso, los datos a formatear se pasarán en el método *tmpl*.

Veamos un ejemplo de cada uno de ellos.

Para el formateado desde Javascript utilizaremos los siguientes ficheros:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <div data-id="regionals_from_js"></div>
</div>
```
Y en *welcome.js*:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
   
            iris.locale(
                "en_US", {
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dateFormat: "m/d/Y h:i:s",
                    currency: {
                        formatPos: "n",
                        formatNeg: "(n)",
                        decimal: ".",
                        thousand: ",",
                        precision: 2
                    }
                }
                );
     
            iris.locale(
                "es_ES", {
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

            iris.locale("en_US");
   
            self.tmpl("welcome.html");
   
            var s ="Regionals Examples From Javascript";
   
            var date = new Date();
            s += "</br>Default date format: " + iris.date(date);
            s += "</br>Customized date format: " + iris.date(date, "Y/m/d h:i:s");
   
            var discount = "-34.586";
            s += "</br>Currency format: " + iris.currency(discount);
   
            self.get("regionals_from_js").html(s);
        };

    }
);
```

La función *iris.regional* permite conocer el valor regional que está utilizando Iris. Por ejemplo para saber los nombres de los días de la semana, usaremos:

```js
iris.regional("dayNames");
```

Para el formateado desde HTML utilizaremos los siguientes ficheros:

En *welcome.html*:

```html
<div>
    <h2>Regionals from HTML</h2>
    <div>
        <h3>Number</h3>
        <pre>## price ##</pre>
        <span>
            ##price##
        </span>
    </div>

    <div>
        <h3>Currency</h3>
        <pre>## price|currency ##</pre>
        <span>
            ##price|currency##
        </span>
    </div>

    <div>
        <h3>Date</h3>
        <pre>## date|date ##</pre>
        <span>
            ##date|date##
        </span>
    </div>

    <div>
        <h3>Custom Date</h3>
        <pre>## date|date(y - m - d) ##</pre>
        <span>
            ##date|date(y - m - d)##
        </span>
    </div>

    <div>
        <h3>Object Property</h3>
        <pre>## object.property ##</pre>
        <span>
            ##object.property##
        </span>
    </div>

</div>
```

Y en *welcome.js*:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
   
            iris.locale(
                "en_US", {
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dateFormat: "m/d/Y h:i:s",
                    currency: {
                        formatPos: "n",
                        formatNeg: "(n)",
                        decimal: ".",
                        thousand: ",",
                        precision: 2
                    }
                }
            );
     
            iris.locale(
                "es_ES", {
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

            iris.locale("en_US");
   
            var params = {
                "price" : 1499.99,
                "date" : new Date(),
                "object" : {
                    "property" : "This is a object property value"
                }
            };
   
            self.tmpl("welcome.html", params);
   
        };

    }
);
```

Observe que la aplicación del formato en HTML se realiza de forma parecida a como se hace la traducción de vocablos pero utilizando el símbolo "#". El formato que se quiere dar se separa del nombre de variable a formatear con el símbolo "|".

En el formato de fechas podemos utilizar los siguientes códigos:

<pre>
a 'a.m.' or 'p.m.'
A 'AM' or 'PM'
b Month, textual, 3 letters, lowercase. 'jan'
d Day of the month, 2 digits with leading zeros. '01' to '31'
D Day of the week, textual, 3 letters. 'Fri'
F Month, textual, long. 'January'
h Hour, 12-hour format. '01' to '12'
H Hour, 24-hour format. '00' to '23'
i Minutes. '00' to '59'
l Day of the week, textual, long. 'Friday'
m Month, 2 digits with leading zeros. '01' to '12'
M Month, textual, 3 letters. 'Jan'
n Month without leading zeros. '1' to '12'
s Seconds, 2 digits with leading zeros. '00' to '59'
U Seconds since the Unix Epoch (January 1 1970 00:00:00 UTC)
y Year, 2 digits. '99'
Y Year, 4 digits. '1999'
</pre>

##<a name="ajax"></a>Llamadas Ajax y servicios REST

Iris tiene funciones que son *wrappers* al método *ajax()* de *JQuery*.

La función *ajax* recibe el mismo objeto *settings* y devuelve el mismo objeto *promise* que retorna la función homónima de *JQuery*.

Para invocar esta función, ejecutaremos:

```js
var settings = {...};
iris.ajax(settings);
```

Iris dispone del método *service* que facilita el acceso a servicios *REST*.

En el siguiente ejemplo se explica como podríamos hacer esto:

En primer lugar, creamos el fichero *test.json* con el siguiente contenido:

```json
{
   "id" : 1,
   "title" : "book title"
}
```

Normalmente esto no será un fichero sino una URL que recuperará la información del servidor. En el ejemplo se utiliza un fichero para no depender de una tecnología de servidor concreta.

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <div data-id="json_container"/>
</div>
```

En *welcome.js*:

```js
//In welcome.js
var testService = iris.service(function(self){
    self.load = function (id, success, error) {
        self.get("./" + id, success, error);
    };

    self.create = function (params, success, error) {
        self.post("echo/create", params, success, error);
    };

    self.update = function (id, params, success, error) {
        self.put("echo/put/" + id, params, success, error);
    };

    self.remove = function (id, success, error) {
        self.del("echo/delete/" + id, success, error);
    };

});
   
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
   
            self.tmpl("welcome.html");
   
            testService.load("test.json", function (json) {
                self.get("json_container").html(json.title);
            }, function (p_request, p_textStatus, p_errorThrown) {
                console.log("Error callback unexpected: " + p_errorThrown);
            });
   
        };

    }
);
```

Observe que hemos llamado al método *iris.service* y asignado su retorno a una variable. El método *iris.service* recibe como parámetro una función que será llamada por Iris pasándole como parámetro un objeto de tipo *Service* creado por Iris. Este objeto dispone de los métodos *get*, *del*, *push* y *post* para acceder a servicios REST y pueden recibir una función de éxito o de error para procesar la respuesta obtenida.

Iris facilita el trabajo con errores genéricos de tal forma que podemos tratar todos los errores de un determinado tipo sin tener que especificar la misma función en cada llamada a un servicio. Iris notificará cualquier error en un servicio a la función que se haya registrado en el evento iris.SERVICE_ERROR.

Por ejemplo, para hacer esto haríamos:

```js
iris.on(iris.SERVICE_ERROR, fn_generic_service_error);
```

Esta función recibirá tres parámetros que nos permitirán saber de qué error se trata:

```js
function fn_generic_service_error (request, status, error) {
	....
}
```

##<a name="production"></a>Paso a producción

Iris tiene una serie de métodos que facilitan el paso de desarrollo a producción y las tareas de depuración.

```js
iris.baseUri(p_baseUri); //This sets or returns the base directory of the application
```

```js
iris.cache(boolean); //True, if you want Iris use the cache browser (This prevents the browser to use the local copy of the data and force to download them from the server). False if you want the opposite.
```

```js
iris.noCache(); //If no arguments are passed, returns the cache policy.
//You can pass it the servers that you do not want them to use the browser cache. For example iris.noCache ("wwww", "localhost");
```

```js
iris.cacheVersion(p_value); //By assigning a different value to this method we can get the cache is completely invalid and force the download of data from the server.
```

```js
iris.log(arg1, arg2, arg3, arg4); //This shows in the browser console that is passed as parameter.
```


```js
iris.enableLog(server1, server2,...) //If no arguments are passed, returns the logging policy.
//Or the servers that you want to use the Iris logging system.
```

Iris ayuda a la **minificación** de la aplicación. Para reducir el número de ficheros que hay que descargar desde el servidor en una aplicación Iris, podemos *minificar* todos los ficheros *.js* en uno único con la herramienta que queramos (por ejemplo [Grunt](https://github.com/gruntjs/grunt)). Para evitar que Iris tenga que descargarse el fichero del componente y utilice el del archivo *minificado*, debemos indicar la ruta de acceso al fichero en el método que crea el componente.

Por ejemplo, si el fichero *welcome.js* está en el fichero raíz de la aplicación, el parámetro se añadiría de la siguiente forma:

```js
//In welcome.js
iris.screen(
    function (self) {
        ...
    }, "welcome.js");
```

Y la llamada que crea el Screen *welcome* sería:

```js
iris.welcome("welcome.js");
```

Observe que se le ha pasado un parámetro adicional al método *iris.screen*. Este parámetro tiene que coincidir exactamente con el parámetro que se pasa al método *iris.welcome*. Si se pasa este parámetro adicional, cuando se vaya a crear el Screen, Iris buscará si ya hay cargado en memoria un método que corresponda a este *Screen* en lugar de cargarlo desde el servidor. Y, por lo tanto, se utilizará el fichero *minificado* si se dispone de él.

La misma técnica se utilizará cuando se cree un *Screen* al navegar a él por primera vez o cuando se llame al método *goto* para crear un *Screen*. De la misma forma, en los UIs deberemos definir el *UI* con el parámetro adicional que permite a Iris localizarlo. Por ejemplo, si el *UI* *my_ui* está en el directorio raíz:

```js
//In my_ui.js
iris.ui(
    function (self) {
       ...
    }, "my_ui.js");
```

##<a name="unit_test"></a>Pruebas de unidad en Iris

Para probar su correcto funcionamiento y detectar errores, se han realizado pruebas de unidad de todos los métodos de Iris. Las pruebas de unidad se han realizado con la librería [QUnit](http://qunitjs.com/).

Las pruebas de unidad son una fuente adicional para conocer el funcionamiento de Iris. Puede consultar las pruebas realizadas en el directorio [test](https://github.com/iris-js/iris/tree/iris-grunt/test).

#<a name="step_by_step"></a>Construyendo paso a paso una aplicación desde cero

En esta sección vamos utilizar Iris para construir una sencilla aplicación que nos permita comprender como integrar todo lo visto anteriormente.

Puede descargase la aplicación en el siguiente [enlace](https://github.com/surtich/iris/blob/iris-grunt/docs/iris-shopping.tar.gz?raw=true).

La aplicación va a permitir realizar la lista de la compra de una serie de productos agrupados en categorías. En las siguientes imágenes presentamos las principales pantallas de la aplicación.

<a name="home_img"></a>*#home:*
![home](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/home.png)

<a name="categories_img"></a>*#categories:*
![categories](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/categories.png)

<a name="products_img"></a>*#products:*
![products](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/products.png)

<a name="shopping_img"></a>*#shopping:*
![shopping](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/shopping_list.png)

Además de Iris, se ha utilizado [Twitter Bootstrap](http://twitter.github.com/bootstrap/) para *maquetar* la aplicación y [JQuery DataTables](http://www.datatables.net/) para presentar los productos de la lista de la compra. En esta sección no se va a explicar el uso de estas librerías aunque su conocimiento no es esencial para comprender el funcionamiento de la aplicación.

##<a name="directories"></a>Estructura de directorios

En Iris debemos crear un fichero *html* y otro *js* por cada componente. En aplicaciones de tamaño medio/grande, lo normal es que haya decenas e incluso centenares de archivos. Es importante que, desde el principio, definamos una estructura de directorios que nos permita localizar fácilmente cada uno de estos archivos.

Vamos a proponer una estructura determinada aunque cualquier otra que cumpla el propósito anterior será igualmente válida. En nuestro ejemplo, vamos a crear un fichero *shopping* para almacenar los componentes de Iris y fuera de este fichero guardaremos, librerías, estilos, imágenes, que no sean específicos de Iris. En el directorio *shopping* vamos almacenar por separado los componentes de tipo *Screen* de los de tipo *UI*, creando un directorio para cada tipo. Además vamos a crear subdirectorios para almacenar los  componentes que definen un mismo estado de la aplicación.

En la siguiente imagen vemos la estructura de directorios y los archivos que contienen:

![www_directories](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/www_directories.png)

Más detalladamente, el contenido del directorio *shopping* será el siguiente:

![shopping_directories](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/shopping_directories.png)

Observe que, para hacer más sencillo el ejemplo, se ha creado un directorio *json* que permite cargar los productos y las categorías desde el servidor Web sin depender de ninguna tecnología de servidor. En una aplicación real, normalmente los productos estarían almacenados en una base de datos.

##<a name="step_by_step_welcome"></a>*Screen* Welcome

En esta sección vamos a preparar la aplicación para que sea capaz de ejecutar el *Screen* de bienvenida.

Estos son los ficheros necesarios y su contenido:

En *index.html*:

```html
<!DOCTYPE HTML>
<html>
    <head>
        <title>iris shopping</title>

        <link type="text/css" rel="stylesheet" href="./css/bootstrap.css">
        <link type="text/css" rel="stylesheet" href="./css/jquery.dataTables.css">
        <link type="text/css" rel="stylesheet" href="./css/shopping.css">

        <script type='text/javascript' src='./js/jquery-1.8.3.js'></script>
        <script type='text/javascript' src='./js/iris-0.5.0-SNAPSHOT.js'></script>
        <script type='text/javascript' src='./js/bootstrap.js'></script>
        <script type='text/javascript' src='./js/jquery.dataTables.js'></script>      
        
        <script type='text/javascript' src='./js/shopping_list.js'></script>
        
        <script type='text/javascript' src='./js/init.js'></script>

    </head>
    <body>
    </body>
</html>
```

Este fichero contiene la estructura clásica de una página *html*. Observe que la etiqueta *head* permite importar las hojas de estilo y las librerías y ficheros de *javascript* necesarios.

Centremos nuestra atención en el fichero *init.js*:

```js
$(document).ready(
    function () {
        
        function _setLang() {    
            var regExp = /[?&]lang=[a-z][a-z][\-_][A-Z][A-Z]/;
            var lang = window.location.href.match(regExp);
            if ( lang !== null) {
                iris.locale(lang[0].substring(lang[0].length - 5, lang[0].length));
            } else {
                iris.locale("en_US");
            }
        }
            
        iris.translations("es_ES", {                
            ERROR: "Se ha producido el siguiente error",
            JQUERY : {
                DATATABLES: {
                    SEARCH: "Buscar",
                    NEXT: "Siguiente",
                    PREVIOUS: "Anterior",
                    SHOW: "Mostrando _MENU_ líneas"
                }
            }
            
        });
            
        iris.translations("en_US", {                
            ERROR: "There was an error",
            JQUERY : {
                DATATABLES: {
                    SEARCH: "Search",
                    NEXT: "Next",
                    PREVIOUS: "Previous",
                    SHOW: "Show _MENU_ entries"
                }
            }
        });

        _setLang();
        
        
        iris.baseUri(".");
        iris.enableLog("localhost");
        iris.welcome("/shopping/screen/welcome.js");
                                
    }
);
```
Observe que lo primero que hacemos en este *script* es cargar algunas de las traducciones que vamos a necesitar. Hemos decidido que cada fichero de Javascript cargue las traducciones que vaya a utilizar. En el caso de *init.js* vamos a cargar las traducciones comunes en toda la aplicación. Una alternativa perfectamente aceptable sería tener un único punto donde definiríamos todas las traducciones de la aplicación. Otra posible solución sería almacenar las traducciones en una base de datos y recuperarlas mediante un objeto *JSON*.

Después llamamos a la función *_setLang* que nos permite definir el idioma de la aplicación. El idioma se seleccionará a partir del parámetro *lang* que se haya pasado en el *Query String* de la *URL*. Si no se ha pasado este parámetro se seleccionará el idioma por defecto.

Por último cargamos el *Screen* Welcome.

En *welcome.js*:

```js
iris.screen(
    function (self) {	
        self.create = function () {
            
            function _ajaxPrepare() {
                $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {            
                    self.get("screens").hide();
                    self.get("loading").show();                
                    jqXHR.always(function() {
                        self.get("loading").hide();
                        self.get("screens").show();
                    });            
                });                
            }
            
            function _createScreens() {
                self.screens("screens", [{
                    "#home": "/shopping/screen/home.js"
                }, {
                    "#categories": "/shopping/screen/products/categories.js"
                }, {
                    "#products": "/shopping/screen/products/products.js"
                },{
                    "#shopping": "/shopping/screen/list/shopping.js"
                }]);
            }
        
            function _changeLang(link) {
                var regExp = /[?&]lang=[a-z][a-z][\-_][A-Z][A-Z]/;
                var lang = window.location.href.match(regExp);
                var url = window.location.href;
                if ( lang === null) {
                    lang = "lang=" + link.data("lang");
                    if (window.location.href.match(/[?]/)) {
                        lang = "&" + lang;                            
                    } else {
                        lang = "?" + lang;
                    }
                    url += lang;
                } else {
                    var first = lang[0].substr(0,6);
                    url = window.location.href.replace(regExp, first + link.data("lang"));                       
                }
                    
                window.location.href = url;
                window.location.reload(true);
            }
            
            
            iris.translations("es_ES", {    
                LOADING: "Cargando...",
                MENU: {
                    WELCOME: "Ejemplo de lista de la compra",
                    HOME: "Incio",
                    PRODUCTS: "Productos",
                    SHOPPING_LIST:"Lista de la compra"
                }
            });
            
            iris.translations("en_US", {
                LOADING: "Loading...",
                MENU: {
                    WELCOME: "Shopping List Example",
                    HOME: "Home",
                    PRODUCTS: "Products",
                    SHOPPING_LIST: "Shopping List"
                }
            });
            
            
            self.tmpl("/shopping/screen/welcome.html");
            
            _ajaxPrepare();
            
            _createScreens();
            
            $("[data-lang]").click(
                function (event) {
                    _changeLang($(this));
                    event.preventDefault();
                }
                );
            
            
            if ( !document.location.hash ) {                
                iris.goto("#home"); //Default page
            }
        };
    } , "/shopping/screen/welcome.js");
```
Lo más relevante de este fichero es:
* La función *_ajaxPrepare* permite poner un texto *cargando...* cada vez que se efectúa una llamada *AJAX*.
* La función *_createScreens* registra los *screens* de la aplicación.
* La función *_changeLang* recarga la aplicación añadiendo el código del idioma que se haya seleccionado como un parámetro del *Query String*.
* Se selecciona el *Hash-URL* *#home* como página por defecto de la aplicación.

Finalmente, el fichero *welcome.html* contendrá:

```html
<div class="container">
    <div class="navbar navbar-inverse">
        <div class="navbar-inner">
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <a class="brand" href="#home">@@MENU.WELCOME@@</a>
                <div class="nav-collapse collapse">
                    <ul class="nav">
                        <li><a href="#home">@@MENU.HOME@@</a></li>
                        <li><a href="#categories">@@MENU.PRODUCTS@@</a></li>
                        <li><a href="#shopping">@@MENU.SHOPPING_LIST@@</a></li>                        
                    </ul>
                    <ul class="nav pull-right">
                        <li><a href="#" data-lang="es_ES"><i class="icon-spain-flag"></i></a></li>
                        <li><a href="#" data-lang="en_US"><i class="icon-united-kingdom-flag"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="divContainer">
        <div data-id="loading" class="divElement loading">@@LOADING@@</div>
        <div class="container divElement" data-id="screens"/>        
    </div>
</div>
```

Observe que en este archivo se definen los menús con *Bootstrap* para acceder a las distintas secciones de la aplicación. En lugar de colocar los textos descriptivos de los menús directamente, se utiliza la sintaxis de Iris para permitir localizarlos en los ficheros de traducción. En la esquina superior derecha, <a href="#home_img">ver imagen</a>, se sitúan iconos para cambiar el idioma. Por último, hay un contenedor donde se cargarán los *screens* de la aplicación.

##<a name="step_by_step_home"></a>*Screen* Home

El <a href="#home_img">*Screen* *Home*</a> es una simple página informativa. Estos son sus ficheros:

En *home.js*:


```js
iris.screen(
    function (self) {	
        self.create = function () {
           
            iris.translations("es_ES", {                
                HOME: {
                    TITLE: "Ejemplo de lista de la compra",
                    DESC: "Este es un ejemplo de uso de"
                }
            });
            
            iris.translations("en_US", {                
                HOME: {
                    TITLE: "Shopping List Iris Example",
                    DESC: "This a simple example of using"
                }
            });
            
            self.tmpl("/shopping/screen/home.html");
        };
    }, "/shopping/screen/home.js");
```

En *home.html*:

```html
<div>
	<h1>@@HOME.TITLE@@</h1>
        
	<p>@@HOME.DESC@@ <a href="https://github.com/iris-js">iris.</a></p>
</div>
```

##<a name="step_by_step_model"></a>ShoppingList Model

Para mantener los productos en la lista de la compra y para recuperarlos desde el servidor, vamos a crear un pequeño *modelo* en *Javascript* en el fichero *shopping_list.js*:

```js
var model = {}; 

(function($) {
    
    model.event = {
        
        PRODUCTS: {
            ADD: "shopping:products:add",
            REMOVE: "shopping:products:remove"
        },
        
        SHOPPING: {
            CHECK: "shopping:products:check",
            UNCHECK: "shopping:products:uncheck",
            CHANGE_STATE: "shopping:products:change_state",
            REMOVE_ALL: "shopping:products:remove_all",
            CHECK_ALL: "shopping:products:check_all",
            UNCHECK_ALL: "shopping:products:uncheck_all",
            INVERT_CHECK: "shopping:products:invert_check",
            REMOVE_CHECKED: "shopping:products:remove_purchased"
        }
    };

    function _init () {
        model.shoppingList = new model.ShoppingList();
        iris.on(model.event.PRODUCTS.REMOVE, model.shoppingList.removeShoppingProduct);
        iris.on(model.event.PRODUCTS.ADD, model.shoppingList.addShoppingProduct);
        iris.on(model.event.SHOPPING.CHANGE_STATE, model.shoppingList.changeStateShoppingProduct);        
        iris.on(model.event.SHOPPING.REMOVE_ALL, model.shoppingList.removeAll);
        iris.on(model.event.SHOPPING.CHECK_ALL, model.shoppingList.checkAll);
        iris.on(model.event.SHOPPING.UNCHECK_ALL, model.shoppingList.uncheckAll);        
        iris.on(model.event.SHOPPING.INVERT_CHECK, model.shoppingList.invertCheck);  //Cuando un evento no existe no de ningún aviso, Me he vuelto loco porque no sabía que pasaba
        iris.on(model.event.SHOPPING.REMOVE_CHECKED, model.shoppingList.removePurchased);
        
    }
    
    function _destroy () {
        iris.off(model.event.PRODUCTS.REMOVE, model.shoppingList.removeShoppingProduct);
        iris.off(model.event.PRODUCTS.ADD, model.shoppingList.addShoppingProduct);
        iris.off(model.event.SHOPPING.CHANGE_STATE, model.shoppingList.changeStateShoppingProduct);        
        iris.off(model.event.SHOPPING.REMOVE_ALL, model.shoppingList.removeAll);
        iris.off(model.event.SHOPPING.CHECK_ALL, model.shoppingList.checkAll);
        iris.off(model.event.SHOPPING.UNCHECK_ALL, model.shoppingList.uncheckAll);        
        iris.off(model.event.SHOPPING.INVERT_CHECK, model.shoppingList.invertCheck);  //Cuando un evento no existe no de ningún aviso, Me he vuelto loco porque no sabía que pasaba
        iris.off(model.event.SHOPPING.REMOVE_CHECKED, model.shoppingList.removePurchased);
        model.shoppingList = null;
    }
    
    model.init = _init;
    model.destroy = _destroy;
    
    
    model.ShoppingList =  function () {    
       
        var _shoppingProducts = [];
        var _order = 1;
    
        function _getShoppingProducts () {
            return _shoppingProducts;
        }
        
        function _getSortedShoppingProducts() {        
            var sortedShoppingProducts = [];
            var index = 0;
            var posPurchased = 0;
            
            for (; index < _shoppingProducts.length; index++) {
                var product = _shoppingProducts[index];                
                var purchased = product.purchased === true;
                var i = 0;
                var j = posPurchased;
                if (purchased) {
                    i = posPurchased;
                    j = sortedShoppingProducts.length;
                }
                
                while (i < j && sortedShoppingProducts[i].order < product.order) {
                    i++;
                }
                
                if (i < j) {
                    sortedShoppingProducts.splice(i, 0, product);                    
                } else {
                    if (purchased) {
                        sortedShoppingProducts.push(product);
                    } else {
                        sortedShoppingProducts.splice(posPurchased, 0, product);
                    }
                }
                if (!purchased) {
                    posPurchased++;
                }
            }
            
            
            return sortedShoppingProducts;
        }
        
        function _getShoppingProduct(idProduct) {
            var i = _getShoppingProductIndex(idProduct);            
            if (i === -1) {
                return null;
            } else {
                return _shoppingProducts[i];
            }
        }
        
        function _getShoppingProductIndex(idProduct) {
            var found = false;
            var i = 0;
            while ( !found && i < _shoppingProducts.length ) {
                if (_shoppingProducts[i].idProduct === idProduct) {
                    found = true;
                } else {
                    i++;
                }
            }
            
            if (found) {
                return i;
            } else {
                return -1;
            }
        }
        
        function _addShoppingProduct (product) {
            if (_getShoppingProduct(product.idProduct) === null) {
                var shoppingProduct = new model.ShoppingProduct(product.idProduct, product.nameProduct, false);
                shoppingProduct.order = _order;                
                _order++;
                _shoppingProducts.push(shoppingProduct);
                
            } else {
                throw "The product is already in the shopping list.";
            }
        }
        
        
        function _removeShoppingProduct (idProduct) {            
            var i = _getShoppingProductIndex(idProduct);
            if (i >= 0) {
                _shoppingProducts.splice(i, 1);
            }
        }
        
        function _removeAll () {                        
            _shoppingProducts = [];
            _order = 1;
        }
        
        
        function _changeStateShoppingProduct(idProduct, purchased) {            
            var shoppingProduct = _getShoppingProduct(idProduct);
            if (shoppingProduct !== null) {
                if (purchased === undefined) {
                    shoppingProduct.changeState(!shoppingProduct.purchased);
                } else {               
                    shoppingProduct.changeState(purchased === true);
                }
            }
        }
        
        function _changeStateAllShoppingProducts(purchased) {                    
            for (var i = 0; i < _shoppingProducts.length; i++) {
                var product = _shoppingProducts[i];             
                
                if (purchased === true || purchased === false) {                   
                    product.purchased = purchased;
                } else {
                    product.purchased = !product.purchased;
                }
            }
        }
        
        function _removePurchased() {            
            var i = 0;
            while (i < _shoppingProducts.length) {
                var product = _shoppingProducts[i];                
                if (product.hasOwnProperty("purchased") && product.purchased === true) {                   
                    _shoppingProducts.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        
        function _hasProducts(purchased) {
            var found = false;
            var i = 0;
            while ( !found && i < _shoppingProducts.length ) {
                if (_shoppingProducts[i].purchased === purchased) {
                    found = true;
                } else {
                    i++;
                }
            }
            
            return found;
        }
        
        
        model.ShoppingList.prototype.getShoppingProducts = _getShoppingProducts;
        model.ShoppingList.prototype.getSortedShoppingProducts = _getSortedShoppingProducts;
        model.ShoppingList.prototype.getShoppingProduct = _getShoppingProduct;
        model.ShoppingList.prototype.addShoppingProduct = _addShoppingProduct;
        model.ShoppingList.prototype.removeShoppingProduct = _removeShoppingProduct;
        model.ShoppingList.prototype.changeStateShoppingProduct = _changeStateShoppingProduct;
        model.ShoppingList.prototype.removeAll = _removeAll;
        model.ShoppingList.prototype.checkAll = function() {
            _changeStateAllShoppingProducts(true);
        };
        model.ShoppingList.prototype.uncheckAll = function() {
            _changeStateAllShoppingProducts(false);
        };
        model.ShoppingList.prototype.invertCheck = function() {
            _changeStateAllShoppingProducts();
        };
        model.ShoppingList.prototype.removePurchased = _removePurchased;
        
        model.ShoppingList.prototype.hasPurchasedProducts = function() {
            return _hasProducts(true);
        };
        
        model.ShoppingList.prototype.hasNoPurchasedProducts = function() {            
            return _hasProducts(false);
        };
    };
    
    
    
    model.ShoppingProduct = function (idProduct, nameProduct, purchased) {
        this.order = -1;
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        
        this.changeState = function (purchased) {
            if (purchased === true) {
                this.purchased = true;
            } else {
                this.purchased = false;
            }
        };
        
        this.changeState(purchased);
        
    };
    
    model.service = iris.service(function(self){
        self.load = function (path, success, error) {
            self.get(iris.baseUri() + path, success, error);
        };
    });
    
    
    model.service.app = (function() {
        return {
            getCategories: function(success, error) {
                model.service.load("/json/categories.json", success, error);
            },
            getProducts: function(idCategory, success, error) {
                model.service.load("/json/category_" + idCategory + ".json", success, error);
            }
        };
    })();
    
    model.init();
    
})(jQuery);
```

Sin entrar en detalle vamos a comentar lo más importante de este fichero:

* Hemos creado una variable global *model* que permite acceder a los métodos públicos definidos.
* La comunicación con los componentes de *Iris* se realiza a través de *eventos Iris* para lo que se han definido una serie de constantes.
* Se ha definido un método *model.service* para acceder a los servicios *REST* que ofrece Iris.
* Se ha definido un objeto *model.service.app* que permite recuperar la información de productos y categorías del servidor.


##<a name="step_by_step_caterogies"></a>*Screen* Categories

El <a href="#categories_img">*Screen* *Categories*</a> permite cargar las categorías de los productos de la aplicación con los siguientes ficheros:

En *categories.js*:

```js
iris.screen(
    function (self) {
        
        function _inflate(categories) {
            $.each(categories,
                function(index, category) {						
                    self.ui("list_categories", "/shopping/ui/products/category_list_item.js", {
                        "category": category
                    });
                }
                );
        }
        
        self.create = function () {
            self.tmpl("/shopping/screen/products/categories.html");
            model.service.app.getCategories(_inflate);
        };

        
    }, "/shopping/screen/products/categories.js");
```

Y en *categories.html*:

```html
<div class="container">  
	<div class="row">  
		<div class="span12">  
			<ul data-id="list_categories" class="nav nav-tabs nav-stacked">  				
										
			</ul>  
		</div>  
	</div>  
</div>  
```

Observe que llamamos al método *model.service.app.getCategories* para recuperar las categorías desde el servidor. Cuando hayamos recuperado las categorías, iterativamente cargamos el *UI* *category_list_item* pasándole cada categoría como parámetro en el contenedor *list_categories*.

El *UI* *category_list_item* tendrá los siguientes ficheros:

En *category_list_item.js*:

```js
iris.ui(function(self) {	
    self.create = function() {
        var category = self.setting("category");
        self.tmplMode(self.APPEND);
        self.tmpl("/shopping/ui/products/category_list_item.html", category);
    };	
}, "/shopping/ui/products/category_list_item.js");
```

En *category_list_item.html*:

```html
<li>
    <a href="#products?idCategory=##idCategory##">##nameCategory##</a>
</li>
```

Y el fichero *categories.json* contendrá la siguiente información:

```json
[
    { "idCategory":1 , "nameCategory":"Vegetables" }, 
    { "idCategory":2 , "nameCategory":"Fruits" }, 
    { "idCategory":3 , "nameCategory":"Meat" },
    { "idCategory":4 , "nameCategory":"Seafood" }
]
```

Observe lo siguiente:
* El método *tmplMode* tiene el valor *APPEND* para que las categorías se añadan y no se reemplacen.
* La categoría pasada como parámetro desde el *Screen* *Categories* se recupera y se pasa a la vista en el método *tmpl*.
* En la vista podemos utilizar las propiedades del objeto *Category* recuperado.
* Los *UIs* creados contienen un enlace que permite navegar al *Screen* con *Hash-URL* *#products*.
* Este *Screen* recibe el parámetro *idCategory* para conocer de qué categoría queremos recuperar los productos.

##<a name="step_by_step_products"></a>*Screen* Products

El <a href="#products_img">*Screen* *Products*</a> permite recuperar del servidor los productos de la categoría seleccionada y añadir los que queramos a la lista de la compra.

Los ficheros de este *Screen* son:

En *products.js*:

```js
iris.screen(
    function (self) {
        var _msg = null;
        
        self.create = function () { 
            
            iris.translations("es_ES", {                
                PRODUCTS: {
                    MISSING_CATEGORY: "Falta el parámetro <i>idCategoria</i>.",
                    CHOOSE_PRODUCTS: "Elige los productos que te interesen"
                }
            });
            
            iris.translations("en_US", {                
                PRODUCTS: {
                    MISSING_CATEGORY: "Missing <i>idCategory</i> parameter.",
                    CHOOSE_PRODUCTS: "Choose some products"
                }
            });
            
            self.tmpl("/shopping/screen/products/products.html");
            _msg = self.get("msg");
            
            $("[data-id='list_products']").on("change", "input[type='checkbox']", function (event) {
                var idProduct = $(this).data("product");                
                var nameProduct = $(this).parent().text();
                if (this.checked) {
                    //model.shoppingList.addShoppingProduct(idProduct, nameProduct);
                    iris.notify(model.event.PRODUCTS.ADD, {
                        idProduct:idProduct, 
                        nameProduct:nameProduct
                    });
                } else {
                    //model.shoppingList.removeShoppingProduct(idProduct);
                    iris.notify(model.event.PRODUCTS.REMOVE, idProduct);
                }
            });
            
        };
       
        self.awake = function (params) {
            
            function _inflate(products) {
                _msg.html(iris.translate("PRODUCTS.CHOOSE_PRODUCTS") + ":"); 
                $.each(products,
                    function(index, product) {
                        if (model.shoppingList.getShoppingProduct(product.idProduct) !== null) {
                            product.checked = "checked";
                        } else {
                            product.checked = "";
                        }
                        self.ui("list_products", "/shopping/ui/products/product_list_item.js", {
                            "product": product
                        });
                    }
                    );					
            }
            
            
            if (params.hasOwnProperty("idCategory")) {
                self.destroyUIs("list_products");
                model.service.app.getProducts(params.idCategory, _inflate,
                    function (p_request, p_textStatus, p_errorThrown) {
                        _msg.html(iris.translate("ERROR") + ": <i>" + p_textStatus + "</i>");
                    }
                    );
            }
        };
    }, "/shopping/screen/products/products.js");
```

En *products.html*:

```html
<div class="container">  
    <div data-id="msg">Products</div>
    <div class="row">  
        <div class="span12">  
            <form class="form-horizontal">                 
                <div data-id="list_products" class="controls">  				

                </div>  
            </form>
        </div>  
    </div>  
</div>  
```

Los más interesante de estos ficheros lo resumimos en los siguientes puntos:

* A diferencia de lo que hicimos con las categorías, la carga de los productos la realizamos en el método *awake* en vez de en el *create*.
* El motivo por el que hacemos esto es que necesitamos reutilizar el contenedor *list_products* cuando cambiamos la categoría seleccionada.
* El método *awake* debe, por lo tanto, destruir los productos que haya en el contenedor antes de cargar los de la categoría seleccionada.
* La carga de los productos se hace, de forma similar a como lo hicimos con las categorías, en el *UI* *product_list_item*.
* Hemos utilizado el método *on* de JQuery para que cuando se pulse sobre algún producto, se añada o se elimine el producto de la lista de la compra. Este método de *JQuery* tiene la ventaja de que el evento se va a asociar incluso a aquellos elementos que todavía no existan en la interfaz de usuario.
* Cuando se pulse sobre algún producto, el método anterior, notificará al modelo de la aplicación lo que ha ocurrido utilizando el modelo de eventos de *Iris*.


El *UI* *product_list_item* tendrá los siguientes ficheros:

En *product_list_item.js*:

```js
iris.ui(function(self) {	
    self.create = function() {  
        self.tmplMode(self.APPEND);
        var product = self.setting("product");                
        self.tmpl("/shopping/ui/products/product_list_item.html", product);
    };
}, "/shopping/ui/products/product_list_item.js");
```

Y en *product_list_item.html*:

```html
<label class="checkbox">
    <input type="checkbox" data-product="##idProduct##" ##checked##>##nameProduct##
</label>
```

El fichero de productos para una categoría cualquiera, por ejemplo *category_2.json*, tendrá la siguiente estructura:

```json
[
    { "idProduct":6 , "nameProduct":"Apples" }, 
    { "idProduct":7 , "nameProduct":"Bananas" }, 
    { "idProduct":8 , "nameProduct":"Grapes" }, 
    { "idProduct":9 , "nameProduct":"Kiwis" }, 
    { "idProduct":10 , "nameProduct":"Lemons" },
    { "idProduct":11 , "nameProduct":"Melon" },
    { "idProduct":12 , "nameProduct":"Oranges" },
    { "idProduct":13 , "nameProduct":"Peaches" },
    { "idProduct":14 , "nameProduct":"Plums" }
]
```

La explicación de estos ficheros es similar a la que realizamos para el *UI* *category_list_item*.

##<a name="step_by_step_shopping"></a>*Screen* Shopping

El <a href="#shopping_img">*Screen* *Shopping*</a> permite permite gestionar la cesta de la compra marcando aquellos productos que se han comprado. 

Los ficheros de este *Screen* son:

En *shopping.js*:

```js
iris.screen(
    function (self) {
        
        self.create = function () {
            iris.translations("es_ES", {                
                SHOPPING_LIST: {
                    EMPTY: "La cesta está vacía.",
                    REFRESH: "Actualizar",
                    REMOVE_ALL: "Borrar todos",
                    CHECK_ALL: "Marcar todos",
                    UNCHECK_ALL: "Desmarcar todos",
                    INVERT_ALL: "Invertir",
                    REMOVE_PURCHASED: "Borrar marcados",
                    ORDER: "Orden",
                    PRODUCT: "Producto",
                    ACTION: "Acción",
                    BUY: "Cambiar estado",
                    REMOVE: "Borrar"
                }
            });
            
            iris.translations("en_US", {                
                SHOPPING_LIST: {
                    EMPTY: "The Shopping list is empty.",
                    REFRESH: "Refresh",
                    REMOVE_ALL: "Remove All",
                    CHECK_ALL: "Check All",
                    UNCHECK_ALL: "Uncheck All",
                    INVERT_ALL: "Invert checks",
                    REMOVE_PURCHASED: "Remove purchased",
                    ORDER: "Order",
                    PRODUCT: "Product",
                    ACTION: "Action",
                    BUY: "Change state",
                    REMOVE: "Remove"
                }
            });
            
            self.tmpl("/shopping/screen/list/shopping.html");            
            _asignEvents();
        };
                
        self.awake = function (params) {
            _inflate();
        };
        
        function _asignEvents() {
            iris.on(model.event.PRODUCTS.REMOVE, _changeVisibilityShoppingTable);
            iris.on(model.event.SHOPPING.CHANGE_STATE, _changeStateButtons);            
            
            self.get("btn_refresh").on("click", function () {
                _inflate();
            }
            );
                
            self.get("btn_remove_all").on("click", function () {
                iris.notify(model.event.SHOPPING.REMOVE_ALL);
                _inflate();
            }
            );
                
            self.get("btn_check_all").on("click", function () {
                iris.notify(model.event.SHOPPING.CHECK_ALL);
                _inflate();
            }
            );
                
            self.get("btn_uncheck_all").on("click", function () {
                iris.notify(model.event.SHOPPING.UNCHECK_ALL);
                _inflate();
            }
            );
                
            self.get("btn_invert_check").on("click", function () {
                iris.notify(model.event.SHOPPING.INVERT_CHECK);
                _inflate();
            }
            );
                
            self.get("btn_remove_checked").on("click", function () {
                iris.notify(model.event.SHOPPING.REMOVE_CHECKED);
                _inflate();
            }
            );
             
        }
        
        function _inflate() {
            self.destroyUIs("shoppingList_products");
            _destroyShoppingTable();
            _loadShoppingProducts();
            _createShoppingTable();
            _changeVisibilityShoppingTable();
        }
                        
        function _loadShoppingProducts() {
            var products = model.shoppingList.getSortedShoppingProducts();
            if (products.length > 0) {                
                $.each(products,
                    function(index, product) {
                        var ui = self.ui("shoppingList_products", "/shopping/ui/list/product_shopping_list_item.js", {
                            "product": product
                        });
                        
                        ui.get("remove").on("click",
                            function () {
                                var idProduct = ui.setting("product").idProduct;
                                var table = self.get("shopping_table");
                                var row = $(this).closest("tr").get(0);
                                table.fnDeleteRow(table.fnGetPosition(row));
                                self.destroyUI(ui);
                                iris.notify(model.event.PRODUCTS.REMOVE, idProduct);
                            }
                            );
                                
                        ui.get("buy").on("click",
                            function () {
                                var idProduct = ui.setting("product").idProduct;
                                ui.get("order").toggleClass("purchased");
                                ui.get("nameProduct").toggleClass("purchased");
                                ui.get("icon-shopping-cart").toggleClass("icon-shopping-cart icon-shopping-cart-remove");
                                iris.notify(model.event.SHOPPING.CHANGE_STATE, idProduct);                            
                            }
                            );
                        if (product.purchased === true) {
                            ui.get("order").addClass("purchased");
                            ui.get("nameProduct").addClass("purchased");
                            ui.get("icon-shopping-cart").removeClass("icon-shopping-cart").addClass("icon-shopping-cart-remove");
                        }
                    }
                    );
            }
        }
        
        function _destroyShoppingTable() {
            var table = self.get("shopping_table");
            if (table.hasOwnProperty("fnClearTable")) {
                table.fnClearTable();
                table.fnDestroy();
            }
        }
        
        function _createShoppingTable() {
            var table = self.get("shopping_table");            
            table.dataTable(
            {
                "bPaginate": true,
                "bInfo" : false,
                "bAutoWidth": false,
                "oLanguage": {
                    "sSearch": iris.translate("JQUERY.DATATABLES.SEARCH") + ":",
                    "sZeroRecords": iris.translate("SHOPPING_LIST.EMPTY"),
                    "sLengthMenu": iris.translate("JQUERY.DATATABLES.SHOW"),
                    "oPaginate": {
                        "sNext": iris.translate("JQUERY.DATATABLES.NEXT"),
                        "sPrevious": iris.translate("JQUERY.DATATABLES.PREVIOUS")
                    }
                },
                "aoColumnDefs": [
                {
                    "bSortable": false, 
                    "aTargets": [ 2 ]
                },
                {
                    "sType": "html" , 
                    "aTargets": [0]
                }
                ],
                "aaSorting": []
            }   
            );
        }
        
        function _changeVisibilityShoppingTable() {
            var products = model.shoppingList.getSortedShoppingProducts();
            if (products.length > 0) {
                self.get("div_shopping").show();
                self.get("msg").hide();
                _changeStateButtons();
            } else {
                self.get("div_shopping").hide();
                self.get("msg").show();
            }
        }
        
        function _changeStateButtons() {            
            self.get("btn_check_all").toggleClass("disabled", !model.shoppingList.hasNoPurchasedProducts());
            self.get("btn_uncheck_all").toggleClass("disabled", !model.shoppingList.hasPurchasedProducts());
            self.get("btn_remove_checked").toggleClass("disabled", !model.shoppingList.hasPurchasedProducts());            
        }
    
        self.destroy = function () {
            iris.off(model.event.PRODUCTS.REMOVE, _changeVisibilityShoppingTable);
            iris.off(model.event.SHOPPING.CHANGE_STATE, _changeStateButtons);                
        };
        
    },"/shopping/screen/list/shopping.js");
```

Y en *shopping.html*:

```html
<div class="container">  
    <div data-id="msg">@@SHOPPING_LIST.EMPTY@@</div>
    <div data-id="div_shopping">
        <div class="control-group">  
            <form class="well">
                <button type="button" class="btn" data-id="btn_refresh"><i class="icon-refresh"></i>@@SHOPPING_LIST.REFRESH@@</button>
                <button type="button" class="btn btn-danger" data-id="btn_remove_all"><i class="icon-trash icon-white"></i>@@SHOPPING_LIST.REMOVE_ALL@@</button>
                <button type="button" class="btn btn-success" data-id="btn_check_all"><i class="icon-shopping-cart icon-white"></i>@@SHOPPING_LIST.CHECK_ALL@@</button>
                <button type="button" class="btn btn-info" data-id="btn_uncheck_all"><i class="icon-shopping-cart-remove"></i>@@SHOPPING_LIST.UNCHECK_ALL@@</button>
                <button type="button" class="btn btn-primary" data-id="btn_invert_check"><i class="icon-shopping-cart-invert"></i>@@SHOPPING_LIST.INVERT_ALL@@</button>
                <button type="button" class="btn btn-warning" data-id="btn_remove_checked"><i class="icon-shopping-cart-remove-checked"></i>@@SHOPPING_LIST.REMOVE_PURCHASED@@</button>
            </form>
        </div>
        <table class="table table-striped table-bordered"  data-id="shopping_table">
            <thead>
                <tr>            
                    <th>@@SHOPPING_LIST.ORDER@@</th>
                    <th>@@SHOPPING_LIST.PRODUCT@@</th>
                    <th>@@SHOPPING_LIST.ACTION@@</th>            
                </tr>
            </thead>
            <tbody data-id="shoppingList_products">

            </tbody>
        </table>
    </div>
</div>
```

Estos son los puntos más relevantes de estos ficheros:

* La función *_asignEvents* asigna la pulsación de los botones del *screen* a eventos de Iris para actuar sobre el modelo. También registra eventos de Iris lanzados desde el modelo.
* La función *_loadShoppingProducts* carga en el *tbody* de la tabla *shopping_table* los productos de la lista de la compra. Los productos que no se hayan comprado todavía aparecen primero ordenados por su *idProduct*. Con cada producto se pueden realizar dos acciones: comprar y borrar de la lista. Esta función gestiona la pulsación sobre los botones que efectúan estas acciones. Por último, se asignan los estilos adecuados cuando un producto ha sido comprado.
* La función *_destroyShoppingTable* elimina la tabla de la lista de la compra.
* La función *_createShoppingTable* determina las columnas que se van a mostrar en la tabla de la lista de la compra, el sistema de *paginación* y las columnas por las que se puede realizar ordenación.
* La función *_changeVisibilityShoppingTable* oculta la tabla de la lista de la compra cuando no hay ningún producto.
* La función *_changeStateButtons* habilita o deshabilita los botones del encabezado de la tabla de la lista de la compra en función de que se puedan o no pulsar.

Por último el *ui* *product_shopping_list_item* contiene los productos de la lista de la compra que se van a cargar en la tabla anterior. Los ficheros utilizados son los siguientes:

En *product_shopping_list_item.js*:

```js
iris.ui(function(self) {	
    self.create = function() {
        self.tmplMode(self.APPEND);
        var product = self.setting("product");                
        self.tmpl("/shopping/ui/list/product_shopping_list_item.html", product);
    };	
}, "/shopping/ui/list/product_shopping_list_item.js");
```

Y en *product_shopping_list_item.html*:

```html
<tr>  	
    <td>
        <span data-id="order">##order##</span>
    </td>
    <td>
        <span data-id="nameProduct">##nameProduct##</span>
    </td>
    <td>
        <button type="button" class="btn" data-id="buy" title="@@SHOPPING_LIST.BUY@@"><i data-id="icon-shopping-cart" class="icon-shopping-cart"></i></button>
        <button type="button" class="btn" data-id="remove" title="@@SHOPPING_LIST.REMOVE@@"><i class="icon-trash"></i></button>		
    </td>
</tr>
```

##<a name="step_by_step_qunit"></a>Pruebas unitarias con *QUnit*

*[QUnit](http://qunitjs.com/)* es una librería para realizar [pruebas unitarias](http://es.wikipedia.org/wiki/Prueba_unitaria) que pertenece al proyecto [JQuery](http://jquery.com/).

Con *QUnit* podemos realizar tanto pruebas síncronas como asíncronas así como probar eventos de la interfaz de usuario.

*QUnit* permite agrupar las pruebas en módulos. En nuestro ejemplo vamos a crear dos módulos, uno para probar el modelo y otro para probar la interfaz de usuario.

Las pruebas de unidad deben ser atómicas, es decir, que una prueba no debe depender de los resultados o de las acciones realizadas en otra prueba de unidad. Para facilitar esto, *QUnit* tiene la posibilidad de asociar a cada módulo las funciones *setup* y *teardown* y en ellas definir lo que queremos que se haga antes y después de cada test, respectivamente.

El módulo para probar el modelo lo almacenamos en el fichero *model_test.js*:

Nota: No se ha realizado una prueba exhaustiva sino que se trata de un simple ejemplo para comprender el funcionamiento de *QUnit*.

```js
(function($) {

    iris.cache(false);
    iris.enableLog("localhost");

    function clearBody() {
        var irisGeneratedCode = $("#start_iris").nextAll();
        if (irisGeneratedCode !== undefined) {
            irisGeneratedCode.remove();
        }
    }
    
    
    module( "Model Test", {
        setup: function() {
            model.init();
            iris.baseUri("../www");
        },
        teardown: function () {
            model.destroy();
            clearBody();
        }
    });
    
    test("Test addShoppingProduct() method", function() {
        model.shoppingList.addShoppingProduct({
            "idProduct":1 , 
            "nameProduct":"Carrots"
        });
        model.shoppingList.addShoppingProduct({
            "idProduct":15 , 
            "nameProduct":"Bacon"
        });
        window.ok(model.shoppingList.getShoppingProducts().length === 2, "Two Prodcuts added to the Shopping List");
    }
    );
        
    test("Test removeShoppingProduct() method", function() {
        model.shoppingList.addShoppingProduct({
            "idProduct":1 , 
            "nameProduct":"Carrots"
        });
        model.shoppingList.addShoppingProduct({
            "idProduct":15 , 
            "nameProduct":"Bacon"
        });
        
        model.shoppingList.removeShoppingProduct(1);
        model.shoppingList.removeShoppingProduct(20);
        
        window.ok(model.shoppingList.getShoppingProducts().length === 1, "One product removed from the Shopping List");
    }
    );
        
    test("Test getShoppingProduct() method", function() {
        model.shoppingList.addShoppingProduct({
            "idProduct":1 , 
            "nameProduct":"Carrots"
        });
        model.shoppingList.addShoppingProduct({
            "idProduct":15 , 
            "nameProduct":"Bacon"
        });
        
        
        window.ok(model.shoppingList.getShoppingProduct(15).nameProduct === "Bacon", "Bacon product retrieved from the Shoppiing List");
        window.ok(model.shoppingList.getShoppingProduct(20) === null, "The idProduct 20 is not in the Shopping List");
    }
    );
        
    test("Test changeStateShoppingProduct() method", function() {
        model.shoppingList.addShoppingProduct({
            "idProduct":1 , 
            "nameProduct":"Carrots"
        });
        model.shoppingList.addShoppingProduct({
            "idProduct":15 , 
            "nameProduct":"Bacon"
        });
        
        model.shoppingList.changeStateShoppingProduct(15);
        
        window.ok(model.shoppingList.getShoppingProduct(15).purchased === true, "Bacon has been purchased");
        
        model.shoppingList.changeStateShoppingProduct(15);
        
        window.ok(model.shoppingList.getShoppingProduct(15).purchased === false, "Bacon has not been purchased");
    }
    );
        
    

    asyncTest("Test getCategories() Method", function() {
        window.expect(1);
        model.service.app.getCategories(
            function(categories) {
                window.ok(categories.length === 4, "Categories retrieved");
                window.start();
            }
            );
    }
    );
        
    asyncTest("Test getProducts() Method", function() {
        window.expect(1);
        model.service.app.getProducts(1,
            function(products) {
                window.ok(products.length === 5, "Products retrieved");
                window.start();
            }
            );
    }
    );

    
}(jQuery));
```
Observe que para realizar un test síncrono hay que llamar a la función *test* de *QUnit* y, de forma similar, a la función *asyncTest* cuando el test sea asíncrono. Los dos últimos casos de prueba del ejemplo deben ser asíncronos ya que estamos recuperando datos de una *URL*. Los test asíncronos no comienzan a ejecutarse hasta que no se llame a la función *start*. La función *expect* indica el número de test que se deben pasan exitosamente para que *QUnit* considere el caso de prueba como positivo.

Las pruebas sobre la interfaz de usuario las incluimos en el fichero *view_test.js*.
Nota: Al igual que las anteriores, se trata de un simple ejemplo demostrativo del funcionamiento de *QUnit*.

```js
(function($) {
 
    iris.cache(false);
    iris.enableLog("localhost");

    function clearBody() {
        var irisGeneratedCode = $("#start_iris").nextAll();
        if (irisGeneratedCode !== undefined) {
            irisGeneratedCode.remove();
        }
    }
    
    
    module( "View Test", {
        setup: function() {            
            iris.init();
            iris.baseUri("../www");
            model.init();
            iris.welcome("/shopping/screen/welcome.js");
        },
        teardown: function () {
            model.destroy();
            window.location.hash ="";
        //clearBody();
        }
    });
    
    asyncTest("Test add products to the Shopping List", function() {
        var products = [];
        window.expect(1);
        
        model.service.app.getProducts(2,
            function(data) {
                products = data;
            }
            );
        
        iris.goto("#products?idCategory=2");
                
        window.setTimeout(function() {
            $("input[type='checkbox']", "[data-id='list_products']").trigger('click');
            window.ok(model.shoppingList.getShoppingProducts().length === products.length, "All products in idCaterory=2 are selected");
            window.start();
        }, 500);
    }
    );
        
        
        
    asyncTest("Test check product", function() {
        var products = [];
        window.expect(1);
        
        model.service.app.getProducts(2,
            function(data) {
                products = data;
            }
            );
        
        iris.goto("#products?idCategory=2");
                
        window.setTimeout(function() {
            $("input[type='checkbox']", "[data-id='list_products']").trigger('click');
            iris.goto("#shopping");
            
            window.setTimeout(function () {
                $("button[data-id='buy']").first().trigger("click");
                model.ShoppingList.prototype.removePurchased();
                window.ok(model.shoppingList.getShoppingProducts().length === products.length - 1, "Removed 1 purchased product");
                window.start();
            }, 500);
        }, 500);
    }
    );
        
}(jQuery));
```

Observe que después de llamar al método *goto* de *Iris*, hemos tenido que provocar una espera con la función *setTimeout* de *Javascript* ya que la vista se tiene que refrescar antes de que podamos simular eventos en ella.

##<a name="step_by_step_grunt"></a>Automatizando procesos con *Grunt*

*[Grunt](http://gruntjs.com/)* es una librería de *Javascript* que permite automatizar todo tipo de tareas como: validar el código, ejecutar pruebas de unidad, compactar y *minificar* la aplicación, arrancar un servidor [Node.js](http://nodejs.org/) y desplegar la aplicación en él, etc.

Para utilizar *Grunt* previamente hay que instalar [Node.js](http://nodejs.org/) y después instalar *Grunt* con el siguiente comando ejecutado desde el terminal:

```
npm install -g grunt
```


Los ficheros de configuración de *Grunt* de la aplicación son:

En *iris.json* podemos definir las variables que queramos que use *Grunt*:

```js
{
    "name": "ShoppingList",
    "title": "ShoppingList Example",
    "description": "This is a simple example of using Iris.",
    "version": "0.0.1-SNAPSHOT",
    "homepage": "http://localhost:8080",
    "author": {
        "name": "Iris",
        "url": "https://github.com/iris-js"
    },
    "repository": {
        "type": "git",
        "url": "git://github.com/iris-js/iris.git"
    },
    "bugs": {
        "url": "https://github.com/iris-js/iris/issues"
    },
    "licenses": [
        {
            "type": "New-BSD",
            "url": "https://github.com/iris-js/iris.git/blob/master/LICENSE-New-BSD"
        }
    ],
    "dependencies": {
        "jquery": "1.5.1"
    },
    "keywords": []
}
```

Y en *grunt.js* definimos y configuramos las tareas que queramos automatizar:

```js
/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:iris.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        lint: {
            files: ['grunt.js', ' www/js/iris-0.5.0-SNAPSHOT.js', 'www/js/init.js', 'www/js/shopping_list.js', 'www/shopping/**/*.js', 'test/**/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint qunit'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true,
                iris: true,
                $: true,
                model: true
            }
        },
        uglify: {},
        server: {
            port:8081,
            base: "./"
        }
    });

    // Default task.    
    grunt.registerTask('default', 'lint server watch');

    grunt.registerTask('test', 'lint qunit');
};
```

Si queremos validar el código, debemos abrir un terminal y, estando en el directorio al que pertenece *grunt.js*, ejecutar:

```
grunt lint
```

Para desplegar nuestra aplicación en un servidor de *Node.js* debemos asegurarnos que lo tenemos instalado en el sistema y ejecutar:

```
grunt server watch
```

Observe que hay una tarea por defecto que nos permite ejecutar las dos anteriores escribiendo simplemente:

```
grunt
```

Por último, para realizar las pruebas desde el terminal y no tener que abrir el navegador, debemos instalar primero [PhantomJS](http://phantomjs.org/) y luego ejecutar:

```
grunt test
```
