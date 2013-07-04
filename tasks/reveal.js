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

        copyModuleDirectoriesToTemp();
        copySlidesToTempDir();
        createBuild();

        function copyModuleDirectoriesToTemp() {

            var directories = ["css", "img", "js", "templates", "lib"];
            _.forEach(directories, function(dir) {

                grunt.file.recurse(localRoot + dir, copyDirectoryToTemp.bind({ dir: dir }));
            });
        }

        function copySlidesToTempDir() {

            grunt.file.recurse(options.slides, copyDirectoryToTemp.bind({ dir: options.slides }));

        }

        function copyDirectoryToTemp(filepath, rootdir, subdir, filename) {

            copyFiles(filepath, filename, this.dir, subdir);
        }

        function copyFiles(filepath, filename, directory, subdir) {
            grunt.file.copy(filepath, options.temp + "/" + directory + "/" + subdir + "/" + filename);
        }

        function createBuild() {

            grunt.config.set("jade.compile.files",{
                "temp/index.html": ["temp/index.jade"]
            });
            grunt.log.writeln(JSON.stringify(grunt.config.get("jade.compile.files")));
            grunt.log.writeln(JSON.stringify(grunt.config.get("reveal")));
            grunt.task.run("jade");
        }

    });
}