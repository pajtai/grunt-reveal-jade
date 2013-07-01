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
                        debug: false
                    }
                },
                files: {
                    "index.html": ["index.jade"]
                }
            }
        },

        watch: {

            jade: {
                files: ['slides/*.jade'],
                tasks: ['jade'],
                option: {
                    // Start a live reload server on the default port: 35729
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask("server", "Build and watch task", ["jade", "watch:jade"]);
};