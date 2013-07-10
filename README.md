# grunt-reveal-jade

Use server side [Jade templates](http://jade-lang.com/) to create [Reveal.js](http://lab.hakim.se/reveal-js/) slideshows
using [Grunt](http://gruntjs.com/).

The idea is that all you have to include is `grunt-reveal-jade` as a dependency, and you can
simply create slides in a Jade file. Modify your Gruntfile, and you can get livereload, etc. going too.

To get a project setup with `grunt-reveal-jade`, livereload, and all the goodies use `grunt-init`

1. make sure `grunt-init` was installed globally using
```
npm install -g grunt-init
```
1. load the `grunt-init` template for `grunt-reveal-jade` using:
```
git clone git@github.com:pajtai/grunt-init-reveal-jade.git ~/.grunt-init/reveal-jade
```
1. now setup your project scaffolding using
```
grunt-init reveal-jade
```

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
* `assets`: Directory that will be adding from your root to the build, for images, etc.
    * default: `"assets"`
* `cleanBuild`: a boolean indicating whether the build directory should be deleted before
a new build.
    * default: `true`
* `title`: The title tag for the slideshow
* `description`: Meta tag description for the slideshow
* `author`: Author meta for the slideshow
* `theme`: The Reveal theme for the slideshow
    * default: `"default"`
    * Available themese are in `/reveal/css/theme`
* `syntax`: The syntax highlight css for the slideshow
    * default: `"zenburn"`
* `controls`: true
* `progress`: true
* `history`: true
* `center`: true
* `transition`: The type of transition from slide to slide. Available possibilities are:
> default/cube/page/concave/zoom/linear/none
    * default: default

I'll be adding more options to pass through to RevealJS. To see an example of how to hook up
live reload with RevealJS see [this Gruntifle](https://github.com/pajtai/jsToolChain/blob/master/Gruntfile.js).

I'll be adding a grunt-init with livereload options soon.

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

### Hints

Use Jade to create your slides.

It's good to know that a period at the end of a line is equiavalen to a pipe at the beginning of
the next lines. For example, here is how to do syntax highlighting:

```
section
    pre
        code(data-trim, contenteditable).
            function linkify( selector ) {
              if( supports3DTransforms ) {

                var nodes = document.querySelectorAll( selector );

                for( var i = 0, len = nodes.length; i &lt; len; i++ ) {
                  var node = nodes[i];

                  if( !node.className ) ) {
                    node.className += ' roll';
                  }
                };
              }
            }
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History


