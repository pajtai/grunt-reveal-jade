/*global module:false*/
module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        jade: {
            compile: {
                options: {
                    data: {
                        debug: false,
                        // TODO: put this into a flag
                        watchTask: true
                    }
                },
                files: {
                    "index.html": ["index.jade"]
                }
            }
        },

        watch: {
            options: {
                // Start a live reload server on the default port: 35729
                livereload: true
            },
            jade: {
                files: ['slides/*.jade'],
                tasks: ['jade'],
                options: {
                    // Start a live reload server on the default port: 35729
                    livereload: true
                }
            }
        },

        connect : {
            livereload : {
                options : {
                    port       : 9001,
                    hostname: 'localhost',
                    base       : './'
                    // TODO: could use middleware instead of templating to include lr script
                }
            }
        },

        open : {
            reload : {
                path : 'http://0.0.0.0:9001/'
            }
        }
    });

    grunt.registerTask("server", "Build and watch task", ["jade", "connect:livereload", "open:reload", "watch:jade"]);
};