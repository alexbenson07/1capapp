'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src: 'src',
        dist: 'dist',
        sass: {
            'dist': {
                'options': {
                    'style': 'compressed',
                    'quiet': false,
                    'compass': true,
                    'loadPath': '<%= src %>/bower_components/foundation/scss'
                },
                'files': { '<%= dist %>/css/styles.css': '<%= src %>/scss/styles.scss' }
            }
        },
        autoprefixer: {
            'options': {
                'browsers': [
                    '> 1%',
                    'last 2 versions',
                    'ie 8',
                    'ie 9',
                    'Firefox ESR',
                    'Opera 12.1'
                ],
                'remove': false
            },
            'dist': { 'src': '<%= dist %>/css/styles.css' }
        },
        jade: {
            'compile': {
                'options': {
                    'pretty': true,
                    'data': { 'debug': false }
                },
                'files': [{
                        'expand': true,
                        'cwd': '<%= src %>/',
                        'src': [
                            '*.jade',
                            '!_*.jade'
                        ],
                        'ext': '.html',
                        'dest': '<%= dist %>/'
                    }]
            }
        },
        jshint: {
            'options': { 'jshintrc': '.jshintrc' },
            'all': [
                'Gruntfile.js',
                '<%= src %>/js/**/*.js'
            ]
        },
        copy: {
            'dist': {
                'files': [{
                        'expand': true,
                        'flatten': true,
                        'cwd': './',
                        'src': [
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/modernizer/modernizr.js',
                            'bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.js',
                            'bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.css',
                            'bower_components/foundation/js/foundation.min.js'
                        ],
                        'dest': '<%= dist %>/vendor/'
                    }]
            }
        },
        imagemin: {
            'target': {
                'files': [{
                        'expand': true,
                        'cwd': '<%= src %>/images/',
                        'src': ['**/*.{jpg,gif,svg,jpeg,png}'],
                        'dest': '<%= dist %>/images/'
                    }]
            }
        },
        uglify: {
            'options': {
                'preserveComments': 'some',
                'mangle': false
            },
            'dist': { 'files': { '<%= dist %>/js/scripts.js': ['<%= src %>/js/scripts.js'] } }
        },
        watch: {
            'grunt': {
                'files': ['Gruntfile.js'],
                'tasks': [
                    'sass',
                    'jshint'
                ]
            },
            'sass': {
                'files': '<%= src %>/scss/**/*.scss',
                'tasks': [
                    'sass',
                    'autoprefixer'
                ]
            },
            'jade': {
                'files': '<%= src %>/**/*.jade',
                'tasks': ['jade']
            },
            'livereload': {
                'files': [
                    '<%= src %>/**/*.jade',
                    '!<%= src %>/bower_components/**',
                    '<%= src %>/js/**/*.js',
                    '<%= src %>/scss/**/*.scss',
                    '<%= src %>/images/**/*.{jpg,gif,svg,jpeg,png}'
                ],
                'options': { 'livereload': true }
            }
        },
        connect: {
            'dist': {
                'options': {
                    'port': 9001,
                    'base': '<%= dist %>/',
                    'open': true,
                    'keepalive': false,
                    'livereload': true,
                    'hostname': '127.0.0.1'
                }
            }
        }
    });
    grunt.registerTask('default', [
        'jade',
        'sass',
        'autoprefixer',
        'imagemin',
        'jshint',
        'uglify',
        'copy',
        'connect',
        'watch'
    ]);
};
