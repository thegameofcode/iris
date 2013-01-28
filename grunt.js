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
        src: ['<banner:meta.banner>', 'src/event.js', 'src/core.js', 'src/lang.js', 'src/regional.js', 'src/util.js', 'src/component.js', 'src/resource.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }/*,
      legacy: {
        src: ['<config:concat.dist.dest>', 'src/legacy.js'],
        dest: 'dist/<%= pkg.name %>-legacy-<%= pkg.version %>.js'
      }*/
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }/*,
      legacy: {
        src: ['<banner:meta.banner>', '<config:concat.legacy.dest>'],
        dest: 'dist/<%= pkg.name %>-legacy-<%= pkg.version %>.min.js'
      }*/
    },
    qunit: {
      all: ['http://localhost:8080/test/iris.html']
    },
    lint: {
      files: [/*'grunt.js',*/ 'src/**/*.js', 'test/**/*.js']
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
        $: true
      }
    },
    uglify: {}/*,
    server: {
      port: 8080,
      base: '.'
    }*/
  });

  grunt.registerTask('server', 'Start a custom echo web server', function() {
    var server = require('./echo-server');
  });

  // Default task.
  grunt.registerTask('default', 'lint server qunit concat min');

  
  grunt.registerTask('test', 'lint server watch');

};
