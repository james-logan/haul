module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var randomPort = getRandomInt(3000, 65536);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
      main: {
        options: ['>1% in US'],
        src: 'www/css/main.css'
      }
    },
    bower_concat: {
      main: {
        dest: 'www/lib/build.js',
        cssDest: 'www/lib/build.css',
        mainFiles: {
          bootstrap: 'dist/css/bootstrap.min.css'
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'public/lib/build.css': 'public/lib/build.css'
        }
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'views/templates',
            src: ['**/*.jade', '!**/_*.jade'],
            dest: 'www/templates',
            ext: '.html'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'views/templates',
            src: ['**/*.jade', '!**/_*.jade'],
            dest: 'www/templates',
            ext: '.html'
          }
        ]
      }
    },
    sass: {
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'www/css/main.css': 'styles/main.scss'
        }
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapEmbed: true
        },
        files: {
          'www/css/main.css': 'styles/main.scss'
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },

        files: [
          'styles/main.css',
          '**/*.js',
          '**/*.html'
        ]
      },
      jade: {
        files: ['views/**/*.jade'],
        tasks: ['jade:dev']
      },
      sass: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', [
    'bower_concat',
    'jade:prod',
    'sass:prod',
    'autoprefixer'
  ]);
  grunt.registerTask('build-dev', [
    'bower_concat',
    'jade:dev',
    'sass:dev',
  ]);

  grunt.registerTask('serve', [
    'build-dev',
    'nodemon:dev',
    'watch'
  ]);

};
