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
        },

        watch: {
            options: {
                // Start a live reload server on the default port: 35729
                livereload: true
            },
            jade: {
                files: ['slides/*.jade'],
                tasks: ['jade']
            }
        },

        connect : {
            livereload : {
                options : {
                    port       : 9001,
                    hostname: 'localhost',
                    base       : './'
                }
            }
        },

        open : {
            reload : {
                path : 'http://localhost:9001/'
            }
        }
    });

    grunt.registerTask("server", "Build and watch task", ["jade", "connect:livereload", "open:reload", "watch:jade"]);

    grunt.registerTask("testo", function() {
        var test = grunt.util._.template("test <%=test%>");
        grunt.log.writeln("********" + test({test:123}));
    });
};