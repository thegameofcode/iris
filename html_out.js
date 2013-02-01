iris.tmpl('examples/todo-list/app/screen/welcome.html','<div>  <section id="todoapp" class="filter-all">    <header id="header">      <h1>todos</h1>      <input data-id="new-todo" placeholder="What needs to be done?" autofocus="" class="new-todo">    </header>    <section id="main" style="display: block;">        <input data-id="toggle-all" type="checkbox" class="toggle-all">        <label for="toggle-all">Mark all as complete</label>        <ul id="todo-list" data-id="todo-list"></ul>    </section>        <footer data-id="footer" class="footer" style="display: block;">      <span id="todo-count">        <strong data-id="todo-count">0</strong>        <span class="todo-count-title">item</span> left      </span>      <ul data-id="filters" class="filters">        <li>          <a href="#?filter=all" class="selected">All</a>        </li>        <li>          <a href="#?filter=active">Active</a>        </li>        <li>          <a href="#?filter=completed">Completed</a>        </li>      </ul>      <button data-id="clear-completed" style="display: none;" class="clear-completed"></button>          </footer>  </section>  <footer id="info">    <p>Double-click to edit a todo</p>    <p>Port of the brunch <a href="http://todomvc.com/labs/dependency-examples/chaplin-brunch/public/">todos example</a> app</p>    <p>Part of <a href="http://github.com/iris-js/iris">iris-js</a></p>  </footer></div>');
iris.tmpl('examples/todo-list/app/ui/todo_item.html','<li><div class="view">  <input data-id="check" class="toggle" type="checkbox">  <label data-model="text"></label>    <button data-id="destroy" class="destroy"></button></div><input data-id="text" data-model="text" class="edit" value=""></li>');
iris.tmpl('examples/basic/app/screen/welcome.html','<div style=\'height:100%;\'><div style=\'display: table;\'><div style=\'display: table-cell;width:300px;vertical-align: top;padding-right:20px;\'><h2>Iris Examples</h2><ul class=\'menu\'><li><a href="#/instance">Replace a template element with a new UI</a></li><li><a href="#/list">Create a group of UIs and add all them to a parent component (List)</a></li><li><a href="#/destroy">Destroy a UI child from a parent container</a></li><li><a href="#/destroy-all">Destroy all UI childs from a parent container</a></li><li><a href="#/template-parameters">Template Parameters</a></li><li><a href="#/screen-parameters">Screen Parameters</a></li><li><a href="#/nested-uis">Nested UIs</a></li></ul></div><div data-id=\'screens\' style=\'width:700px;display:table-cell;vertical-align:top;padding-left:20px;border-left:1px solid #000;\'></div></div></div>');
iris.tmpl('examples/basic/app/screen/example_destroy.html','<div><h1>Destroy a UI child from a parent container</h1>    <p>The list item creation is explained <a href="#list">here</a></p>    <p>Example template:</p>    <pre>&lt;div&gt;    &lt;button data-id="btncreateUI"&gt;Create a new UI&lt;/button&gt;    &lt;br&gt;UI Index:    &lt;input data-id=\'idx\' type=\'number\' value=\'0\' /&gt;    &lt;button data-id=\'btn_destroy\'&gt;Destroy&lt;/button&gt;    &lt;br&gt;Container:    &lt;div data-id=\'container\'&gt;&lt;/div&gt;&lt;/div&gt;</pre>    <p>All UIs are registered into <code>uiList</code> Array:</p>    <pre>iris.screen(function(self) {    var uiList = []    ,   inputIdx    ;        self.create = function() {        self.tmpl("screen/example_destroy.html");        self.get("btncreateUI").click(createUI);        self.get("btn_destroy").click(deleteUI);        inputIdx = self.get("idx");            }    function createUI() {        uiList.push(            self.ui("container", iris.path.ui_example)        );    }    function deleteUI() {        var idx = inputIdx.val();        self.DestroyUI(uiList[idx]);        uiList.splice(idx, 1);    }});</pre>    <p>Try it:</p><p><button data-id="btncreateUI">Create a new UI</button></p><br><p>UI Index:<input data-id=\'idx\' type=\'number\' value=\'0\' /><button data-id=\'btn_destroy\'>Destroy</button></p><br>Container:<div data-id=\'container\'></div></div>');
iris.tmpl('examples/basic/app/screen/example_destroy_all.html','<div><h1>Destroy all UI childs from a parent container</h1><p>The list item creation is explained <a href="#list">here</a></p><p>The UI generated will be append to the container with <code>data-id</code> "uis".</p>    <pre>self.destroyUIs("uis");</pre>    <p>Try it:</p>    <button data-id="btncreateUI">Create a new list UI</button><button data-id=\'btn_destroy_all\'>Destroy All UIs</button><br>Container:<div data-id=\'uis\'></div></div>');
iris.tmpl('examples/basic/app/screen/example_instance.html','<div><h1>Replace a template element with a new UI:</h1><p>The container will be replaced by the UI generated.</p><pre>self.ui("container_to_replace", iris.path.ui_example_basic);</pre><p>Template:</p><pre>&lt;div&gt;  &lt;div data-id=\'container_to_replace\'&gt;Container content&lt;/div&gt;&lt;div&gt;</pre><p>To append UIs instead of replace set the <i>Template Mode</i> to <a href="#list">self.APPEND</a></p>    <p>Try it:</p><button data-id="btncreateUI">Create a new UI</button><div data-id=\'container\'>Container content</div></div>');
iris.tmpl('examples/basic/app/screen/example_list.html','<div><h1>Create a group of Instance UIs and add all them to a parent component</h1><p>The UI generated will be append to the container.</p>    <pre>self.ui("container_to_append", iris.path.example);</pre>        <p>Template:</p>    <pre>&lt;div&gt;  &lt;div data-id=\'container_to_append\'&gt;List container content&lt;/div&gt;&lt;div&gt;</pre><p><b>Important</b>: The child UI must have its <i>Template Mode</i> set to <code>self.APPEND</code></p><pre>iris.ui(function (self) {    self.create = function() {        self.tmplMode(self.APPEND);        self.tmpl("ui/example.html");    }}</pre><p>The default value of <i>Template Mode</i> is <a href="#instance">self.REPLACE</a></p>    <p>Try it:</p><button data-id="btncreateUI">Create a new list UI</button><div data-id=\'container\'>List container content</div></div>');
iris.tmpl('examples/basic/app/screen/example_nested_uis.html','<div><h1>Nested UIs</h1>        <p>UI Code:</p>        <pre>iris.ui(function (self) {    self.create = function() {                self.tmplMode(this.APPEND);        self.tmpl("ui/nested.html");        self.get("create_ui").click(createNestedUI);    };        function createNestedUI () {        self.ui("uis", iris.path.ui_nested);    }});</pre>         <p>Template:</p>    <pre>&lt;div style=\'border: 1px solid #000;margin:10px;\'&gt;    &lt;p data-id=\'label\'&gt;Nested UI&lt;/p&gt;    &lt;button data-id="create_ui"&gt;Create a new UI&lt;/button&gt;&lt;/div&gt;</pre>        Try it:    <div data-id="uis"></div></div>');
iris.tmpl('examples/basic/app/screen/example_screen_params.html','<div><h1>Screen Parameters</h1><p>A quick example to explain how to send parameters to screens.</p><p>Parameter value:<input data-id=\'input_param_value\' type=\'text\' value=\'example@example.org\' /><button data-id=\'btn_send\' type=\'button\'>Send parameter</button></p><div data-id=\'step1\'>1. Using <code>iris.navigate()</code> to visit a child screen and sending a example parameter:<pre data-id=\'code_example\'></pre><p><b>Important</b>: The parameter value must be encoded using <code>encodeURIComponent()</code></p></div><div data-id=\'screens\' style=\'border:1px solid #ccc;padding:20px;\'>Screen Container</div></div>');
iris.tmpl('examples/basic/app/screen/example_screen_params_child.html','<div><h2>Child Screen</h2><p>2. This is the child screen what receives the parameter value from <code>self.awake(params)</code> and print it:</p><pre>...self.awake = function(params) {self.get("screen_param").text(params["parameter"]);}...</pre><p>Its template:</p><pre>&lt;div&gt;...Screen Parameter = &lt;span data-id=\'screen_param\' style=\'color:green;\'&gt;&lt;/span&gt;&lt;/p&gt;...&lt;/div&gt;</pre><p>Result:</p><p>Screen Parameter = <span data-id=\'screen_param\' style=\'color:green;\'></span></p></div>');
iris.tmpl('examples/basic/app/screen/example_template_params.html','<div><h1>Template Parameters</h1><p>You can see a real example in this page:</p><p>1. Use <code>self.tmpl(p_htmlUri, params)</code></p><pre>self.create = function() {var params = { "price" : 1499.99,"date" : new Date(),"object" : {"property" : "This is a object property value"}};self.tmpl("screen/example_template_params.html", params);}</pre><p>2. See how these parameters are printed:</p><div class=\'test\'><h3>Number</h3><pre>## price ##</pre><span>##price##</span></div><div class=\'test\'><h3>Currency</h3><pre>## price|currency ##</pre><span>##price|currency##</span></div><div class=\'test\'><h3>Date</h3><pre>## date|date ##</pre><span>##date|date##</span></div><div class=\'test\'><h3>Custom Date</h3><pre>## date|date(y - m - d) ##</pre><span>##date|date(y - m - d)##</span></div><div class=\'test\'><h3>Object Property</h3><pre>## object.property ##</pre><span>##object.property##</span></div><p>3. The current Locale is <code>es-ES</code> therefore the used regional format is:</p><pre>{ dayNames : ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],monthNames : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],dateFormat : "d/m/Y H:i:s",currency : { formatPos : "n",formatNeg : "-n",decimal : ",",thousand : ".",precision : 2}}</pre><p>You can create a custom Regional using <code>iris.Regional()</code>.</p></div>');
iris.tmpl('examples/basic/app/ui/example.html','<div style=\'border: 1px solid #000;margin-top:5px;padding:5px;\'><p data-id=\'label\'>UI list item</p></div>');
iris.tmpl('examples/basic/app/ui/example_basic.html','<div style=\'border: 1px solid #000;\'><h1>This is a basic UI</h1></div>');
iris.tmpl('examples/basic/app/ui/nested.html','<div style=\'border: 1px solid #000;margin:10px;\'><p data-id=\'label\'>Nested UI</p><button data-id="create_ui">Create a new UI</button><div data-id="uis"></div></div>');