/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('iris.json'),
    meta: {
      
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'src/event.js', 'src/core.js', 'src/lang.js', 'src/regional.js', 'src/util.js', 'src/component.js', 'src/resource.js'],
        dest: 'dist/iris.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
                ' (<%= pkg.homepage %>) licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
      },
      dist: {
        files: {
          'dist/iris.min.js': ['dist/iris.js']
        }
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
      uses_defaults: ['grunt.js', 'src/**/*.js', 'test/**/*.js'],
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

  grunt.registerTask('server', 'Starts a custom echo web server', function() {
    var server = require('./echo-server');
  });

  grunt.registerTask('bower', 'Creates bower.json file', function() {
    var bowerFile = {
      "name": "iris",
      "version": grunt.config.data.pkg.version,
      "main": ["./dist/*"],
      "ignore":[
        "**/.*"
      ],
      "dependencies": {
        "jquery": ">= 1.5"
      }
    };

    grunt.file.write("bower.json", JSON.stringify(bowerFile, undefined, 2));

  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'server', 'qunit', 'concat', 'uglify', 'bower']);

  grunt.registerTask('test', ['jshint', 'server', 'watch']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
};
