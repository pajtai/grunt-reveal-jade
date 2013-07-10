'use strict';

module.exports = function(grunt) {

    // TODO: normalize file paths
    // TODO: add in option for assets directory
    // __dirname is the current directory
    var _ = grunt.util._,
        localRoot = __dirname + "/../",
        fs = require("fs"),
        options,
        slides,
        defaults = {
            slides: "slides",
            build: "build",
            temp: "temp",
            assets: "assets",
            cleanBuild: true,
            title: "Title",
            description: "Description",
            author: "You",
            theme: "default",
            syntax: "zenburn",
            controls: true,
            progress: true,
            history: true,
            center: true,
            // default/cube/page/concave/zoom/linear/none
            transition: ""
        },
        target;

    grunt.loadNpmTasks('grunt-contrib-jade');

    // Tasks ------------------------------------------------------------------------------

    grunt.registerMultiTask("reveal", "Turn Jade templates into RevealJS slides", function() {

        var tasks = [];

        target = this.target;
        options = this.options(defaults);

        if (grunt.file.isDir(options.build) && options.cleanBuild) {
            tasks.push("reveal-deleteBuild");
        }

        tasks = tasks.concat(["reveal-createBuild", "reveal-deleteTemp"]);

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

        var index = fs.readFileSync(localRoot + "index.jade").toString(),

            // The jade file we use to create the slide show
            slides = _.template(index, {
                slides:options.slides + "/slides.jade"
            });

        grunt.file.write(options.temp + "/index.jade", slides);

        copyModuleDirectories(["templates"], options.temp);
        copyModuleDirectories(["css", "js", "lib", "plugin"], options.build, "reveal");
        copyProjectDirectories([options.assets], options.build);
        copySlidesToTempDir();
        createBuild();
    });

    // Helper methods -----------------------------------------------------------------

    function copyModuleDirectories(moduleDirectories, destinationDirectory, targetDirectory) {

        _.forEach(moduleDirectories, function(directory) {

            grunt.file.recurse(localRoot + (targetDirectory ? targetDirectory + "/" : "") + directory, copyFiles.bind({ mainDir: destinationDirectory, dir: directory }));
        });
    }

    function copyProjectDirectories(moduleDirectories, destinationDirectory, targetDirectory) {

        _.forEach(moduleDirectories, function(directory) {

            grunt.file.recurse((targetDirectory ? targetDirectory + "/" : "") + directory, copyFiles.bind({ mainDir: destinationDirectory, dir: directory }));
        });
    }

    function copySlidesToTempDir() {

        grunt.file.recurse(options.slides, copyFiles.bind({ dir: options.slides, mainDir: options.temp }));

    }


    function copyFiles(filepath, rootDir, subdir, filename) {
        grunt.file.copy(filepath, this.mainDir + "/" + this.dir + "/" + (subdir ? subdir + "/" : "") + filename);
    }

    function createBuild() {

        var files = {},
        // TODO: use options directly
            variables = ["title", "description", "author", "theme", "syntax", "controls", "progress", "history", "center", "transition"],
            top = fs.readFileSync(localRoot + "templates/top.html").toString(),
            bottom,
            dataIn = {};

        files[options.build + "/index.html"] = options.temp + "/index.jade";

        grunt.config.set("jade.compile.files", files);

        _.forEach(variables, function(oneVariable) {
            dataIn[oneVariable] = options[oneVariable];
        });

        grunt.file.write(options.temp + "/templates/top.html", _.template(top, dataIn));
        top = undefined;
        bottom = fs.readFileSync(localRoot + "templates/bottom1.html").toString();
        grunt.file.write(options.temp + "/templates/bottom1.html", _.template(bottom, dataIn));
        grunt.task.run("jade");
    }

    function deleteDir(directory) {
        grunt.file.delete(directory);
    }
}
