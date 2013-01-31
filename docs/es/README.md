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
 * <a href="#iris_path">Objeto *iris.path*</a><br>
 * <a href="#calling_welcome">Llamando al Screen de bienvenida</a><br>
 * <a href="#register">Registrando y mostrando un Screen</a><br>
 * <a href="#showing_screen_js">Mostrando un Screen desde Javascript</a><br>
 * <a href="#showing_some_screens">Mostrando varios screens</a><br>
 * <a href="#showing_some_inner_screens">Screens que registran otros screens</a><br>
 * <a href="#screens_bad_practices">Malas prácticas en el registro de Screens</a><br>
 * <a href="#default_screen">Creando un Screen por defecto</a><br>
 * <a href="#uis">Visualizando UIs</a><br>
 * <a href="#inner_UIs">UIs contenidos en otros UIs</a><br>
 * <a href="#some_UIs">Añadiendo varios UIs a un mismo contenedor</a><br>
 * <a href="#UIs_bad_practices">Malas prácticas con UIs</a><br>
 * <a href="#Screens_destroy">Destruyendo Screens</a><br>
 * <a href="#destroy_screens_bad_practices">Malas prácticas destruyendo Screens</a><br>
 * <a href="#UIs_destroy">Destruyendo UIs</a><br>
 * <a href="#canSleep">Evento *canSleep*</a><br>
 * <a href="#querystring_params">Enviando parámetros a un Screen</a><br>
 * <a href="#settings">Paso de parámetros con el método *setting*</a><br>
 * <a href="#data-settings">Paso de parámetros utilizando atributos *data-*</a><br>
 * <a href="#settings_ui">Paso de parámetros con el método *self.ui*</a><br>
 * <a href="#settings_priority">Prioridad en el paso de parámetros</a><br>
 * <a href="#tmpl_settings">Paso de parámetros a la vista con el método *tmpl*</a><br>
 * <a href="#data-model">Paso de parámetros a la vista con el atributo *data-model*</a><br>
 * <a href="#events">Trabajando con eventos</a><br>
 * <a href="#events_globals">Eventos globales</a><br>
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
 * <a href="#step_by_step_exercise">Ejercicio: Modificando la aplicación</a><br>

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

Iris estructura la aplicación en componentes que interaccionan entre sí.

Cada **componente** permite definir los elementos que conforman la interfaz de usuario. Un componente tiene dos elementos fundamentales: La vista o presentación (*template*) y el controlador de la vista (*controller*).

La **vista** consiste en un fragmento de código en HTML, típicamente un *DIV*, almacenado en un fichero, normalmente con extensión *.html*.

El **controlador** es un fragmento de código en Javascript almacenado en un fichero, típicamente con extensión *.js*. Mediante ste fichero controlamos e interaccionamos con la vista. Cuando un componente se activa (<a href="#awake">ver más adelante</a>), puede recibir parámetros que permiten modificar su comportamiento.

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

En resumen: Los UIs deben pertenecer a otros UIs o a un Screen y no tienen Hash-URL. Los UIs sólo estarán visibles cuando se haya navegado al Screen al que pertenecen. Los *Screens* se registran en un Screen (padre) y se navega a ellos a través del Hash-URL asociado.

##<a name="life_cycle"></a>Ciclo de vida de un componente

Iris establece cuatro transiciones en el ciclo de vida de un componente: *create*, *awake*, *sleep* y *destroy*. En el fichero Javascript asociado al componente, podemos definir métodos *callbacks* que serán llamados por Iris cuando el evento correspondiente se produzca.

Cuando se cree un componente, Iris ejecutará el código asociado a su método **create**. Normalmente aquí cargaremos el código HTML asociado al componente y registraremos los Screens (si el componente es de tipo Screen). Este método sólo se llamará una vez en la vida de un componente. La creación de un Screen se realizará navegando al Hash-URL correspondiente o invocando, desde *Javascript*, el método *navigate* de Iris. Si un Screen ya se hubiera creado, el método *navigate* o escribir su Hash-URL en el navegador hará que Iris *navegue* hacia él provocando el evento *awake* (ver más adelante). La creación de un UI se realizará invocando el método *ui* del componente en el que lo queramos crear. A diferencia de lo que ocurre con los Screens, llamar al método *ui* **siempre** llamará al método "create" del componente ya que siempre se creará un nuevo UI.

El evento complementario será **destroy**. Esté método, al igual que *create*, se ejecutará una única vez en la vida de un componente. La destrucción de un componente se efectuará llamando al método *destoryUI*, *destroyUIs* o *destroyScreen* dependiendo del componente de que se trate. En el caso de componentes de tipo UI, también se llamará cuando un UI sea sustituido por otro. La destrucción de un componente supondrá la destrucción de todos los componentes que contenga.

<a name="awake"></a>El evento **awake** se producirá después del evento *create* y cada vez que cambie el Hash-URL asociado al Screen que se va a visualizar. El método *awake* se llamará también en los UIs que compongan el Screen. Aquí es donde habitualmente asociaremos eventos a nuestra aplicación, reproduciremos vídeo o audio, etc.

Por último, el evento **sleep** es el complementario de *awake*, y se efectuará primero sobre los UIs contenidos en el Screen y luego en el propio Screen cada vez que se produzca un cambio en el Hash-URL que suponga su ocultamiento. No debemos olvidar desactivar los eventos o detener otras tareas, como la reproducción de componentes multimedia, que hayamos iniciado en el evento *awake*. Antes de que se llame al método *destroy* de un componente, se efectuará la llamada a *sleep*.

Podemos ver esto gráficamente:

![Ciclo de vida](https://raw.github.com/surtich/iris/iris-grunt/docs/images/iris_life_cycle.png)

Los Screens tienen método callback adicional llamado **canSleep**. Este método será invocado por Iris antes de llamar al método *Sleep*. Si el método *canSleep* devuelve *false*, Iris no navegará al Screen deseado e interrumpirá la navegación evitando que se llame al evento *sleep*. Este evento es útil si, por ejemplo, no hemos completado un formulario y queremos advertir al usuario que debe hacerlo antes de navegar a otro Screen.

##<a name="welcome"></a>Screen de bienvenida

Toda aplicación Iris debe definir un componente inicial que se cargará al principio y antes de efectuar cualquier operación con Iris. Este componente será un <a href="#screen">Screen</a> especial ya que tiene algunas diferencias con lo explicado anteriormente:
* El Screen de bienvenida tiene el símbolo *#* como Hash-URL asociado y se carga con el método **welcome** de Iris.
* En una aplicación Iris, normalmente, no habrá necesidad de refrescar o de modificar la *URL* sobre la que se carga el Screen de bienvenida.
* Por lo tanto, tampoco será necesario llamar al método *destroy* de este Screen. Es decir, que el ciclo de vida de este Screen se simplifica ya que únicamente se hará una primera llamada al método *create* y nunca se llamará la  los métodos *sleep* o *destroy*. Puede haber, sin embargo, varias llamadas a *awake* cuando se pasan parámetros como se explica más adelante. 
* Lo habitual es que el cometido del Screen de bienvenida sea registrar otros Screens y *llamar* al Hash-URL del Screen inicial de nuestra aplicación.
* Todos los demás Screens son hijos de este Screen y, por lo tanto, su Hash-URL tendrá la forma "#/...".

#<a name="starting"></a>Empezando con Iris

En esta sección vamos proponer ejemplos de código para aclarar y profundizar lo explicado anteriormente y para introducir nuevas capacidades de Iris.

Aquí no se pretende crear una aplicación funcional, sino que se comprenda como se trabaja con Iris. Los ejemplos, por lo tanto, no realizarán ningún trabajo útil. Si quiere ver como construir una aplicación desde cero, puede consultar la <a href="#paso-a-paso">sección correspondiente</a>.

Para hacer más sencilla la explicación, todo el código de esta sección se situará un el directorio raíz de la aplicación. No es conveniente hacer esto en una aplicación real. En la sección *<a href="#paso-a-paso">Construyendo paso a paso una aplicación desde cero</a>* se propone una estructura de directorios más adecuada para trabajar con Iris.

##<a name="installing"></a>Instalando Iris
El primer paso será decidir si queremos trabajar con la versión de [desarrollo](https://raw.github.com/iris-js/iris/master/dist/iris.js) o de [producción](https://raw.github.com/iris-js/iris/master/dist/iris.min.js)<!-- TODO revisar enlaces y asociarlas a un fichero en HTML. -->

```html
<!-- In index.html -->
<script src="jquery-min.js"></script> <!--Iris just depends on JQuery-->
<script src="iris.js"></script> <!-- TODO Change URL -->
```
Nota: Las aplicaciones de Iris deben estar situadas en un servidor Web.

##<a name="iris_path"></a>Objeto *iris.path*

Iris requiere que se defina un objeto llamado *iris.path*. Debemos asociar (*mapear*) sus atributos a las URLs de acceso a los componentes que vayamos a utilizar. Obligatoriamente, tenemos que definir los controladores (ficheros de Javascript) de todos los componentes (*sreens* y *uis*) y opcionalmente podemos también incluir también sus vistas. También es obligatorio definir los archivos de recursos o servicios de red.

Puede estruturar el objeto *iris.path* como mejor le convenga: separando *screens* de *uis*, por módulos, con un sólo nivel o con varios, lo único realmente importante es que, todos los controladores tengan un atributo en el objeto *iris.path* que sea de tipo *string* y que contenga la ruta de acceso al fichero *javascript* del componente.

En una aplicación real, el objeto *iris.path* puede llegar a ser muy grande y será conveniente que lo sitúe en un fichero independiente.

Antes de instanciar el Screen de bienvenida, Iris procesará el objeto *iris.path* y cargará en memoria todos los ficheros asociados en él. Si los ficheros ya se hubieran precargado, porque se está utilizando una herramienta de *minificación*, Iris no volvería a cargar los ficheros. Puede consultar el apartado de <a href="#minifcation">minificación</a> para una explicación más detallada.


##<a name="calling_welcome"></a>Llamando al Screen de bienvenida
Desde Javascript, llamamos al método **welcome** de Iris para cargar el fichero de comportamiento del Screen de bienvenida.

```js
//In any Javascrit file or in a "<script>" section of an HTML file ... 
$(document).ready(
    function () {
        iris.path = {
            welcome: {js: "welcome.js", html: "welcome.html"}
        }; //Mandatory: It maps application URLs to iris.path object
        iris.baseUri("./"); //Optional: It sets de base directory of the application
        iris.welcome(iris.path.welcome.js); //It loads the behavior file of the welcome Screen
    }
);
```
Observe que hemos creado un objeto llamado *iris.path* y, en este caso, hemos decidido cargar tango controlador como vista en una estructura de dos niveles. Al método *iris.welcome* se le pasa el atributo que contiene la ruta de acceso al controlador del Screen Welcome (*iris.path.welcome.js*).

El fichero *welcome.js* antes referido tendrá la siguiente estructura:

```js
//In welcome.js
iris.screen(
	
    function (self) {
 
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
        };

        self.awake = function () {
            console.log("Welcome Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Welcome Screen Asleep"); //Never called
        };
  
        self.destroy = function () {
            console.log("Welcome Screen Destroyed");//Never called
        };
  
    },
    iris.path.welcome.js  
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

Observe, además, que el método *iris.screen* recibe la función antes mencionada y, como segundo parámetro, el atributo del objeto *iris.path* que contiene la *URL* del fichero *Javascript* asociado. 

> El método *self.tmpl()* debe ser llamado una única vez y **OBLIGATORIAMENTE** en el método *self.create()* antes de utilizar ningún otro método del componente (*self.get()*, *self.destroyUI()*, etc);

> Los ficheros HTML asociados a componentes de Iris deben tener un único nodo raíz (típicamente un DIV). Si hubiera comentarios en HTML deben estar dentro de este nodo.

Por ejemplo:

```html
<!-- Invalid coment with Iris -->
<div>
	<!-- Valid coment with Iris -->
</div>
```

Nota: Para que Iris funciona correctamente, debe situar los archivos anteriores en un servidor Web (Apache, Node.js, GAE, etc).

Tras ejecutarse los métodos *create* y *awake* se generará y visualizará el DOM siguiente:

```html
<html>
 <head>...</head>
 <body>
  <div style="">
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
  </div>
 </body>
</html>
```

##<a name="register"></a>Registrando y mostrando un Screen

En esta sección vamos a registrar un *Screen* y luego navegar a él.

Primero creamos el *Screen Home* con una estructura muy parecida a la anterior.

El objeto *iris.path* será:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"}
};
```

```js
//In home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
        };
        self.awake = function () {   
            console.log("Home Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Home Screen Asleep");
        };
  
        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    },
    iris.path.home.js
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
    self.tmpl(iris.path.welcome.html);
    self.screens("screens", [
        ["home", iris.path.home.js]
    ]
)};
```

Y dejamos el fichero asociado *welcome.html* de la siguiente manera:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#/home">Click to go to Home Screen</a>
    <div data-id="screens">
        Here is where Iris will load the Home Screen
    </div>
</div>
```

> El resgistro de *screens* no produce ningún evento del ciclo de vida. Los eventos se producen cuando se navega al Screen.

Observe como el método **screens** permite definir los Hash-URL de los objetos de tipo Screen. Este método recibe dos parámetros: El primer parámetro define el elemento de HTML dentro del cual será cargado el Screen cuando su Hash-URL sea invocado; el segundo parámetro es un *array de arrays*. Los arrays internos permiten registrar cada Screen poniendo como primer valor el *Hash* sin el símbolo *#* y como segundo el fichero de comportamiento asociado.

> En el registro de Screens, el hash-URL se pone de forma **relativa** y sin el símbolo *#*.

Por ejemplo, en nuestro caso registramos el Screen *Home* que pertecene al Screen *Welcome*, con el hash-URL *home*.

> Un Screen puede llamar al método *screens* una única vez.

En nuestro ejemplo, para *navegar* al Screen debemos pulsar sobre el enlace que hemos añadido en *welcome.html* y que contine el Hash-URL del Screen al que queremos ir.

> Para navegar a un Screen ponemos la ruta **absoluta** de acceso al Screen.

> El Screen *Welcome* siempre tiene el símbolo *#* como hash-URL asociado.

Como el Screen *Home* pertenece al Screen *Welcome*, su ruta de acceso será: */#/home*. Recuerde que el símolo *#* identifica al Screen Welcome.

Cuando pulsemos sobre el enlace, Iris buscará un elemento del DOM cuyo atributo *data-id* corresponda con el contenedor pasado al método *screens* y ejecutará el fichero de *javascript* asociado al Hash-URL; concretamente, llamará al método *create*, con lo cual, el contenido HTML del Screen se añadirá al contenedor.

Tras llamar al método *create*, Iris llamará al método *awake* del Screen.

Al pulsar sobre el enlace, el DOM de la página generada por Iris será el siguiente:

```html
<html>
 <head>..</head>
 <body>
  <div style="">
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <a href="#/home">Click to go to Home Screen</a>
   <div data-id="screens">
    Here is where Iris will load the Home Screen
   <div style="">
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
    <button data-id="navigate_home">Click to go to Home Screen</button>
    <div data-id="screens">
        Here is where Iris will load the Home Screen
    </div>
</div>
```

Y en el fichero *welcome.js*:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl(iris.path.welcome.html);
    self.screens("screens", [
        ["home", iris.path.home.js]
    ]);
    //The get method returns de JQuery element associated with the data-id parameter
    self.get("navigate_home").click( function() {
        iris.navigate("#/home"); //It browses to the Hash-URL
    });
};
```
Observe como el método **navigate** de Iris permite navegar al Hash-URL especificado y que, para capturar el evento *click* del botón, hemos utiliado el método **get** del componente de Iris que recibe el valor de su atributo *data-id*. Iris buscará un elemento en el DOM del componente con ese *data-id* y lo devolverá como un objeto de JQuery.

Si al método *get* no se le pasara ningún argumento, Iris devolverá el objeto JQuery que corresponda con el elemento raíz del componente.

##<a name="showing_some_screens"></a>Mostrando varios screens

En este apartado vamos a crear un tercer Screen llamado Help.

Primeramente, redefinimos *iris.path*:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"},
    help: {js: "help.js", html: "help.html"}
};
```

Los ficheros asociados serán los habituales:

*help.js*:

```js
//In help.js
iris.screen(
    function (self) {
        self.create = function () {   
            self.tmpl(iris.path.help.html);
            console.log("Help Screen Created");
        };
        self.awake = function () {   
            console.log("Help Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Help Screen Asleep");
        };
  
        self.destroy = function () {
            console.log("Help Screen Destroyed");
        };
    },
    iris.path.help.js
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
    self.tmpl(iris.path.welcome.html);
    self.screens("screens", [
        ["home", iris.path.home.js],
        ["help", iris.path.help.js]
    ]);
};
```

Y el fichero *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#/home">Click to go to Home Screen</a>
    </br>
    <a href="#/help">Click to gets some help</a>
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div>
</div>
```

Si pulsamos primero sobre el enlace a *#/home* y después sobre *#/help*, el DOM generado por Iris será:

```html
<html>
 <head>..</head>
 <body>
  <div style="">
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <a href="#/home">Click to go to Home Screen</a>
   <br>
   <a href="#/help">Click to gets some help</a>
   <div data-id="screens">
    Here is where Iris will load all the Screens
    <div style="display: none;">
     <h1>Home Screen</h1>
     <p>This is the home screen.</p>
    </div>
    <div style="">
     <h1>Help Screen</h1>
     <p>This is the help screen.</p>
    </div>
   </div>
  </div>
 </body>
</html>
```

Podemos comprobar, consistentemente con lo explicado anteriormente, que el código HTML de los Screens *Home* y *Help* ha sido añadido al contenedor pero sólo estará visible el correspondiente al último enlace pulsado, *Help* en este caso.

La secuencia de eventos producida será:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
Home Screen Awakened
Help Screen Created
Home Screen Asleep
Help Screen Awakened 
</pre>

Si volvemos a pulsar sobre el enlace a *#/home*, se producirán los eventos adicionales:

<pre>
Help Screen Asleep
Home Screen Awakened 
</pre>

##<a name="showing_some_inner_screens"></a>Screens que registran otros screens</a>

Un Screen puede registrar otros *screens*. Cuando navegamos al screen *interno*, el screen *padre* no se oculta a diferencia de lo que ocurre cuando navegamos a un Screen *hermano*. Es decir, que Iris visualiza toda la jerarquía de los *screens* por los que estemos navegando. Cuando cambiamos de *rama*, Iris oculta toda la *rama* anterior.

Podemos comprender esto mejor con un ejemplo. Para ello creamos el Screen *Inner Home*.

No debemos olvidar modificar *iris.path*:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"},
    help: {js: "help.js", html: "help.html"},
    inner_home: {js: "inner_home.js", html: "inner_home.html"}
};
```


En *inner_home.js*:

```js
//In inner_home.js
iris.screen(
    function (self) {
        self.create = function () {   
            self.tmpl(iris.path.inner_home.html);
            console.log("Inner_home Screen Created");
        };
        self.awake = function () {   
            console.log("Inner_home Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Inner_home Screen Asleep");
        };
  
        self.destroy = function () {
            console.log("Inner_home Screen Destroyed");
        };
    },
    iris.path.inner_home.js
);
```

En *inner_home.html*:

```html
<div>
    <h1>Inner Home Screen</h1>
    <p>This is the Inner Home screen.</p>
</div>
```

El registro lo hacemos en el Screen Home.

En *home.js*:

```js
//In home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
            self.screens("inner_home_container", [
                ["inner_home", iris.path.inner_home.js]
            ]);
        };
        self.awake = function () {   
            console.log("Home Screen Awakened");
        };

        self.sleep = function () {
            console.log("Home Screen Asleep");
        };

        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    },
    iris.path.home.js
);
```

En *home.html*:

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p>
    <a href="#/home/inner_home">Click to go to Inner Home Screen</a>
    <div data-id="inner_home_container"></div>
</div>
```

El fichero *welcome.js* queda inalterado:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.screens("screens", [
                ["home", iris.path.home.js],
                ["help", iris.path.help.js]
                ]
            );
        };
        self.awake = function () {
            console.log("Welcome Screen Awaked");
        };
    },
    iris.path.welcome.js
);
```

Tampoco es necesario modificar *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#/home">Click to go to Home Screen</a>
    </br>
    <a href="#/help">Click to gets some help</a>
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div>
</div>
```

Si navegamos a "#/home" y luego a "#inner_home", la secuencia de eventos que se produce es la que podríamos esperar:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
Home Screen Awakened
Inner_home Screen Created
Inner_home Screen Awakened 
</pre>

Si ahora vamos a "#/help", se generarán los eventos adicionales:

<pre>
Inner_home Screen Asleep
Home Screen Asleep
Help Screen Created
Help Screen Awakened 
</pre>

##<a name="screens_bad_practices"></a>Malas prácticas en el registro de Screens

Vamos a poner algunos ejemplos de **malas prácticas** que Iris impide realizar mostrando un mensaje en la consola de error.

Modificamos el Screen Welcome para que los Screens Home y Help se carguen en contenedores diferentes.

En *welcome.js* tendremos:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl(iris.path.welcome.html);
    self.screens("home_screen", [["home", iris.path.home.js]]);
    self.screens("help_screen", [["help", iris.path.help.js]]);
};
```

Y en *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#/home">Click to go to Home Screen</a>
    </br>
    <a href="#/help">Click to gets some help</a>
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
self.screens("screens", [
    ["home", iris.path.home.js]
    ,
    ["home", iris.path.help.js]
]);
```

> El hash-URL asociado a un Screen debe ser único en toda la aplicación.

Por último, tampoco es posible hacer lo siguiente:

```js
self.screens("screens", [
    ["home", iris.path.home.js]
    ,
    ["help", iris.path.home.js]
]);
```

> No podemos asociar el mismo Screen a varios Hash-URLs.

##<a name="default_screen"></a>Creando un Screen por defecto

Aunque no es obligatorio, las aplicaciones Iris tendrán normalmente un Screen que se cargará por defecto cuando no se especifique ningún Hash-URL.

Para hacer esto simplemente incluiremos el siguiente código en el método *awake* del Screen de bienvenida:

```js
self.awake = function () {
    console.log("Welcome Screen Awakened");
    if ( !document.location.hash ) {                
        iris.navigate("#/home"); //Default Screen

    }
};
```

##<a name="uis"></a>Visualizando UIs

En este apartado vamos a aprender a trabajar con UIs. Los UIs son componentes reutilizables para definir la interfaz de usuario. Un UI pertenece a un Screen o a otro UI.

Los UIs tienen muchas analogías con los Screens por lo que si no lo ha hecho todavía, revise la sección anterior.

Vamos a crear un UI en el Screen Home del apartado anterior.

El código del UI va a ser:

En *iris.path*:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"},
    help: {js: "help.js", html: "help.html"},
    my_ui: {js: "my_ui.js", html: "my_ui.html"}
};
```

En my_ui.js:

```js
//In my_ui.js
iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmpl(iris.path.my_ui.html);
        };
        self.awake = function () {   
            console.log("my_ui UI Awakened");
        };
        self.sleep = function () {
            console.log("my_ui UI Asleep");
        };
  
        self.destroy = function () {
            console.log("my_ui UI Destroyed");
        };
    },
    iris.path.my_ui.js
);
```
La única diferencia que encontramos aquí con respecto a lo explicado en los Screens es que el método se llama **iris.ui** en vez de *iris.screen*.

Tampoco tiene nada especial el fichero *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
</div>
```

Ahora vamos a ver las modificaciones en el Screen Home.

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
    self.tmpl(iris.path.home.html);
    self.get("my_ui_loader").click(
        function() {
            self.ui("ui_container", iris.path.my_ui.js);
        }
    );   
};
```

Los UIs son componentes no *navegables* y, por lo tanto, su activación tiene que hacerse desde Javascript de forma análoga a como se puede hacer también con los Screens. La principal diferencia con ellos es que no se registran y se cargan simplemente llamando al método *ui* del componente (en este caso del Screen Home).

Este método puede recibir cuatro parámetros: el *data-id* del contenedor donde se va a cargar; el fichero Javascript asociado al UI; opcionalmente un objeto de Javascript que se pasará al UI como se explica más adelante; y por último, también de forma opcional, el *template mode* (ver explicación posterior).

Es interesante estudiar el DOM que genera Iris tras pulsar el botón y cargar el UI:

```html
<html>
 <head>...</head>
 <body>
  <div>
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <a href="#/home">Click to go to Home Screen</a>
   <br>
   <a href="#/help">Click to gets some help</a>
   <div data-id="screens">
    Here is where Iris will load all the Screens
    <div style="">
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

> De forma predeterminada, cuando se carga un **UI**, se reemplaza el contenedor por la vista del UI. Por el contrario, cuando se carga un **Screen**, su vista se añade al contenedor.

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

Hasta aquí nada especial; pero si luego pulsamos sobre el enlace a *#/help*:

<pre>
my_ui UI Asleep
Home Screen Asleep
Help Screen Created
Help Screen Awakened 
</pre>

Obsérvese que se llama al evento *sleep* tanto del UI *my_ui* como del Screen *Home*.

Si ahora volvemos a pulsar sobre *#/home*:

<pre>
Help Screen Asleep
Home Screen Awakened
my_ui UI Awakened 
</pre>

Se llama al evento *awake* tanto del UI *my_ui* como del Screen *Home* ya que el UI ya estaba cargado.

##<a name="inner_UIs"></a>UIs contenidos en otros UIs

Un UI puede contener otros UIs. Para probar esto creemos otro UI llamado *inner_ui* con los siguientes ficheros.

Primero modificamos *iris.path*:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    home: {js: "home.js", html: "home.html"},
    help: {js: "help.js", html: "help.html"},
    my_ui: {js: "my_ui.js", html: "my_ui.html"},
    inner_ui: {js: "inner_ui.js", html: "inner_ui.html"}
};
```

En *inner_ui.js*:

```js
//In inner_ui.js
iris.ui(
    function (self) {
        self.create = function () {
            console.log("inner_ui UI Created");
            self.tmpl(iris.path.inner_ui.html);
        };
        self.awake = function () {   
            console.log("inner_ui UI Awakened");
        };
        self.sleep = function () {
            console.log("inner_ui UI Asleep");
        };
  
        self.destroy = function () {
            console.log("inner_ui UI Destroyed");
        };
    },
    iris.path.inner_ui.js
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
    self.tmpl(iris.path.my_ui.html);
    self.ui("inner_ui_container", iris.path.inner_ui.js);
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

Aquí hay poco que comentar. Tan sólo que los UIs, al igual que los Screens, tienen un método *ui* que permite cargar otros UIs. Obsérvese también que la carga del UI interno se ha realizado directamente, sin utilizar un botón como hicimos en el ejemplo anterior.

##<a name="some_UIs"></a>Añadiendo varios UIs a un mismo contenedor

Anteriormente hemos visto que cuando añadimos un UI, su contenedor es reemplazado por la vista del UI. Este comportamiento se puede cambiar.

Para mostrar como hacer esto, modifiquemos el método *create* del UI *my_ui*:

```js
self.create = function () {   
    console.log("my_ui UI Created");
    self.tmplMode(self.APPEND);
    self.tmpl(iris.path.my_ui.html);
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
//In welcome.js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl(iris.path.welcome.html);
    self.screens("screens", [
        ["home", iris.path.home.js],
        ["help", iris.path.help.js]
    ]);
    self.ui("screens", iris.path.my_ui.js);
};
```

> Podemos reutilizar un contenedor para almacenar UIs de distinto tipo pero hay que tener mucho cuidado con la definición que se haga en el método *tmplMode* en cada uno de los UIs.

Normalmente cada tipo de UI tendrá su propio contenedor.

> Debemos evitar utilizar el atributo *id* de las etiquetas de *HTML* y en su lugar utilizar *data-id*, debido a que, al ser los UIs componentes reutilizables, normalmente habrá varios de ellos en la misma página y el atributo *id* en *HTML* debe ser único.

##<a name="Screens_destroy"></a>Destruyendo Screens

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
    <a href="#/help">Gets some help</a>
    <div data-id="screens"></div>
</div>
```
Y en el método *create* *welcome.js*:
 
```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl(iris.path.welcome.html); 
    self.screens("screens", [
        ["home", iris.path.home.js],
        ["help", iris.path.help.js]
    ]);

    self.get("create_home_screen").click(
        function() {   
            iris.navigate("#/home");
        }
    );

    self.get("destroy_home_screen").click(
        function() {   
            iris.destroyScreen("#/home");
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
   <a href="#/help">Gets some help</a>
   <div data-id="container"></div>
    <div style="">
     <h1>Help Screen</h1>
     <p>This is the help screen.</p>
    </div>
  </div>
 </body>
</html>
```

Observe que el contenido del Screen Home ha sido completamente eliminado. La destrucción de *screens* también destruye su registro y, por lo tanto, no se puede volver a navegar a ellos a no ser que se vuelvan a registrar.

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
    self.tmpl(iris.path.home.html);
    self.ui("ui_container", iris.path.my_ui.js); 
};
```

Si hacemos lo anterior al destruir el Screen Home, se generará un DOM idéntico al anterior ya que el UI se destruirá junto con el Screen. La secuencia de eventos será la siguiente:

<pre>
Welcome Screen Created
Welcome Screen Awakened
Home Screen Created
my_ui UI Created
my_ui UI Awakened
Home Screen Awakened
Help Screen Created
my_ui UI Asleep
Home Screen Asleep
Help Screen Awakened
my_ui UI Destroyed
Home Screen Destroyed
</pre>

##<a name="destroy_screens_bad_practices"></a>Malas prácticas destruyendo Screens

> No se puede destruir el Screen actual. Es decir, no se puede destruir el Screen asociado al hash-URL que esté mostrando el navegador.

Si, por ejemplo, estamos en el hash-URL *#/home*, no podemos destruir el Screen Home. Puede probarlo con el ejemplo anterior, trate de destruir el Screen Home sin cambiar a *#/help*.

> Tampoco se puede destruir un Screen si el hash-URL actual pertenece a la jerarquía del Screen que se quiere destruir.

Veámoslo con un ejemplo; para ello creemos el Screen *inner_home* con los siguientes ficheros:

En *inner_home.js*:

```js
//In inner_home.js
iris.screen(
    function (self) {
        self.create = function () {   
            self.tmpl(iris.path.inner_home.html);
            console.log("Inner_home Screen Created");
        };
        self.awake = function () {   
            console.log("Inner_home Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Inner_home Screen Asleep");
        };
  
        self.destroy = function () {
            console.log("Inner_home Screen Destroyed");
        };
    },
    iris.path.inner_home.js
);
```

En *inner_home.html*:

```html
<div>
    <h1>Inner Home Screen</h1>
    <p>This is the Inner Home screen.</p>
</div>
```

En *home.html*:

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p>
    <div data-id='container'/>
</div>
```

Y en *home.js*:

```js
//In home.js
iris.screen(
    function (self) {
        //In home.js
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
            self.screens("container", [
                ["inner_home", iris.path.inner_home.js]
            ]);
        };   
        self.awake = function () {   
            console.log("Home Screen Awakened");
            iris.navigate("#/home/inner_home");
        };

        self.sleep = function () {
            console.log("Home Screen Asleep");
        };

        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    },
    iris.path.home.js
);
```
Observe que estando en el hash-URL *#/home/inner_home*, si pulsamos el botón de destruir el Screen Home, Iris da un error indicando que no podemos destruir el padre del Screen actual.

Si navegamos a *#/help*, podremos destruir el Screen Home. Como decíamos antes, la destrucción del Screen Home no eliminará su registro, sin embargo sí se eliminará el registro del Screen Inner_home.

##<a name="UIs_destroy"></a>Destruyendo UIs

Recuerde que un UI se destruye cuando se destruye su componente padre; además:

Para destruir UIs, Iris dispone de dos métodos: *self.destroyUI* y *self.destroyUIs*. Esto métodos son locales al componente que los vaya a destruir a diferencia de *iris.destroyScreen* que es global.

Para probar *destroyUI* tendremos el siguiente código:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="create_my_ui">Click create a my_ui UI</button>
    </br> 
    <button data-id="destroy_my_ui">Click to destroy my_ui</button>
    <div data-id="container"></div>
</div>
```

En el método *create* de *welcome.js*:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl(iris.path.welcome.html); 

    var my_ui = null;

    self.get("create_my_ui").click(

        function() {   
            my_ui = self.ui("container", iris.path.my_ui.js);
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

> El método *self.ui()* devuelve una referencia al UI creado.

> El método *self.uis()* devuelve la colección de UIs que tiene el componente.

En *my_ui.js*:

```js
self.create = function () {   
    console.log("my_ui UI Created");
    //self.tmplMode(self.APPEND);
    self.tmpl(iris.path.my_ui.html);
};
```

En el DOM generado, se ha eliminado todo el contenido del UI. Tampoco aparece ninguna referencia a su contenedor (*data-id*='*container*') porque estamos en modo *REPLACE*.

```html
<html>
 <head>...</head>
 <body>
  <div style="">
   <h1>Welcome Screen</h1>
   <p>This is the initial screen.</p>
   <button data-id="create_my_ui">Click create a my_ui UI</button>
   <br>
   <button data-id="destroy_my_ui">Click to destroy my_ui UI</button>
  </div>
 </body>
</html>
```

Si *descomentamos* la línea que asigna *APPEND* al *tmplMode* en el fichero *my_ui.js*, y pulsamos varias veces sobre botón que crea el UI seguida de una pulsación sobre el que lo destruye, sólo se eliminará el último UI creado ya que la referencia la habremos ido reemplazando a medida que creamos nuevos UIs.

Podríamos eliminar todos los UIs si los hubiéramos ido almacenando en un *array*. Aunque también lo podemos hacer si utilizamos el método *destroyUIs* como se explica en el siguiente ejemplo:

Para eliminar todos los UIs del contenedor, estas son las modificaciones que habría que hacer:

El método *create* de *welcome.js*:

```js
self.create = function () {
    console.log("Welcome Screen Created");
    self.tmpl(iris.path.welcome.html); 

    self.get("create_my_ui").click(
        function() {   
            self.ui("container", iris.path.my_ui.js);
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
    self.tmpl(iris.path.my_ui.html);
};
```

Tras pulsar tres veces sobre el botón que crea el UI y una vez sobre el que lo destruye, el DOM quedaría:

```html
<html>
 <head>...</head>
 <body>
  <div style="">
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
my_ui UI Asleep
my_ui UI Destroyed
my_ui UI Asleep
my_ui UI Destroyed
my_ui UI Asleep
my_ui UI Destroyed
</pre>

##<a name="canSleep"></a>Evento *canSleep*

Antes de llamar al evento *sleep* de un screen, Iris comprueba si existe un método con el nombre *canSleep*. Si este método devuelve *false*, Iris cancelará la propagación de eventos e impedirá cambiar el hash-URL.

Esto puede ser útil si, por ejemplo, el usuario tiene que completar un formulario antes de navegar a otro Screen.

Veamos un ejemplo:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    </br>
        <a href="#/home">Goto Home</a>
    </br>
    <a href="#/help">Gets some help</a>
    <div data-id="screens"></div>

</div>
```

En *welcome.js*:

```js
//In welcome.js
iris.screen(
	
    function (self) {
 
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            self.screens("screens", [
                ["home", iris.path.home.js],
                ["help", iris.path.help.js]
            ]);
        };
        self.awake = function () {
            console.log("Welcome Screen Awakened");
            iris.navigate("#/home");
        };
		
        self.sleep = function () {
            console.log("Welcome Screen Asleep"); //Never called
        };
  
        self.destroy = function () {
            console.log("Welcome Screen Destroyed");//Never called
        };
  
    },
    iris.path.welcome.js
);
```

En *help.html*:

```html
<div>
    <h1>Help Screen</h1>
    <p>This is the help screen.</p>
</div>
```

```js
//In help.js
iris.screen(
    function (self) {
        self.create = function () {   
            self.tmpl(iris.path.help.html);
            console.log("Help Screen Created");
        };
        self.awake = function () {   
            console.log("Help Screen Awakened");
        };
		
        self.sleep = function () {
            console.log("Help Screen Asleep");
        };
  
        self.destroy = function () {
            console.log("Help Screen Destroyed");
        };
    },
    iris.path.help.js
);
```

En *home.html*:

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p>
</div>
```

Y en *home.js*:

```js
//In home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
        };   
        self.awake = function () {   
            console.log("Home Screen Awakened");
        };
        
        self.canSleep = function () {
            console.log("Can Home Sceen sleep?");
            return false;
        };

        self.sleep = function () {
            console.log("Home Screen Asleep");
        };

        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    },
    iris.path.home.js
);
```

Observe que el método *canSleep* devuelve *false*. Esto impedirá ir a *#/help* cuando pulsemos sobre el enlace.

##<a name="querystring_params"></a>Enviando parámetros a un Screen

En esta y en las siguientes secciones vamos a ver diversas formas de pasar parámetros entre componentes. 

Comencemos por el paso de parámetros a Screens:

Una forma de pasar un parámetro a un Screen es en el *[Query String](http://en.wikipedia.org/wiki/Query_string)* de la URL.

Observe como se pasa el parámetro al Screen Home en el archivo *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#/home?year=2013">Click to go to Home Screen</a>
    </br>
    <a href="#/help">Click to gets some help</a>
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
            self.tmpl(iris.path.welcome.html); 
            self.screens("screens", [
                ["home", iris.path.home.js],
                ["help", iris.path.help.js]
            ]);
        };
    },
    iris.path.welcome.js
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
            self.tmpl(iris.path.home.html);
        };
  
        self.awake = function (params) {  
            console.log("Home Screen Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + params.year);
        };
		
        self.sleep = function () {
            console.log("Home Screen Asleep");
        };
  
        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    },
    iris.path.home.js
);
```

Observe que el parámetro lo podemos recuperar con el objeto *params* que recibimos en el método *awake*.

También podemos pasar un parámetro en el método *iris.navigate*. Para probar esto hagamos los siguientes cambios:

En *welcome.html* cambiamos el enlace por un botón:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="navigate_home">Goto Home</button>
    </br>
    <a href="#/help">Click to gets some help</a>
    </br> 
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div> 	
</div>
```

En *welcome.js* enviamos el parámetro:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            self.screens("screens", [
                ["home", iris.path.home.js],
                ["help", iris.path.help.js]
            ]);
            self.get("navigate_home").click(
                function() {
                    iris.navigate("#/home?year=" + (new Date().getFullYear())); //Send the current year instead a fixed value
                }
            );
        };
        
    },
    iris.path.welcome.js
);
```

Se pueden pasar parámetros simultáneamente a varios Screens (padres e hijos). En el siguiente ejemplo pasamos un parámetro al Screen Welcome y otro al Screen Home.

El Screen Home queda inalterado:

En *home.js*:

```js
//In home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
        };
  
        self.awake = function (params) {  
            console.log("Home Screen Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + params.year);
        };
		
        self.sleep = function () {
            console.log("Home Screen Asleep");
        };
  
        self.destroy = function () {
            console.log("Home Screen Destroyed");
        };
    },
    iris.path.home.js
);
```

En *home.html*:

```html
<div>
    <h1>Home Screen</h1>
    <p>This is the home screen.</p>
    <div data-id="year_parameter"></div>
</div>
```

En *welcome.js*:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            self.screens("screens", [
                ["home", iris.path.home.js]
            ]);
            self.awake= function (params) {
                console.log("Welcome Screen Awaked");
                if (params.year) {
                    self.get("year_parameter").text("The value of the year parameter is: " + params.year);
                } else {
                    self.get("year_parameter").text("No year");
                }
            };
        };
    },
    iris.path.welcome.js
);
```

Y en *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#?year=2013/home?year=2013">Click to go to Home Screen (year = 2013)</a>
    </br>
    <a href="#?year=2014/home?year=2014">Click to go to Home Screen (year = 2014)</a>
    </br> 
    <div data-id="year_parameter"></div>
    </br>
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div> 	
</div>
```

Observe que el parámetro *year* se pasa tanto al Screen Welcome como al Screen Home.

> Para pasar un parámetro a un Screen hay que ponerlo después del signo *?* que, a su vez, irá detrás de su hash-URL y antes que sus hijos.

> Si se quiere pasar un mismo parámetro a varios Screens hay que repetirlo en cada uno de ellos.

> Si se quieren pasar varios parámetros a un mismo Screen, se separarán con el símbolo *&*.

Es importante comprender lo que sucede con los eventos. Al cargar la página con el ejemplo anterior:

<pre>
Welcome Screen Created
Welcome Screen Awaked 
</pre>

Hasta aquí nada de particular. Pero si pulsamos sobre el primer enlace:

<pre>
Home Screen Created
Welcome Screen Awaked
Home Screen Awakened 
</pre>

Observe que se volverá a llamar al evento *awake* de welcome sin pasar por su evento *sleep*.

Este es un caso particular del ciclo de vida de los *screens*:

> Cuando se modifiquen los parámetros con los que se ha llamado a un Screen, se volverá a llamar a su evento *awake*.



##<a name="settings"></a>Paso de parámetros con el método *setting*

Los componentes de Iris (UIs y Screens) pueden recibir parámetros utilizando los métodos *self.setting* o *self.settings*. 

El método *setting* recibe el nombre del parámetro si lo queremos leer y, opcionalmente, el valor del parámetro si lo queremos sobrescribir o crear.

```js
//Read the parameter value
var param_value = self.setting("param_name");
```

```js
//Write the parameter value
self.setting("param_name" ,"param_value");
```

El valor de *param_value* puede ser cualquier tipo válido en *Javascript*, incluso un objeto o una función.

Veámoslo con el siguiente ejemplo:

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
            self.tmpl(iris.path.welcome.html);
            var ui_number = 0;
            self.get("create_my_ui").click(
                function() {
                    ui_number++;
                    self.ui("ui_container", iris.path.my_ui.js, {
                        "ui_number": ui_number
                    }, self.APPEND);
                }
            );
        };
    },
    iris.path.welcome.js
);
```

En *my_ui.js*:

```js
//In my_ui.js
iris.ui(
    function (self) {
        self.create = function () {   
            console.log("my_ui UI Created");  
            self.tmpl(iris.path.my_ui.html);
        };
  
        self.awake = function () {  
            console.log("my_ui UI Awakened");
            self.get("ui_number").text("This is the " + self.setting("ui_number") + " muyUI UI.");
        };
    },
    iris.path.my_ui.js
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

Los componentes, UIs y Screens, disponen de un método alternativo al anteriormente explicado para pasar parámetros. Consiste en utilizar el método *settings*.

El método *settings* permite almacenar cualquier objeto de Javascript en el componente. La sintaxis de este método es:

```js
self.settings({...}); //any kind of Javascript object
```

El ejemplo anterior, utilizando este método se habría hecho de esta manera:

```js
self.settings({
    "year": 2013
}); //any kind of Javascript object
```

Tanto con el método *setting* como con *settings* se pueden pasar parámetros con varios niveles. Por ejemplo:

```js
self.settings({ person: { name:"test name"}, money: -67890.678, region: { country: "country test" }});
```

Para recuperar el nombre:

```js
var name = self.setting("person.name");
```

##<a name="data-settings"></a>Paso de parámetros utilizando atributos *data-*

Podemos pasar parámetros desde el contenedor de un UI utilizando el atributo *data-*.

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="my_ui_loader">Load my_ui</button>
    <div data-id="ui_container" data-year="2013"/>
</div>
```

Observe que el parámetro se pasa con el atributo *data-year* en el contenedor del UI *my_ui*.

En *welcome.js*:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.get("my_ui_loader").click(
                function() {
                    self.ui( "ui_container", iris.path.my_ui.js);
                }
            );   
        };
    },
    iris.path.welcome.js
);
```

En *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
    <div data-id="year_parameter"></div>
</div>
```



En *my_ui.js*:

```js
//In my_ui.js
iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmpl(iris.path.my_ui.html);
        };
        self.awake = function () {   
            console.log("my_ui UI Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.setting("year"));
        };
        self.sleep = function () {
            console.log("my_ui UI Asleep");
        };
  
        self.destroy = function () {
            console.log("my_ui UI Destroyed");
        };
    },
    iris.path.my_ui.js
);
```

##<a name="settings_ui"></a>Paso de parámetros con el método *self.ui*

El método *self.ui* también permite pasar parámetros a un *UI*.

Veamos un ejemplo:

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="my_ui_loader">Load my_ui</button>
    <div data-id='ui_container'/>
</div>
```

En *welcome.js*:

```js
//In welcome.js
iris.screen(
    function (self) {
        //In home.js
        self.create = function () {   
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.get("my_ui_loader").click(
                function() {
                    self.ui( "ui_container", iris.path.my_ui.js, {year: 2013} );
                }
            );   
        };
    },
    iris.path.welcome.js
);
```

En *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
    <div data-id="year_parameter"></div>
</div>
```

Y en *my_ui.js*:

```js
//In my_ui.js
iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmpl(iris.path.my_ui.html);
        };
        self.awake = function () {   
            console.log("my_ui UI Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.setting("year"));
        };
        self.sleep = function () {
            console.log("my_ui UI Asleep");
        };
  
        self.destroy = function () {
            console.log("my_ui UI Destroyed");
        };
    },
    iris.path.my_ui.js
);
```

Observe que el parámetro *year* se pasa en el método *self.ui* del Screen y se recoge en el método *self.setting* del UI.

##<a name="settings_priority"></a>Prioridad en el paso de parámetros

Los componentes pueden recibir parámetros de varias formas. Concretamente, los *UIs* pueden recibir parámetros:

1. Con los métodos *self.setting* y *self.settings*.
2. En el método *self.ui* del componente padre.
3. Desde la vista con el atributo *data-* en el contenedor del padre del UI.

Todos estas alternativas comparten el mismo objeto *settings* de *Javascript* con lo que si pasamos un mismo nombre de parámetro de varias formas diferentes, el valor del parámetro resultará sobrescrito.

El orden de prioridad es el que se ha reflejado en la lista anterior, aunque el valor final resultante dependerá de en qué momento del ciclo de vida fijemos el parámetro.

Por ejemplo:

En *welcome.js*, pasamos el parámetro en el método *self.ui* que se invoca en el evento *self.create*:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.ui( "ui_container", iris.path.my_ui.js, {year: 2014});
        };
    },
    iris.path.welcome.js
);
```

En *welcome.html*, pasamos el mismo parámetro en el contenedor del padre:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <div data-id="ui_container" data-year="2013"/>
</div>
```

En *my_ui.js*, pasamos el parámetro en el método *self.setting* del componente que se llama en el evento *self.create*:

```js
//In my_ui.js
iris.ui(
    function (self) {
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmpl(iris.path.my_ui.html);
            self.setting("year", 2015);
        };
        self.awake = function () {   
            console.log("my_ui UI Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.setting("year"));
        };
        self.sleep = function () {
            console.log("my_ui UI Asleep");
        };
  
        self.destroy = function () {
            console.log("my_ui UI Destroyed");
        };
    },
    iris.path.my_ui.js
);
```

En *my_ui.html*, visualizamos el parámetro:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
    <div data-id="year_parameter"></div>
</div>
```

El valor que se visualizará será *2015* que será el que hemos pasado en el método *self.setting*. La razón de esto es que el contenedor del UI pasa el valor *2013*, pero el método *self.ui* sobrescribe este valor a *2014*. Cuando el método *self.tmpl* del UI *my_ui* retorna, se modifica el valor del parámetro con *self.setting* que es lo que se visualiza.

Si comentamos la línea que asigna el valor con *self.settings*, el valor mostrado será *2014*, que corresponde con el pasado con *self.ui*.

Si hacemos varias llamadas a *self.setting* o a *self.settings* el valor del parámetro será el que hayamos asignado en la última llamada.

> Si un parámetro se pasa con el mismo nombre de varias formas, será sobrescrito con la prioridad que se ha indicado antes. Es decir, que el método más prioritario será *setting* o *settings* prevaleciendo el valor que se haya asignado con este método.

> Si se llama varias veces a *setting* o a *settings* con el mismo nombre de parámetro, prevalecerá el último valor asignado.

##<a name="tmpl_settings"></a>Paso de parámetros a la vista con el método *tmpl*

Podemos pasar parámetros a la vista a través del método *tmpl*. Para hacerlo, debemos añadir un segundo parámetro a este método. Este parámetro será un objeto con los nombres de variables que queramos pasar y sus valores.

Por ejemplo, en *welcome.js*:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html, {"name":"John"}); 
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

> Los parámetros que se pasan a la vista con el método *tmpl* son **CONSTANTES**. Es decir, que aunque cambie su valor, no serán actualizados en la vista cuando se llame al evento *awake*. La única forma correcta de actualizar los valores recuperados en la vista mediante *##..##*, es destruir y volver a crear la vista.

##<a name="data-model"></a>Paso de parámetros a la vista con el atributo *data-model*

Iris dispone de una forma alternativa de pasar parámetros a la vista utilizando el atributo *data-model*. La diferencia con el anterior es que Iris actualizará el valor de los parámetros pasados mediante *data-model* cuando se invoque el método *self.inflate* en el controlador del componente.

Veamos un en ejemplo.

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="update_date">Update date</button>
    <br>
    The date is: <span data-model="date">Not set yet</span>
</div>
```

En *welcome.js*

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html);
            self.get("update_date").click(
                function() {
                    self.inflate({date: new Date()});
                }
            );   
        };
    },
    iris.path.welcome.js
);
```

Observe que el contenido del elemento del *DOM* que tenga un atributo *data-model*, cuyo valor coincida con algún atributo del objeto pasado al método *self.inflate*, será reemplazado. Si el valor de *data-model* no coincide con ningún atributo, el componente del DOM conservará su valor.

> El paso de parámetros con *data-model* permite actualizar los valores en la vista, por el contrario el paso con ##...## mantendrá el valor del parámetro en todo el ciclo de vida del componente.

> La utilización de ##...## permite hacer cosas que no se pueden hacer con *data-model*.

Por ejemplo:

```html
<img src="##logo##.png/>
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
            self.tmpl(iris.path.welcome.html); 
            //The method allows for subscription on an event
            iris.on("MY_UI_CREATED_event", fn_my_uiCreatedEvent);
            ////When "MY_UI_CREATED_event" event happens, Iris will call to "fn_my_uiCreatedEvent" function.
            iris.on("my_uis_destroy_event", fn_my_uisDestroyEvent);
   
            self.get("create_my_ui").click(
                function() {   
                    self.ui("ui_container", iris.path.my_ui.js);
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
    },
    iris.path.welcome.js
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
            self.tmpl(iris.path.my_ui.html);   
            iris.notify("MY_UI_CREATED_event"); //This notifies subscribers that the "MY_UI_CREATED_event" event has occurred 
        };
    },
    iris.path.my_ui.js
);
```

Observe como para suscribirse a un evento, en el método *iris.on*, pasamos una cadena de texto (que representa al evento) y una función que será llamada cuando el evento se produzca. Para notificar que un evento se ha producido, se debe llamar al método *iris.notify* pasándole la cadena de texto asociada al evento.

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
            self.tmpl(iris.path.welcome.html); 
            //The method allows for subscription on an event
            iris.on(EVENT.MY_UI_CREATED, fn_my_ui_event);
            ////When "MY_UI_CREATED_event" event happens, Iris will call to "fn_my_uiCreatedEvent" function.
            iris.on(EVENT.MY_UIS_DESTROYED, fn_my_ui_event);
   
            self.get("create_my_ui").click(
                function() {   
                    self.ui("ui_container", iris.path.my_ui.js);
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
  
    },
    iris.path.welcome.js
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
            self.tmpl(iris.path.my_ui.html);   
            iris.notify(EVENT.MY_UI_CREATED, EVENT.MY_UI_CREATED);
        };
    },
    iris.path.my_ui.js
);
```

Podemos utilizar el método *iris.destroyEvents* como alternativa al método *iris.off*. Este método recibe el evento y un *array* con las funciones que quieren eliminar de la suscripción al evento. Por ejemplo:

```js
iris.destroyEvents(EVENT.MY_UIS_DESTROYED, [fn_my_ui_event]);
```
##<a name="events_globals"></a>Eventos globales

Iris define los siguiente eventos globales:

```js
iris.BEFORE_NAVIGATION = "iris_before_navigation";
iris.AFTER_NAVIGATION = "iris_after_navigation";
iris.RESOURCE_ERROR = "iris_resource_error";
```

Las funciones que se suscriban a los dos primeros serán notificadas antes y después de que se produzca un cambio en el hash-URL, respectivamente.

El tercero notificará cuando se produzca un error al hacer la llamada a un servicio (ver más adelante). Las funciones que se suscriban a este evento, recibirán información del error a través de tres parámetros (request, status, error) devueltos por la llamada *jquery.ajax*.

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

1 Especificar el vocablo en el método *iris.translate*, por ejemplo:

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

> Las traducciones hechas com *@@..@@* son constantes. Es decir que aunque varíe la definición o el idioma de la aplicación, Iris no modificará la traducción.

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
            self.tmpl(iris.path.welcome.html);   
            self.get("greeting").html(iris.translate("GREETINGS.MORNING"));
        };  
    },
    iris.path.welcome.js
);
```
Iris puede aplicar formatos a fechas, números y monedas adaptándolos a la variación **regional** que se haya seleccionado. Esto se puede hacer desde el código Javascript o bien desde el código HTML de un componente. En este último caso, los datos a formatear se pasarán en el método *tmpl*.

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
   
            self.tmpl(iris.path.welcome.html);
   
            var s ="Regionals Examples From Javascript";
   
            var date = new Date();
            s += "</br>Default date format: " + iris.date(date);
            s += "</br>Customized date format: " + iris.date(date, "Y/m/d h:i:s");
   
            var discount = "-34.586";
            s += "</br>Currency format: " + iris.currency(discount);
   
            self.get("regionals_from_js").html(s);
        };

    },
    iris.path.welcome.js
);
```

La función *iris.regional* permite conocer el valor regional que está utilizando Iris. Por ejemplo para saber los nombres de los días de la semana, usaremos:

```js
iris.regional("dayNames");
```

Las funciones *iris.date*, *iris.currency* e *iris.number* admiten opcionalmente como segundo parámetro un objeto de *Javascript* que será utilizado al aplicar el formato. Si este parámetro no se pasara, se utilizará el formato definido en *iris.locale*.

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
   
            self.tmpl(iris.path.welcome.html, params);
   
        };

    },
    iris.path.welcome.js
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
var promise = iris.ajax(settings);
```

Iris dispone del método *iris.resource* que facilita el acceso a servicios *REST*.

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
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
   
            self.tmpl(iris.path.welcome.html);
   
            iris.resource(iris.path.resource.js).load("test.json", function (json) {
                self.get("json_container").html(json.title);
            }, function (p_request, p_textStatus, p_errorThrown) {
                console.log("Error callback unexpected: " + p_errorThrown);
            });   
        };
    },
    iris.path.welcome.js
);
```

En *resource.js*:

```js
iris.resource(function(self){

    //self.settings({path : "http://localhost:8080/"});

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

}, iris.path.resource.js);
```

La variable *iris.path* debe tener una entrada al recurso:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    ...
    resource: {js: "resource.js"}
};
```

Observe que hemos creado un fichero *resource.js* donde se llama al método *iris.resource*. Este método crea un objeto de tipo *Resource* que se retorna en la función pasada como argumento y que dispone de distintos métodos (*get*, *pos*, *put* y *del*) para acceder a servicios REST y pueden recibir una función de éxito o de error en la que se procesará la respuesta obtenida.

Desde el Screen *Welcome*, hemos llamado al mismo método anterior, *iris.resource*, pero en este caso pasándole un *string* que se corresponde con la ruta de acceso al fichero y que nos permite invocar los métodos definidos en él. En nuestro ejemplo hemos llamado al método *load* pasándole la ruta de acceso al fichero *JSON* que queremos recuperar.

Iris facilita el trabajo con errores genéricos de tal forma que podemos tratar todos los errores de un determinado tipo sin tener que especificar la misma función en cada llamada a un servicio. Iris notificará cualquier error en un servicio a la función que se haya registrado en el evento iris.RESOURCE_ERROR.

Por ejemplo, para hacer esto haríamos:

```js
iris.on(iris.RESOURCE_ERROR, fn_generic_resource_error);
```

Esta función recibirá tres parámetros que nos permitirán saber de qué error se trata:

```js
function fn_generic_resource_error (request, status, error) {
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
//You can pass it the servers that you do not want them to use the browser cache. For example iris.noCache ("www", "localhost");
```

```js
iris.cacheVersion(p_value); //By assigning a different value to this method we can get the cache is completely invalid and force the download of data from the server.
```

```js
iris.log(arg1, arg2, arg3, arg4); //This shows in the browser console that is passed as parameter.
```


```js
iris.enableLog(server1, server2,...) //If no arguments are passed, returns the logging policy.
//Or You can pass the servers that you want to use the Iris logging system.
```

<a name="minification"></a>Iris ayuda a la **minificación** de la aplicación. Para reducir el número de ficheros que hay que descargar desde el servidor en una aplicación Iris, podemos *minificar* todos los ficheros *.js* en uno único con la herramienta que queramos (por ejemplo [Grunt](https://github.com/gruntjs/grunt)).

El segundo parámetro que pasamos a las funciones *iris.screen*, *iris.ui* e *iris.resource* es el que permite a Iris evitar la descarga del fichero del componente y que utilice el archivo *minificado*. Iris buscará todas las rutas que contenga la variable *iris.path* y se descargará aquellos que no se encuentren en el fichero *minificado*.

Por ejemplo, si el fichero *welcome.js* está en el fichero raíz de la aplicación, el segundo parámetro indicará a Iris la ruta de acceso al fichero:

```js
//In welcome.js
iris.screen(
    function (self) {
        ...
    }, iris.path.welcome.js);
```

Y la llamada que crea el Screen *welcome* sería:

```js
iris.welcome(iris.path.welcome.js);
```

En el objeto *iris.path* debe existir el atributo que antes hemos utilizado conteniendo la ruta de acceso al fichero:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    ....
};
```
Iris cargará todos los ficheros contenidos en *iris.path* antes de utilizar ningún componente.

Observe que el método *iris.screen* recibe dos parámetros, la función del ciclo de vida y una cadena de texto que indica dónde se encuentra el fichero. Este parámetro tiene que coincidir exactamente con el parámetro que se pasa al método *iris.welcome*.

Igualmente, en los UIs debemos definir el *UI* con el parámetro adicional que permite a Iris localizarlo. Por ejemplo, si el *UI* *my_ui* está en el directorio raíz:

```js
//In my_ui.js
iris.ui(
    function (self) {
       ...
    }, iris.path.my_ui.js);
```

Se deben evitar prácticas como las siguientes:

En *iris.path*:

```js
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"},
    ....
};
```

Y en *welcome.js*:

```js
//In welcome.js
iris.screen(
    function (self) {
        ...
    }, "./welcome.js");
```

Observe que en *iris.welcome* se ha pasado un literal en vez del atributo del objeto *iris.path* y que, aunque la ruta sea la misma, se ha indicado de forma ligeramente diferente ya que se ha antepuesto "./". Esto es una mala práctica ya que Iris no será capaz de localizar el fichero *welcome.js* asociado.

Lo mismo ocurriría si la llamada al método *iris.welcome* la hiciéramos de esta forma:

```js
iris.welcome("./welcome.js");
```

> Al definir o crear componentes se debe indicar la ruta de acceso con el objeto *iris.path* en vez de usar literales de cadena, ya que así garantizamos una correcpondencia exacta.

##<a name="unit_test"></a>Pruebas de unidad en Iris

Para probar su correcto funcionamiento y detectar errores, se han realizado pruebas de unidad de todos los métodos de Iris. Las pruebas de unidad se han realizado con la librería [QUnit](http://qunitjs.com/).

Las pruebas de unidad son una fuente adicional para conocer el funcionamiento de Iris. Puede consultar las pruebas realizadas en el directorio [test](https://github.com/iris-js/iris/tree/iris-grunt/test).<!-- TODO cambiar enlace -->

#<a name="step_by_step"></a>Construyendo paso a paso una aplicación desde cero

En esta sección vamos utilizar Iris para construir una sencilla aplicación que nos permita comprender como integrar todo lo visto anteriormente.

Puede descargar la aplicación en el siguiente [enlace](https://github.com/surtich/iris/blob/iris-grunt/docs/iris-shopping.tar.gz?raw=true). <!-- TODO actualizar enlace -->Para probar la aplicación debe descomprimirla y desplegarla en un servidor Web (Apache, Node.js, etc). Si tiene instalado *Grunt* puede, simplemente, situarse en el directorio raíz de la aplicación y ejecutar el comando *grunt*.

Puede probar el funcionamiento de la aplicación en el siguiente [enlace](http://shopping-list-example.appspot.com/) <!-- TODO subir al servidor GAE de IGZ y actualizar enlace -->

La aplicación va a permitir realizar la lista de la compra de una serie de productos agrupados en categorías. En las siguientes imágenes presentamos las principales pantallas de la aplicación:

<a name="home_img"></a>*#/home:*
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

Vamos a proponer una estructura determinada aunque cualquier otra que cumpla el propósito anterior será igualmente válida. En nuestro ejemplo, vamos a crear un fichero *shopping* para almacenar los componentes de Iris y fuera de este fichero guardaremos, librerías, estilos, imágenes, etc. que no sean específicos de Iris. En el directorio *shopping* vamos almacenar por separado los componentes de tipo *Screen* de los de tipo *UI*, creando un directorio para cada tipo. Además vamos a crear subdirectorios para almacenar los  componentes que definen un mismo estado de la aplicación.

En la siguiente imagen vemos la estructura de directorios y los archivos que contienen:

![www_directories](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/shopping_directories.png)

Más detalladamente, el contenido del directorio *shopping* será el siguiente:

![shopping_directories](https://raw.github.com/iris-js/iris/iris-grunt/docs/images/shopping_list/www_directories.png)

Observe que, para hacer más sencillo el ejemplo, se ha creado un directorio *json* que permite cargar los productos y las categorías desde el servidor Web sin depender de ninguna tecnología de servidor. En una aplicación real, normalmente los productos estarían almacenados en una base de datos y se recuperarían llamando a un servicio.

##<a name="step_by_step_welcome"></a>*Screen* Welcome

En esta sección vamos a preparar la aplicación para que sea capaz de ejecutar el *Screen* de bienvenida.

Estos son los ficheros necesarios y su contenido:

En *index.html*:

```html
<!DOCTYPE HTML>
<!DOCTYPE HTML>
<html>
    <head>
        <title>iris shopping</title>

        <link type="text/css" rel="stylesheet" href="./css/jquery-ui-1.9.2.custom.css">
        <link type="text/css" rel="stylesheet" href="./css/bootstrap.css">
        <link type="text/css" rel="stylesheet" href="./css/jquery.dataTables.css">
        <link type="text/css" rel="stylesheet" href="./css/shopping.css">

        <script type='text/javascript' src='./js/jquery-1.8.3.js'></script>
        <script type='text/javascript' src='./js/jquery-ui-1.9.2.custom.js'></script>
        <script type='text/javascript' src='./js/bootstrap.js'></script>
        <script type='text/javascript' src='./js/jquery.dataTables.js'></script>
        
        <script type='text/javascript' src='./js/iris.js'></script>
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

        _setLang();
        
        iris.path = {
            screen: {
                welcome: {js: "/shopping/screen/welcome.js", html: "/shopping/screen/welcome.html"},
                home: {js: "/shopping/screen/home.js", html: "/shopping/screen/home.html"},
                categories: {js: "/shopping/screen/products/categories.js", html: "/shopping/screen/products/categories.html"},
                products: {js: "/shopping/screen/products/products.js", html: "/shopping/screen/products/products.html"},
                shopping: {js: "/shopping/screen/list/shopping.js", html: "/shopping/screen/list/shopping.html"}
            },
            ui: {
                category_list_item: {js: "/shopping/ui/products/category_list_item.js", html: "/shopping/ui/products/category_list_item.html"},
                product_list_item: {js: "/shopping/ui/products/product_list_item.js", html: "/shopping/ui/products/product_list_item.html"},
                product_shopping_list_item: {js: "/shopping/ui/list/product_shopping_list_item.js", html: "/shopping/ui/list/product_shopping_list_item.html"}
            },
            resource: {
              js: "/shopping/resource.js"  
            }
        }
        
        iris.baseUri(".");
        iris.enableLog("localhost");
        iris.welcome(iris.path.screen.welcome.js);
    }
    );
```
Observe que lo primero que hacemos en este *script* es cargar algunas de las traducciones que vamos a necesitar. Hemos decidido que cada fichero de *Javascript* cargue las traducciones que vaya a utilizar. En el caso de *init.js* vamos a cargar las traducciones comunes en toda la aplicación. Una alternativa perfectamente aceptable sería tener un único punto donde definiríamos todas las traducciones de la aplicación. Otra posible solución sería almacenar las traducciones en una base de datos y recuperarlas mediante un objeto *JSON*.

Después, llamamos a la función *_setLang* que nos permite definir el idioma de la aplicación. El idioma se seleccionará a partir del parámetro *lang* que se haya pasado en el *Query String* de la *URL*. Si no se ha pasado este parámetro se seleccionará el idioma por defecto.

Lo siguiente que hacemos es definir el objeto *iris.path* que contiene un *mapeo* de las rutas de acceso a los componentes que vamos a utilizar.

Por último cargamos el *Screen* Welcome.

En *welcome.js*:

```js
iris.screen(
    function (self) {	
        function _ajaxPrepare() {
            $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {            
                //self.get("screens").hide();
                self.get("loading").show();                
                jqXHR.always(function() {
                    self.get("loading").hide();
                //self.get("screens").show();
                });            
            });                
        }
            
        function _createScreens() {
            self.screens("screens", [
                ["home", iris.path.screen.home.js],
                ["categories", iris.path.screen.categories.js],
                ["products", iris.path.screen.products.js],
                ["shopping", iris.path.screen.shopping.js]
                ]);
        }
        
        function _changeLang(link) {
            var regExp = /[?&]lang=[a-z][a-z][\-_][A-Z][A-Z]/;
            var lang = window.location.href.match(regExp);
            var url = window.location.href;
            var hash = window.location.hash;
            if ( lang === null) {
                lang = "lang=" + link.data("lang");
                if (window.location.href.match(/[?]/)) {
                    lang = "&" + lang;                            
                } else {
                    lang = "?" + lang;
                }
                url = url.substr(0, url.indexOf(hash));
                url += lang;
                url += hash;
            } else {
                var first = lang[0].substr(0,6);
                url = window.location.href.replace(regExp, first + link.data("lang"));                       
            }
            window.location.href = url;
        }
            
            
        iris.translations("es_ES", {    
            LOADING: "Cargando...",
            MENU: {
                WELCOME: "Ejemplo de lista de la compra",
                HOME: "Incio",
                PRODUCTS: "Productos",
                SHOPPING_LIST: "Lista de la compra"
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
        
        self.create = function () {
            
            model.init();
            
            self.tmpl(iris.path.screen.welcome.html);
            
            _ajaxPrepare();
            
            _createScreens();
            
            $("[data-lang]").click(
                function (event) {
                    _changeLang($(this));
                    event.preventDefault();
                }
                );
            
            
            if ( !document.location.hash ) {                
                iris.navigate("#/home"); //Default page
            }
        };
    } , iris.path.screen.welcome.js);
```
Lo más relevante de este fichero es:
* Llamamos a la función *model.init()* para inicializar el modelo.
* La función *_ajaxPrepare* permite poner un texto *cargando...* cada vez que se efectúa una llamada *AJAX*.
* La función *_createScreens* registra los *screens* de la aplicación.
* La función *_changeLang* recarga la aplicación añadiendo el código del idioma que se haya seleccionado como un parámetro del *Query String*.
* Se selecciona el *Hash-URL* *#/home* como página por defecto de la aplicación.

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
                <a class="brand" href="#/home">@@MENU.WELCOME@@</a>
                <div class="nav-collapse collapse">
                    <ul class="nav">
                        <li><a href="#/home">@@MENU.HOME@@</a></li>
                        <li><a href="#/categories">@@MENU.PRODUCTS@@</a></li>
                        <li><a href="#/shopping">@@MENU.SHOPPING_LIST@@</a></li>
                    </ul>
                    <ul class="nav pull-right">
                        <li><a href="#" data-lang="es_ES"><i class="icon-spain-flag"></i></a></li>
                        <li><a href="#" data-lang="en_US"><i class="icon-united-kingdom-flag"></i></a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </div>
    </div>
    <div class="divContainer">
        <div data-id="loading" class="divElement loading">@@LOADING@@</div>
        <div class="container divElement" data-id="screens"/>        
    </div>
</div>
```

Observe que en este archivo se definen los menús con *Bootstrap* para acceder a las distintas secciones de la aplicación. En lugar de colocar los textos descriptivos de los menús directamente, se utiliza la sintaxis de Iris para permitir localizarlos en los ficheros de traducción. En la esquina superior derecha, <a href="#/home_img">ver imagen</a>, se sitúan iconos para cambiar el idioma. Por último, hay un contenedor donde se cargarán los *screens* de la aplicación.

##<a name="step_by_step_home"></a>*Screen* Home

El <a href="#/home_img">*Screen* *Home*</a> es una simple página informativa. Estos son sus ficheros:

En *home.js*:


```js
iris.screen(
    function (self) {
        
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
            
        self.create = function () {    
            self.tmpl(iris.path.screen.home.html);
        };
        
    }, iris.path.screen.home.js);
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
            ADD:- "shopping:products:add",
            REMOVE: "shopping:products:remove",
            REMOVED: "shopping:products:removed"
        },
        
        SHOPPING: {
            CHECK: "shopping:products:check",
            UNCHECK: "shopping:products:uncheck",
            CHANGE_STATE: "shopping:products:change_state",
            REMOVE_ALL: "shopping:products:remove_all",
            CHECK_ALL: "shopping:products:check_all",
            UNCHECK_ALL: "shopping:products:uncheck_all",
            INVERT_CHECK: "shopping:products:invert_check",
            REMOVE_CHECKED: "shopping:products:remove_checked"
        }
    };
    
    
    function _init () {
        
        model.shoppingList = new model.ShoppingList();
        
        model.resource = iris.resource(iris.path.resource.js);
    
        model.resource.app = (function() {
            return {
                getCategories: function(success, error) {
                    model.resource.load("/json/categories.json", success, error);
                },
                getProducts: function(idCategory, success, error) {
                    model.resource.load("/json/products_" + idCategory + ".json", success, error);
                } ,
                getAllProducts: function(success, error) {
                    model.resource.load("/json/products.json", success, error);
                }
            };
        
        })();
        
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
                if (product.order) {
                    if (product.order > _order) {
                        _order = product.order;
                    }
                }
                var shoppingProduct = new model.ShoppingProduct(product);
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
            _order = 1;
            _shoppingProducts = [];
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
        
        function _countProducts(purchased) {
            var number = 0;
            for (var i = 0; i < _shoppingProducts.length; i++) {
                if (_shoppingProducts[i].purchased === purchased) {
                    number++;
                }
            }
            return number;
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
        
        model.ShoppingList.prototype.countPurchased = function() {            
            return _countProducts(true);
        };
        
    };
    
    
    
    model.ShoppingProduct = function (product) {
    
        this.order = -1;
        this.idProduct = product.idProduct;
        this.nameProduct = product.nameProduct;
        this.purchased = product.purchased === true;
        
        this.changeState = function(purchased) {
            this.purchased = purchased === true;
        };
        
    };
    
})(jQuery);
```

Sin entrar en detalle vamos a comentar lo más importante de este fichero:

* Hemos creado una variable global *model* que permite acceder a los métodos públicos definidos.
* La comunicación con los componentes de *Iris* se realiza a través de *eventos Iris* para lo que se han definido una serie de constantes.
* Se ha definido un método *model.resource* para acceder a los servicios *REST* que ofrece Iris.
* Se ha definido un objeto *model.resource.app* que permite recuperar la información de productos y categorías del servidor.

En el fichero *resource.js*, preparamos las funciones que nos permiten acceder a servicios REST.

```js
iris.resource(function(self){
    self.load = function (path, success, error) {
        self.get(iris.baseUri() + path, success, error);
    };
}, iris.path.resource.js);
```


##<a name="step_by_step_caterogies"></a>*Screen* Categories

El <a href="#categories_img">*Screen* *Categories*</a> permite cargar las categorías de los productos de la aplicación con los siguientes ficheros:

En *categories.js*:

```js
iris.screen(
    function (self) {
        
        function _inflate(categories) {
            $.each(categories,
                function(index, category) {						
                    self.ui("list_categories", iris.path.ui.category_list_item.js, {
                        "category": category
                    });
                }
                );
        }
        
        self.create = function () {
            self.tmpl(iris.path.screen.categories.html);
            model.resource.app.getCategories(_inflate);
        };
        
        
    }, iris.path.screen.categories.js);
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

Observe que llamamos al método *model.resource.app.getCategories* para recuperar las categorías desde el servidor. Cuando hayamos recuperado las categorías, iterativamente cargamos el *UI* *category_list_item* pasándole cada categoría como parámetro en el contenedor *list_categories*.

El *UI* *category_list_item* tendrá los siguientes ficheros:

En *category_list_item.js*:

```js
iris.ui(function(self) {	
    
    self.create = function() {
        self.tmplMode(self.APPEND);
        var category = self.setting("category");
        self.tmpl(iris.path.ui.category_list_item.html, category);
    };	
    
}, iris.path.ui.category_list_item.js);
```

En *category_list_item.html*:

```html
<li>
    <a href="#/products?idCategory=##idCategory##">##nameCategory##</a>
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
* Los *UIs* creados contienen un enlace que permite navegar al *Screen* con *Hash-URL* *#/products*.
* Este *Screen* recibe el parámetro *idCategory* para conocer de qué categoría queremos recuperar los productos.

##<a name="step_by_step_products"></a>*Screen* Products

El <a href="#products_img">*Screen* *Products*</a> permite recuperar del servidor los productos de la categoría seleccionada y añadir los que queramos a la lista de la compra.

Los ficheros de este *Screen* son:

En *products.js*:

```js
iris.screen(
    function (self) {
        
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
        
        function _inflate(products) {
            
            self.get("msg").html(iris.translate("PRODUCTS.CHOOSE_PRODUCTS") + ":"); 
            $.each(products,
                function(index, product) {
                    self.ui("list_products", iris.path.ui.product_list_item.js, {
                        "product": product
                    });
                }
                );					
        }
        
        
        self.create = function () { 
            self.tmpl(iris.path.screen.products.html);
        };
       
        self.awake = function (params) {
            self.destroyUIs("list_products");
            model.resource.app.getProducts(params.idCategory, _inflate,
                function (request, textStatus, error) {
                    self.get("msg").html(iris.translate("ERROR") + ": <i>" + error + "</i>");
                }
                );

        };
    }, iris.path.screen.products.js);
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


El *UI* *product_list_item* tendrá los siguientes ficheros:

En *product_list_item.js*:

```js
iris.ui(function(self) {	
    var product;
    self.create = function() {  
        self.tmplMode(self.APPEND);
        product = self.setting("product");
        self.tmpl(iris.path.ui.product_list_item.html, product);
        self.get("product").change(function (event) {
            if (this.checked) {
                iris.notify(model.event.PRODUCTS.ADD, product);
            } else {
                iris.notify(model.event.PRODUCTS.REMOVE, product.idProduct);
            }
        });
    };
    
    self.awake = function() {
        var p = model.shoppingList.getShoppingProduct(product.idProduct);
        if (p) {
            self.get("product").prop('checked', true);
        } else {
            self.get("product").prop('checked', false);
        }
    };
}, iris.path.ui.product_list_item.js);
```

Y en *product_list_item.html*:

```html
<label class="checkbox">
    <input data-id="product" type="checkbox" data-product="##idProduct##">##nameProduct##
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

La explicación de estos ficheros es similar a la que realizamos para el *UI* *category_list_item*, pero además:

* Hemos utilizado el método *change* de JQuery para que cuando se pulse sobre algún producto, se añada o se elimine el producto de la lista de la compra.
* Cuando se pulse sobre algún producto, el método anterior, notificará al modelo de la aplicación lo que ha ocurrido utilizando el modelo de eventos de *Iris*.
* Observe que en el método *awake* comprobamos si el producto sigue estando o no en la lista de la comprar para marcar o desmarcar su *check*. Esto es necesario ya que desde el Screen *Shopping*, también podemos eliminar productos de la lista y así se mantiene la información sincronizada.


##<a name="step_by_step_shopping"></a>*Screen* Shopping

El <a href="#shopping_img">*Screen* *Shopping*</a> permite permite gestionar la cesta de la compra marcando aquellos productos que se han comprado. 

Los ficheros de este *Screen* son:

En *shopping.js*:

```js
iris.screen(
    function (self) {
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
            
        self.create = function () {
            
            self.tmpl(iris.path.screen.shopping.html);            
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
                        var ui = self.ui("shoppingList_products", iris.path.ui.product_shopping_list_item.js, {
                            "product": product,
                            "removeProduct": function() {
                                var idProduct = product.idProduct;
                                var table = self.get("shopping_table");
                                var row = $(this).closest("tr").get(0);
                                table.fnDeleteRow(table.fnGetPosition(row));
                                self.destroyUI(ui);
                                iris.notify(model.event.PRODUCTS.REMOVE, idProduct);
                            },
                            "buyProduct": function() {
                                var idProduct = product.idProduct;
                                iris.notify(model.event.SHOPPING.CHANGE_STATE, idProduct);
                            }
                        });
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
            self.get("btn_check_all").toggleClass("disabled", !model.shoppingList.hasNoPurchasedProducts()).prop("disabled", !model.shoppingList.hasNoPurchasedProducts());
            self.get("btn_uncheck_all").toggleClass("disabled", !model.shoppingList.hasPurchasedProducts()).prop("disabled", !model.shoppingList.hasPurchasedProducts());
            self.get("btn_remove_checked").toggleClass("disabled", !model.shoppingList.hasPurchasedProducts()).prop("disabled", !model.shoppingList.hasPurchasedProducts());
        }
    
        self.destroy = function () {
            iris.off(model.event.PRODUCTS.REMOVE, _changeVisibilityShoppingTable);
            iris.off(model.event.SHOPPING.CHANGE_STATE, _changeStateButtons);                
        };
        
    }, iris.path.screen.shopping.js);
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
* La función *_loadShoppingProducts* carga en el *tbody* de la tabla *shopping_table* los productos de la lista de la compra a través del UI *product_shopping_list_item*. Los productos que no se hayan comprado todavía aparecen primero ordenados por su *idProduct*. Con cada producto se pueden realizar dos acciones: comprar y borrar de la lista. Al cada UI de tipo *product_shopping_list_item* se le pasa como parámetro sendas funciones que permiten realizar estas acciones.
* El paso de funciones como parámetros entre componentes o la notificación de eventos, permite reducir el acoplamiento de componentes al mínimo.
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
        self.tmpl(iris.path.ui.product_shopping_list_item.html, product);
        if (product.purchased === true) {
            self.get("order").addClass("purchased");
            self.get("nameProduct").addClass("purchased");
            self.get("icon-shopping-cart").removeClass("icon-shopping-cart").addClass("icon-shopping-cart-remove");
        }
        self.get("remove").on("click", self.setting("removeProduct"));
        self.get("buy").on("click",
            function () {
                (self.setting("buyProduct"))();
                self.get("order").toggleClass("purchased");
                self.get("nameProduct").toggleClass("purchased");
                self.get("icon-shopping-cart").toggleClass("icon-shopping-cart icon-shopping-cart-remove");
            }
            );
    };
    
    self.destroy = function () {
        self.get("remove").off("click");
        self.get("buy").off("click");
    };
}, iris.path.ui.product_shopping_list_item.js);
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

Lo más relevante de estos ficheros es:

* Se asignan estilos en función de si el producto está o no comprado.
* Se capturan los eventos de pulsación sobre los botones para cambiar sus estilos y llamar a las funciones que ha recibido el UI en el método *self.setting*.

##<a name="step_by_step_qunit"></a>Pruebas unitarias con *QUnit*

*[QUnit](http://qunitjs.com/)* es una librería para realizar [pruebas unitarias](http://es.wikipedia.org/wiki/Prueba_unitaria) que pertenece al proyecto [JQuery](http://jquery.com/).

Con *QUnit* podemos realizar tanto pruebas síncronas como asíncronas así como probar eventos de la interfaz de usuario.

*QUnit* permite agrupar las pruebas en módulos. En nuestro ejemplo vamos a crear un único módulo para probar el modelo, en el ejercicio posterior se incorporará un segundo módulo para probar la interfaz de usuario.

Las pruebas de unidad deben ser atómicas, es decir, que una prueba no debe depender de los resultados o de las acciones realizadas en otra prueba de unidad. Para facilitar esto, *QUnit* tiene la posibilidad de asociar a cada módulo las funciones *setup* y *teardown* y en ellas definir lo que queremos que se haga antes y después de cada test, respectivamente.

El módulo para probar el modelo lo almacenamos en el fichero *model_test.js*:

Nota: No se ha realizado una prueba exhaustiva sino que se trata de un simple ejemplo para comprender el funcionamiento de *QUnit*.

```js
 
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
            iris.notify("iris-reset");
            iris.baseUri("..");
            iris.include("/js/shopping_list.js");
            model.init();
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
        model.resource.app.getCategories(
            function(categories) {
                window.ok(categories.length === 4, "Categories retrieved");
                window.start();
            }
            );
    }
    );
        
    asyncTest("Test getProducts() Method", function() {
        window.expect(1);
        model.resource.app.getAllProducts(
            function(products) {
                window.ok(products.length === 28, "Products retrieved");
                window.start();
            }
            ),function(request, status, error) {
                    console.log(error);
            };
    }
    );

    
}(jQuery));
```
Observe que para realizar un test síncrono hay que llamar a la función *test* de *QUnit* y, de forma similar, a la función *asyncTest* cuando el test sea asíncrono. Los dos últimos casos de prueba del ejemplo deben ser asíncronos ya que estamos recuperando datos de una *URL*. Los test asíncronos no comienzan a ejecutarse hasta que no se llame a la función *start*. La función *expect* indica el número de test que se deben pasar exitosamente para que *QUnit* considere el caso de prueba como positivo.

Observe que en el método *setup* hemos incluido una llamada a:

```js
iris.notify("iris-reset");
```

Esta llamada permite que Iris reinicie su estado y su uso está indicando únicamente cuando se realizan test.


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
            files: ['www/test/**/*.html']
        },
        lint: {
            files: ['grunt.js', ' www/js/iris.js', 'www/js/init.js', 'www/js/shopping_list.js', 'www/shopping/**/*.js', 'www/test/modet_test.js']
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
            port:8080,
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

##<a name="step_by_step_exercise"></a>Ejercicio: Modificando la aplicación

En esta sección vamos a discutir que cambios son necesarios en la aplicación para que los productos se seleccionen en la misma pantalla en la que se cargan las categorías tal y como se muestra en la siguiente imagen:

![categories2](https://raw.github.com/surtich/iris/iris-grunt/docs/images/shopping_list/categories2.png)

El problema que se nos plantea es que, en la aplicación actual, los productos se cargan a través del Screen *#/products* y, sin embargo, cada categoría se carga en el UI *category_list_item* desde la que se navega al Screen *#/products* pasándole el *idCategory* correspondiente. Iris no permite registrar un Screen dentro de un UI por lo que no podremos cargar el Screen *#/products* en el UI *category_list_item*.

Una posible solución consistirá en eliminar el Screen *#/products* y cargar en el UI *category_list_item*, los UIs *product_list_item* que, a su vez, cargan los productos de cada categoría. Lógicamente, el trabajo que se hacía en el Screen *#/products* habrá que hacerlo en otro sitio; en nuestro caso lo repartiremos entre el Screen *#/categories* y los UIs *category_list_item* y *product_list_item*.

Vamos a ver los cambios necesarios para implementar la solución propuesta.

En primer lugar, debemos borrar los ficheros *products.js* y *products.html* del directorio *screen/products*.

En *welcome.js* debemos eliminar el registro de "#/products"; para ello modificamos la función *_createScreens()*:

```js
function _createScreens() {
    self.screens("screens", [
        ["home", "/shopping/screen/home.js"],
        ["categories", "/shopping/screen/products/categories.js"],
        ["shopping", "/shopping/screen/list/shopping.js"]
        ]);
}
```

En *products.js* cargábamos los productos en el UI *product_list_item*. Esta tarea se la vamos a asignar a *category_list_item.js* que quedará de la siguiente forma:

```js
iris.ui(function(self) {
    function _inflate(category, products) {
        $.each(products,
            function(index, product) {
                if (category.idCategory === product.category) {
                    self.ui("list_products", "/shopping/ui/products/product_list_item.js", {
                        "product": product
                    });
                }
            }
            );
    }
    
    self.create = function() {
        self.tmplMode(self.APPEND);
        var category = self.setting("category");
        self.tmpl("/shopping/ui/products/category_list_item.html", category);
        _inflate(category, self.setting("products"));
    };	
    
}, "/shopping/ui/products/category_list_item.js");
```

Observe que se reciben todos los productos pero sólo se añaden a la vista los que correspondan a la categoría en la que estamos.

Modificamos *categories.js* para que cargue las categorías y los productos.

```js
iris.screen(
    function (self) {
        
        function _inflate(categories, products) {
            $.each(categories,
                function(index, category) {						
                    self.ui("list_categories", "/shopping/ui/products/category_list_item.js", {
                        "category": category,
                        "products": products
                    });
                }
                );
        }
        
        self.create = function () {
            self.tmpl("/shopping/screen/products/categories.html");
            model.resource.app.getCategories(function(categories){
                model.resource.app.getAllProducts(function(products){
                    _inflate(categories, products); 
                });
            });
        };
        
        
    }, "/shopping/screen/products/categories.js");
```

Ahora habría que modificar los ficheros *html* asociados. Se han hecho algunos cambios en su estructura y en los estilos para utilizar el efecto *[accordion](http://twitter.github.com/bootstrap/javascript.html#collapse)* que proporciona *BootStrap*. Este efecto nos permite que sólo se vean los productos de una categoría a la vez, colapsando con una animación los productos de la categoría anterior.

En *categories.html*:

```html
<div class="accordion" id="accordion_categories" data-id="list_categories">
</div>
```

En *category_list_item.html*:

```html
<div class="accordion-group">
    <div class="accordion-heading">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_categories" href="#collapse_category_##idCategory##" data-id="category">
            ##nameCategory##
        </a>
    </div>
    <div id="collapse_category_##idCategory##" class="accordion-body collapse">
        <div data-id="list_products" class="accordion-inner"></div>
    </div>
</div>

```

Por último, hemos realizado algunos ejemplos de pruebas unitarias para la vista en *view_test.js*:

```js

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
            iris.notify("iris-reset");
            iris.baseUri("..");
            iris.include("/js/shopping_list.js");
            model.init();
            iris.welcome("/shopping/screen/welcome.js");
        },
        teardown: function () {
            model.destroy();
            //window.location.hash ="";
            clearBody();
        }
    });
    
    
    asyncTest("Test add products to the Shopping List", function() {
        window.expect(1);
        iris.on(iris.AFTER_NAVIGATION ,function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.resource.app.getCategories(function(categories){
                model.resource.app.getAllProducts(function(products){
                    iris.navigate("#/categories");
                    iris.on(iris.AFTER_NAVIGATION ,function() {
                        setTimeout(function() {
                            $("input[type='checkbox']", "[id^='collapse_category']").trigger('click');
                            window.ok(model.shoppingList.getShoppingProducts().length === products.length, "All products are selected");
                            window.start();
                        },1000);
                    });
                });
            });
            
        });
    });
        
    asyncTest("Test remove purchased products", function() {
        var products = [];
        window.expect(1);
        iris.on(iris.AFTER_NAVIGATION ,function() {
            iris.off(iris.AFTER_NAVIGATION);
            model.resource.app.getCategories(function(categories){
                model.categories = categories;
                model.resource.app.getAllProducts(function(products){
                    model.products = products;
                    iris.navigate("#/categories");
                    iris.on(iris.AFTER_NAVIGATION ,function() {
                        iris.off(iris.AFTER_NAVIGATION);
                        setTimeout(function() {
                            $("input[type='checkbox']", "[id^='collapse_category']").trigger('click');
                            iris.navigate("#/shopping");
                            iris.on(iris.AFTER_NAVIGATION ,function() {
                                $("button[data-id='buy']").first().trigger("click");
                                $("button[data-id='btn_remove_checked']").trigger("click");
                                //model.ShoppingList.prototype.removePurchased();
                                window.ok(model.shoppingList.getShoppingProducts().length === products.length - 1, "Removed 1 purchased product");
                                window.start();
                            });
                        },1000);
                    });
                });
            });
            
        });
    }
    );
        
}(jQuery));
```

Observe que se ha utilizado el evento *iris.AFTER_NAVIGATION* para saber cuando Iris ha terminado de realizar la navegación y el método *window.setTimeout* para dar tiempo a que se llame a los servicios.

Puede descargar la aplicación modificada en el siguiente [enlace](https://github.com/surtich/iris/blob/iris-grunt/docs/iris-shopping2.tar.gz?raw=true).
