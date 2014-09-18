'use strict';

var _ = require('lodash');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cfg: _.merge(
      grunt.file.readYAML('_config.yml'),
      grunt.file.readYAML('_config.local.yml')
    ),
    watch: {
      dev: {
        options: {
          livereload: 35729
        },
        files: [
          '*.{html,md,markdown}',
          '_includes/*.html',
          '_layouts/*.html',
          '_data/*.{json,yml,yaml}',
          '_posts/**/*.{markdown,md}',
          '_plugins/**/*.rb',
          '_includes/**/*.{html}',
          'js/**/*.js',
          'css/**/*.*',
          'bower_components/**/*.{js,css}',
          '_config*.yml'
        ],
        tasks: ['build:dev']
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        base: '<%= cfg.destination %>',
        open: true
      },
      server: {
        options: {}
      },
      livereload: {
        options: {
          livereload: 35729,
        }
      }
    },
    copy: {
      dev: {
        // on dist build the bower components are moved by usemin
        // on dev target, we have to copy them by hand
        files: [
          {
            src: [
              'bower_components/normalize.css/normalize.css',
              'bower_components/jquery/dist/jquery.*',
            ],
            dest: '<%= cfg.destination %>/'
          }
        ]
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= cfg.destination %>',
        root: '.' // else the sources are searched in cfg.destination folder
      },
      html: '<%= cfg.destination %>/index.html',
    },
    usemin: {
      options: {
        assetsDirs: '<%= cfg.destination %>',
      },
      html: ['<%= cfg.destination %>/**/*.html'],
      css: ['<%= cfg.destination %>/css/**/*.css']
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.local.yml'
      },
      build: {}
    },
    rsync: {
      options: {
        exclude: ['.git*'],
        recursive: true,
        src: '_site/',
        syncDest: true,
        args: [
          '--verbose',
          '-rtzh',
          '--progress',
          '--perms',
          '--no-g',
          '--chmod=Du=rwx,Dg=rx,Do=rx,Fu=rw,Fg=r,Fo=r'
        ]
      },
      live: {
        options: {
          host: '<%= cfg.deploy.live.host %>',
          dest: '<%= cfg.deploy.live.dest %>',
        }
      },
      tunneled: {
        options: {
          host: '<%= cfg.deploy.tunneled.host %>',
          port: '<%= cfg.deploy.tunneled.port %>',
          dest: '<%= cfg.deploy.tunneled.dest %>',
        }
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run([ 'build', 'connect:server:keepalive' ]);
    }

    grunt.task.run([
      'build:dev',
      'connect:livereload',
      'watch:dev'
    ]);
  });

  grunt.registerTask('build', function (target) {
    if (target === 'dev') {
      return grunt.task.run([ 'jekyll:build', 'copy:dev' ]);
    }

    grunt.task.run([
      'jekyll:build',
      'useminPrepare',
      'concat',
      'cssmin',
      'uglify',
      'usemin'
    ]);
  });

  grunt.registerTask('deploy', function (target) {
    if (target === undefined) {
      target = 'live';
    }

    grunt.task.run([
      'build',
      'rsync:' + target
    ]);
  });

  grunt.registerTask('default', [
    'serve'
  ]);
};
