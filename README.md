# grunt-reveal-jade

Use server side [Jade templates](http://jade-lang.com/) to create [Reveal.js](http://lab.hakim.se/reveal-js/) slideshows
using [Grunt](http://gruntjs.com/).

The idea is that all you have to include is `grunt-reveal-jade` as a dependency, and you can
simply create slides in a Jade file, livereload as you edit, and pick themes (and down the
road other Reveal options) in your Gruntfile.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-reveal-jade --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-reveal-jade');
```

Or you can install all grunt npms using the matchdep npm and:

```
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
```

## The "reveal" task

### Overview
In your project's Gruntfile, add a section named `reveal` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  reveal: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

* `slides`: the directory you will store your Jade files in.
    * default: `"slides"`
* `build`: the directory the HTML slides we be placed into
    * default: `"build"`
* `temp`: the directory and intermediate build is placed. This directory is created and
deleted before the completion of the build task.
    * default: `"temp"`
* `cleanBuild`: a boolean indicating whether the build directory should be deleted before
a new build.
    * default: `"true"`
* `livereload`: a boolean indicating whether you want slideshow to be served to
[http://localhost:9001](http://localhost:9001), auto opened, and live reloaded upon changes
to the slides or the Gruntfile.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  reveal: {
    mySlides: {}
  },
})
```

To run use `grunt reveal`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History


