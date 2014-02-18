[Iris homepage](https://github.com/thegameofcode/iris) | [Documentation table of contents](toc.md)

# Iris Life Cycle

There are four methods almost all screens will implement:

* <code>create()</code> is where you initialize your screen. Most importantly, here you will usually call <code>iris.tmpl()</code> with a template resource defining your UI, and using <code>self.get()</code> to retrieve the components in that UI that you need to interact with programmatically.

* <code>awake()</code> is where you can add event listeners, execute intervals or initialize heavyweight tasks as play sound or video.

* <code>sleep()</code> is where you deal with the user leaving your screen. Most importantly, remove event listeners or stop heavyweight tasks.

* <code>destroy()</code> is where you will perform operations after screen dying.

![Iris Life Cycle](images/iris-lifecycle-diagram.png)
