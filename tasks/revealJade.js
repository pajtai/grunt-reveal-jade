'use strict';

var fs = require("fs");

module.exports = function(grunt) {

    var index = fs.readFileSync("app/public/index.html").toString();

    grunt.registerTask("revealJade", "Turn Jade templates into RevelJS slides", function() {

        var _ = grunt.util._,
            template = _.template(grunt.file.read("../index.jade"));

        template(grunt.config.get());
    });
}