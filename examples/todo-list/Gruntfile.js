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
                'http://localhost:8080/test/index.html'
              ]
            }
          }
        },
        jshint: {
          uses_defaults: ['grunt.js', 'app/**/*.js', 'test/js/*.js'],
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
            test: {
                    root: ".",
                    port: 8080,
                    host: "127.0.0.1",
                    showDir : true,
                    autoIndex: true,
                    defaultExt: "html",
                    runInBackground: true
            },
            default: {
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
        if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    }
};