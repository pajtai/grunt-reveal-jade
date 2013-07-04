'use strict';

module.exports = function(grunt) {

    var fs = require("fs"),
        options;

    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-contrib-jade');

    grunt.registerMultiTask("reveal", "Turn Jade templates into RevelJS slides", function() {

        // __dirname is the current directory
        var _ = grunt.util._,
            localRoot = __dirname + "/../",
            index = fs.readFileSync(localRoot + "index.jade").toString(),
            slides;

            options = this.options({
                slides: "slides",
                build: "build",
                temp: "temp",
                cleanBuild: true
            });
            // The jade file we use to create the slide show
            slides = _.template(index, {slides:options.slides + "/slides.jade"});

        grunt.registerTask("reveal-deleteTemp", "helper task that helps keeps things synchronous", function() {
            deleteDir(options.temp);
        });

        grunt.registerTask("reveal-deleteBuild", "helper task that helps keeps things synchronous", function() {
            deleteDir(options.build);
        });

        // TODO: normalize file paths

        if (grunt.file.isDir(options.build) && options.cleanBuild) {

            grunt.task.run("reveal-deleteBuild");
        }

        grunt.file.write(options.temp + "/index.jade", slides);

        copyModuleDirectories(["templates"], options.temp);
        copyModuleDirectories(["css", "img", "js", "lib"], options.build);
        copySlidesToTempDir();
        createBuild();
        grunt.task.run("reveal-deleteTemp");

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

    });
}