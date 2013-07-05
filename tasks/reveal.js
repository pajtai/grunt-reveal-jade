'use strict';

module.exports = function(grunt) {

    // TODO: normalize file paths
    // __dirname is the current directory
    var _ = grunt.util._,
        localRoot = __dirname + "/../",
        fs = require("fs"),
        index = fs.readFileSync(localRoot + "index.jade").toString(),
        options,
        slides;

    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-open');

    // Tasks ------------------------------------------------------------------------------

    grunt.registerMultiTask("reveal", "Turn Jade templates into RevelJS slides", function() {

        var tasks = [];

        options = this.options({
            slides: "slides",
            build: "build",
            temp: "temp",
            cleanBuild: true,
            livereload: true
        });

        // The jade file we use to create the slide show
        slides = _.template(index, {
            slides:options.slides + "/slides.jade"
        });

        if (grunt.file.isDir(options.build) && options.cleanBuild) {
            tasks.push("reveal-deleteBuild");
        }

        tasks = tasks.concat(["reveal-createBuild", "reveal-deleteTemp"]);

        if (options.livereload) {
            tasks = tasks.concat(["reveal-server", "reveal-beginWatch"]);
        }

        grunt.task.run(tasks);
    });

    // Creating a series of tasks and running them is the easiest way to handle
    // async things running in series
    grunt.registerTask("reveal-deleteTemp", function() {
        deleteDir(options.temp);
    });

    grunt.registerTask("reveal-deleteBuild", function() {
        deleteDir(options.build);
    });

    grunt.registerTask("reveal-createBuild", function() {

        grunt.file.write(options.temp + "/index.jade", slides);

        copyModuleDirectories(["templates"], options.temp);
        copyModuleDirectories(["css", "img", "js", "lib"], options.build);
        copySlidesToTempDir();
        createBuild();
    });

    grunt.registerTask("reveal-beginWatch", function() {

        var watch = {
            options: {
                // Start a live reload server on the default port: 35729
                livereload: true,
                // We have to keep the same context
                nospawn: true
            },
            jade: {
                files: [options.slides + '/*.jade'],
                tasks: ["reveal-createBuild", "reveal-deleteTemp"]
            }
        };

        grunt.config.set("reveal-createBuild", {});
        grunt.config.set("watch", watch);
        grunt.task.run("watch");
    });

    grunt.registerTask("reveal-server", function() {

        // TODO: pass through reveal lr and open options here
        var connect = {
                livereload : {
                    options : {
                        port       : 9001,
                        hostname: 'localhost',
                        base       : './' + options.build
                    }
                }
            },
            open = {
                reload : {
                    path : 'http://' + connect.livereload.options.hostname + ':'
                        + connect.livereload.options.port + '/'
                }
            };

        grunt.config.set("connect", connect);
        grunt.config.set("open", open);
        grunt.task.run(["connect", "open"]);
    });

    // Helper methods -----------------------------------------------------------------

    function copyModuleDirectories(moduleDirectories, destinationDirectory) {

        _.forEach(moduleDirectories, function(directory) {

            grunt.file.recurse(localRoot + directory, copyFiles.bind({ mainDir: destinationDirectory, dir: directory }));
        });
    }

    function copySlidesToTempDir() {

        grunt.file.recurse(options.slides, copyFiles.bind({ dir: options.slides, mainDir: options.temp }));

    }

    function copyFiles(filepath, rootDir, subdir, filename) {
        grunt.file.copy(filepath, this.mainDir + "/" + this.dir + "/" + (subdir ? subdir + "/" : "") + filename);
    }

    function createBuild() {

        var files = {};

        files[options.build + "/index.html"] = options.temp + "/index.jade"

        grunt.config.set("jade.compile.files", files);
        grunt.config.set("jade.compile.options.data.livereload", options.livereload);
        grunt.task.run("jade");
    }

    function deleteDir(directory) {
        grunt.file.delete(directory);
    }
}