'use strict';

module.exports = function(grunt) {

    // __dirname is the current directory
    var _ = grunt.util._,
        localRoot = __dirname + "/../",
        fs = require("fs"),
        index = fs.readFileSync(localRoot + "index.jade").toString(),
        options,
        slides;

    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-contrib-watch');

    registerGruntTasks();

    function registerGruntTasks() {

        grunt.registerMultiTask("reveal", "Turn Jade templates into RevelJS slides", function() {

            options = this.options({
                slides: "slides",
                build: "build",
                temp: "temp",
                cleanBuild: true
            });
            // The jade file we use to create the slide show
            slides = _.template(index, {slides:options.slides + "/slides.jade"});

            // TODO: normalize file paths
            if (grunt.file.isDir(options.build) && options.cleanBuild) {

                grunt.task.run("reveal-deleteBuild");
            }
            grunt.task.run("reveal-createBuild");
            grunt.task.run("reveal-deleteTemp");
            grunt.task.run("reveal-beginWatch");

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
    }

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
        grunt.task.run("jade");
    }

    function deleteDir(directory) {
        grunt.file.delete(directory);
    }
}