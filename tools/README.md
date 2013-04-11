# Iris packager

Iris packager is an `nodejs` script to compress and concat all iris' components.

## Parameters

### input (optional)
Input folder paths, eg: `input='app/ui,app/screen'`
Default value = `"*"`

### base (optional)
It's excluded from `iris.tmpl` first parameter and it's prepend in all input data paths, eg: `base='app/'`
For the template `app/ui/template.html`, it will create `iris.tmpl('ui/template.html', ... );`
Default value = `""`

### init
Iris' initial script that contains `iris.path` declaration, eg: `init='app/init.js'`

### output
Output folder path, eg: `output='packed/app'`

### ext


## Example
You can view a complete example [here](/examples/todo-list/packager.sh).
* Execute this script, then a `packed` folder is created.
* Execute `grunt test` at root project folder.
* You can test it visiting `http://localhost:8080/examples/todo-list/packed/index.html` in your browser.
