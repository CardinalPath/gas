/*global module,require*/
module.exports = function (grunt) {
    'use strict';

    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: [
            '/**',
            ' * @preserve Copyright 2011, Cardinal Path and DigitalInc.',
            ' *',
            ' * GAS - Google Analytics on Steroids',
            ' * https://github.com/CardinalPath/gas',
            ' *',
            ' * @author Eduardo Cereto <eduardocereto@gmail.com>',
            ' * Licensed under the GPLv3 license.',
            ' */',
            '',
        ].join('\n'),
        // Task configuration.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/**/*.js', '!src/wrappers/*.js']
            },
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'nodeunit']
            },
        },
        concat: {
            options: {
                banner: '<%= banner %>'
            },
            gas: {
                src: [
                    'src/wrappers/intro.js',
                    'src/helpers.js',
                    'src/core.js',
                    'src/plugins/*.js',
                    'src/wrapup.js',
                    'src/wrappers/outro.js'
                ],
                dest: 'dist/gas.js',
            },
            core: {
                src: [
                    'src/wrappers/intro.js',
                    'src/helpers.js',
                    'src/core.js',
                    'src/wrapup.js',
                    'src/wrappers/outro.js'
                ],
                dest: 'dist/gas.core.js',
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            all: {
                files: {
                    'dist/gas.min.js': 'dist/gas.js',
                    'dist/gas.core.min.js': 'dist/gas.core.js'
                }
            },
        },
        clean: ['dist']
    });

    // Default task.
    grunt.registerTask('default', [
        'jshint'
    ]);
    grunt.registerTask('build', [
        'default',
        'clean',
        'concat',
        'uglify'
    ]);

};
