#Índice
* <a href="#what_is_it">¿Qué es Iris?</a><br>
* <a href="#features">Características de Iris</a><br>
* <a href="#why">¿Por qué Iris?</a><br>
* <a href="#how_it_works">¿Cómo funciona Iris?</a><br>
 * <a href="#RVP">Resource-View-Presenter</a><br>
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
 * <a href="#path_params">Enviando parámetros a un Screen</a><br>
 * <a href="#settings">Paso de parámetros con el método *setting*</a><br>
 * <a href="#data-settings">Paso de parámetros utilizando atributos *data-*</a><br>
 * <a href="#settings_ui">Paso de parámetros con el método *self.ui*</a><br>
 * <a href="#settings_priority">Prioridad en el paso de parámetros</a><br>
 * <a href="#data-jq">Paso de parámetros al *template* con el atributo *data-jq-**</a><br>
 * <a href="#events">Trabajando con eventos</a><br>
 * <a href="#events_globals">Eventos predefinidos</a><br>
 * <a href="#locals">Utilizando locales y regionales</a><br>
 * <a href="#ajax">Llamadas Ajax y servicios REST</a><br>
 * <a href="#include">Incluyendo ficheros con *iris.include*</a><br>
 * <a href="#production">Paso a producción</a><br>
 * <a href="#iris_packager">Utilizando *iris_packager.js*</a><br>
 * <a href="#unit_test">Pruebas de unidad en Iris</a><br>
* <a href="#step_by_step">Construyendo paso a paso una aplicación desde cero</a><br>
 * <a href="#directories">Estructura de directorios</a><br>
 * <a href="#step_by_step_welcome">*Screen* Welcome</a><br>
 * <a href="#step_by_step_todoUI">*UI* Todo</a><br>
 * <a href="#step_by_step_resource">Todo resource</a><br>
 * <a href="#step_by_step_qunit">Pruebas unitarias con *QUnit*</a><br>
 * <a href="#step_by_step_grunt">Automatizando procesos con *Grunt*</a><br>
 
#<a name="what_is_it"></a>¿Qué es Iris?

[Iris](http://thegameofcode.github.com/iris/) es un *framework* escrito en Javascript para construir el *front-end* de una aplicación Web que, aplicando distintas técnicas, permite que las aplicaciones sean eficientes, rápidas, estructuradas y modulares.

Iris es completamente independiente de la tecnología que se utilice en el servidor; así, podemos utilizar Iris en aplicaciones basadas en Node.js, Python, Java, PHP, .NET, Ruby, etc.

#<a name="features"></a>Características de Iris

Las principales características de Iris son:

* Código libre ([licencia New BSD License](https://raw.github.com/thegameofcode/iris/master/README.md)).
* Ejecución 100% en cliente.
* Ligero y rápido (<16 KB).
* Independiente de servidor (Apache, IIS, Jetty, etc).
* Estructura organizada de ficheros.
* Independiente de navegador (Chrome, Firefox e Internet Explorer; basado en jQuery -1.5 o superior-)
* Fuertemente enfocado a Aplicaciones Orientadas a Objetos.
* Orientado a eventos, para la coordinación de elementos.
* Alta escalabilidad y alta reutilización de código.
* Basado en el Patrón Resource-View-Presenter.
* Soporta cualquier tipo de tecnología de consumo de datos (servicios REST, almacenamiento local, distintas estrategias de caché...).
* Navegación sin cambiar de página, empleado Hash-URL.
* Motor de plantillas sencillo y eficiente.
* Soporte multiidioma y presentación regional de números, monedas, fechas, etc.
* Soporte para el paso de desarrollo a producción.
* Integrable y totalmente compatible con otros populares Frameworks como Backbone, Knockout o BootStrap.
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

 Iris, a diferencia de otros *frameworks MVC*, no introduce lógica de programación en la vista HTML, ni oculta la programación de la aplicación cliente. Con Iris, el desarrollo resultará más estructurado y cohesivo pero la programación se podrá hacer con el estilo que resulte más conveniente, ya que Iris no impone una determinada metodología.

#<a name="how_it_works"></a>¿Cómo funciona Iris?

En esta sección se van a presentar los principales componentes de Iris y los métodos para crear, destruir o interaccionar con ellos. No se preocupe si no entiende algunos conceptos, ya que lo único que se pretende en este momento es que se vaya familiarizando con la forma de trabajo de Iris.  Más adelante se propondrán ejemplos de código que le permitirán clarificar y profundizar lo aquí esbozado.

##<a name="RVP"></a>Resource-View-Presenter

Iris está basado en el patrón Resource-View-Presenter. Este patrón es una variante del MVC (Model View Controller) especialmente concebido para construir interfaces de usuario Web en las que la lógica de la aplicación está en el cliente pero los datos se recuperan desde el servidor.

Iris consta de los siguientes elementos:

**Resource**: Permite recuperar y enviar datos al servidor y definir el modelo de datos.

**Componentes** definen los elementos que conforman la interfaz de usuario y su comportamiento. Un componente está constituido por: La plantilla, *template* en adelante, y su controlador, *presenter* en adelante.

El **template** consiste en un fragmento de código en HTML, típicamente un *DIV*, almacenado en un fichero, normalmente con extensión *.html*. Es la interfaz de usuario y su cometido es meramente pasivo ya que simplemente presenta la información que ha sido preparada por el *presenter*; retorna al *presenter* los datos introducidos por el usuario y le cominica los eventos que se han producido.

El **presenter** es un fragmento de código en Javascript almacenado en un fichero, típicamente con extensión *.js*. Mediante este fichero controlamos e interaccionamos con el *template*, definiendo su comportamiento. El *presenter* recupera y almacena datos en el *resource* y los adapta para ser mostrados en el *template*.

Con Iris la lógica de la aplicación la podemos situar en el *presenter* o en el *resource* o repartirla entre ambos.

![Definición de comportamiento](https://raw.github.com/thegameofcode/iris/master/docs/images/component_equation.png)

Cuando Iris carga un componente, visualiza el código de su fichero HTML asociado y ejecuta su fichero de Javascript según se haya definido en su ciclo de vida (<a href="#life_cycle">ver más adelante</a>).

El código HTML del componente se inserta en el DOM de la página. La inserción se hace sustituyendo o añadiendo (según se prefiera) un elemento que se defina en el DOM (ver más adelante).

##<a name="screens_UIs"></a>Screens y UIs

Iris utiliza dos tipos de componentes principales: Screens y UIs.

Recuérdese que ambos son componentes y, por lo tanto, se definen mediante dos ficheros: Uno en HTML para establecer el *template* o vista y otro en Javascript para el *presenter* o comportamiento. 

Un **UI** es un componente **reutilizable**. Puede ser tan simple como un simple botón o tan complejo como sea preciso. Un UI se puede componer de otros UIs. Si queremos conseguir una reutilización efectiva, debemos diseñar el UI de tal forma que su *presenter* trabaje de la forma más desacoplada y cohesiva posible. Iris tiene mecanismos como los eventos o el paso de parámetros que facilitan esta labor.

Un <a name="screen"></a>**Screen** es un elemento de **navegación**. Cada Screen está asociado a un Hash-URL. Si en la barra de direcciones del navegador, escribimos el Hash-URL al que está asociado un Screen, Iris cargará su fichero HTML y ejecutará el fichero en Javascript según su ciclo de vida.

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

![Ciclo de vida](https://raw.github.com/thegameofcode/iris/master/docs/images/iris_life_cycle.png)

Los Screens tienen un método adicional llamado **canSleep**. Este método será invocado por Iris antes de llamar al método *Sleep*. Si el método *canSleep* devuelve *false*, Iris no navegará al Screen deseado e interrumpirá la navegación evitando que se llame al evento *sleep*. Este evento es útil si, por ejemplo, no hemos completado un formulario y queremos advertir al usuario que debe hacerlo antes de navegar a otro Screen.

##<a name="welcome"></a>Screen de bienvenida

Toda aplicación Iris debe definir un componente inicial que se cargará al principio y antes de efectuar cualquier operación con Iris. Este componente será un <a href="#screen">Screen</a> especial ya que tiene algunas diferencias con lo explicado anteriormente:
* El Screen de bienvenida tiene el símbolo *#* como Hash-URL asociado y se carga con el método **welcome** de Iris.
* En una aplicación Iris, normalmente, no habrá necesidad de refrescar o de modificar la *URL* sobre la que se carga el Screen de bienvenida.
* Por lo tanto, tampoco será necesario llamar al método *destroy* de este Screen. Es decir, que el ciclo de vida de este Screen se simplifica ya que únicamente se hará una primera llamada al método *create* y nunca se llamará a los métodos *sleep* o *destroy*. Puede haber, sin embargo, varias llamadas a *awake* cuando se pasan parámetros como se explica más adelante. 
* Lo habitual es que el cometido del Screen de bienvenida sea registrar otros Screens y *llamar* al Hash-URL del Screen inicial de nuestra aplicación.
* Todos los demás Screens son hijos de este Screen y, por lo tanto, su Hash-URL tendrá la forma "#/...".

#<a name="starting"></a>Empezando con Iris

En esta sección vamos proponer ejemplos de código para aclarar y profundizar lo explicado anteriormente y para introducir nuevas capacidades de Iris.

Aquí no se pretende crear una aplicación funcional, sino que se comprenda como se trabaja con Iris. Los ejemplos, por lo tanto, no realizarán ningún trabajo útil. Si quiere ver como construir una aplicación desde cero, puede consultar la <a href="#paso-a-paso">sección correspondiente</a>.

Para hacer más sencilla la explicación, todo el código de esta sección se situará un el directorio raíz de la aplicación. No es conveniente hacer esto en una aplicación real. En la sección *<a href="#paso-a-paso">Construyendo paso a paso una aplicación desde cero</a>* se propone una estructura de directorios más adecuada para trabajar con Iris.

##<a name="installing"></a>Instalando Iris
El primer paso será decidir si queremos trabajar con la versión de [desarrollo](https://raw.github.com/thegameofcode/iris/master/dist/iris.js) o de [producción](https://raw.github.com/thegameofcode/iris/master/dist/iris.min.js) minificada.

```html
<!-- index.html -->
<script src="jquery-min.js"></script> <!-- jQuery 1.5+ -->
<script src="iris.js"></script>
```
Nota: Las aplicaciones de Iris deben estar situadas en un servidor Web.

##<a name="iris_path"></a>Objeto *iris.path*

Iris requiere que se defina un objeto llamado *iris.path*. Debemos asociar, *mapear*, sus atributos a las URLs de acceso a los componentes que vayamos a utilizar. Se tienen que definir los ficheros *js* y *html* de todos los componentes, *screens* y *uis*. También es obligatorio definir los *resources* como se explicará posteriormente.

Puede estructurar el objeto *iris.path* como mejor le convenga: separando *screens* de *uis*, por módulos, con un sólo nivel o con varios, etc. Lo único realmente importante es que, todos los *templates*, *presenters* y *resources* tengan un atributo en el objeto *iris.path* que sea de tipo *string* y que contenga la ruta de acceso al fichero.

El objeto *iris.path* debe situarse en el *script* de inicio de la aplicación y antes de llamar al método *iris.welcome*.

Antes de instanciar el Screen de bienvenida, Iris procesará el objeto *iris.path* y cargará en memoria todos los ficheros asociados en él. Si los ficheros ya se hubieran precargado, porque se está utilizando una herramienta de *minificación*, Iris no volvería a cargar los ficheros. Puede consultar el apartado de <a href="#minificación">minificación</a> para una explicación más detallada.

Si se utiliza la [herramienta de minificación](https://raw.github.com/thegameofcode/iris/master/tools/iris_packager.js) que incorpora Iris, es importante que la variable *iris.path* se defina fuera de cualquier función, incluso *$(document).ready()* y *window.onload*.

##<a name="calling_welcome"></a>Llamando al Screen de bienvenida
Desde Javascript, llamamos al método **welcome** de Iris para cargar el fichero de comportamiento del Screen de bienvenida.

```js
//Mandatory: It maps application URLs to iris.path object
iris.path = {
    welcome: {js: "welcome.js", html: "welcome.html"}
};

//In any Javascrit file or in a <script> section of an HTML file ... 
$(document).ready(
    function () {
        iris.baseUri("./"); //Optional: It sets de base directory of the application
        iris.welcome(iris.path.welcome.js); //It loads the behavior file of the welcome Screen
    }
);
```
Observe que hemos creado un objeto llamado *iris.path* y, en este caso, hemos decidido cargar tanto *presenter* como *template* en una estructura de dos niveles. Al método *iris.welcome* se le pasa el atributo que contiene la ruta de acceso al controlador del Screen Welcome, *iris.path.welcome.js*.

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

El uso de la variable *self* permite evitar referencias erróneas a *this* en las que se cae con frecuencia cuando se programa con *Javascript*. Recuerde que el objeto *this* es contextual a la función que se esté ejecutando y que se producirá un cambio de contexto, por ejemplo, cuando *Javascript* esté ejecutando un *closure*. Utilizando la variable *self*, que reciben todos los componentes de Iris, no tendremos este problema. Puede ampliar información [aquí](http://alistapart.com/article/getoutbindingsituations).

Observe que el método *create* ejecuta una llamada al método **tmpl** que permite cargar en el DOM el contenido del archivo *welcome.html* pasado como parámetro.

Observe, además, que el método *iris.screen* recibe la función antes mencionada y, como segundo parámetro, el atributo del objeto *iris.path* que contiene la *URL* del fichero *Javascript* asociado. 

> El método *self.tmpl()* debe ser llamado una única vez y **OBLIGATORIAMENTE** en el método *self.create()* antes de utilizar ningún otro método del componente, ( *self.get()*, *self.destroyUI()*, etc);

> Los ficheros HTML asociados a componentes de Iris deben tener un único nodo raíz (típicamente un DIV). Si hubiera comentarios en HTML deben estar dentro de este nodo.

Por ejemplo:

```html
<!-- Invalid coment with Iris -->
<div>
	<!-- Valid coment with Iris -->
</div>
```

Nota: Para que Iris funcione correctamente, debe situar los archivos anteriores en un servidor Web (Apache, Jetty, IIS, etc).

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

*home.js*:
```js
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

En nuestro ejemplo, para *navegar* al Screen debemos pulsar sobre el enlace que hemos añadido en *welcome.html* y que contiene el Hash-URL del Screen al que queremos ir.

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
    <div data-id='ui_container'></div>
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

> De forma predeterminada, cuando se carga un **UI**, se reemplaza el contenedor por el *template* del UI. Por el contrario, cuando se carga un **Screen**, su *template* se añade al contenedor.

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

Un UI puede contener otros UIs. Para probar esto, creemos otro UI llamado *inner_ui* con los siguientes ficheros.

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

Anteriormente hemos visto que cuando añadimos un UI, su contenedor es reemplazado por el *template* del UI. Este comportamiento se puede cambiar.

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
    <div data-id='ui_container'></div>
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
    <div data-id='container'></div>
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

> Si al método *self.ui()* le pasamos un *string*, Iris buscará en el *template* un elemento cuyo *data-id* coincida con el parámetro pasado y devolverá un *array* con todos los *uis* que contenga cuando el mode sea *self.APPEND* y el UI contenido en él cuando el modo sea *self.PREPEND*.

> El método *self.uis()* devuelve la colección de UIs que tiene el componente.

En *my_ui.js*:

```js
self.create = function () {   
    console.log("my_ui UI Created");
    //self.tmplMode(self.APPEND);
    self.tmpl(iris.path.my_ui.html);
};
```

En el DOM generado, se ha eliminado todo el contenido del UI. Tampoco aparece ninguna referencia a su contenedor, *data-id*='*container*', porque estamos en modo *REPLACE*.

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

> Podemos destruir un UI desde el propio componente llamando al método *self.destroyUI()* sin pasar ningún argumento; esto hara que el UI se autodestruya.

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

##<a name="path_params"></a>Enviando parámetros a un Screen

En esta y en las siguientes secciones vamos a ver diversas formas de pasar parámetros entre componentes. 

Comencemos por el paso de parámetros a Screens:

Una forma de pasar un parámetro a un Screen como *path param* en la URI del Screen.

Observe como se pasa el parámetro al Screen Home en el archivo *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <a href="#/home/2013">Click to go to Home Screen</a>
    </br>
    <a href="#/help">Click to gets some help</a>
    </br> 
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div> 	
</div>
```

En  el archivo *welcome.js* mapeamos el *screen home* indicando que va a recibir un *path param* con nombre *year*:

```js
//In welcome.js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            
            self.screens("screens", [
                ["home/:year", iris.path.home.js],
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

> Otra forma de recuperar un parámetro, es utilizar el método *self.param()* pasándole en nombre del parámetro.

En el caso que nos ocupa esto se podría haber hecho con: *self.param("year")*

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
                ["home/:year", iris.path.home.js],
                ["help", iris.path.help.js]
            ]);
            self.get("navigate_home").click(
                function() {
                    iris.navigate("#/home/" + (new Date().getFullYear())); //Send the current year instead a fixed value
                }
            );
        };
        
    },
    iris.path.welcome.js
);
```

Se pueden pasar parámetros simultáneamente a varios Screens (padres e hijos). En el siguiente ejemplo pasamos un parámetro al Screen Home y otro al Screen Inner Home.

En *welcome.js*:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            self.screens("screens", [
                ["home/:year", iris.path.home.js]
            ]);
        };

        self.awake= function (params) {
            console.log("Welcome Screen Awaked");
        };

        self.sleep = function () {
            console.log("Welcome Screen Asleep");
        };

        self.destroy = function () {
            console.log("Welcome Screen Destroyed");
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
    <a href="#/home/2013/inner_home/2013">Click to go to Inner Home Screen (2013)</a>
    </br>
    <a href="#/home/2014/inner_home/2014">Click to go to Inner Home Screen (2014)</a>
    </br>
    </br>
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div>  
</div>
```

En *home.js*:

```js
//In home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Home Screen Created");
            self.tmpl(iris.path.home.html);
            self.screens("inner_home_container", [
                ["inner_home/:year", iris.path.inner_home.js]
            ]);
        };

        self.awake = function (params) {  
            console.log("Home Screen Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.params.year);
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
    <div data-id="inner_home_container"></div>
</div>
```

En *inner_home.js*:

```js
//In inner_home.js
iris.screen(
    function (self) {
        self.create = function () {   
            console.log("Inner Home Screen Created");
            self.tmpl(iris.path.inner_home.html);
        };

        self.awake = function (params) {  
            console.log("Inner Home Screen Awakened");
            self.get("year_parameter").text("The value of the year parameter is: " + self.params.year);
        };

        self.sleep = function () {
            console.log("Inner Home Screen Asleep");
        };

        self.destroy = function () {
            console.log("Inner Home Screen Destroyed");
        };
    },
    iris.path.inner_home.js
);
```

En *inner_home.html*:

```html
<div>
    <h1>Inner Home Screen</h1>
    <p>This is the inner_home screen.</p>
    <div data-id="year_parameter"></div>
</div>
```


Observe que el parámetro *year* se pasa tanto al Screen Home como al Screen Inner Home.

> Si se quiere pasar un mismo parámetro a varios Screens hay que repetirlo en cada uno de ellos.

Es importante comprender lo que sucede con los eventos. Al cargar la página con el ejemplo anterior:

<pre>
Welcome Screen Created
Welcome Screen Awaked 
</pre>

Si pulsamos sobre el primer enlace, los eventos son los esperados:

<pre>
Home Screen Created
Home Screen Awakened
Inner Home Screen Created
Inner Home Screen Awakened 
</pre>

Pero si pulsmos sobre el segundo enlace:

<pre>
Home Screen Awakened
Inner Home Screen Awakened 
</pre>

Observe que se volverá a llamar al evento *awake* de *home* y de *inner home* sin pasar por sus eventos *sleep*.

Este es un caso particular del ciclo de vida de los *screens*:

> Cuando se modifiquen los parámetros con los que se ha llamado a un Screen, se volverá a llamar a su evento *awake*.

Podemos pasar varios parámetros a un screen de dos formas posibles. La primera es registrando los paths params:

En *welcome.js*:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
            self.tmpl(iris.path.welcome.html); 
            
            self.screens("screens", [
                ["home/:year/:month", iris.path.home.js]
            ]);
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
    <a href="#/home/2014/october">Click to go to Home Screen</a>
    </br> 
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div>  
</div>
```

La segunda es utilizando *matrix params*:

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
    <a href="#/home;year=2014;month=october">Click to go to Home Screen</a>
    </br> 
    <div data-id="screens">
        Here is where Iris will load all the Screens
    </div>  
</div>
```

Como se puede apreciar, los *matrix params* no se registran ya que su nombre se establece al navegar al screen:

> Los *matrix params* son más adecuados cuando un screen pueda recibir un número de parámetros variable, por contra, los *path param* requieren que el screen reciba siempre los mismos parámetros.

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
            self.get("ui_number").text("This is the " + self.setting("ui_number") + " muy_ui UI.");
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

Es conveniente inicializar los valores de los parámetros que puede recibir un componente. Esto lo podemos hacer así:

```js
//In my_ui.js
iris.ui(
    function (self) {
	
		self.settings({
			ui_number: 0
		});

        self.create = function () {   
            console.log("my_ui UI Created");  
            self.tmpl(iris.path.my_ui.html);
        };
  
        self.awake = function () {  
            console.log("my_ui UI Awakened");
            self.get("ui_number").text("This is the " + self.setting("ui_number") + " muy_ui UI.");
        };
    },
    iris.path.my_ui.js
);
```

##<a name="data-settings"></a>Paso de parámetros utilizando atributos *data-*

Podemos pasar parámetros desde el contenedor de un UI utilizando el atributo *data-*.

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="my_ui_loader">Load my_ui</button>
    <div data-id="ui_container" data-year="2013"></div>
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
    <div data-id='ui_container'></div>
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
3. Desde el *template* con el atributo *data-* en el contenedor del padre del UI.

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
    <div data-id="ui_container" data-year="2013"></div>
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

Si el método *self.setting* lo hubiéramos situado fuera de las métodos de ciclo de vida, por ejemplo:

```js
//In my_ui.js
iris.ui(
    function (self) {
        self.setting("year", 2015);
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmpl(iris.path.my_ui.html);

        };
    }
    ...
);
```
En este caso, la asignación del parámetro *year* será sobrescrita por cualquier otra forma de paso de parámetros que utilicemos. Podríamos considerar, por lo tanto, que esta es la forma de pasar **parámetros por defecto** a un componente.


##<a name="data-jq"></a>Paso de parámetros al *template* con el atributo *data-jq-**

Iris permite pasar parámetros al *template* utilizando el atributo *data-jq-** en el *template* y el método *self.inflate* en el presenter.

El paso de parámetros con *data-jq-** permite ejecutar distintos métodos de JQuery en el *template* dependiendo del valor por el que sustituyamos el ***:

```js
data-jq-html == $(element).html()
data-jq-text == $(element).text()
data-jq-val == $(element).val()
data-jq-toggle == $(element).toggle()
data-jq-attr-xxx == $(element).attr(xxx)
data-jq-prop-xxx == $(element).prop(xxx)
```


Veamos un ejemplo.

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <button data-id="update_date">Update date</button>
    <br>
    The date is: <span data-jq-text="date">Not set yet</span>
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

Observe que el contenido del elemento del *DOM* que tenga un atributo *data-jq-text*, cuyo valor coincida con algún atributo del objeto pasado al método *self.inflate*, será reemplazado. Si el valor de *data-jq-text* no coincide con ningún atributo, el componente del DOM conservará su valor.

> El paso de parámetros con *data-jq-text* permite actualizar los valores en el *template* cuando se invoque el método *self.inflate*.


##<a name="events"></a>Trabajando con eventos

Iris implementa el patrón [Publish–subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) para trabajar con eventos. Los eventos en Iris, a diferencia de los de JQuery, no están ligados a ningún objeto del DOM.

El uso de eventos permite que dos componentes se comuniquen de forma desacoplada.

En Iris tenemos dos tipos de eventos, los eventos globales y los eventos asociados a componentes. Los eventos globales se crean con el método *iris.on* y los asociados a componentes con el método *self.on*, donde *self* puede ser un *ui* o un *screen*. La principal diferencia es que, para destruir los primeros, habrá que invocar explícitamente el método *iris.off*, mientras que los segundos se podrán destruir explícitamente (self.off) o implícitamente cuando el componente sea destruído por Iris.

Empecemos con un ejemplo de eventos asociados a componentes:

En *welcome.js*:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");            
            self.tmpl(iris.path.welcome.html);
            self.ui("my_ui_container", iris.path.my_ui.js);
            self.ui("my_ui_container", iris.path.my_ui.js);
            self.ui("my_ui_container", iris.path.my_ui.js);
            
            var input = self.get("name_input");
            input.keyup(function () {
                self.notify("text_changed", input.val());
            });
        };
    },
iris.path.welcome.js);
```

Y en *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <input type="text" data-id="name_input"/>
    <div data-id="my_ui_container"></div>
</div>
```

Observe que hemos creado tres UIs, y que cuando pulsamos una tecla sobre la caja de texto, notificamos un evento con la función *self.notify*. Esta función recibe el nombre del evento y, opcionalmente, un objeto de *Javascript* con los valores que queremos pasar cuando se reciba la notificación. En nuestro caso, el texto introducido. 

En *my_ui.js*:

```js
//In my_ui.js
iris.ui(
    function (self) {
        function updateDiv(text) {
            self.get("name_div").text(text);
        }
        
        self.create = function () {
            console.log("my_ui UI Created");
            self.tmplMode(self.APPEND);
            self.tmpl(iris.path.my_ui.html);
            self.on("text_changed", updateDiv);
        };
        
        self.destroy = function () {
            console.log("my_ui UI Destroyed");                        
            self.off("text_changed",updateDiv);
        };
        
    },
iris.path.my_ui.js);
```

Y en *my_ui.html*:

```html
<div>
    <h1>my_ui UI</h1>
    <p>This is the my_ui template.</p>
    The text input contains: <div data-id="name_div"></div>
</div>
```

Observe que con el método *self.on* nos suscribimos al evento *text_changed*. Cuando ese evento sea notificado, se ejecutará la función que se indique como segundo parámetro. Esta función recibirá el objeto de *Javascript* que se haya indicado en la notificación. En nuestro caso, la función *updateDiv*, recibirá el valor de la caja de texto y lo mostrará en el *div*.

Observe que los tres *UIs* se actualizan de forma desacoplada con el valor que haya en la caja de texto.

El método *self.off* nos permite eliminar la suscripción a un evento.

Veamos, ahora, un ejemplo sencillo de eventos globales que consiste en contar cuantos UIs de tipo my_ui se han creado:

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
##<a name="events_globals"></a>Eventos predefinidos

Iris tiene los siguiente eventos predefinidos:

```js
iris.BEFORE_NAVIGATION = "iris_before_navigation";
iris.AFTER_NAVIGATION = "iris_after_navigation";
iris.RESOURCE_ERROR = "iris_resource_error";
iris.SCREEN_NOT_FOUND = "iris_screen_not_found"
```

Las funciones que se suscriban a los dos primeros serán notificadas antes y después de que se produzca un cambio en el hash-URL, respectivamente.

El tercero notificará cuando se produzca un error al hacer la llamada a un servicio (ver más adelante). Las funciones que se suscriban a este evento, recibirán información del error a través de tres parámetros (request, status, error) devueltos por la llamada *jquery.ajax*.

El cuarto se llamará cuando la navegación falla, como ocurre, por ejemplo, cuando se intenta ir a un *Screen* que no ha sido registrado.

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
    Morning Greeting from Javascript: <span data-id="greeting"></div>
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
Iris puede aplicar formatos a fechas, números y monedas adaptándolos a la variación **regional** que se haya seleccionado.

Veamos un ejemplo:

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

Iris dispone del método *iris.resource* que permite definir elementos de tipo *Resource* y que facilitan el acceso a servicios *REST* así como la definición de la lógica de la aplciación.

En el siguiente ejemplo se explica como podríamos hacer esto:

En primer lugar, creamos el fichero *test.json* con el siguiente contenido:

```json
{
   "id" : 1015,
   "title" : "book title",
   "author" : { "name" : "Jonh Doe" }
}
```

Normalmente esto no será un fichero sino una URL que recuperará la información del servidor. En el ejemplo se utiliza un fichero para no depender de una tecnología de servidor concreta.

En *welcome.html*:

```html
<div>
    <h1>Welcome Screen</h1>
    <p>This is the initial screen.</p>
    <div data-jq-text="title"></div>
    <div data-jq-text="author.name"></div>
</div>
```

En *welcome.js*:

```js
iris.screen(
    function (self) {
        self.create = function () {
            console.log("Welcome Screen Created");
   
            self.tmpl(iris.path.welcome.html);
   
            iris.resource(iris.path.resource.js).load(1015)
            .done(function (json) {
                self.inflate(json);
            })
            .fail( function (request, textStatus, errorThrown) {
                console.log("Error on book load");
            });   
        };
    },
    iris.path.welcome.js
);
```

En *resource.js*:

```js
iris.resource(function(self){

    self.load = function (id) {
      return self.get("service/book/" + id);
    };

    self.create = function (params) {
      return self.post("service/book", params);
    };

    self.update = function (id, params) {
      return self.put("service/book/" + id, params);
    };

    self.remove = function (id) {
      return self.del("service/book/" + id);
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

Observe que hemos creado un fichero *resource.js* donde se llama al método *iris.resource*. Este método crea un objeto de tipo *Resource* que se retorna en la función pasada como argumento y que dispone de distintos métodos, *get*, *pos*, *put* y *del*, para acceder a servicios REST y pueden recibir una función de éxito o de error en la que se procesará la respuesta obtenida.

Desde el Screen *Welcome*, hemos llamado al mismo método anterior, *iris.resource*, pero en este caso pasándole un *string* que se corresponde con la ruta de acceso al fichero y que nos permite invocar los métodos definidos en él. En nuestro ejemplo hemos llamado al método *load* pasándole el identificador del libro que queremos recuperar.

Iris facilita el trabajo con errores genéricos de tal forma que podemos tratar todos los errores de un determinado tipo sin tener que especificar la misma función en cada llamada a un servicio. Iris notificará cualquier error en un servicio a la función que se haya registrado en el evento iris.RESOURCE_ERROR.

Por ejemplo, para hacer esto haríamos:

```js
iris.on(iris.RESOURCE_ERROR, onResourceError);
```

Esta función recibirá tres parámetros que nos permitirán saber de qué error se trata:

```js
function onResourceError (request, textStatus, errorThrown) {
	....
}
```
##<a name="include"></a>Incluyendo ficheros con *iris.include*

Iris permite incluir ficheros con el método *iris.include*. Por ejemplo:

```js
iris.include("http://example.com/js/file.js", function(){
  console.log("The file.js has been loaded.")
});
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

```js
iris.browser() //Returns an object with the browser information using user-agent. It contains flags for each of the four most prevalent browser classes (Internet Explorer, Mozilla, Webkit, and Opera) as well as version information.
```

<a name="minification"></a>Iris ayuda a la **minificación** de la aplicación. Para reducir el número de ficheros que hay que descargar desde el servidor en una aplicación Iris, podemos *minificar* todos los ficheros *.js* y *html* en uno único utilizando cualquier con la herramienta que queramos (por ejemplo [Grunt](https://github.com/gruntjs/grunt)) o con la que se suministra con Iris ([iris_packager.js](https://raw.github.com/thegameofcode/iris/master/tools/iris_packager.js)).

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

Observe que el método *iris.screen* recibe dos parámetros, la función que define al *screen* y una cadena de texto que indica dónde se encuentra el fichero. Este parámetro tiene que coincidir exactamente con el parámetro que se pasa al método *iris.welcome*.

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

> Al definir o crear componentes se debe indicar la ruta de acceso con el objeto *iris.path* en vez de usar literales de cadena, ya que así garantizamos una correspondencia exacta.

##<a name="iris_packager"></a>Utilizando *iris_packager.js*

Iris incluye una herramienta de *minificación* llamada [*iris_packager.js*](https://raw.github.com/thegameofcode/iris/master/tools/iris_packager.js). Esta aplicación requiere tener instalado [node.js](http://nodejs.org/) y las dependencias del fichero *package.json*. Para instalar las dependencias, nos situamos en el directorio que contiene este fichero y ejecutamos:

<pre>
npm install
</pre>

Este *script* permite minificar los ficheros *.js* y *.html* en un único fichero. También permite la minificación de los ficheros *.css* y la conversión de las imágenes que usemos en los ficheros *.css* al formato [base64](http://en.wikipedia.org/wiki/Base64).

*iris_packager* indicará los archivos que ha procesado y mostrará las estadísticas de compresión conseguidas.

Para ejecutar *iris_packager.js* debemos situarnos en el directorio en el que se encuentre y ejecutar:

<pre>
node iris_packager [params]
</pre>

A *iris_packager* se le pueden pasar parámetros desde la línea de comandos o en el fichero *iris_packager.json*. Si un parámetro se pasa de ambas formas se utilizará el valor pasado en la línea de comandos.

###Ejemplos básicos

Si no ha utilizado antes *iris_packager* vaya a la sección en la que se describen cada uno de los parámetros.

Ejemplo 1:

<pre>
node ./iris_packager appPath=www init=js/init.js input=shopping/
</pre>

El ejemplo anterior *minificará* el fichero *init.js* que se encuentra en la ruta *./www/js/init.js*, incluyendo los archivos *js* que haya en el directorio *www/shopping* y añadiendo llamadas al método *iris.tmpl()* con parámetros con la forma *iris.tmpl("shopping/..", ...)*. También minificará los ficheros *css* que encuentre en esa misma ruta y eliminará todos los ficheros *js* y *html* originales.

Ejemplo 2:

<pre>
node ./iris_packager appPath=www init=js/init.js input=shopping/,**/*.css
</pre>

Hará lo mismo que antes pero buscará ficheros *css* en todo el directorio de la aplicación *./www*.

Ejemplo 3:

<pre>
node ~/iris/tools/iris_packager appPath=www init=js/init.js
</pre>

Al no especificar el parámetro *input*, se buscará en todo el directorio de la aplciación *./www*.

Ejemplo 4:

<pre>
node ~/iris/tools/iris_packager init=www/js/init.js
</pre>

Al no especificar el parámetro *appPath*, se utilizará como directorio de aplicación el directorio actual.

Ejemplo 5:

<pre>
node ~/iris/tools/iris_packager init=www/js/init.js delete=false
</pre>

Se evita que se borren los archivos originales

Ejemplo 6:

<pre>
node ~/iris/tools/iris_packager init=www/js/init.js mode=test
</pre>

No comprime, sólo muestra los archivos que se hubieran comprimido.

Ejemplo 7:

<pre>
node ~/iris/tools/iris_packager init=www/js/init.js minCss=false
</pre>

Evita que se realice la compresión de ficheros *css*.

Ejemplo 8:

<pre>
node ~/iris/tools/iris_packager init=www/js/init.js b64=true
</pre>

Sustituye las imágemes referenciadas en ficheros *css* por su codificación *base64*.


###Parámetros de *iris_packager*

Los parámetros que admite son:

**Rutas o ficheros de entrada** (opcional):
Indican los archivos que se quieren procesar con *iris_packager*.

Se pueden pasar rutas a directorios, a archivos o expresiones regulares, vea [minimatch]( https://npmjs.org/package/minimatch).

Si se desean pasar varias rutas, se separarán con comas (,).

*iris_packager* buscará aquellos ficheros con extensión *.js*, *.html*, *css* que haya en las rutas pasadas eliminando las rutas duplicadas.

En línea de comandos se pasa con el parámetro **input**.  Ejemplo:

<pre>
node iris_packager input=shopping/,lib/**/*.js,js/my_lib.js,**/*.css ...
</pre>

En el fichero *iris_package.json*, se pasan con el parámetro **include_paths**. Ejemplo

```json
{
	…
	"includePaths": ["shopping/", "lib/**/*.js", "js/my_lib.js", "**/*.css"]
	…
}
```
Si no se especifica este parámetro se buscará en todo el directorio de la aplciación.

**Rutas o ficheros excluidos** (opcional):
Permite excluir algunos de los ficheros que se han incluido con el parámetro anterior.

En línea de comandos el parámetro es **exclude**.

En el fichero *iris_packager.json* el atributo es **exlcudePaths**.


**Fichero init** (obligatorio):

Define la ruta al fichero de *JavaScript* donde se ha definido la variable *iris.path*.

Este fichero se utilizará para minificar en él los ficheros *.js* y *.html* encontrados.

Este fichero resultará minificado aunque no se haya incluido como *ruta de entrada*.

En línea de comandos se configura con la variable **init**. Ejemplo:

<pre>
node iris_packager input=shopping/,lib/**/*.js,js/my_lib.js base=./www/ init=./www/js/init.js ...
</pre>

En *iris_packager.json* se utilizará el atributo **initJs**.


**Directorio o fichero de salida** (opcional):

Define el directorio o el fichero donde se realizará la *minificación* de los ficheros *.js* y *.html* encontrados.

Si como salida se indica la ruta a un directorio, el fichero *minificado* se almacenará en este directorio con el mismo nombre del fichero indicado en el parámetro *init*.

Si como salida se indica la ruta a un archivo, el fichero *minificado* se almacenará en este archivo.

En la línea de comandos, el parámetro es **output**. Ejemplo:

<pre>
node iris_packager input=shopping/,lib/**/*.js,js/my_lib.js base=./www/ init=./www/js/init.js output=./www/js/init-min.js
</pre>

En el fichero *iris_packager.json* el atributo es **outputPath**. Se podría utilizar también **outputFile** cuando lo que se pasa es un fichero.

Si no se pasa el parámetro *output*, se utilizará como fichero de salida el especificado con el parámetro *init*. Es decir, que la *minificación* reemplazará el fichero que se haya indicado con el parámetro *init*.

**Ruta base** (opcional):

Fragmento de ruta que se concatenará a las rutas definidas como *rutas de entrada*, *rutas excluidas*, *input* y *output* para formar la ruta de acceso completa.

Sirve para que se pueda ejecutar *iris_packager* desde cualquier directorio.

En línea de comandos el parámetro es **appPath**. Por ejemplo:

<pre>
node iris_packager input=shopping/,lib/**/*.js,js/my_lib.js appPath=./www/ ...
</pre>

En el fichero *iris_package.json* el atributo es **appPath**.

El valor por defecto del parámetro es directorio actual ("."). Es decir, que si no se indica un valor para este parámetro se presupone que todas las rutas son relativas al directorio actual.

**Iris base URI** (opcional)

Este parámetro permite que las llamadas al método *iris.tmpl()*, que se añadirán al final del fichero *minificado*, se correspondan con las rutas definidas en la variable *iris.path*.

Tanto en la línea de comandos como en el fichero *json*, el parámetro es **irisBaseUri**.

La ruta que se pasará al método *iris.tmpl* será la formada por la concatenación de la variable *appPath* con la ruta de acceso al fichero *js* o *html*, eliminando del principio el fragmento de ruta que coincida con el parámetro *irisBaseUri*.

El valor por defecto del parámetro es */*, de tal forma que las rutas que se generarán serán relativas.

Es decir, que si no especificáramos el valor del parámetro, como en el siguiente ejemplo:

<pre>
node iris_packager input=shopping appPath=./www/ ...
</pre>

Las rutas pasadas a *iris.tmpl()*, tendrían la forma:

```js
iris.tmpl('shopping/screen/products/categories.html', ...);
```

Si especificamos un valor vacío ...

<pre>
node iris_packager input=shopping appPath=./www/ irisBaseUri=   ...
</pre>

Se generarán rutas absolutas:

```js
iris.tmpl('/shopping/screen/products/categories.html', ...);
```

Otro ejemplo:

<pre>
node iris_packager input=shopping appPath=./www/ irisBaseUri=/shopping   ...
</pre>

```js
iris.tmpl('/screen/products/categories.html', ...);
```


**Extensiones** (opcional):

Establece las extensiones que se van a procesar.

Sólo se pueden procesar archivos con extensión *js*, *html* y *css*.

Por defecto se procesarán las tres extensiones *js*, *html*, *css*.

En línea de comandos, se configura con los parámetros **minJs**, **minHtml**, **minCss**. Por ejemplo, para evitar que se *minifiquen* los ficheros *css*:

<pre>
node iris_packager input=shopping/ appPath=./www/ init=./www/js/init.js minCss=false
</pre>

En el fichero *iris_packager.json* el atributo es *extension*. Por ejemplo:

```json
{
	…
	"extension": {
		"js": true,
		"html": true,
		"css": true,
	}
	…
}
```

**Modo prueba** (opcional):

Si se activa, permite conocer los archivos afectados por la *minificación* sin llegar a realizarla.

Este modo sirve para evitar errores, como sobrescribir archivos u olvidar incluir algún archivo.

En línea de comandos se activa con el parámetro *mode=test*

En el fichero *iris_packager.json* el atributo es *mode*.

**Sufijo CSS** (opcional):

La minificación de los ficheros *css*, reemplaza los ficheros *css* encontrados por una versión comprimida. Se puede modificar este comportamiento añadiendo un sufijo al nombre de los ficheros *css* generados de tal forma que los originales permanezcan inalterados.

En línea de comandos, se puede cambiar este comportamiento con el parámetro **cssSuffix**.

Para indicar que no se desean sobrescribir los archivos *css* originales podemos, por ejemplo, usar el sufijo *-min*:

<pre>
node iris_packager ... cssSuffix=-min
</pre>

En el fichero *iris_packager.json* el atributo también es *cssSuffix*.

Para sobrescribir los ficheros originales:

```json
{
	…
	"cssSuffix": ""
	…
}
```

Para poner otro sufijo:


```json
{
	…
	"cssSuffix": "_min"
	…
}
```

**Codificación base64** (opcional):

Permite sustituir las imágenes referenciadas en los ficheros *css* por sus equivalentes en codificación [base64](http://en.wikipedia.org/wiki/Base64).

Por defecto la funcionalidad está desactivada.

Para activarla en línea de comandos el parámetro es *b64*.

<pre>
node iris_packager ... cssSuffix=_min ext=js,html,css b64=true
</pre>

En el fichero *iris_packager.json* el atributo es *base64images*.

```json
{
	…
	"cssSuffix": "_min",
	"extension": {
		"js": true,
		"html": true,
		"css": true,
	},
	"base64images": true
	…
}
```

*iris_packager* no eliminará la imagen original.

**Borrar ficheros procesados** (opcional):

Por defecto, *iris_packager* elimina los ficheros originales que se han utilizado para la *minificación*.

Para evitar que se borren los ficheros originales tras el proceso de minificación en línea de comandos, usamos el parámetro **delete**:

<pre>
node iris_packager ... delete=false
</pre>

En el fichero *iris_packager.json* el atributo es *deleteInputs*.

```json
{
	…
	"deleteInputs": false
	…
}
```

**Atributos js, html y css**

El fichero *iris_packager.json* permite definir los atributos *js*, *html* y *css* para procesar archivos que no tengan las extensiones *.js*, *.html* y *.css*, respectivamente.

No hay un equivalente en la línea de comandos para hacer esto mismo.

Sólo son válidas rutas a archivos, no siendo válidas rutas a directorios o expresiones regulares.

Si por ejemplo, se quisiera incluir algún archivo con extensión *.htm* en vez de *.html*:

```json
{
	…
	"html": ["shopping/index.htm", ...]
	…
}
```

###Script para *iris_packager*

Para facilitar el paso de parámetros desde línea de comandos, podemos crear un *script*:

<pre>
#!/bin/bash
# File packager.sh
# $1 = source directory (contains html and js files)
# $2 = destination directory
# $3 = iris.path file definition
mkdir $2
node iris_packager.js input=$1 output=$2 init=$3
</pre>

Si por ejemplo, este *script* tuviera el nombre *minify.sh*, lo podríamos llamar de esta forma:

<pre>
minify.sh www/shopping/ www/shopping_packed www/js/init.js
</pre>

Tras ejecutar este *script*, obtendremos un fichero llamado *www/shopping_packed/init.js* que contendrá en este orden:

1 El fichero *init.js* *minificado*
2 Todos los ficheros *js* encontrados en *www/shopping*
3 Llamadas al método *iris.tmpl* que almacenan el contenido de los ficheros *html*.

El método *iris.tmpl* recibe dos parámetros, la ruta de acceso al fichero *html* y su contenido.

Tras realizar la minificación, debemos asegurar que el directorio donde hemos almacenado el archivo *minificado*, contiene el resto de archivos que necesita la aplicación: librerías, ficheros de configuración, ficheros de estilo, *index.html*, etc.

##<a name="unit_test"></a>Pruebas de unidad en Iris

Para probar su correcto funcionamiento y detectar errores, se han realizado pruebas de unidad de todos los métodos de Iris. Las pruebas de unidad se han realizado con la librería [QUnit](http://qunitjs.com/).

Las pruebas de unidad son una fuente adicional para conocer el funcionamiento de Iris. Puede consultar las pruebas realizadas en el directorio [test](https://github.com/thegameofcode/iris/tree/master/test).

#<a name="step_by_step"></a>Construyendo paso a paso una aplicación desde cero

En esta sección vamos utilizar Iris para construir una sencilla aplicación que nos permita comprender como integrar todo lo visto anteriormente.

Puede consultar este y otros ejemplos en: [ejemplo]https://github.com/thegameofcode/iris/tree/master/examples)

Puede descargar la aplicación en el siguiente [enlace](https://github.com/thegameofcode/iris/raw/dev/docs/todo-list.tar.gz). Para probar la aplicación debe descomprimirla y desplegarla en un servidor Web (Apache, Node.js, etc). Si tiene instalado *Grunt* puede, simplemente, situarse en el directorio raíz de la aplicación y ejecutar el comando *grunt*.

Puede probar el funcionamiento de la aplicación en el siguiente [enlace](http://thegameofcode.github.io/iris/examples/todo-list/index.html).

La aplicación permite añdir tareas y marcarlas como realizadas y no realizadas al estilo de [TodoMVC](http://todomvc.com/)

##<a name="directories"></a>Estructura de directorios

En Iris debemos crear un fichero *html* y otro *js* por cada componente. En aplicaciones de tamaño medio/grande, lo normal es que haya decenas e incluso centenares de archivos. Es importante que, desde el principio, definamos una estructura de directorios que nos permita localizar fácilmente cada uno de estos archivos.

En nuestro caso, como son pocos archivos, vamos tenerlos todos en un directorio llamado *app*.

##<a name="step_by_step_welcome"></a>*Screen* Welcome

En esta sección vamos a preparar la aplicación para que sea capaz de ejecutar el *Screen* de bienvenida.

Estos son los ficheros necesarios y su contenido:

En *index.html*:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Iris • TodoMVC</title>
    <link rel="stylesheet" href="css/base.css">
    <!--[if IE]>
    <script src="js/ie.js"></script>
    <![endif]-->
</head>
<body>
    <script src="app/jquery-2.0.3.min.js" type="text/javascript"></script>
    <script src="app/iris.js" type="text/javascript"></script>
    <script src="app/init.js" type="text/javascript"></script>
</body>
</html>
```

Este fichero contiene la estructura clásica de una página *html*.

Centremos nuestra atención en el fichero *init.js*:

```js
// define iris components paths
iris.path = {
    welcome : { js: "welcome.js", html: "welcome.html" },
    todo: { js: "todo.js", html : "todo.html" },
    resource : "resource.js"
};


$(window.document).ready(

    function () {
        // set the iris components base uri
        iris.baseUri("app/");

        // show the initial screen
        iris.welcome(iris.path.welcome.js);
    }
);
```

Lo primero que hacemos es definir el objeto *iris.path* que contiene un *mapeo* de las rutas de acceso a los componentes que vamos a utilizar. Después cargamos el *Screen* Welcome.

En *welcome.js*:

```js
iris.screen(function(self) {

    var todos = iris.resource(iris.path.resource);

    self.create = function() {
        self.tmpl(iris.path.welcome.html);

        self.get("new-todo").on("keyup", function (e) {
            if ( e.keyCode === 13 && this.value.trim() !== "" ) {
                todos.add(this.value);
                this.value = "";
            }
        });

        self.get("toggle-all").on("change", function (e) {
            var completed = self.get("toggle-all").prop("checked");
            todos.setAll( completed );
        });

        self.get("clear-completed").on("click", todos.removeCompleted);

        // Resource events
        self.on(todos.CREATE_TODO, function (id) {
            self.ui("todo-list", iris.path.todo.js, {id: id}).render().show();
            render();
        });

        self.on(todos.DESTROY_TODO, render);
        self.on(todos.CHANGE_TODO, render);

        todos.init();
        render();
    };

    self.awake = function () {
        var filter = self.param("filter");
        if ( filter ) {
            todos.setFilter(filter);

            var $footer = self.get("footer");
            $(".selected", $footer).removeClass("selected");
            $("a[href='#?filter=" + filter + "']", $footer).addClass("selected");

            var uis = self.ui("todo-list");
            for (var i = 0; i < uis.length; i++ ) {
                uis[i].render();
            }
        }
    };

    function render () {
        var count = todos.count();
        self.inflate({
            completed: "Clear completed (" + count.completed + ")",
            remaining: {
                count: count.remaining,
                text: "item" + (count.remaining !== 1 ? "s " : " ") + "left" 
            },
            hasTodos: (count.total !== 0),
            hasRemainings: (count.completed > 0),
            noRemainingTodos: (count.remaining === 0)
        });
    }

}, iris.path.welcome.js);
```

Lo más relevante de este fichero es:

* Almacenamos en una variable llamada *todos* el resource que nos permite acceder a los métodos de dominio como se explica más adelante.
* En el método *create* gestionamos los eventos de los componentes que trabajan con la lista completa: añadir una tarea, cambiar el estados de todas los tareas, borrar tareas completadas, etc.
* Añadimos manajadores de eventos que permitan actualizar la vista cuando sea necesario: se borra una tarea, se cambia su estado, se añade una tarea.
* Cuando se cree una tarea, se creará un UI de tipo *todo.js* pasándole su *id* que se recibirá en la gestión del evento y llamando a su método *render*.
* Tiene una función *render* que permite actualizar la vista cuando cambie su estado.
* El método *awake* será llamado cuando pulsemos sobre unos de los filtros de tareas completadas, activas y todas. Este método llamará al *render* de cada uno de los UI que representan las *tareas*.

Finalmente, el fichero *welcome.html* contendrá:

```html
<div>

  <section id="todoapp">
    <header id="header">
      <h1>todos</h1>
      <input id="new-todo" data-id="new-todo" placeholder="What needs to be done?" autofocus>
    </header>
    
    <section id="main">
      <input id="toggle-all" data-id="toggle-all" type="checkbox" data-jq-toggle="hasTodos" data-jq-prop-checked="noRemainingTodos">
      <label for="toggle-all">Mark all as complete</label>
      <ul id="todo-list" data-id="todo-list"></ul>
    </section>

    <footer id="footer" data-id="footer" data-jq-toggle="hasTodos">
      <span id="todo-count"><strong data-jq-text="remaining.count"></strong> <span data-jq-text="remaining.text"></span></span>
      <ul id="filters">
        <li>
          <a class="selected" href="#;filter=all">All</a>
        </li>
        <li>
          <a href="#;filter=active">Active</a>
        </li>
        <li>
          <a href="#;filter=completed">Completed</a>
        </li>
      </ul>
      <button id="clear-completed" data-id="clear-completed" data-jq-text="completed" data-jq-toggle="hasRemainings"></button>
    </footer>
  </section>
  <footer id="info">
    <p>Double-click to edit a todo</p>
    <p>Created by <a href="http://thegameofcode.github.io/iris" target="_blank">Iris</a></p>
    <p>Part of <a href="http://todomvc.com" target="_blank">TodoMVC</a></p>
  </footer>

</div>
```

Tiene un encabezado que permite añadir tareas, una parte central que muestra la lista de tareas y permite marcarlas como realizadas y borrarlas y un pie que muestra cuantas tareas hay y permite aplicar filtros.

##<a name="step_by_step_todoUI"></a>*UI* Todo

El UI Todo contiene cada una de las tareas.

En *todo.js*:


```js
iris.ui(function (self) {

    self.settings({
        id : null
    });

    var todos = iris.resource(iris.path.resource);

    self.create = function() {
        
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.todo.html);

        self.get("check").on("click", function () {
            todos.toggle(self.setting("id"));
        });

        self.get("destroy").on("click", function () {
            todos.remove(self.setting("id"));
        });

        self.get().on("dblclick", function () {
            self.get().addClass("editing");
            self.get("text").select();
        });

        self.get("text").on("blur change", function (e) {
            if ( !self.get().hasClass("editing") ) {
                return; 
            } 

            self.get().removeClass("editing");
            if ( this.value.trim() !== "" ) {
                todos.edit(self.setting("id"), this.value);
            }

        });

        self.on(todos.DESTROY_TODO, function (id) {
            if (self.setting("id") === id) {
                self.destroyUI();
            }
        });

        self.on(todos.CHANGE_TODO, function (id) {
            if (self.setting("id") === id) {
                self.render();
            }
        });
    };



    self.render = function () {
        var todo = todos.getTodo(self.setting("id"));
        self.get().toggleClass("completed", todo.completed);
        self.inflate({todo: todo});
        return self;
    };

    self.show = function () {
        self.get().hide().fadeIn("slow");
        return self;
    };

},iris.path.todo.js);
```

En *todo.html*:

```html
<li>
    <div class="view" data-jq-toggle="todo.visible">
      <input data-id="check" class="toggle" type="checkbox" data-jq-prop-checked="todo.completed">

      <label data-jq-text="todo.text"></label>
      
      <button data-id="destroy" class="destroy"></button>
    </div>

    <input data-id="text" data-jq-val="todo.text" class="edit">
</li>
```

* En el método *create* se gestionan los eventos que se pueden realizar con una tarea.
* El método *render* permite actualizar la visualización de un tarea.
* El método *show* oculta o visualiza la tarea en función del filtro aplicado.
* Obsérvese que el método *self.settings* asigna la variable *id* a *null*. Esta variable será pasada en la creación de la tarea. Es una buena práctica asignar, usando *self.settings* y al principio del propio componente, todas las variables que requiera un componente de Iris a un valor por defecto para evitar errores inesperados y como forma de documentar el componente.

##<a name="step_by_step_resource"></a>Todo resource

El fichero de recurso *resource.js* contiene la lógica de la aplicación:

```js
iris.resource(function (self) {

    // Resource Events
    self.CREATE_TODO = "create-todo";
    self.DESTROY_TODO = "destroy-todo";
    self.CHANGE_TODO = "change-todo";

    var todos = {},
        ids = [],
        currentFilter = "all",
        id = 0;

    self.reset = function() {
        todos = {};
        ids = [];
        currentFilter = "all";
        localStorage.clear();
        id = 0;
    };

    self.init = function () {
        console.log("Reading todos from storage... ");
        var idsSaved = localStorage.getItem("ids");
        if ( idsSaved ) {
            ids = idsSaved.split(",");
        }

        var todoString, todo, f, F;
        for (f = 0, F = ids.length; f < F; f++) {
            todoString = localStorage.getItem("todo_" + ids[f]);

            todo = JSON.parse(todoString);
            todos[todo.id] = todo;

            if(todo.id > id) {
                id = todo.id;
            }

            iris.notify(self.CREATE_TODO, todo.id);
        }
    };

    self.add = function (text) {
        id++;
        var todo = {id: String(id), text: text, completed: false};
        todos[todo.id] = todo;
        saveTodo(todo);
        
        ids.push(todo.id);
        localStorage.setItem("ids" , ids.join(","));
        
        iris.notify(self.CREATE_TODO, todo.id);
        return todo.id;
    };

    self.getTodo = function (id) {
        var todo = todos[id];
        todo.visible = currentFilter === "all" || 
        (todo.completed && currentFilter === "completed") ||
        (!todo.completed && currentFilter === "active");
        return $.extend({}, todo);
    };

    self.remove = function (id) {
        removeTodo(todos[id]);
        iris.notify(self.DESTROY_TODO, id);
    };

    self.toggle = function (id) {
        var todo = todos[id];
        todo.completed = !todo.completed;
        saveTodo(todo);

        iris.notify(self.CHANGE_TODO, todo.id);
    };

    self.removeCompleted = function () {
        for (var id in todos ) {
            var todo = todos[id];
            if (todo.completed) {
                removeTodo(todo);
                iris.notify(self.DESTROY_TODO, todo.id);
            }
        }
    };

    self.setAll = function (completed) {
        for (var id in todos ) {
            var todo = todos[id];
            if ( todo.completed !== completed ) {
                todo.completed = completed;
                saveTodo(todo);
                iris.notify(self.CHANGE_TODO, todo.id);
            }
        }
    };

    self.edit = function (id, text) {
        var todo = todos[id];
        todo.text = text;
        saveTodo(todo);
        iris.notify(self.CHANGE_TODO, todo.id);
    };

    self.setFilter = function (filter) {
        console.log("Set filter = " + filter);
        currentFilter = filter;
    };

    self.count = function () {
        var remaining = 0;
        var total = ids.length;

        for ( var id in todos ) {
            if ( !todos[id].completed ) {
                remaining++;
            }
        }
        return { remaining: remaining, total: total, completed: total - remaining };
    };

    function saveTodo (todo) {
        console.log("Saving todo name[" + todo.text + "]");
        localStorage.setItem("todo_" + todo.id, JSON.stringify(todo));
    }

    function removeTodo (todo) {
        delete todos[todo.id];

        var key = "todo_" + todo.id;
        localStorage.removeItem(key);

        ids.splice(ids.indexOf(todo.id), 1);
        localStorage.setItem("ids" , ids.join(","));
    }

}, iris.path.resource);
```

* Tiene métodos que permiten realizar las acciones previstas: añadir, borrar, modificar, etc.
* La información se almacena en un objeto llamado *todos*.
* No contiene elementos de la interfaz de usuario y se comunica con esta a través de eventos de Iris y de métodos.
* Al ser una aplicación de ejemplo, usa el objeto *localStorage* del navegador en lugar de una base de datos.


##<a name="step_by_step_qunit"></a>Pruebas unitarias con *QUnit*

*[QUnit](http://qunitjs.com/)* es una librería para realizar [pruebas unitarias](http://es.wikipedia.org/wiki/Prueba_unitaria) que pertenece al proyecto [JQuery](http://jquery.com/).

Con *QUnit* podemos realizar tanto pruebas síncronas como asíncronas así como probar eventos de la interfaz de usuario.

*QUnit* permite agrupar las pruebas en módulos. En nuestro ejemplo no vamos a utilizar módulos pero en aplicaciones grandes esto es muy conveniente.

Las pruebas de unidad deben ser atómicas, es decir, que una prueba no debe depender de los resultados o de las acciones realizadas en otra prueba de unidad. Para facilitar esto, *QUnit* tiene la posibilidad de asociar a cada módulo las funciones *setup* y *teardown* y en ellas definir lo que queremos que se haga antes y después de cada test, respectivamente.

Previamente creamos una página Web que cargue todas las librerías necesarias y la llamamos, por ejemplo, *index.html*:

```html
<!DOCTYPE html>
<html>
<head>
<link href="../css/qunit-1.13.0.css" rel="stylesheet" type="text/css" />
<script src="../app/qunit-1.13.0.js"></script>
<script src="../app/jquery-2.0.3.min.js"></script>
<script src="../app/iris.js" type="text/javascript"></script>
<script>
    QUnit.config.autostart = false;

    // define iris components paths
    iris.path = {
        welcome : { js: "welcome.js", html: "welcome.html" },
        todo: { js: "todo.js", html : "todo.html" },
        resource : "resource.js"
    };

    $(window.document).ready(

        function () {
            // set the iris components base uri
            iris.baseUri("../app/");

            // show the initial screen
            iris.welcome(iris.path.welcome.js);

            iris.on(iris.AFTER_NAVIGATION, function () {
                todos = iris.resource(iris.path.resource);
                QUnit.start();
            });

        }
    );

</script>
<script src="./js/todo.js"></script>
<meta name="description" content="Todo List" />
<meta charset='utf-8' />
<title>Todo List</title>
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
</body>
</html>
```


Vamos a crear un fichero *todos.js* que permita probar las funciones contenidas en el resource *resource.js*.

```js
//in todos.js
QUnit.testStart(function() {
    todos.reset();
    todos.add("Go to the class");
    todos.add("Go to the doctor");
});

test("addTodo Test", function() {
    var count = todos.count();
    todos.add("Do my homework");
    ok(todos.count().total === count.total + 1, "Added one todo");
    ok(todos.count().remaining === count.remaining + 1, "Added one remaining todo");
    ok(todos.count().completed === count.completed, "The completed todos stay the same");
});

test("getTodo Test", function() {
    var id = todos.add("Go to the cinema");
    ok(todos.getTodo(id).id === id, "Todo retrieved"); 
});

test("delTodo Test", function() {
    var id = todos.add("Go to the class");
    var count = todos.count();
    var todo = todos.getTodo(id);
    todos.remove(id);
    window.throws(function() {
        todos.getTodo(id);
    }, "Todo has been deleted");
    ok(todos.count().total === count.total - 1, "Deleted one todo");
    ok(todos.count().remaining === count.remaining - 1, "Deleted one remaining todo");
    ok(todos.count().completed === count.completed, "The completed todos stay the same");
    
});


test("updateTodo Test", function() {
    var id = todos.add("Go to the class");
    ok(todos.getTodo(id).text === "Go to the class", "Before: Todo has the correct text");
    todos.edit(id, "Snap");
    ok(todos.getTodo(id).text === "Snap", "After: Todo has the correct text");
});

test("checkTodo Test", function() {
    var id = todos.add("Go to the class");
    var count = todos.count();
    ok(todos.getTodo(id).completed === false, "Before: Todo has not been completed");
    todos.toggle(id);
    ok(todos.getTodo(id).completed === true, "After: Todo has been completed");
    ok(todos.count().total === count.total, "The todos number stay the same");
    ok(todos.count().remaining === count.remaining - 1, "There is one remaining todo less");
    ok(todos.count().completed === count.completed + 1, "There is one completed todo more");
    todos.toggle(id);
    ok(todos.getTodo(id).completed === false, "After: Todo has not been completed");
    ok(todos.count().total === count.total, "The todos number stay the same");
    ok(todos.count().remaining === count.remaining, "There is one remaining todo more");
    ok(todos.count().completed === count.completed, "There is one completed todo less");
});

test("checkAll Test", function() {
    var id = todos.add("Go to the class");
    var count = todos.count();
    ok(todos.getTodo(id).completed === false, "Before: Todo has not been completed");
    todos.setAll(true);
    ok(todos.getTodo(id).completed === true, "After: Todo has been completed");
    ok(todos.count().total === count.total, "The todos number stay the same");
    ok(todos.count().remaining === 0, "There are no remaining todos");
    ok(todos.count().completed === todos.count().total, "All todos are completed");
});

test("delChecked Test", function() {
    var id = todos.add("Go to the class");
    var id2 = todos.add("Go to the doctor");
    var count = todos.count();
    todos.toggle(id2);
    todos.removeCompleted();
    window.throws(function() {
        todos.getTodo(id2);
    }, "Todo has been deleted");
    ok(todos.count().total === count.total - 1, "There is one todo less");
    ok(todos.count().remaining === todos.count().total, "All todos are pending");
    ok(todos.count().completed === 0, "There are no completed todos");
});


test("filterTodos Test", function() {
    var id = todos.add("Go to the class");
    todos.setFilter('all');
    ok(todos.getTodo(id).visible === true, "Filter all: Any todo is visible");
    todos.toggle(id);
    ok(todos.getTodo(id).visible === true, "Filter all: Any todo is visible");
    todos.setFilter('completed');
    ok(todos.getTodo(id).visible === true, "Filter completed: Completed todos are visible");
    todos.toggle(id);
    ok(todos.getTodo(id).visible === false, "Filter completed: Remaining todos are invisible");
    todos.setFilter('active');
    ok(todos.getTodo(id).visible === true, "Filter active: Remaining todos are visible");
    todos.toggle(id);
    ok(todos.getTodo(id).visible === false, "Filter completed: Completed todos are invisible"); 
    todos.setFilter('bad');
    ok(todos.getTodo(id).visible === false, "Filter bad: All todos are invisible");
    todos.toggle(id);
    ok(todos.getTodo(id).visible === false, "Filter bad: All todos are invisible");
});
```

En QUnit, para realizar un test síncrono hay que llamar a la función *test* de *QUnit* y, de forma similar, a la función *asyncTest* cuando el test sea asíncrono. Los test asíncronos no comienzan a ejecutarse hasta que no se llame a la función *start*. La función *expect* indica el número de tests que se deben pasar exitosamente para que *QUnit* considere el caso de prueba como positivo.

##<a name="step_by_step_grunt"></a>Automatizando procesos con *Grunt*

*[Grunt](http://gruntjs.com/)* es una librería de *Javascript* que permite automatizar todo tipo de tareas como: validar el código, ejecutar pruebas de unidad, compactar y *minificar* la aplicación, arrancar un servidor [Node.js](http://nodejs.org/) y desplegar la aplicación en él, etc.

Para utilizar *Grunt* previamente hay que instalar [Node.js](http://nodejs.org/) y después instalar *Grunt* con el siguiente comando ejecutado desde el terminal:

```
npm install -g grunt
```

Los ficheros de configuración de *Grunt* de la aplicación son:

En *package.json* definimos la aplicación que estamos creando y sus dependencias:

```js
{
  "name": "todo-list",
  "repository": {
    "type": "git",
    "url": "https://github.com/thegameofcode/iris.git"
  },
  "scripts": {
    "test": "grunt"
  },
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-contrib-watch": "~0.3.1",
    "grunt-contrib-jshint": "~0.4.3",
    "grunt-contrib-qunit": "~0.2.1",
    "grunt-http-server": "~0.0.4"
  }
}
```

Para instalar las dependencias, nos situamos el en directorio en el que se encuentre el fichero *package.json* y ejecutamos:

```
npm install
```

En *todo.json* podemos definir las variables que queramos que use *Grunt*:

```js
{
  "name": "todo-list",
  "title": "Todo List",
  "description": "This is a simple example of using Iris.",
  "version": "0.0.1-SNAPSHOT",
  "homepage": "http://localhost:8080",
  "author": {
    "name": "Iris",
    "url": "https://github.com/thegameofcode"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/thegameofcode/iris.git"
  },
  "bugs": {
    "url": "https://github.com/thegameofcode/iris/issues"
  },
  "licenses": [
    {
      "type": "New-BSD",
      "url": "https://github.com/thegameofcode/iris.git/blob/master/LICENSE-New-BSD"
    }
  ],
  "dependencies": {
    "iris": "0.5.6",
    "jquery": "1.5.1"
  },
  "keywords": []
}
```

Y en *Gruntfile.js* definimos y configuramos las tareas que queramos automatizar:

```js
/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:todo.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        qunit: {
          all: {
            options: {
              urls: [
                'http://127.0.0.1:8080/test/index.html'
              ]
            }
          }
        },
        jshint: {
          uses_defaults: ['Gruntfile.js', 'app/init.js', 'app/todo.js', 'app/resource.js', 'app/welcome.js', 'test/js/*.js'],
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
            browser: true,
            globals: {
              jQuery: true,
              iris: true,
              $: true,
              ok: true,
              todos: true,
              test: true,
              console: true,
              QUnit: true,
              stop: true,
              start: true
            }
          }
        },
        'http-server': {
            'test': {
                    root: ".",
                    port: 8080,
                    host: "127.0.0.1",
                    showDir : true,
                    autoIndex: true,
                    defaultExt: "html",
                    runInBackground: true
            },
            'default': {
                    root: ".",
                    port: 8080,
                    host: "127.0.0.1",
                    showDir : true,
                    autoIndex: true,
                    defaultExt: "html",
                    runInBackground: false
            }
        }
    });

    // Default task.    
    grunt.registerTask('test', ['jshint', 'http-server:test', 'qunit']);

    grunt.registerTask('default', ['jshint', 'http-server:default']);

    // Loading dependencies
    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) {
          grunt.loadNpmTasks(key);
        }
    }
};
```

Si queremos validar el código, debemos abrir un terminal y, estando en el directorio en el que está *Gruntfile.js*, ejecutar:

```
grunt jshint
```

Para desplegar nuestra aplicación en un servidor de *Node.js* debemos asegurarnos que lo tenemos instalado en el sistema y ejecutar:

```
grunt
```

Para ejecutar la aplicación debemos poner el la barra de direcciones del navegador: [http://localhost:8080](http://localhost:8080)

Para ejecutar los tests debemos poner el la barra de direcciones del navegador: [http://localhost:8080/test](http://localhost:8080/test)

Por último, para realizar las pruebas desde el terminal y no tener que abrir el navegador, debemos instalar primero [PhantomJS](http://phantomjs.org/) y luego ejecutar:

```
grunt test
```