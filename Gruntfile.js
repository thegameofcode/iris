/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('iris.json'),
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
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        'dist/<%= pkg.name %>.min.js': ['<banner:meta.banner>', '<config:concat.dist.dest>']
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8080/test/iris.html'
          ]
        }
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      uses_defaults: [/*'grunt.js',*/ 'src/**/*.js', 'test/**/*.js'],
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
          $: true
        }
      }
    }
  });

  grunt.registerTask('server', 'Start a custom echo web server', function() {
    var server = require('./echo-server');
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'server', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('test', ['jshint', 'server', 'watch']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
};
