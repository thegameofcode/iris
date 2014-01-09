/*global module:false*/
module.exports = function(grunt) {

  var browsers = [
    {
        browserName: "chrome",
        platform: "Linux"
    },
    {
        browserName: "firefox",
        platform: "Linux"
    },
    {
        browserName: "opera",
        platform: "Linux"
    },
    {
        browserName: "android",
        platform: "Linux"
    },
    {
        browserName: "chrome",
        platform: "Windows 8"
    },
    {
        browserName: "firefox",
        platform: "Windows 8"
    },
    {
        browserName: "internet explorer",
        platform: "Windows 8"
    },
    {
        browserName: "chrome",
        platform: "Windows 7"
    },
    {
        browserName: "firefox",
        platform: "Windows 7"
    },
    {
        browserName: "internet explorer",
        platform: "Windows 7",
        version: "9"
    },
    {
        browserName: "internet explorer",
        platform: "Windows 7",
        version: "8"
    },
    {
        browserName: "opera",
        platform: "Windows 7"
    },
    {
        browserName: "safari",
        platform: "Windows 7"
    },
    {
        browserName: "chrome",
        platform: "Windows XP"
    },
    {
        browserName: "firefox",
        platform: "Windows XP"
    },
    {
        browserName: "chrome",
        platform: "OS X 10.6"
    },
    {
        browserName: "firefox",
        platform: "OS X 10.6"
    },
    {
        browserName: "safari",
        platform: "OS X 10.6"
    },
    {
        browserName: "iphone",
        platform: "OS X 10.6"
    },
    {
        browserName: "iphone",
        platform: "OS X 10.8"
    },
    {
        browserName: "iphone",
        platform: "OS X 10.9"
    }
  ];

  var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
                ' (<%= pkg.homepage %>) licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('iris.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
                ' (<%= pkg.homepage %>) licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    concat: {
      options: {
        banner: banner
      },
      dist: {
        src: ['<banner:meta.banner>', 'src/event.js', 'src/core.js', 'src/lang.js', 'src/regional.js', 'src/util.js', 'src/settable.js', 'src/component.js', 'src/resource.js'],
        dest: 'dist/iris.js'
      }
    },
    uglify: {
      options: {
        banner: banner
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
    },
    'saucelabs-qunit': {
        all: {
            options: {
                urls: ["http://localhost:8080/test/iris.html"],
                tunnelTimeout: 5,
                build: process.env.TRAVIS_JOB_ID,
                concurrency: 3,
                browsers: browsers,
                testname: "qunit tests from saucelabs",
                tags: ["master"]
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

  grunt.registerTask('test-saucelabs', ['jshint', 'server', 'concat', 'uglify', 'bower', 'saucelabs-qunit']);

  // Loading dependencies
  for (var key in grunt.file.readJSON("package.json").devDependencies) {
      if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
  }
  
};
