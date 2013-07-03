'use strict';

var fs = require("fs");

module.exports = function(grunt) {

    grunt.registerMultiTask("reveal", "Turn Jade templates into RevelJS slides", function() {

        var _ = grunt.util._,
            template = _.template(grunt.file.read("index.jade")),
            options = this.options({
                slides: "slides/slides.jade",
                build: "build"
            });

        grunt.log.subhead(template({slides:options.slides}));
        grunt.config.set("reveal.instance.build", options.build);

    });
}