[Iris homepage](https://github.com/iris-js/iris) | [Documentation table of contents](toc.md)

# Iris Life Cycle

There are four methods almost all screens will implement:

* <code>Create()</code> is where you initialize your screen. Most importantly, here you will usually call <code>iris.Template()</code> with a template resource defining your UI, and using <code>self.$Get()</code> to retrieve the components in that UI that you need to interact with programmatically.

* <code>Awake()</code> is where you can add event listeners, execute intervals or initialize heavyweight tasks as play sound or video.

* <code>Sleep()</code> is where you deal with the user leaving your screen. Most importantly, remove event listeners or stop heavyweight tasks.

* <code>Destroy()</code> is where you will perform operations after screen dying.

![Iris Life Cycle](http://iris-js.github.com/iris/images/iris-lifecycle-diagram.png)