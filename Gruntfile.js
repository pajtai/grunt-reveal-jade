/*global module:false*/
module.exports = function(grunt) {

    grunt.loadTasks('tasks');
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        reveal: {

            livereload: {
                slides:"test/slides.jade"
            }
        }

    });

};