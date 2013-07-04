'use strict';

module.exports = function(grunt) {

    var fs = require("fs");

    grunt.loadNpmTasks('grunt-reveal-jade/node_modules/grunt-contrib-jade');

    grunt.registerMultiTask("reveal", "Turn Jade templates into RevelJS slides", function() {

        // __dirname is the current directory
        var _ = grunt.util._,
            localRoot = __dirname + "/../",
            index = fs.readFileSync(localRoot + "index.jade").toString(),
            options = this.options({
                slides: "slides",
                build: "build",
                temp: "temp"
            }),
            // The jade file we use to create the slide show
            slides = _.template(index, {slides:options.slides + "/slides.jade"});

        // TODO: normalize file paths
        grunt.file.write(options.temp + "/index.jade", slides);

        copyModuleDirectories(["templates"], options.temp);
        copyModuleDirectories(["css", "img", "js", "lib"], options.build);
        copySlidesToTempDir();
        createBuild();

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
            grunt.log.writeln(JSON.stringify(grunt.config.get("jade.compile.files")));
            grunt.log.writeln(JSON.stringify(grunt.config.get("reveal")));
            grunt.task.run("jade");
        }

    });
}